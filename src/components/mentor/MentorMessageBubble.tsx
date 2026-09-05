import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChatMessage } from '../../types';
import {
  BotMessageSquare,
  User,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Code2,
  Terminal,
  Sparkles
} from 'lucide-react';

interface MentorMessageBubbleProps {
  message: ChatMessage;
  speakingId: string | null;
  onSpeak: (text: string, id: string) => void;
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}

// Custom Markdown / Code Block Formatter for clean rendering
const FormattedMessageContent: React.FC<{
  content: string;
  showToast: (msg: string, type?: 'success' | 'info' | 'error') => void;
}> = ({ content, showToast }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    showToast('Code copied to clipboard!', 'success');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Split content by triple backticks for code blocks
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2.5 leading-relaxed font-['Poppins',sans-serif]">
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          // It is a code block
          const lines = part.slice(3, -3).trim().split('\n');
          const firstLine = lines[0].trim();
          let language = 'code';
          let codeContent = lines.join('\n');

          if (/^[a-zA-Z0-9_-]+$/.test(firstLine)) {
            language = firstLine;
            codeContent = lines.slice(1).join('\n');
          }

          const isCopied = copiedIndex === index;

          return (
            <div
              key={index}
              className="my-3 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 text-xs shadow-xs"
            >
              <div className="flex items-center justify-between px-3.5 py-1.5 bg-slate-950/80 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="uppercase text-[10px] font-semibold tracking-wider text-slate-300">
                    {language}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyCode(codeContent, index)}
                  className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer px-2 py-0.5 rounded hover:bg-slate-800"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3.5 overflow-x-auto font-mono text-[11px] leading-relaxed text-slate-200 bg-slate-900/90 whitespace-pre">
                <code>{codeContent}</code>
              </pre>
            </div>
          );
        }

        // Regular text formatting (inline code, bold, lists, paragraphs)
        const lines = part.split('\n');
        return (
          <div key={index} className="space-y-1.5 text-xs sm:text-sm">
            {lines.map((line, lineIdx) => {
              if (!line.trim()) {
                return <div key={lineIdx} className="h-1" />;
              }

              // Heading 3 or 4
              if (line.startsWith('### ')) {
                return (
                  <h4 key={lineIdx} className="text-sm font-bold text-slate-900 dark:text-white pt-2 pb-0.5">
                    {line.replace('### ', '')}
                  </h4>
                );
              }
              if (line.startsWith('## ')) {
                return (
                  <h3 key={lineIdx} className="text-base font-bold text-slate-900 dark:text-white pt-2.5 pb-1">
                    {line.replace('## ', '')}
                  </h3>
                );
              }

              // Bullet points
              if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
                const text = line.trim().replace(/^[-*]\s+/, '');
                return (
                  <div key={lineIdx} className="flex items-start gap-2 pl-1 text-slate-700 dark:text-slate-300">
                    <span className="text-indigo-500 dark:text-indigo-400 font-bold shrink-0 leading-5">•</span>
                    <span>{renderInlineFormatting(text)}</span>
                  </div>
                );
              }

              // Numbered list
              const numMatch = line.trim().match(/^(\d+)\.\s+(.*)/);
              if (numMatch) {
                return (
                  <div key={lineIdx} className="flex items-start gap-2 pl-1 text-slate-700 dark:text-slate-300">
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono font-semibold text-xs shrink-0 leading-5">
                      {numMatch[1]}.
                    </span>
                    <span>{renderInlineFormatting(numMatch[2])}</span>
                  </div>
                );
              }

              return (
                <p key={lineIdx} className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {renderInlineFormatting(line)}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

// Helper for inline bold **text** and inline `code`
function renderInlineFormatting(text: string): React.ReactNode {
  // Split by inline code `...`
  const codeParts = text.split(/(`[^`]+`)/g);

  return codeParts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 mx-0.5 text-[11px] font-mono font-medium rounded-md bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800"
        >
          {part.slice(1, -1)}
        </code>
      );
    }

    // Split by bold **...**
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((boldPart, j) => {
      if (boldPart.startsWith('**') && boldPart.endsWith('**')) {
        return (
          <strong key={j} className="font-semibold text-slate-900 dark:text-white">
            {boldPart.slice(2, -2)}
          </strong>
        );
      }
      return boldPart;
    });
  });
}

export const MentorMessageBubble: React.FC<MentorMessageBubbleProps> = ({
  message,
  speakingId,
  onSpeak,
  showToast
}) => {
  const isAssistant = message.role === 'assistant';
  const [copied, setCopied] = useState(false);

  const handleCopyAll = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    showToast('Message text copied', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`flex gap-3 font-['Poppins',sans-serif] ${
        isAssistant ? 'justify-start' : 'justify-end'
      }`}
    >
      {/* Assistant Avatar */}
      {isAssistant && (
        <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5 shadow-xs">
          <BotMessageSquare className="w-4 h-4" />
        </div>
      )}

      <div
        className={`max-w-[88%] sm:max-w-[78%] rounded-2xl p-4 sm:p-5 shadow-xs transition-all ${
          isAssistant
            ? 'bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm'
            : 'bg-indigo-600 text-white rounded-tr-sm shadow-indigo-600/20'
        }`}
      >
        {isAssistant ? (
          <FormattedMessageContent content={message.content} showToast={showToast} />
        ) : (
          <div className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed text-white font-medium">
            {message.content}
          </div>
        )}

        {/* Action Bar for Assistant Messages */}
        {isAssistant && (
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
            <span className="font-mono text-[10px]">{message.timestamp}</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => onSpeak(message.content, message.id)}
                className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer text-[11px] font-medium"
              >
                {speakingId === message.id ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                    <span className="text-indigo-600 dark:text-indigo-400">Stop</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCopyAll}
                className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer text-[11px] font-medium"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* User Timestamp */}
        {!isAssistant && (
          <div className="mt-1.5 text-right text-[10px] text-indigo-200/80 font-mono">
            {message.timestamp}
          </div>
        )}
      </div>

      {/* User Avatar */}
      {!isAssistant && (
        <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs shadow-indigo-600/20">
          <User className="w-4 h-4" />
        </div>
      )}
    </motion.div>
  );
};
