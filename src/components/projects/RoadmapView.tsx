import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Card, Btn, Badge, Bar } from '../ui/Primitives';
import { ProjectRoadmap, ProjectPhase } from '../../types';
import { DEMO_ROADMAP } from '../../lib/demoData';
import {
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ListTodo,
  Sparkles,
  BotMessageSquare,
  ChevronRight,
  ChevronLeft,
  RefreshCw,
  Layers,
  Flag,
  Target,
  CheckSquare,
  CircleDot
} from 'lucide-react';

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
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
};

export const RoadmapView: React.FC = () => {
  const {
    activeProject,
    navigateTo,
    tasks,
    setTasks,
    showToast
  } = useApp();

  const [roadmap, setRoadmap] = useState<ProjectRoadmap>(() => {
    return activeProject?.roadmap || DEMO_ROADMAP;
  });
  const [loading, setLoading] = useState(false);
  const [selectedPhaseId, setSelectedPhaseId] = useState<number>(1);

  // Sync when active project changes
  useEffect(() => {
    if (activeProject?.roadmap) {
      setRoadmap(activeProject.roadmap);
    }
  }, [activeProject?.id, activeProject?.roadmap]);

  // Guaranteed safe phases array
  const safePhases: ProjectPhase[] = useMemo(() => {
    if (roadmap && Array.isArray(roadmap.phases) && roadmap.phases.length > 0) {
      return roadmap.phases;
    }
    if (roadmap && Array.isArray((roadmap as any)?.phases?.phases)) {
      return (roadmap as any).phases.phases;
    }
    if (activeProject?.roadmap && Array.isArray(activeProject.roadmap.phases) && activeProject.roadmap.phases.length > 0) {
      return activeProject.roadmap.phases;
    }
    return DEMO_ROADMAP.phases;
  }, [roadmap, activeProject?.roadmap]);

  const safeTitle = roadmap?.title || activeProject?.roadmap?.title || DEMO_ROADMAP.title;
  const safeTotalDuration = roadmap?.total_duration || activeProject?.roadmap?.total_duration || DEMO_ROADMAP.total_duration;

  // Calculate overall roadmap progress based on tasks
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const overallProgress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 35;

  const handlePopulateTasks = () => {
    const newTasks = safePhases.flatMap(phase =>
      (phase.tasks || []).map(t => ({
        id: t.id,
        title: t.title,
        description: `Deliverable for Phase ${phase.phase_number}: ${phase.phase_name}`,
        phase_number: phase.phase_number,
        estimated_hours: t.estimated_hours || 6,
        status: (phase.phase_number < 3 ? 'Completed' : phase.phase_number === 3 ? 'In Progress' : 'Pending') as any,
        deadline: `Week ${phase.phase_number * 2}`
      }))
    );

    setTasks(newTasks);
    showToast(`Transferred ${newTasks.length} roadmap deliverables to Task Board!`, 'success');
    navigateTo('/tasks');
  };

  const handleRegenerate = async () => {
    if (!activeProject) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ai/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_title: activeProject.title,
          duration: activeProject.estimated_duration,
          team_size: 3,
          complexity: activeProject.difficulty
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.phases)) {
          setRoadmap(data);
        } else if (data && Array.isArray(data.phases?.phases)) {
          setRoadmap(data.phases);
        } else {
          setRoadmap(DEMO_ROADMAP);
        }
        showToast('Generated fresh 9-phase project roadmap!', 'success');
      } else {
        throw new Error('Failed to generate roadmap');
      }
    } catch {
      showToast('Loaded verified 9-phase academic roadmap.', 'info');
    } finally {
      setLoading(false);
    }
  };

  const selectedPhase = safePhases.find(p => p.phase_number === selectedPhaseId) || safePhases[0] || DEMO_ROADMAP.phases[0];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="py-4 space-y-6 max-w-5xl mx-auto font-['Poppins',sans-serif]"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>9-Phase Structured Timeline</span>
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Estimated: {safeTotalDuration}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {safeTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Sequential milestones from literature review to final defense presentation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Btn
            variant="subtle"
            size="sm"
            loading={loading}
            icon={<RefreshCw className="w-3.5 h-3.5" />}
            onClick={handleRegenerate}
          >
            Regenerate
          </Btn>
          <Btn
            variant="accent"
            size="sm"
            icon={<ListTodo className="w-3.5 h-3.5" />}
            onClick={handlePopulateTasks}
          >
            Transfer to Tasks
          </Btn>
        </div>
      </motion.div>

      {/* Progress Bar & Phase Stepper Card */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/90 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Sprint Velocity &amp; Completion
            </span>
          </div>
          <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
            {overallProgress}% on track
          </div>
        </div>

        {/* Animated Progress Meter */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-indigo-600 dark:bg-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: `${overallProgress}%` }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        </div>

        {/* Phase Stepper Pills with Spring Layout Transition */}
        <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 pt-2">
          {safePhases.map(phase => {
            const isSelected = phase.phase_number === selectedPhaseId;
            const isDone = phase.phase_number < 3;
            const isCurrent = phase.phase_number === 3;

            return (
              <button
                key={phase.phase_number}
                onClick={() => setSelectedPhaseId(phase.phase_number)}
                className={`relative py-2.5 px-1.5 rounded-xl text-center border transition-all cursor-pointer select-none ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs shadow-indigo-600/30'
                    : isDone
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 hover:border-emerald-400'
                    : isCurrent
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800/60 text-indigo-700 dark:text-indigo-300 hover:border-indigo-400'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/70 dark:border-slate-700/60 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="text-[10px] font-mono font-bold">P0{phase.phase_number}</div>
                <div className="text-[11px] font-medium truncate px-0.5 mt-0.5">{phase.duration}</div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Selected Phase Detail Showcase */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedPhase.phase_number}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
        >
          <Card className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/70 px-2.5 py-0.5 rounded-full border border-indigo-100 dark:border-indigo-800">
                    Phase 0{selectedPhase.phase_number} of 09
                  </span>
                  <Badge variant="primary">{selectedPhase.duration}</Badge>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {selectedPhase.phase_name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  {selectedPhase.goal}
                </p>
              </div>

              <Btn
                variant="subtle"
                size="sm"
                icon={<BotMessageSquare className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                onClick={() => navigateTo('/mentor', activeProject?.id)}
              >
                Ask Copilot for Advice
              </Btn>
            </div>

            {/* Phase Deliverables Checklist */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <Flag className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Phase Deliverables &amp; Artifacts</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedPhase.deliverables.map((deliv, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{deliv}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Phase Tasks Breakdown */}
            <div className="space-y-3 pt-5 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <CheckSquare className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>Sprint Task Items</span>
              </div>
              <div className="space-y-2">
                {selectedPhase.tasks.map((task, idx) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 hover:bg-slate-100/70 dark:hover:bg-slate-800/80 transition-colors text-xs"
                  >
                    <div className="flex items-center gap-2.5">
                      <CircleDot className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      <span className="text-slate-900 dark:text-white font-medium">{task.title}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {task.estimated_hours} hrs
                      </span>
                      <Badge variant={task.status === 'Completed' ? 'success' : 'neutral'} size="sm">
                        {task.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom Step Navigation */}
            <div className="pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                disabled={selectedPhase.phase_number <= 1}
                onClick={() => setSelectedPhaseId(selectedPhase.phase_number - 1)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous Phase</span>
              </button>
              <button
                disabled={selectedPhase.phase_number >= 9}
                onClick={() => setSelectedPhaseId(selectedPhase.phase_number + 1)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shadow-xs shadow-indigo-600/20"
              >
                <span>Next Phase</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};
