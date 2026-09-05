/**
 * ChatAnywhere API Client for ProjectForge AI Mentor
 * Connects to ChatAnywhere (OpenAI-compatible proxy) using CHATANYWHERE_API_KEY.
 */

export interface ChatAnywhereMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatAnywhereOptions {
  messages: ChatAnywhereMessage[];
  model?: string;
  temperature?: number;
  max_tokens?: number;
}

export interface ChatAnywhereResponse {
  reply: string;
  model: string;
  provider: 'chatanywhere';
}

export function getChatAnywhereApiKey(): string | null {
  const key = process.env.CHATANYWHERE_API_KEY;
  if (!key) return null;
  const sanitized = key.trim().replace(/^["']|["']$/g, '');
  return sanitized.length > 0 ? sanitized : null;
}

export function isChatAnywhereConfigured(): boolean {
  return getChatAnywhereApiKey() !== null;
}

function resolveEndpoints(): string[] {
  const customBase = process.env.CHATANYWHERE_BASE_URL?.trim().replace(/\/+$/, '');
  if (customBase) {
    const url = customBase.endsWith('/chat/completions')
      ? customBase
      : customBase.endsWith('/v1')
      ? `${customBase}/chat/completions`
      : `${customBase}/v1/chat/completions`;
    return [url];
  }

  // Default endpoints with domestic/global redundancy
  return [
    'https://api.chatanywhere.tech/v1/chat/completions',
    'https://api.chatanywhere.com.cn/v1/chat/completions'
  ];
}

export async function callChatAnywhere(options: ChatAnywhereOptions): Promise<ChatAnywhereResponse> {
  const apiKey = getChatAnywhereApiKey();
  if (!apiKey) {
    throw new Error('CHATANYWHERE_API_KEY is not configured in the environment');
  }

  const model = options.model || process.env.CHATANYWHERE_MODEL || 'gpt-3.5-turbo';
  const temperature = options.temperature ?? 0.7;
  const max_tokens = options.max_tokens ?? 1800;

  const endpoints = resolveEndpoints();
  let lastError: Error | null = null;

  for (const endpoint of endpoints) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30-second timeout

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'User-Agent': 'ProjectForge-AI-Mentor'
        },
        body: JSON.stringify({
          model,
          messages: options.messages,
          temperature,
          max_tokens
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        const errorText = await res.text().catch(() => '');
        console.warn(`[ChatAnywhere] Endpoint ${endpoint} returned HTTP ${res.status}: ${errorText.slice(0, 300)}`);
        lastError = new Error(`ChatAnywhere API error (${res.status}): ${errorText.slice(0, 200)}`);
        continue; // Try alternative mirror if available
      }

      const data: any = await res.json();
      const content = data?.choices?.[0]?.message?.content;

      if (!content || typeof content !== 'string') {
        throw new Error('ChatAnywhere response did not contain message content');
      }

      return {
        reply: content.trim(),
        model: data?.model || model,
        provider: 'chatanywhere'
      };
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.warn(`[ChatAnywhere] Request to ${endpoint} timed out.`);
        lastError = new Error('ChatAnywhere request timed out');
      } else {
        console.warn(`[ChatAnywhere] Network or processing error with ${endpoint}:`, err?.message || err);
        lastError = err;
      }
    }
  }

  throw lastError || new Error('Failed to communicate with ChatAnywhere service');
}
