import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Card, Btn, Badge, ScoreRing } from '../ui/Primitives';
import { ProjectIdea } from '../../types';
import {
  GitCompare,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Zap,
  Trash2,
  Plus,
  X,
  Trophy,
  Layers,
  Cpu,
  ShieldCheck,
  Award,
  Target,
  BarChart3,
  Flame,
  Check,
  Laptop
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: 'easeOut',
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }
};

export const CompareView: React.FC = () => {
  const {
    ideas,
    compareIdeaIds,
    toggleCompareIdea,
    setActiveProject,
    navigateTo,
    showToast
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const comparedIdeas = ideas.filter(i => compareIdeaIds.includes(i.id));
  const remainingIdeas = ideas.filter(i => !compareIdeaIds.includes(i.id));

  // If fewer than 2 ideas are selected, provide a rich, interactive selector
  if (comparedIdeas.length < 2) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="py-6 space-y-8 max-w-5xl mx-auto font-['Poppins',sans-serif]"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold">
            <GitCompare className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Capstone Multi-Criteria Decision Matrix</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Compare Project Ideas
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Select 2 or 3 capstone candidates to analyze technical feasibility, innovation scores, IEEE compliance, and defense readiness side by side.
          </p>
        </motion.div>

        {/* Selected count banner if 1 selected */}
        {comparedIdeas.length === 1 && (
          <motion.div
            variants={itemVariants}
            className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xs">
                1/3
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {comparedIdeas[0].title}
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Selected. Pick 1 more project below to view the comparison matrix.
                </p>
              </div>
            </div>
            <Btn
              variant="ghost"
              size="sm"
              icon={<Trash2 className="w-3.5 h-3.5" />}
              onClick={() => toggleCompareIdea(comparedIdeas[0].id)}
            >
              Remove
            </Btn>
          </motion.div>
        )}

        {/* Quick-Add Idea Grid */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>Available Project Blueprints in Your Library</span>
            </h3>
            <span className="text-xs text-slate-400">
              Click "+" to compare
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ideas.map(idea => {
              const isSelected = compareIdeaIds.includes(idea.id);
              return (
                <motion.div
                  key={idea.id}
                  whileHover={{ y: -2 }}
                  className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                    isSelected
                      ? 'bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-500 shadow-xs'
                      : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-indigo-300'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge variant={isSelected ? 'accent' : 'primary'} size="sm">
                        {idea.match_score}% Fit
                      </Badge>
                      <Badge variant="neutral" size="sm">
                        {idea.difficulty}
                      </Badge>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug line-clamp-1">
                      {idea.title}
                    </h4>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {idea.description}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {idea.technology_stack.slice(0, 3).map(tech => (
                        <span
                          key={tech}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (compareIdeaIds.length >= 3 && !isSelected) {
                        showToast('You can compare a maximum of 3 projects simultaneously.', 'warning');
                        return;
                      }
                      toggleCompareIdea(idea.id);
                      showToast(
                        isSelected ? `Removed ${idea.title}` : `Added ${idea.title} to comparison`,
                        'info'
                      );
                    }}
                    className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added to Compare</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Select to Compare</span>
                      </>
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // Multi-attribute leadership highlights
  const highestMatch = [...comparedIdeas].sort((a, b) => b.match_score - a.match_score)[0];
  const highestInnovation = [...comparedIdeas].sort((a, b) => b.innovation_score - a.innovation_score)[0];
  const highestFeasibility = [...comparedIdeas].sort((a, b) => b.feasibility_score - a.feasibility_score)[0];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="py-6 space-y-8 max-w-6xl mx-auto font-['Poppins',sans-serif]"
    >
      {/* Header Bar */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1.5">
              <GitCompare className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Multi-Project Decision Matrix</span>
            </span>
            <span className="text-xs text-slate-400">
              {comparedIdeas.length} Active / 3 Max
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
            Side-by-Side Comparison Matrix
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {comparedIdeas.length < 3 && (
            <Btn
              variant="outline"
              size="sm"
              icon={<Plus className="w-3.5 h-3.5" />}
              onClick={() => setIsAddModalOpen(true)}
            >
              Add Project ({3 - comparedIdeas.length} left)
            </Btn>
          )}

          <Btn
            variant="ghost"
            size="sm"
            onClick={() => {
              comparedIdeas.forEach(i => toggleCompareIdea(i.id));
              showToast('Cleared comparison matrix', 'info');
            }}
          >
            Clear Matrix
          </Btn>
        </div>
      </motion.div>

      {/* AI Recommendation & Decision Synthesis Banner */}
      <motion.div
        variants={itemVariants}
        className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/60 shadow-xs relative overflow-hidden space-y-3"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>ProjectForge AI Synthesis &amp; Trade-off Evaluation</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Based on your student profile and timeline,{' '}
          <strong className="text-indigo-600 dark:text-indigo-400 font-semibold">{highestMatch.title}</strong> is
          your highest overall alignment ({highestMatch.match_score}% fit). If targeting academic publication or top-tier viva defense scores,{' '}
          <strong className="text-slate-900 dark:text-white font-semibold">{highestInnovation.title}</strong>{' '}
          leads in novelty ({highestInnovation.innovation_score}/10). Meanwhile,{' '}
          <strong className="text-slate-900 dark:text-white font-semibold">{highestFeasibility.title}</strong> offers
          the lowest architectural execution risk ({highestFeasibility.feasibility_score}/10).
        </p>

        {/* Quick Highlights Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-[11px] font-semibold">
            <Trophy className="w-3.5 h-3.5 text-indigo-600" />
            <span>Top Profile Fit: {highestMatch.title}</span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[11px] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Highest Feasibility: {highestFeasibility.title}</span>
          </span>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-[11px] font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-600" />
            <span>Maximum Innovation: {highestInnovation.title}</span>
          </span>
        </div>
      </motion.div>

      {/* Side-by-Side Comparison Cards */}
      <motion.div
        variants={itemVariants}
        className={`grid grid-cols-1 ${
          comparedIdeas.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'
        } gap-6`}
      >
        {comparedIdeas.map(idea => {
          const isBestMatch = idea.id === highestMatch.id;
          return (
            <motion.div
              key={idea.id}
              whileHover={{ y: -3 }}
              className={`bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border flex flex-col justify-between space-y-6 relative transition-all shadow-xs ${
                isBestMatch
                  ? 'border-indigo-500 dark:border-indigo-500/80 ring-2 ring-indigo-500/10'
                  : 'border-slate-200/80 dark:border-slate-800'
              }`}
            >
              {/* Delete / remove button */}
              <button
                type="button"
                onClick={() => {
                  toggleCompareIdea(idea.id);
                  showToast(`Removed ${idea.title} from matrix`, 'info');
                }}
                className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                title="Remove from comparison"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="space-y-4">
                {/* Header info */}
                <div className="space-y-1.5 pr-8">
                  <div className="flex items-center gap-2">
                    <Badge variant={isBestMatch ? 'accent' : 'primary'} size="sm">
                      {idea.match_score}% Match
                    </Badge>
                    {isBestMatch && (
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                        ★ Recommended
                      </span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {idea.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {idea.description}
                  </p>
                </div>

                {/* Score Rings Grid */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <ScoreRing score={idea.match_score} maxScore={100} label="Match Fit" size={62} color="#4f46e5" />
                  <ScoreRing score={idea.innovation_score} maxScore={10} label="Innovation" size={62} color="#818cf8" />
                  <ScoreRing score={idea.feasibility_score} maxScore={10} label="Feasibility" size={62} color="#10b981" />
                  <ScoreRing score={idea.career_score} maxScore={10} label="Career Value" size={62} color="#f59e0b" />
                </div>

                {/* Metadata attributes */}
                <div className="space-y-2 text-xs divide-y divide-slate-100 dark:divide-slate-800">
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Difficulty Level:</span>
                    <Badge variant={idea.difficulty === 'Advanced' ? 'warning' : 'primary'} size="sm">
                      {idea.difficulty}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Estimated Sprints:</span>
                    <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold">
                      {idea.estimated_duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Real-World Impact:</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                      {idea.impact_score}/10
                    </span>
                  </div>
                </div>

                {/* Core Tech Stack */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                    Core Technology Stack
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {idea.technology_stack.map(t => (
                      <span
                        key={t}
                        className="text-[11px] font-medium px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Architectural Deliverables */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                    Primary Features
                  </span>
                  <ul className="space-y-1.5">
                    {idea.core_features.slice(0, 3).map((f, i) => (
                      <li key={i} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Select Action Button */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <Btn
                  variant={isBestMatch ? 'accent' : 'primary'}
                  size="sm"
                  className="w-full shadow-xs"
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                  onClick={() => {
                    setActiveProject(idea);
                    showToast(`Selected "${idea.title}" as active project!`, 'success');
                    navigateTo('/project', idea.id);
                  }}
                >
                  Select as Active Capstone
                </Btn>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Comprehensive Attribute Matrix Table */}
      <motion.div variants={itemVariants} className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Detailed Engineering Comparison Breakdown</span>
        </h3>

        <div className="overflow-x-auto rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
                <th className="p-4 font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-1/4">
                  Criterion
                </th>
                {comparedIdeas.map(idea => (
                  <th key={idea.id} className="p-4 font-bold text-slate-900 dark:text-white">
                    <div className="font-extrabold text-sm">{idea.title}</div>
                    <div className="text-[11px] font-normal text-indigo-600 dark:text-indigo-400">
                      {idea.difficulty} • {idea.estimated_duration}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-800/30">
                  Problem Statement
                </td>
                {comparedIdeas.map(idea => (
                  <td key={idea.id} className="p-4 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {idea.problem_statement}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-800/30">
                  Target End Users
                </td>
                {comparedIdeas.map(idea => (
                  <td key={idea.id} className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {idea.target_users.map(u => (
                        <span key={u} className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[11px]">
                          {u}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-800/30">
                  Primary Challenge / Risk
                </td>
                {comparedIdeas.map(idea => (
                  <td key={idea.id} className="p-4 text-xs text-rose-600 dark:text-rose-400">
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{idea.potential_challenges[0] || 'Hardware constraints & latency optimization'}</span>
                    </div>
                  </td>
                ))}
              </tr>

              <tr>
                <td className="p-4 font-semibold text-slate-900 dark:text-white bg-slate-50/50 dark:bg-slate-800/30">
                  Why It Fits Your Profile
                </td>
                {comparedIdeas.map(idea => (
                  <td key={idea.id} className="p-4 text-xs text-indigo-700 dark:text-indigo-300">
                    {idea.why_fit}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add More Modal Dialog */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    Add Project to Comparison Matrix
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {remainingIdeas.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">
                  All available projects in your library are already in the matrix!
                </p>
              ) : (
                <div className="space-y-2.5">
                  {remainingIdeas.map(idea => (
                    <div
                      key={idea.id}
                      className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 flex items-center justify-between gap-4 hover:border-indigo-400 transition-colors"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {idea.title}
                          </span>
                          <Badge variant="primary" size="sm">
                            {idea.match_score}% Fit
                          </Badge>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {idea.description}
                        </p>
                      </div>

                      <Btn
                        variant="accent"
                        size="sm"
                        icon={<Plus className="w-3.5 h-3.5" />}
                        onClick={() => {
                          toggleCompareIdea(idea.id);
                          showToast(`Added ${idea.title} to comparison`, 'success');
                          setIsAddModalOpen(false);
                        }}
                      >
                        Add
                      </Btn>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
