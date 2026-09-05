import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Card, Btn, Badge, Bar, ScoreRing } from '../ui/Primitives';
import {
  Sparkles,
  FileText,
  Workflow,
  ArrowRight,
  BotMessageSquare,
  Wand2,
  Share2,
  Clock,
  Users,
  Target,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Zap,
  Bookmark,
  Calendar,
  Layers,
  ChevronRight,
  BarChart3,
  Award,
  BookOpen
} from 'lucide-react';
import { ShareModal } from './ShareModal';

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

export const ProjectDetailView: React.FC = () => {
  const {
    activeProject,
    navigateTo,
    savedIdeaIds,
    toggleSaveIdea,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'Overview' | 'Features' | 'Technology' | 'Impact' | 'Challenges' | 'Improvements'
  >('Overview');
  const [shareModalOpen, setShareModalOpen] = useState(false);

  if (!activeProject) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-16 text-center space-y-4 font-['Poppins',sans-serif]"
      >
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center mx-auto text-indigo-600 dark:text-indigo-400">
          <BookOpen className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">No Active Project Selected</h2>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
          Please select or generate a project concept to view its full engineering specifications.
        </p>
        <Btn variant="accent" onClick={() => navigateTo('/generate')}>
          Generate Project Ideas
        </Btn>
      </motion.div>
    );
  }

  const isSaved = savedIdeaIds.includes(activeProject.id);

  const tabs: Array<'Overview' | 'Features' | 'Technology' | 'Impact' | 'Challenges' | 'Improvements'> = [
    'Overview',
    'Features',
    'Technology',
    'Impact',
    'Challenges',
    'Improvements'
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="py-4 space-y-6 font-['Poppins',sans-serif]"
    >
      {/* Top Header Card */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-xs"
      >
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-semibold border border-indigo-100 dark:border-indigo-800/80 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>{activeProject.match_score}% Match Confidence</span>
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                activeProject.difficulty === 'Advanced'
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60'
                  : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/60'
              }`}>
                {activeProject.difficulty}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
                <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                {activeProject.estimated_duration}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                3 Engineers
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              {activeProject.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              {activeProject.description}
            </p>
          </div>

          {/* Quick Score Ring & Metrics */}
          <div className="flex items-center gap-4 shrink-0 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/70 dark:border-slate-700/60">
            <ScoreRing
              score={activeProject.match_score}
              maxScore={100}
              label="Confidence"
              size={76}
              color="#4f46e5"
            />
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between gap-4 text-slate-500 dark:text-slate-400 font-medium">
                <span>Innovation:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">{activeProject.innovation_score}/10</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-slate-500 dark:text-slate-400 font-medium">
                <span>Feasibility:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{activeProject.feasibility_score}/10</span>
              </div>
              <div className="flex items-center justify-between gap-4 text-slate-500 dark:text-slate-400 font-medium">
                <span>Career:</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">{activeProject.career_score}/10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Btn
              variant="primary"
              size="sm"
              icon={<FileText className="w-3.5 h-3.5" />}
              onClick={() => navigateTo('/blueprint', activeProject.id)}
            >
              System Blueprint
            </Btn>
            <Btn
              variant="subtle"
              size="sm"
              icon={<Workflow className="w-3.5 h-3.5" />}
              onClick={() => navigateTo('/architecture', activeProject.id)}
            >
              8-Tier Architecture
            </Btn>
            <Btn
              variant="subtle"
              size="sm"
              icon={<Calendar className="w-3.5 h-3.5" />}
              onClick={() => navigateTo('/roadmap', activeProject.id)}
            >
              Sprint Roadmap
            </Btn>
            <Btn
              variant="accent"
              size="sm"
              icon={<BotMessageSquare className="w-3.5 h-3.5" />}
              onClick={() => navigateTo('/mentor', activeProject.id)}
            >
              AI Mentor
            </Btn>
          </div>

          <div className="flex items-center gap-2">
            <Btn
              variant="ghost"
              size="sm"
              icon={<Wand2 className="w-3.5 h-3.5" />}
              onClick={() => navigateTo('/improve')}
            >
              Upgrade
            </Btn>
            <Btn
              variant="ghost"
              size="sm"
              icon={<Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-indigo-600 text-indigo-600 dark:fill-indigo-400 dark:text-indigo-400' : ''}`} />}
              onClick={() => {
                toggleSaveIdea(activeProject.id);
                showToast(isSaved ? 'Removed from saved ideas' : 'Saved to your portfolio!', 'success');
              }}
            >
              {isSaved ? 'Saved' : 'Save'}
            </Btn>
            <Btn
              variant="ghost"
              size="sm"
              icon={<Share2 className="w-3.5 h-3.5" />}
              onClick={() => setShareModalOpen(true)}
            >
              Share
            </Btn>
          </div>
        </div>
      </motion.div>

      {/* Modern Tabs Navigation with Animated Sliding Indicator */}
      <motion.div variants={itemVariants} className="flex items-center gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 overflow-x-auto">
        {tabs.map(tab => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-4 py-2 text-xs font-semibold rounded-xl transition-colors whitespace-nowrap cursor-pointer z-10 ${
                isActive
                  ? 'text-indigo-700 dark:text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeDetailTab"
                  className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-xs border border-slate-200/60 dark:border-slate-700 z-[-1]"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              {tab}
            </button>
          );
        })}
      </motion.div>

      {/* Tab Content Panes with Motion Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* Tab 1: Overview */}
          {activeTab === 'Overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider">
                    <Target className="w-4 h-4" />
                    <span>Problem Statement</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Underlying Engineering Challenge
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {activeProject.problem_statement}
                  </p>
                </Card>

                <Card className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                    <Zap className="w-4 h-4" />
                    <span>Proposed Solution</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    System Architecture &amp; Methodology
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    {activeProject.proposed_solution}
                  </p>
                </Card>

                <Card className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider">
                    <Users className="w-4 h-4" />
                    <span>Target User Personas</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeProject.target_users.map((user, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2.5 font-medium"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span>{user}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Right Column: Score Breakdown and Fit Card */}
              <div className="space-y-6">
                <Card className="p-6 space-y-5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      Academic Rubric Evaluation
                    </h3>
                    <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80 px-2 py-0.5 rounded-md">
                      Weighted
                    </span>
                  </div>
                  <div className="space-y-4">
                    <Bar progress={activeProject.match_score} label="Overall Match" subLabel={`${activeProject.match_score}%`} />
                    <Bar progress={activeProject.innovation_score * 10} label="Innovation" subLabel={`${activeProject.innovation_score}/10`} colorClass="bg-indigo-600 dark:bg-indigo-500" />
                    <Bar progress={activeProject.feasibility_score * 10} label="Technical Feasibility" subLabel={`${activeProject.feasibility_score}/10`} colorClass="bg-emerald-600 dark:bg-emerald-500" />
                    <Bar progress={activeProject.impact_score * 10} label="Societal Impact" subLabel={`${activeProject.impact_score}/10`} colorClass="bg-cyan-600 dark:bg-cyan-500" />
                    <Bar progress={activeProject.career_score * 10} label="Career Value" subLabel={`${activeProject.career_score}/10`} colorClass="bg-amber-600 dark:bg-amber-500" />
                  </div>
                </Card>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/60 dark:from-indigo-950/60 dark:to-slate-900 border border-indigo-200/80 dark:border-indigo-800/80 space-y-2.5">
                  <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Why This Fits You</span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                    {activeProject.why_fit}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Features */}
          {activeTab === 'Features' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Core System Features (MVP)</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Mandatory deliverables for milestone defense</p>
                  </div>
                  <Badge variant="primary">Required</Badge>
                </div>
                <ul className="space-y-3">
                  {activeProject.core_features.map((feat, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>

              <Card className="p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Advanced Innovations</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Distinction-grade research extensions</p>
                  </div>
                  <Badge variant="accent">Distinction Grade</Badge>
                </div>
                <ul className="space-y-3">
                  {activeProject.advanced_features.map((feat, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </div>
          )}

          {/* Tab 3: Technology */}
          {activeTab === 'Technology' && (
            <Card className="p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Recommended Technology Stack</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Calibrated to eliminate boilerplates and respect university compute &amp; budget boundaries.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-2">
                {activeProject.technology_stack.map((tech, idx) => (
                  <motion.div
                    key={tech}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.04 }}
                    className="px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2.5 shadow-xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                    <span>{tech}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Required Skills: <span className="text-slate-800 dark:text-slate-200 font-medium">{activeProject.required_skills.join(', ')}</span>
                </div>
                <Btn
                  variant="primary"
                  size="sm"
                  icon={<Workflow className="w-3.5 h-3.5" />}
                  onClick={() => navigateTo('/architecture', activeProject.id)}
                >
                  View 8-Tier Architecture
                </Btn>
              </div>
            </Card>
          )}

          {/* Tab 4: Impact */}
          {activeTab === 'Impact' && (
            <Card className="p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Real-World Societal &amp; Industry Relevance</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Broader Impact &amp; Practical Value
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {activeProject.real_world_relevance}
              </p>
            </Card>
          )}

          {/* Tab 5: Challenges */}
          {activeTab === 'Challenges' && (
            <Card className="p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                <span>Potential Implementation Blockers &amp; Mitigations</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Anticipated Technical Hurdles
              </h3>
              <div className="space-y-3">
                {activeProject.potential_challenges.map((ch, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed font-medium">{ch}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Tab 6: Improvements */}
          {activeTab === 'Improvements' && (
            <Card className="p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold text-xs uppercase tracking-wider">
                <Lightbulb className="w-4 h-4" />
                <span>Future Scope &amp; Research Extensions</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Post-Defense Production Enhancements
              </h3>
              <div className="space-y-3">
                {activeProject.future_improvements.map((imp, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-start gap-3"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed font-medium">{imp}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Share Modal Dialog */}
      {shareModalOpen && (
        <ShareModal
          project={activeProject}
          onClose={() => setShareModalOpen(false)}
        />
      )}
    </motion.div>
  );
};
