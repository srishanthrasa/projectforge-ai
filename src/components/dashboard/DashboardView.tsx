import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Btn, Badge, Bar } from '../ui/Primitives';
import {
  Sparkles,
  Layers,
  FileText,
  Workflow,
  ArrowRight,
  BotMessageSquare,
  Scale,
  Wand2,
  CheckSquare,
  Clock,
  Calendar,
  Compass,
  CheckCircle2,
  Database,
  ArrowUpRight
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
};

export const DashboardView: React.FC = () => {
  const {
    activeProject,
    ideas,
    tasks,
    chatMessages,
    navigateTo,
    startDemoMode
  } = useApp();

  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const progressPercent = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="py-4 space-y-6 font-['Poppins',sans-serif]"
    >
      {/* Top Welcome Bar */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 rounded-full text-[11px] font-semibold tracking-wide border border-indigo-100 dark:border-indigo-800/60">
              Capstone Workspace
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Engineering Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            Sprint velocity, system architecture specifications, and AI mentor copilot.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Sprint Term 2026</span>
          </div>
          <Btn
            variant="accent"
            size="sm"
            icon={<Sparkles className="w-3.5 h-3.5" />}
            onClick={() => navigateTo('/generate')}
          >
            Generate Ideas
          </Btn>
          <Btn
            variant="subtle"
            size="sm"
            onClick={startDemoMode}
          >
            Demo Data
          </Btn>
        </div>
      </motion.div>

      {/* Bento Grid Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* 1. Hero Bento Card: Active Project (Spans 2 columns) */}
        {activeProject ? (
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -2 }}
            className="col-span-1 md:col-span-2 lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-semibold border border-indigo-100 dark:border-indigo-800">
                    Active Project
                  </span>
                  <span className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-xs font-medium">
                    {activeProject.difficulty}
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
                  <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  {activeProject.estimated_duration}
                </div>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                {activeProject.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed line-clamp-3">
                {activeProject.description}
              </p>

              {/* Bento Metric Sub-boxes */}
              <div className="grid grid-cols-2 gap-3 my-5">
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider mb-0.5">Match Score</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">{activeProject.match_score}<span className="text-sm font-semibold text-slate-400 dark:text-slate-500 ml-1">%</span></div>
                </div>
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wider mb-0.5">Sprint Velocity</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {completedTasks}
                    <span className="text-xs font-medium text-slate-400 dark:text-slate-500 ml-1">/ {tasks.length} tasks</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5 mb-5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-600 dark:text-slate-400">Sprint Completion</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-indigo-600 dark:bg-indigo-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Btn
                variant="primary"
                size="sm"
                icon={<FileText className="w-3.5 h-3.5" />}
                onClick={() => navigateTo('/blueprint', activeProject.id)}
              >
                Blueprint
              </Btn>
              <Btn
                variant="subtle"
                size="sm"
                icon={<Workflow className="w-3.5 h-3.5" />}
                onClick={() => navigateTo('/architecture', activeProject.id)}
              >
                Architecture
              </Btn>
              <Btn
                variant="subtle"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                onClick={() => navigateTo('/roadmap', activeProject.id)}
              >
                Roadmap
              </Btn>
              <Btn
                variant="accent"
                size="sm"
                icon={<BotMessageSquare className="w-3.5 h-3.5" />}
                onClick={() => navigateTo('/mentor', activeProject.id)}
              >
                Mentor Copilot
              </Btn>
            </div>
          </motion.div>
        ) : (
          <motion.div
            variants={itemVariants}
            className="col-span-1 md:col-span-2 lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-8 shadow-xs text-center flex flex-col justify-center items-center space-y-4"
          >
            <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-100 dark:border-indigo-800 rounded-2xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                No Active Project Selected
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md font-normal mt-1">
                Kickstart your capstone journey by generating personalized project concepts calibrated to your engineering stack.
              </p>
            </div>
            <Btn
              variant="accent"
              size="md"
              icon={<Sparkles className="w-4 h-4" />}
              onClick={() => navigateTo('/generate')}
            >
              Generate My First Project
            </Btn>
          </motion.div>
        )}

        {/* 2. Bento Milestone Block */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          className="col-span-1 bg-gradient-to-br from-indigo-600 to-indigo-700 dark:from-indigo-700 dark:to-indigo-900 rounded-2xl p-6 text-white flex flex-col justify-between shadow-xs shadow-indigo-600/20"
        >
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-indigo-100 uppercase tracking-wider">
              Sprint Velocity
            </span>
            <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
          </div>
          <div className="my-3">
            <div className="text-4xl sm:text-5xl font-bold tracking-tight">{progressPercent}%</div>
            <div className="text-xs text-indigo-100 mt-1 font-medium">
              Sprint milestones achieved
            </div>
          </div>
          <div className="px-3 py-1.5 bg-white/15 rounded-lg text-xs font-medium text-white flex items-center justify-between">
            <span>Tasks Done:</span>
            <span className="font-semibold">{completedTasks} of {tasks.length}</span>
          </div>
        </motion.div>

        {/* 3. Bento Metric Block: Active Phase */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          className="col-span-1 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xs"
        >
          <div className="flex justify-between items-start">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">Active Phase</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Database className="w-4 h-4" />
            </div>
          </div>
          <div className="my-2">
            <div className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">Phase 03</div>
            <div className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Database &amp; API Schemas
            </div>
          </div>
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Sprint Term</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">12 Weeks</span>
          </div>
        </motion.div>

        {/* 4. Bento Dark Card: Upcoming Tasks (Spans 2 columns) */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          className="col-span-1 md:col-span-2 lg:col-span-2 bg-slate-900 dark:bg-slate-950 border border-slate-800 dark:border-slate-800/80 rounded-2xl p-6 sm:p-7 text-white shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-4.5 h-4.5 text-emerald-400" />
                <h3 className="text-base font-semibold tracking-tight">Upcoming Sprint Tasks</h3>
              </div>
              <button
                onClick={() => navigateTo('/tasks')}
                className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="View all tasks"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {tasks.slice(0, 3).map(task => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 bg-slate-800/80 dark:bg-slate-900/80 rounded-xl border border-slate-700/60 dark:border-slate-800"
                >
                  <div
                    className={`w-2 h-2 rounded-full shrink-0 ${
                      task.status === 'Completed'
                        ? 'bg-emerald-400 shadow-xs shadow-emerald-400'
                        : task.status === 'In Progress'
                        ? 'bg-indigo-400 shadow-xs shadow-indigo-400'
                        : 'bg-slate-500'
                    }`}
                  />
                  <div className="flex-grow min-w-0">
                    <div className="text-xs font-semibold text-slate-100 truncate">{task.title}</div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      {task.status} • Est. {task.estimated_hours}h
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                    {task.status === 'Completed' ? 'DONE' : 'WIP'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400">
            <span>{tasks.length - completedTasks} tasks remaining</span>
            <button
              onClick={() => navigateTo('/tasks')}
              className="text-emerald-400 font-medium hover:underline cursor-pointer flex items-center gap-1"
            >
              <span>Kanban Board</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* 5. Bento Ideas Repository */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          className="col-span-1 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xs"
        >
          <div className="flex justify-between items-start">
            <div className="w-9 h-9 bg-indigo-50 dark:bg-indigo-950/80 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md text-[10px] font-semibold uppercase tracking-wider">
              Ideas
            </span>
          </div>
          <div className="my-3">
            <div className="text-3xl font-bold text-slate-900 dark:text-white leading-tight">
              {ideas.length}
            </div>
            <div className="text-xs font-medium text-slate-700 dark:text-slate-300 mt-0.5">
              Project Concepts Ready
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
              Calibrated by stack &amp; rubric
            </p>
          </div>
          <Btn
            variant="subtle"
            size="sm"
            className="w-full justify-center"
            onClick={() => navigateTo('/ideas')}
          >
            Browse Ideas
          </Btn>
        </motion.div>

        {/* 6. Bento AI Mentor Card */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -2 }}
          className="col-span-1 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xs"
        >
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <BotMessageSquare className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  AI Mentor
                </span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            </div>

            <div className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
              Viva &amp; Architecture Copilot
            </div>

            {chatMessages.length > 0 ? (
              <p className="text-xs text-slate-500 dark:text-slate-400 font-normal italic line-clamp-3 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
                "{chatMessages[chatMessages.length - 1].content}"
              </p>
            ) : (
              <p className="text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
                Ask questions on system architecture, database schema, or prepare for university viva questions.
              </p>
            )}
          </div>

          <Btn
            variant="subtle"
            size="sm"
            className="w-full justify-center mt-3"
            onClick={() => navigateTo('/mentor')}
          >
            Open Mentor Chat
          </Btn>
        </motion.div>
      </div>

      {/* Bento Wide Action Bar / Tools Row */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 sm:p-7 shadow-xs"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Quick Decision Tools
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Capstone Engineering Toolset
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
              Validate with academic rubrics, upscale generic concepts, and compare stacks side-by-side.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <motion.button
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('/evaluate')}
              className="p-3.5 bg-slate-50 dark:bg-slate-800/70 hover:bg-slate-100/80 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-xl text-left transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 text-[11px] font-semibold uppercase tracking-wider mb-1">
                <Scale className="w-3.5 h-3.5" />
                <span>Rubric Evaluator</span>
              </div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Score Proposals
              </div>
            </motion.button>

            <motion.button
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('/improve')}
              className="p-3.5 bg-slate-50 dark:bg-slate-800/70 hover:bg-slate-100/80 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-xl text-left transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 text-[11px] font-semibold uppercase tracking-wider mb-1">
                <Wand2 className="w-3.5 h-3.5" />
                <span>Concept Upgrade</span>
              </div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Add Cloud &amp; AI
              </div>
            </motion.button>

            <motion.button
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo('/compare')}
              className="p-3.5 bg-slate-50 dark:bg-slate-800/70 hover:bg-slate-100/80 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 rounded-xl text-left transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 text-[11px] font-semibold uppercase tracking-wider mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Comparison Matrix</span>
              </div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                Compare Options
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
