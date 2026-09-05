import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Card, Btn, Badge } from '../ui/Primitives';
import { ChatMessage } from '../../types';
import { MentorMessageBubble } from './MentorMessageBubble';
import { MentorContextDrawer } from './MentorContextDrawer';
import {
  BotMessageSquare,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Download,
  Terminal,
  Layers,
  HelpCircle,
  Clock,
  MessageSquare,
  Cpu,
  BrainCircuit,
  GraduationCap,
  ShieldAlert,
  Flame,
  ArrowRight,
  X,
  Maximize2,
  Minimize2,
  Lock
} from 'lucide-react';

const CATEGORIZED_PROMPTS = [
  {
    category: 'Architecture',
    prompt: 'Explain the 8-tier vertical architecture of my project and how requests flow.'
  },
  {
    category: 'Database',
    prompt: 'Help me design the normalized PostgreSQL schema, foreign keys, and indexes for this system.'
  },
  {
    category: 'Defense / Viva',
    prompt: 'What are the top 5 toughest viva defense questions a professor will ask about this project?'
  },
  {
    category: 'Report Writing',
    prompt: 'Write a comprehensive Problem Statement and Abstract for my final capstone documentation.'
  },
  {
    category: 'Deployment',
    prompt: 'What is the best zero-budget cloud deployment strategy using Docker and free tiers?'
  },
  {
    category: 'Sprint Priority',
    prompt: 'Based on my current sprint tasks, what should I code first to have a working MVP?'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }
};

