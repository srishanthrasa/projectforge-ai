import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Badge, Btn } from '../ui/Primitives';
import {
  Layers,
  Sparkles,
  Workflow,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Code2,
  HelpCircle,
  Shield,
  Lightbulb,
  X,
  Target,
  FileText
} from 'lucide-react';

interface MentorContextDrawerProps {
  onCloseMobile?: () => void;
  onSelectPrompt: (prompt: string) => void;
}

export const MentorContextDrawer: React.FC<MentorContextDrawerProps> = ({
  onCloseMobile,
  onSelectPrompt
}) => {
  const { activeProject, tasks, navigateTo, profile } = useApp();

  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress');
  const taskProgress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 35;

  return (
    <div className="h-full flex flex-col justify-between p-5 space-y-6 font-['Poppins',sans-serif]">
      <div className="space-y-5">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3.5">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Layers className="w-3.5 h-3.5" />
            </span>
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Live Grounding
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">Context injected into AI prompt</p>
            </div>
          </div>
          {onCloseMobile ? (
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors sm:hidden"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <Badge variant="success" size="sm">Active</Badge>
          )}
        </div>

        {/* Active Project Card */}
        {activeProject ? (
          <div className="space-y-4">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Active Capstone
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-100 dark:border-indigo-800">
                  {activeProject.difficulty || 'Intermediate'}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                {activeProject.title}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {activeProject.description}
              </p>
            </div>

            {/* Sprint Progress Meter */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400 font-medium flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  Sprint Tasks
                </span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono text-xs">
                  {completedTasks} / {tasks.length || 12} ({taskProgress}%)
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${taskProgress}%` }}
                />
              </div>
            </div>

            {/* In-Progress Task Callout */}
            {inProgressTasks.length > 0 && (
              <div className="p-3.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                  <Clock className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                  <span>Current Task in Focus</span>
                </div>
                <div className="text-xs font-semibold text-slate-900 dark:text-white leading-snug">
                  {inProgressTasks[0].title}
                </div>
                <button
                  onClick={() =>
                    onSelectPrompt(`How should I implement the sprint task: "${inProgressTasks[0].title}"? Provide practical step-by-step guidance.`)
                  }
                  className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 cursor-pointer pt-0.5"
                >
                  <span>Ask mentor about this task</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Tech Stack Chips */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                Technologies Grounded
              </span>
              <div className="flex flex-wrap gap-1">
                {activeProject.technology_stack.slice(0, 8).map(tech => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 text-center space-y-2">
            <Lightbulb className="w-6 h-6 text-slate-400 mx-auto" />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              No active project selected. Select a project from Ideas or Blueprint for tailored grounding.
            </p>
            <Btn
              variant="subtle"
              size="sm"
              onClick={() => navigateTo('/ideas')}
              className="text-xs"
            >
              Select Project
            </Btn>
          </div>
        )}

        {/* Quick Consultation Modes */}
        <div className="space-y-2 pt-2 border-t border-slate-200/80 dark:border-slate-800">
          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
            Quick Mentor Modes
          </span>
          <div className="grid grid-cols-1 gap-1.5">
            <button
              onClick={() =>
                onSelectPrompt('Act as my committee evaluator. Conduct a tough 3-question viva defense review of my project architecture and security.')
              }
              className="w-full text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200/60 dark:border-slate-700/60 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-[11px]">Viva Defense Simulation</span>
              </div>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
            </button>

            <button
              onClick={() =>
                onSelectPrompt('Review my database schema. Are there any normalization flaws, missing indexes, or performance bottlenecks?')
              }
              className="w-full text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200/60 dark:border-slate-700/60 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-[11px]">Schema &amp; API Code Audit</span>
              </div>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
            </button>

            <button
              onClick={() =>
                onSelectPrompt('Draft a concise, publication-ready Problem Statement and Methodology section for my final academic report.')
              }
              className="w-full text-left p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200/60 dark:border-slate-700/60 hover:border-indigo-200 dark:hover:border-indigo-800 transition-colors flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 group cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-[11px]">Academic Report Drafter</span>
              </div>
              <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Navigation Links */}
      <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
        <button
          onClick={() => navigateTo('/blueprint', activeProject?.id)}
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1 cursor-pointer font-medium"
        >
          <span>Blueprint</span>
        </button>
        <span className="text-slate-300 dark:text-slate-700">•</span>
        <button
          onClick={() => navigateTo('/architecture', activeProject?.id)}
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1 cursor-pointer font-medium"
        >
          <span>Architecture</span>
        </button>
        <span className="text-slate-300 dark:text-slate-700">•</span>
        <button
          onClick={() => navigateTo('/roadmap', activeProject?.id)}
          className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1 cursor-pointer font-medium"
        >
          <span>Roadmap</span>
        </button>
      </div>
    </div>
  );
};
