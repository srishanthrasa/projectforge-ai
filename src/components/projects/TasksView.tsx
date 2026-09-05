import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Card, Btn, Badge, Bar, Field } from '../ui/Primitives';
import { Task } from '../../types';
import {
  CheckSquare,
  Plus,
  Trash2,
  Clock,
  Calendar,
  Filter,
  CheckCircle2,
  Circle,
  Clock3,
  Sparkles,
  ArrowRight,
  Kanban,
  List,
  ChevronRight,
  X,
  Layers,
  AlertCircle
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
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }
};

export const TasksView: React.FC = () => {
  const { tasks, addTask, updateTaskStatus, deleteTask, activeProject, navigateTo, showToast } = useApp();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterPhase, setFilterPhase] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [showAddModal, setShowAddModal] = useState(false);

  // New task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskPhase, setNewTaskPhase] = useState(1);
  const [newTaskHours, setNewTaskHours] = useState(6);
  const [newTaskDeadline, setNewTaskDeadline] = useState('Sprint 1');

  const completedCount = tasks.filter(t => t.status === 'Completed').length;
  const inProgressCount = tasks.filter(t => t.status === 'In Progress').length;
  const pendingCount = tasks.filter(t => t.status === 'Pending').length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const filteredTasks = tasks.filter(t => {
    if (filterStatus !== 'All' && t.status !== filterStatus) return false;
    if (filterPhase !== 'All' && t.phase_number !== parseInt(filterPhase)) return false;
    return true;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addTask({
      title: newTaskTitle.trim(),
      description: newTaskDesc.trim(),
      phase_number: newTaskPhase,
      estimated_hours: newTaskHours,
      status: 'Pending',
      deadline: newTaskDeadline
    });

    setNewTaskTitle('');
    setNewTaskDesc('');
    setShowAddModal(false);
    showToast('Created new task successfully!', 'success');
  };

  const cycleStatus = (task: Task) => {
    const nextStatus =
      task.status === 'Pending'
        ? 'In Progress'
        : task.status === 'In Progress'
        ? 'Completed'
        : 'Pending';
    updateTaskStatus(task.id, nextStatus);
  };

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
              <CheckSquare className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Sprint Task Tracker</span>
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {completedCount} of {tasks.length} Done ({progressPercent}%)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Tasks &amp; Progress Board
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Organize milestones, cycle task velocity, and monitor sprint deliverables.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* View mode toggle */}
          <div className="p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center">
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">List</span>
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors ${
                viewMode === 'kanban'
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Kanban Board"
            >
              <Kanban className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kanban</span>
            </button>
          </div>

          <Btn
            variant="subtle"
            size="sm"
            icon={<Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
            onClick={() => navigateTo('/roadmap', activeProject?.id)}
          >
            Sync Roadmap
          </Btn>
          <Btn
            variant="accent"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setShowAddModal(true)}
          >
            Add Task
          </Btn>
        </div>
      </motion.div>

      {/* Progress Metric Card */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/90 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Milestone Completion Progress
          </span>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
            {progressPercent}% Complete
          </span>
        </div>

        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-indigo-600 dark:bg-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        </div>

        <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
            <div className="text-slate-500 dark:text-slate-400 font-medium">Completed</div>
            <div className="text-lg sm:text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">{completedCount}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
            <div className="text-slate-500 dark:text-slate-400 font-medium">In Progress</div>
            <div className="text-lg sm:text-xl font-bold text-indigo-600 dark:text-indigo-400 font-mono mt-0.5">{inProgressCount}</div>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
            <div className="text-slate-500 dark:text-slate-400 font-medium">Pending</div>
            <div className="text-lg sm:text-xl font-bold text-amber-600 dark:text-amber-400 font-mono mt-0.5">{pendingCount}</div>
          </div>
        </div>
      </motion.div>

      {/* Filter Bar */}
      <motion.div
        variants={itemVariants}
        className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs"
      >
        <div className="flex items-center gap-1.5 flex-wrap">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-500 dark:text-slate-400 font-medium mr-1">Status:</span>
          {['All', 'Pending', 'In Progress', 'Completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                filterStatus === status
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-500 dark:text-slate-400 font-medium">Phase:</span>
          <select
            value={filterPhase}
            onChange={e => setFilterPhase(e.target.value)}
            className="px-3 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 text-xs focus:outline-none cursor-pointer"
          >
            <option value="All">All 9 Phases</option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(p => (
              <option key={p} value={p.toString()}>
                Phase 0{p}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* View Mode: List View */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {filteredTasks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 text-center bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl text-slate-500 dark:text-slate-400 text-xs"
              >
                No tasks found matching your filter criteria.
              </motion.div>
            ) : (
              filteredTasks.map(task => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/90 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700/60 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    {/* Status Toggle Button */}
                    <button
                      onClick={() => cycleStatus(task)}
                      className="mt-0.5 cursor-pointer text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors shrink-0"
                      title="Click to advance status"
                    >
                      {task.status === 'Completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      ) : task.status === 'In Progress' ? (
                        <Clock3 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 animate-spin" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400 dark:text-slate-600" />
                      )}
                    </button>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`text-sm font-semibold transition-all ${
                            task.status === 'Completed'
                              ? 'line-through text-slate-400 dark:text-slate-500'
                              : 'text-slate-900 dark:text-white'
                          }`}
                        >
                          {task.title}
                        </span>
                        <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-medium rounded-md">
                          Phase 0{task.phase_number}
                        </span>
                      </div>
                      {task.description && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3.5 justify-between sm:justify-end shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {task.estimated_hours}h
                      </span>
                      <span className="flex items-center gap-1 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {task.deadline}
                      </span>
                    </div>

                    <button
                      onClick={() => cycleStatus(task)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                        task.status === 'Completed'
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80'
                          : task.status === 'In Progress'
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/80'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                      }`}
                      title="Cycle task status"
                    >
                      {task.status}
                    </button>

                    <button
                      onClick={() => {
                        deleteTask(task.id);
                        showToast('Task removed', 'info');
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Delete task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      )}

      {/* View Mode: Kanban Board View */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {(['Pending', 'In Progress', 'Completed'] as const).map(columnStatus => {
            const columnTasks = filteredTasks.filter(t => t.status === columnStatus);
            return (
              <div
                key={columnStatus}
                className="bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        columnStatus === 'Completed'
                          ? 'bg-emerald-500'
                          : columnStatus === 'In Progress'
                          ? 'bg-indigo-500'
                          : 'bg-slate-400'
                      }`}
                    />
                    <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                      {columnStatus}
                    </h3>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md shadow-xs">
                    {columnTasks.length}
                  </span>
                </div>

                <div className="space-y-2.5 min-h-[160px]">
                  {columnTasks.map(task => (
                    <motion.div
                      key={task.id}
                      layout
                      whileHover={{ y: -2 }}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2.5 cursor-pointer"
                      onClick={() => cycleStatus(task)}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-semibold text-slate-900 dark:text-white leading-snug">
                          {task.title}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                          P0{task.phase_number}
                        </span>
                      </div>

                      {task.description && (
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-normal">
                          {task.description}
                        </p>
                      )}

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>{task.estimated_hours}h</span>
                        <span>{task.deadline}</span>
                      </div>
                    </motion.div>
                  ))}

                  {columnTasks.length === 0 && (
                    <div className="py-8 text-center text-xs text-slate-400 dark:text-slate-500 italic">
                      No tasks in this stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Task Modal with Framer Motion Animation */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Create Custom Sprint Task
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateTask} className="space-y-4">
                <Field label="Task Title" required>
                  <input
                    type="text"
                    required
                    value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)}
                    placeholder="e.g. Integrate WebSocket telemetry stream"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </Field>

                <Field label="Description">
                  <textarea
                    rows={2}
                    value={newTaskDesc}
                    onChange={e => setNewTaskDesc(e.target.value)}
                    placeholder="Brief acceptance criteria or deliverable notes"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </Field>

                <div className="grid grid-cols-2 gap-3">
                  <Field label="Phase (1-9)">
                    <select
                      value={newTaskPhase}
                      onChange={e => setNewTaskPhase(parseInt(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(p => (
                        <option key={p} value={p}>
                          Phase 0{p}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field label="Est. Hours">
                    <input
                      type="number"
                      min={1}
                      value={newTaskHours}
                      onChange={e => setNewTaskHours(parseInt(e.target.value) || 1)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </Field>
                </div>

                <Field label="Milestone Deadline">
                  <input
                    type="text"
                    value={newTaskDeadline}
                    onChange={e => setNewTaskDeadline(e.target.value)}
                    placeholder="e.g. Sprint 2 / Week 4"
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                  />
                </Field>

                <div className="pt-2 flex justify-end gap-2.5">
                  <Btn variant="subtle" size="sm" type="button" onClick={() => setShowAddModal(false)}>
                    Cancel
                  </Btn>
                  <Btn variant="accent" size="sm" type="submit">
                    Save Task
                  </Btn>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
