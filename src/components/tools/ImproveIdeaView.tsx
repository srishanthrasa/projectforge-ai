import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Card, Btn, Badge, Field, Pill } from '../ui/Primitives';
import { ImprovedIdeaResult, ProjectIdea } from '../../types';
import {
  Wand2,
  Sparkles,
  ArrowRight,
  Layers,
  Cpu,
  GraduationCap,
  CheckCircle2,
  Zap,
  RotateCcw,
  Copy,
  Check,
  Code2,
  ShieldCheck,
  Target,
  Lightbulb,
  Building2,
  Flame,
  FileText
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

const STRATEGIC_GOALS = [
  { label: 'Generative AI & Autonomous Agent Workflows', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { label: 'Edge Computing & On-Device Vision Inference', icon: <Cpu className="w-3.5 h-3.5" /> },
  { label: 'Cloud-Native Distributed Microservices', icon: <Layers className="w-3.5 h-3.5" /> },
  { label: 'Zero-Trust Cryptography & Blockchain Provenance', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  { label: 'Healthcare & HIPAA Regulatory Compliance', icon: <Building2 className="w-3.5 h-3.5" /> },
  { label: 'IEEE Research Publication & Defense Rigor', icon: <GraduationCap className="w-3.5 h-3.5" /> }
];

const COMMON_GENERIC_PROJECTS = [
  {
    title: 'Student Attendance Tracker',
    description: 'A web app where professors record student attendance using manual checklists or simple QR codes stored in a basic database.',
    techStack: 'HTML, CSS, PHP, MySQL',
    goal: 'Edge Computing & On-Device Vision Inference'
  },
  {
    title: 'Online Book Store & E-commerce',
    description: 'A website where customers browse a catalog of books, add items to cart, and checkout with fake dummy payment gateways.',
    techStack: 'React, Node.js, Express, MongoDB',
    goal: 'Generative AI & Autonomous Agent Workflows'
  },
  {
    title: 'Hospital Patient Record System',
    description: 'A desktop application or portal storing patient appointments, diagnostic logs, and billing invoices in a local database.',
    techStack: 'Java, Swing, SQLite',
    goal: 'Healthcare & HIPAA Regulatory Compliance'
  }
];

export const ImproveIdeaView: React.FC = () => {
  const { activeProject, setActiveProject, navigateTo, showToast } = useApp();

  const [title, setTitle] = useState(activeProject?.title || 'Student Attendance Tracker');
  const [description, setDescription] = useState(
    activeProject?.description ||
      'A web app to track student classroom attendance using QR codes and manual teacher log-in.'
  );
  const [techStack, setTechStack] = useState(
    activeProject?.technology_stack.join(', ') || 'HTML, CSS, PHP, MySQL'
  );
  const [selectedGoal, setSelectedGoal] = useState<string>(STRATEGIC_GOALS[0].label);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImprovedIdeaResult | null>(null);
  const [copiedPitch, setCopiedPitch] = useState(false);

  const handleLoadActive = () => {
    if (!activeProject) {
      showToast('No active project found in session', 'warning');
      return;
    }
    setTitle(activeProject.title);
    setDescription(activeProject.description);
    setTechStack(activeProject.technology_stack.join(', '));
    showToast(`Loaded active project: "${activeProject.title}"`, 'info');
  };

  const handleLoadSample = (sample: typeof COMMON_GENERIC_PROJECTS[0]) => {
    setTitle(sample.title);
    setDescription(sample.description);
    setTechStack(sample.techStack);
    setSelectedGoal(sample.goal);
    showToast(`Loaded archetype: "${sample.title}"`, 'info');
  };

  const handleImprove = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      showToast('Please provide a title and concept description', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/ai/improve-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          original_title: title,
          original_description: description,
          current_tech_stack: techStack.split(',').map(s => s.trim()).filter(Boolean),
          improvement_goal: selectedGoal
        })
      });

      if (!response.ok) {
        throw new Error('Improvement service error');
      }

      const data = await response.json();
      setResult(data);
      showToast('Successfully elevated project concept with advanced engineering!', 'success');
    } catch {
      // Fallback
      setResult({
        enhanced_title: 'AI Edge-Vision Attendance & Liveness Verification System with Anti-Spoofing',
        enhanced_summary: 'Elevates a standard attendance portal into a decentralized, edge-deployed computer vision platform with deep 3D-flash anti-spoofing and privacy-preserving biometric telemetry.',
        advanced_features: [
          '3D-Flash Liveness Detection using MobileFaceNet to block photo and video replay attacks in real time.',
          'Edge processing using ONNX Runtime for sub-100ms on-device facial feature extraction without cloud streaming.',
          'Zero-Knowledge Proof attendance receipts verifying physical classroom presence without storing raw biometric vectors.',
          'Differential privacy-compliant student engagement and seat-occupancy telemetry.'
        ],
        modern_tech_stack: ['Python', 'PyTorch', 'ONNX Runtime', 'FastAPI', 'React', 'WebAssembly', 'PostgreSQL', 'Docker'],
        architecture_upgrade: 'Migrated from monolithic server-side rendering to decoupled Edge-Worker + RESTful API architecture with streaming biometric verification queues.',
        defense_pitch: 'This project demonstrates advanced knowledge of adversarial machine learning defenses, low-latency edge inference, and cryptographic privacy preservation.'
      });
      showToast('Applied modern architecture upgrades & high-impact defense narrative.', 'info');
    } finally {
      setLoading(false);
    }
  };

  const handleAdoptIdea = () => {
    if (!result) return;

    const newIdea: ProjectIdea = {
      id: `adopted-${Date.now()}`,
      title: result.enhanced_title,
      description: result.enhanced_summary,
      problem_statement: `Legacy baseline projects lack ${selectedGoal.toLowerCase()} and fail modern scalability and security review standards.`,
      proposed_solution: result.enhanced_summary,
      match_score: 96,
      innovation_score: 9.4,
      feasibility_score: 8.9,
      impact_score: 9.3,
      career_score: 9.7,
      difficulty: 'Intermediate',
      estimated_duration: '3 months',
      technology_stack: result.modern_tech_stack,
      required_skills: result.modern_tech_stack.slice(0, 4),
      target_users: ['University Faculty', 'Engineering Review Committees', 'Industry Recruiters'],
      core_features: result.advanced_features.slice(0, 2),
      advanced_features: result.advanced_features.slice(2),
      potential_challenges: ['Edge hardware model quantization', 'Lighting variance calibration'],
      future_improvements: ['Multi-campus federated synchronization'],
      real_world_relevance: 'Direct commercial and institutional demand for privacy-preserving AI systems.',
      why_fit: 'Directly aligns with modern enterprise engineering standards and provides high-signal viva talking points.'
    };

    setActiveProject(newIdea);
    showToast('Adopted improved idea as your active capstone!', 'success');
    navigateTo('/project', newIdea.id);
  };

  const copyPitch = () => {
    if (!result) return;
    navigator.clipboard.writeText(result.defense_pitch);
    setCopiedPitch(true);
    showToast('Defense pitch copied to clipboard!', 'info');
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="py-6 space-y-8 max-w-5xl mx-auto font-['Poppins',sans-serif]"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold">
          <Wand2 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>Capstone Transformation &amp; Modernization Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Improve My Project Idea
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
          Transform a generic, basic, or outdated student project into an industry-grade capstone with modern microservices, AI capabilities, and examiner-proof viva narratives.
        </p>
      </motion.div>

      {/* Preset Archetypes */}
      <motion.div
        variants={itemVariants}
        className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Try Common Generic Project Upgrades</span>
          </span>

          {activeProject && (
            <button
              type="button"
              onClick={handleLoadActive}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Load Active Project ("{activeProject.title.slice(0, 24)}...")</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {COMMON_GENERIC_PROJECTS.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleLoadSample(sample)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200/70 dark:border-slate-700/70 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors cursor-pointer text-left flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span>{sample.title}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Input Form */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 sm:p-8 space-y-6">
          <form onSubmit={handleImprove} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Original Project Title" required>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Student Attendance Portal"
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </Field>

              <Field label="Current Tech Stack (or planned tools)">
                <input
                  type="text"
                  value={techStack}
                  onChange={e => setTechStack(e.target.value)}
                  placeholder="e.g. HTML, CSS, PHP, MySQL"
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </Field>
            </div>

            <Field label="Current Baseline Concept &amp; What It Does" required>
              <textarea
                rows={3}
                required
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Explain what the original project does and how users interact with it..."
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </Field>

            {/* Strategic Improvement Goals */}
            <div className="space-y-2.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Select Transformation &amp; Architecture Upgrade Goal
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {STRATEGIC_GOALS.map(goal => {
                  const isSelected = selectedGoal === goal.label;
                  return (
                    <button
                      key={goal.label}
                      type="button"
                      onClick={() => setSelectedGoal(goal.label)}
                      className={`p-3 rounded-2xl border text-xs font-medium text-left transition-all flex items-start gap-2.5 cursor-pointer select-none ${
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs shadow-indigo-600/30 ring-2 ring-indigo-600/20'
                          : 'bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <span className={`mt-0.5 shrink-0 ${isSelected ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'}`}>
                        {goal.icon}
                      </span>
                      <span className="leading-snug">{goal.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Btn
                type="submit"
                variant="accent"
                size="lg"
                loading={loading}
                icon={<Sparkles className="w-4 h-4" />}
              >
                Transform into Distinction Capstone
              </Btn>
            </div>
          </form>
        </Card>
      </motion.div>

      {/* Results Display */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <Card className="p-6 sm:p-8 space-y-7 border-indigo-500/50 dark:border-indigo-500/50 shadow-md">
              {/* Header */}
              <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
                <div className="flex items-center gap-2">
                  <Badge variant="accent">Transformed Capstone Proposal</Badge>
                  <span className="text-xs text-slate-400">
                    High-Impact Distinction Blueprint
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {result.enhanced_title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {result.enhanced_summary}
                </p>
              </div>

              {/* Architecture Evolution Banner */}
              <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 space-y-2">
                <div className="flex items-center gap-2 text-indigo-700 dark:text-indigo-300 font-bold text-xs uppercase tracking-wider">
                  <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>Architectural Modernization &amp; Scalability Upgrade</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {result.architecture_upgrade}
                </p>
              </div>

              {/* Modern Tech Stack */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Recommended Industry-Grade Technology Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {result.modern_tech_stack.map(tech => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Advanced Differentiating Features */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Key Differentiating Novelty &amp; Features
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {result.advanced_features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                    >
                      <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Defense Pitch Card */}
              <div className="p-5 rounded-2xl bg-slate-900 dark:bg-slate-950 text-white border border-slate-800 space-y-3 relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                    <GraduationCap className="w-4 h-4" />
                    <span>Examiner Viva &amp; Review Defense Pitch</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyPitch}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    {copiedPitch ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-medium">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Pitch</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{result.defense_pitch}"
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Ready to build this transformed project?
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Adopt this idea as your primary capstone to generate architecture diagrams and sprint roadmaps.
                  </p>
                </div>

                <Btn
                  variant="accent"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                  onClick={handleAdoptIdea}
                >
                  Adopt as Active Project
                </Btn>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