export const MentorChatView: React.FC = () => {
  const {
    activeProject,
    chatMessages,
    addChatMessage,
    clearChatMessages,
    tasks,
    isAuthenticated,
    isDemoMode,
    openAuthModal,
    requireAuth,
    showToast
  } = useApp();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showContext, setShowContext] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mentorStatus, setMentorStatus] = useState<{
    chatAnywhereConfigured: boolean;
    geminiConfigured: boolean;
    activeProvider: string;
    chatAnywhereModel: string;
  } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress');

  useEffect(() => {
    fetch('/api/ai/mentor-status')
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data) setMentorStatus(data);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, loading]);

  // Voice recording timer
  useEffect(() => {
    if (isRecording) {
      setRecordingTime(0);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setRecordingTime(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  // Voice Recognition Setup
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => (prev ? `${prev} ${transcript}` : transcript));
        setIsRecording(false);
        showToast('Voice transcribed successfully!', 'success');
      };

      recognition.onerror = () => {
        setIsRecording(false);
        showToast('Microphone access denied or error occurred.', 'error');
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleRecording = () => {
    if (!requireAuth('use voice dictation with the AI Senior Mentor')) return;

    if (!recognitionRef.current) {
      showToast('Speech recognition is not supported in this browser.', 'info');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
        showToast('Listening... speak your engineering question.', 'info');
      } catch {
        setIsRecording(false);
      }
    }
  };

  const handleSpeak = (text: string, msgId: string) => {
    if (!('speechSynthesis' in window)) {
      showToast('Audio playback not supported in this browser.', 'info');
      return;
    }

    if (speakingId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.replace(/```[\s\S]*?```/g, 'Code block omitted from audio.'));
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleExport = () => {
    if (chatMessages.length === 0) {
      showToast('No messages to export yet.', 'info');
      return;
    }
    const transcript = [
      `============================================================`,
      `PROJECTFORGE CAPSTONE ENGINEERING MENTOR TRANSCRIPT`,
      `Project: ${activeProject?.title || 'General Engineering Consultation'}`,
      `Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
      `============================================================\n\n`,
      ...chatMessages.map(
        m => `[${m.role.toUpperCase()}] (${m.timestamp}):\n${m.content}\n\n------------------------------------------------------------\n`
      )
    ].join('\n');

    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `projectforge-mentor-session-${Date.now()}.txt`;
    a.click();
    showToast('Downloaded mentor transcript file.', 'success');
  };

  const handleSendMessage = async (textToSend?: string) => {
    if (!requireAuth('chat with the AI Senior Mentor')) return;

    const messageContent = (textToSend || input).trim();
    if (!messageContent || loading) return;

    // Add user message
    addChatMessage({
      id: `msg-${Date.now()}`,
      role: 'user',
      content: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai/mentor-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageContent,
          conversation_history: chatMessages.slice(-8).map(m => ({
            role: m.role,
            content: m.content
          })),
          context: activeProject
            ? {
                project_title: activeProject.title,
                project_description: activeProject.description,
                tech_stack: activeProject.technology_stack,
                current_phase: 'Phase 3: Database & Core Services',
                completed_tasks_count: completedTasks,
                total_tasks_count: tasks.length || 12,
                current_task: inProgressTasks[0]?.title || 'System Core Implementation'
              }
            : undefined
        })
      });

      if (!response.ok) {
        throw new Error('Mentor service error');
      }

      const data = await response.json();
      addChatMessage({
        id: `mentor-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });

      if (data.provider === 'chatanywhere') {
        setMentorStatus(prev => ({
          chatAnywhereConfigured: true,
          geminiConfigured: prev?.geminiConfigured ?? false,
          activeProvider: 'chatanywhere',
          chatAnywhereModel: data.model || prev?.chatAnywhereModel || 'gpt-3.5-turbo'
        }));
      }
    } catch {
      // Offline fallback
      addChatMessage({
        id: `mentor-${Date.now()}`,
        role: 'assistant',
        content: `I've analyzed your question regarding "${messageContent}". Since you are working with ${activeProject?.title || 'your capstone project'}, ensure you establish strict boundary contracts between your presentation layers and backend microservices.\n\n### Recommended Next Steps:\n1. Verify your database indexing strategy for high-frequency queries.\n2. Add automated unit test assertions for edge cases.\n3. Keep your API contracts clearly documented.\n\nFeel free to ask for specific code snippets, schema tables, or defense questions!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="py-2 h-[calc(100vh-8.5rem)] flex flex-col font-['Poppins',sans-serif]"
    >
      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Main Chat Stream Container */}
        <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/90 rounded-2xl overflow-hidden shadow-xs">
          {/* Header Bar */}
          <div className="px-5 py-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 shrink-0 gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 shadow-xs">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">
                    ProjectForge Engineering Mentor
                  </h2>
                  {!isAuthenticated ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                      <Lock className="w-3 h-3" />
                      Demo Preview • Login Mandatory
                    </span>
                  ) : mentorStatus?.chatAnywhereConfigured ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      ChatAnywhere ({mentorStatus.chatAnywhereModel || 'GPT'})
                    </span>
                  ) : mentorStatus?.geminiConfigured ? (
                    <Badge variant="accent" size="sm">Gemini 3.8 Flash</Badge>
                  ) : (
                    <Badge variant="primary" size="sm">Active Grounding</Badge>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {activeProject
                    ? `Grounded in: ${activeProject.title} • Schema, Sprints & IEEE Rules`
                    : 'Interactive Capstone Guidance • Architecture, Schemas, & Viva Preparation'}
                </p>
              </div>
            </div>

            {/* Quick Action Tools */}
            <div className="flex items-center gap-1.5">
              {!isAuthenticated && (
                <Btn
                  variant="accent"
                  size="sm"
                  icon={<Lock className="w-3.5 h-3.5" />}
                  onClick={() => openAuthModal('chat with the AI Senior Mentor')}
                  className="mr-1 text-xs font-bold"
                >
                  Log In to Chat
                </Btn>
              )}
              <button
                type="button"
                onClick={handleExport}
                title="Download Conversation Transcript"
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => {
                  clearChatMessages();
                  showToast('Conversation cleared', 'info');
                }}
                title="Clear Chat History"
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setShowContext(!showContext)}
                title={showContext ? 'Hide Context Panel' : 'Show Context Panel'}
                className={`p-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1 text-xs font-medium ${
                  showContext
                    ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span className="hidden md:inline">{showContext ? 'Hide Context' : 'Context'}</span>
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/50 dark:bg-slate-950/40">
            <AnimatePresence initial={false}>
              {chatMessages.map(msg => (
                <MentorMessageBubble
                  key={msg.id}
                  message={msg}
                  speakingId={speakingId}
                  onSpeak={handleSpeak}
                  showToast={showToast}
                />
              ))}
            </AnimatePresence>

            {/* Typing / Reasoning Indicator */}
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-3 justify-start"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5 shadow-xs">
                  <BotMessageSquare className="w-4 h-4" />
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs text-indigo-700 dark:text-indigo-300 flex items-center gap-2.5 shadow-xs">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-ping" />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-bounce [animation-delay:0.2s]" />
                  </div>
                  <span className="font-medium">Mentor is analyzing project requirements &amp; drafting guidance…</span>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts Horizontal Bar */}
          <div className="px-4 py-2.5 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800 overflow-x-auto flex items-center gap-2 shrink-0 scrollbar-none">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 tracking-wider pl-1 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-500" />
              <span>Suggested:</span>
            </span>
            {CATEGORIZED_PROMPTS.map((item, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSendMessage(item.prompt)}
                className="text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/70 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-700 dark:hover:text-indigo-300 border border-slate-200/80 dark:border-slate-700/80 hover:border-indigo-200 dark:hover:border-indigo-800 px-3 py-1.5 rounded-xl whitespace-nowrap cursor-pointer transition-colors shrink-0 flex items-center gap-1.5"
              >
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase font-mono">
                  {item.category}:
                </span>
                <span className="font-medium">{item.prompt}</span>
              </motion.button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
            {!isAuthenticated ? (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50/90 via-white to-indigo-50/90 dark:from-slate-800 dark:via-indigo-950/40 dark:to-slate-800 border border-indigo-200/90 dark:border-indigo-800/90 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/30">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      Login Mandatory to Chat with AI Mentor
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Sign in or create your student account to ask architecture questions, debug backend code, and prepare for viva defense.
                    </p>
                  </div>
                </div>
                <Btn
                  variant="accent"
                  size="md"
                  icon={<Sparkles className="w-4 h-4" />}
                  onClick={() => openAuthModal('chat with the AI Senior Mentor')}
                  className="shrink-0 font-bold whitespace-nowrap shadow-md shadow-indigo-600/30 w-full sm:w-auto"
                >
                  Log In to Chat
                </Btn>
              </div>
            ) : (
              <>
                {/* Live voice recording active banner */}
                {isRecording && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-2.5 p-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 flex items-center justify-between text-xs text-rose-700 dark:text-rose-300"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                      <span className="font-semibold">Recording speech ({recordingTime}s)... Speak clearly into microphone</span>
                    </div>
                    <button
                      type="button"
                      onClick={toggleRecording}
                      className="px-2 py-0.5 rounded bg-rose-600 text-white font-medium text-[11px] cursor-pointer"
                    >
                      Done
                    </button>
                  </motion.div>
                )}

                <form
                  onSubmit={e => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  {/* Voice Input Button */}
                  <button
                    type="button"
                    onClick={toggleRecording}
                    title={isRecording ? 'Stop Recording' : 'Dictate question with voice'}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      isRecording
                        ? 'bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/20'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-4 h-4 animate-bounce" /> : <Mic className="w-4 h-4" />}
                  </button>

                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder={
                      isRecording
                        ? 'Listening... say your question now'
                        : 'Ask about architecture, SQL schemas, code errors, or viva defense questions…'
                    }
                    className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />

                  <Btn
                    type="submit"
                    variant="accent"
                    size="md"
                    disabled={!input.trim() || loading}
                    icon={<Send className="w-4 h-4" />}
                  >
                    Ask Mentor
                  </Btn>
                </form>
              </>
            )}
          </div>
        </div>

        {/* Right Collapsible Project Context Drawer */}
        <AnimatePresence>
          {showContext && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 320 }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="hidden lg:block bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-y-auto shrink-0 shadow-xs"
            >
              <MentorContextDrawer
                onSelectPrompt={prompt => handleSendMessage(prompt)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
