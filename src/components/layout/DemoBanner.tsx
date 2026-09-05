import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, X, Lock, LogIn } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { isDemoMode, exitDemoMode, openAuthModal } = useApp();

  if (!isDemoMode) return null;

  return (
    <aside aria-label="Demo mode notice" className="w-full bg-gradient-to-r from-indigo-700 via-indigo-600 to-indigo-700 text-white border-b border-indigo-500/40 px-3 sm:px-4 py-2 text-xs flex items-center justify-between z-30 sticky top-16 shadow-md font-['Poppins',sans-serif]">
      <div className="flex items-center gap-2 max-w-4xl mx-auto flex-1 justify-center text-center">
        <span className="p-1 rounded-md bg-white/20 text-white shrink-0 hidden sm:inline-flex">
          <Lock className="w-3 h-3 text-cyan-300" />
        </span>
        <span className="font-medium text-indigo-50">
          <strong className="text-white font-semibold">Demo Preview:</strong> Exploring sample capstone project. <span className="text-cyan-200 font-semibold">Login is mandatory</span> to chat with the AI Mentor, generate new blueprints, or export code.
        </span>
      </div>

      <div className="ml-3 flex items-center gap-2 shrink-0">
        <button
          onClick={() => openAuthModal('chat with AI mentor & generate custom projects')}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white text-indigo-700 hover:bg-indigo-50 font-bold transition-all shadow-xs cursor-pointer text-[11px]"
        >
          <LogIn className="w-3 h-3 text-indigo-600" />
          <span>Sign In / Unlock</span>
        </button>
        <button
          onClick={exitDemoMode}
          className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer text-[11px] border border-white/20"
          title="Exit demo mode"
        >
          <span>Exit</span>
          <X className="w-3 h-3" />
        </button>
      </div>
    </aside>
  );
};

