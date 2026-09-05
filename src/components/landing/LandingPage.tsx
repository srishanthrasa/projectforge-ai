import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Btn, Badge, ScoreRing, Bar } from '../ui/Primitives';
import {
  Sparkles,
  ArrowRight,
  Lightbulb,
  FileCode2,
  GitBranch,
  BotMessageSquare,
  Activity,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Cpu,
  Layers,
  Code2,
  Terminal,
  Quote,
  ChevronRight,
  Play,
  Flame,
  Check,
  GraduationCap,
  Boxes,
  Database,
  Star,
  Compass
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigateTo, startDemoMode, addToast } = useApp();
  const [selectedDemoIdx, setSelectedDemoIdx] = useState(0);

  const heroDemoProjects = [
    {
      title: 'AI Healthcare Diagnostic & Risk Prediction Platform',
      domain: 'Healthcare AI & Data Science',
      badge: '94% Match',
      timeline: '8-12 weeks',
      team: '3-4 students',
      matchScore: 94,
      innovation: 8.8,
      feasibility: 9.2,
      careerValue: 9.5,
      phase: 'Phase 3: Database & Schema Design',
      phaseProgress: 42,
      techStack: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'XGBoost', 'SHAP'],
      mentorTip: 'FastAPI /api/v1/predict risk endpoint schema matches IEEE standards with full explainability.'
    },
    {
      title: 'Decentralized Supply Chain Provenance Tracker',
      domain: 'Blockchain & Distributed Systems',
      badge: '91% Match',
      timeline: '10-14 weeks',
      team: '3 students',
      matchScore: 91,
      innovation: 9.2,
      feasibility: 8.5,
      careerValue: 9.0,
      phase: 'Phase 4: Smart Contract Core Testing',
      phaseProgress: 55,
      techStack: ['Solidity', 'Hardhat', 'TypeScript', 'Next.js', 'IPFS', 'Ethers.js'],
      mentorTip: 'Gas optimization benchmark added to your unit tests for university evaluation rubrics.'
    },
    {
      title: 'Edge IoT Precision Agriculture Drone Telemetry',
      domain: 'IoT & Embedded Systems',
      badge: '89% Match',
      timeline: '12-16 weeks',
      team: '4 students',
      matchScore: 89,
      innovation: 9.0,
      feasibility: 8.4,
      careerValue: 8.9,
      phase: 'Phase 2: Sensor Calibration & Protocol Setup',
      phaseProgress: 30,
      techStack: ['C++', 'MQTT', 'Python', 'OpenCV', 'Raspberry Pi', 'InfluxDB'],
      mentorTip: 'MQTT broker latency reduced to under 35ms on edge hardware simulations.'
    }
  ];

  const featureCards = [
    {
      icon: Sparkles,
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800/80',
      title: 'AI Project Generator',
      description: 'Generates 5 personalized engineering capstone concepts scored against your skills, time, hardware limits, and team size.'
    },
    {
      icon: Lightbulb,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border-amber-200 dark:border-amber-800/80',
      title: 'Multi-Factor Scoring',
      description: 'Deep suitability analysis evaluating innovation, technical feasibility, job market alignment, and academic rubric compliance.'
    },
    {
      icon: FileCode2,
      color: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950/60 border-cyan-200 dark:border-cyan-800/80',
      title: 'Complete Project Blueprint',
      description: 'Instant generation of Software Requirement Specs (SRS), ER diagrams, API schemas, and security matrices.'
    },
    {
      icon: GitBranch,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800/80',
      title: '9-Phase Step-by-Step Roadmap',
      description: 'Structured sprint timeline from problem formulation to prototype deployment and final thesis defense rehearsal.'
    },
    {
      icon: BotMessageSquare,
      color: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 border-purple-200 dark:border-purple-800/80',
      title: 'Context-Aware AI Mentor',
      description: 'Engineering mentor that knows your exact architecture, active sprint phase, and completed tasks with voice assistance.'
    },
    {
      icon: Activity,
      color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 border-rose-200 dark:border-rose-800/80',
      title: 'Progress & Task Manager',
      description: 'Interactive sprint board that recalculates milestones, tracks hours, and prepares defense review readiness reports.'
    }
  ];

  const howItWorksSteps = [
    {
      num: '01',
      title: 'Profile Your Skills',
      description: 'Select your tech stack, domain interests, experience level, months available, and team size.',
      icon: GraduationCap
    },
    {
      num: '02',
      title: 'AI Evaluates & Scores',
      description: 'Gemini evaluates real-world relevance and generates 5 tailored capstone concepts with score rings.',
      icon: Compass
    },
    {
      num: '03',
      title: 'Compare & Select',
      description: 'Compare candidate projects side-by-side or use the Idea Improver to add novelty factors.',
      icon: Layers
    },
    {
      num: '04',
      title: 'Generate Full Blueprint',
      description: 'Receive full SRS documents, 8-layer system architecture, and 9-phase roadmaps with one click.',
      icon: Boxes
    },
    {
      num: '05',
      title: 'Build With AI Mentor',
      description: 'Execute sprint tasks with an AI copilot guiding schema design, code hurdles, and viva prep.',
      icon: BotMessageSquare
    }
  ];

  const demoTestimonials = [
    {
      quote: 'ProjectForge AI transformed our vague healthcare idea into an explainable ML platform. Our university examiners praised the architectural blueprint and defense readiness.',
      name: 'Priya Sharma',
      role: 'Computer Science Senior • IIT Delhi',
      avatarBg: 'bg-indigo-600'
    },
    {
      quote: 'The 9-phase roadmap kept our 3-person team aligned across every semester sprint. Having an AI mentor that already knew our database schema saved dozens of debugging hours.',
      name: 'Rohan Kulkarni',
      role: 'Information Technology Finalist • SPPU Pune',
      avatarBg: 'bg-cyan-600'
    },
    {
      quote: 'The Idea Improvement tool turned our basic attendance tracker into an edge anti-spoofing vision project that won 1st prize at our university annual tech expo.',
      name: 'Ananya Deshmukh',
      role: 'AI & Data Science Student • BITS Pilani',
      avatarBg: 'bg-purple-600'
    }
  ];

  const currentProject = heroDemoProjects[selectedDemoIdx];

  return (
    <div className="w-full space-y-20 sm:space-y-28 py-6 sm:py-10 font-['Poppins',sans-serif]">
      {/* 1. HERO SECTION */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[300px] sm:h-[400px] bg-indigo-500/10 dark:bg-indigo-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>AI-Powered Capstone &amp; Final-Year Project Mentor</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
          >
            Turn your skills into a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 dark:from-indigo-400 dark:via-cyan-300 dark:to-indigo-300">
              standout final-year project
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-sm sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Generate personalized engineering ideas, industrial-grade blueprints, 9-phase roadmaps, and get 24/7 AI mentor guidance from initial concept to final viva defense.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
          >
            <Btn
              variant="accent"
              size="lg"
              icon={<Sparkles className="w-4 h-4" />}
              onClick={() => navigateTo('/onboarding')}
              className="w-full sm:w-auto shadow-md shadow-indigo-600/20"
            >
              Generate My Project
            </Btn>
            <Btn
              variant="subtle"
              size="lg"
              icon={<Play className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 fill-indigo-600 dark:fill-indigo-400" />}
              onClick={startDemoMode}
              className="w-full sm:w-auto"
            >
              Explore Demo Mode
            </Btn>
          </motion.div>

          {/* Trust stats pill strip */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 pt-2">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              Tailored to Your Stack
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              Full SRS &amp; Architecture
            </span>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              Viva Defense Ready
            </span>
          </div>
        </div>

        {/* Hero Interactive Project Card Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          {/* Sample project selector tabs */}
          <div className="flex items-center justify-center gap-2 mb-3 overflow-x-auto pb-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold mr-1 shrink-0">
              Interactive Preview:
            </span>
            {heroDemoProjects.map((p, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedDemoIdx(idx)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer shrink-0 ${
                  selectedDemoIdx === idx
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/80'
                }`}
              >
                Project #{idx + 1}
              </button>
            ))}
          </div>

          {/* Card Container */}
          <div className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-slate-950/60 transition-colors duration-200 text-left space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedDemoIdx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        {currentProject.badge}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {currentProject.domain} • {currentProject.timeline} • {currentProject.team}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white font-['Poppins']">
                      {currentProject.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Match Fit</div>
                      <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                        {currentProject.matchScore}%
                      </div>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                      <Zap className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Score Rings */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                  <ScoreRing score={currentProject.matchScore} maxScore={100} label="Match Score" color="#4f46e5" />
                  <ScoreRing score={currentProject.innovation} maxScore={10} label="Innovation" color="#06b6d4" />
                  <ScoreRing score={currentProject.feasibility} maxScore={10} label="Feasibility" color="#10b981" />
                  <ScoreRing score={currentProject.careerValue} maxScore={10} label="Career Value" color="#f59e0b" />
                </div>

                {/* Roadmap progress bar */}
                <div className="space-y-1.5">
                  <Bar
                    progress={currentProject.phaseProgress}
                    label={`Development Timeline: ${currentProject.phase}`}
                    subLabel={`${currentProject.phaseProgress}% Sprint Progress`}
                    colorClass="bg-indigo-600 dark:bg-indigo-500"
                  />
                </div>

                {/* Tech badges and mentor quote line */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {currentProject.techStack.map(tech => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium border border-slate-200/70 dark:border-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-indigo-900 dark:text-indigo-200 bg-indigo-50/80 dark:bg-indigo-950/60 px-3 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800/70 max-w-full sm:max-w-md">
                    <BotMessageSquare className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span className="italic truncate">{currentProject.mentorTip}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* 2. STATS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">5</div>
            <div className="text-xs font-semibold text-slate-900 dark:text-white">Custom Concepts</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Per student generation</div>
          </div>
          <div className="space-y-1 text-center sm:text-left border-l border-slate-100 dark:border-slate-800 pl-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-600 dark:text-cyan-400">9</div>
            <div className="text-xs font-semibold text-slate-900 dark:text-white">Development Phases</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">Concept to defense</div>
          </div>
          <div className="space-y-1 text-center sm:text-left border-l border-slate-100 dark:border-slate-800 pl-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">100%</div>
            <div className="text-xs font-semibold text-slate-900 dark:text-white">Rubric Aligned</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">IEEE &amp; ABET standard</div>
          </div>
          <div className="space-y-1 text-center sm:text-left border-l border-slate-100 dark:border-slate-800 pl-4">
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400">24/7</div>
            <div className="text-xs font-semibold text-slate-900 dark:text-white">Context Mentor</div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400">With live voice chat</div>
          </div>
        </div>
      </section>

      {/* 3. FEATURES BENTO GRID */}
      <section id="features-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="primary">Platform Features</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Poppins']">
            Everything you need to ship a winning capstone
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            We don't just generate ideas. We guide you through the entire engineering lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.15 }}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-200 dark:hover:border-indigo-800 transition-all text-left space-y-4"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${feat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-['Poppins']">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. HOW IT WORKS (5-STEP PROCESS) */}
      <section id="how-it-works-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="accent">Process Timeline</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Poppins']">
            How ProjectForge AI Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            5 deliberate steps from zero direction to a fully structured, deployable engineering project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {howItWorksSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -2 }}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-3 text-left relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-extrabold flex items-center justify-center text-xs border border-indigo-200 dark:border-indigo-800">
                    {step.num}
                  </div>
                  <Icon className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-['Poppins']">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 5. WHY PROJECTFORGE AI (Comparison Panel) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="neutral">The Contrast</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Poppins']">
            Why ProjectForge AI?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            “We don't just suggest topics to build. We engineer the entire project with you.”
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Generic tools panel */}
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-100/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="inline-flex items-center gap-1.5 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase tracking-wider">
              <span>Generic Chatbots &amp; Topic Lists</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">
              “Here is an idea: Build a healthcare web app.”
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>Leaves you with zero technical specification, ER diagram, or API contracts.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>Ignores semester deadlines, hardware limits, and actual team skill sets.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>Forgetful generic prompts with no memory of what you already coded.</span>
              </li>
            </ul>
          </div>

          {/* ProjectForge AI panel */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-indigo-50/90 to-white dark:from-indigo-950/50 dark:to-slate-900 border border-indigo-200 dark:border-indigo-800/80 space-y-5 shadow-lg shadow-indigo-600/5">
            <div className="inline-flex items-center gap-1.5 text-indigo-700 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ProjectForge AI Lifecycle Companion</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Idea → Scoring → Blueprint → Architecture → Roadmap → Mentor → Progress
            </h3>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Full Blueprint with database schemas, API routes, and risk mitigation strategies.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>8-layer system architecture diagram tailored to your chosen stack.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Context-aware AI mentor with voice input tracking your active sprint tasks.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. TRANSPARENT PRICING */}
      <section id="pricing-section" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <Badge variant="primary">Simple Tiers</Badge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-['Poppins']">
            Transparent, Student-First Pricing
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm">
            Everything essential is 100% free for engineering students.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Free Tier */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border-2 border-indigo-600 dark:border-indigo-500 shadow-md space-y-6 relative">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Poppins']">
                  Student Edition
                </h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Always Free
                </span>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                $0 <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">/ forever</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Perfect for engineering students and capstone teams.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>5 personalized project concepts with multi-factor scoring</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Full Blueprint with DB schemas and REST API contracts</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>9-Phase development roadmap &amp; sprint task board</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Context-aware AI mentor with voice input &amp; viva prep</span>
              </li>
            </ul>

            <Btn variant="accent" size="md" className="w-full" onClick={() => navigateTo('/onboarding')}>
              Start Building Free
            </Btn>
          </div>

          {/* Pro Research Concept Tier */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6 opacity-90">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-['Poppins']">
                  Pro Researcher
                </h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  Concept Preview
                </span>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
                $9 <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">/ month (Concept)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Future tier for research publications &amp; patent drafting.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Unlimited project generations &amp; deep IEEE paper sync</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Automated LaTeX capstone report generator</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Live multi-user Git pull request code auditor</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Dedicated 1-on-1 human mentor office hours</span>
              </li>
            </ul>

            <Btn variant="subtle" size="md" className="w-full" disabled>
              Coming Soon
            </Btn>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge variant="neutral">Student Testimonials</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-['Poppins']">
            Trusted by Final-Year Students
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Real feedback from student beta cohorts across engineering colleges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {demoTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <Quote className="w-6 h-6 text-indigo-600 dark:text-indigo-400 opacity-60" />
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${t.avatarBg} text-white font-bold text-xs flex items-center justify-center shrink-0`}>
                  {t.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">{t.name}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. BOTTOM CTA BANNER */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white p-8 sm:p-12 text-center space-y-6 shadow-xl shadow-indigo-600/20">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Poppins']">
            Ready to build your final-year project?
          </h2>
          <p className="text-indigo-100 text-sm sm:text-base max-w-xl mx-auto">
            Input your technical skills in 60 seconds and receive 5 custom engineering concepts with complete blueprints today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigateTo('/onboarding')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-indigo-700 font-semibold text-sm hover:bg-indigo-50 transition-colors shadow-sm cursor-pointer"
            >
              Get Started for Free
            </button>
            <button
              onClick={startDemoMode}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-700/80 text-white border border-indigo-400/40 font-semibold text-sm hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              Explore Live Demo
            </button>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="border-t border-slate-200 dark:border-slate-800 pt-12 pb-8 max-w-7xl mx-auto px-4 text-slate-500 dark:text-slate-400 text-xs">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-left">
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold font-['Poppins']">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>ProjectForge AI</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
              AI-Powered Final-Year Project Idea Generator &amp; Mentor. Designed for engineering students worldwide.
            </p>
          </div>

          <div className="space-y-2">
            <div className="text-slate-900 dark:text-white font-semibold uppercase tracking-wider text-[11px]">
              Platform
            </div>
            <div className="space-y-1.5">
              <div>
                <button onClick={() => navigateTo('/generate')} className="hover:text-slate-900 dark:hover:text-white cursor-pointer">
                  Generate Ideas
                </button>
              </div>
              <div>
                <button onClick={() => navigateTo('/evaluate')} className="hover:text-slate-900 dark:hover:text-white cursor-pointer">
                  Project Evaluator
                </button>
              </div>
              <div>
                <button onClick={() => navigateTo('/improve')} className="hover:text-slate-900 dark:hover:text-white cursor-pointer">
                  Improve My Idea
                </button>
              </div>
              <div>
                <button onClick={() => navigateTo('/mentor')} className="hover:text-slate-900 dark:hover:text-white cursor-pointer">
                  AI Mentor
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-slate-900 dark:text-white font-semibold uppercase tracking-wider text-[11px]">
              Resources
            </div>
            <div className="space-y-1.5">
              <div>
                <button onClick={startDemoMode} className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer font-medium">
                  Try Demo Mode
                </button>
              </div>
              <div>
                <button
                  onClick={() => addToast('Documentation & IEEE templates available in Project Blueprint view!', 'info')}
                  className="hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  IEEE Guidelines
                </button>
              </div>
              <div>
                <button
                  onClick={() => addToast('Support: contact@projectforge.ai', 'info')}
                  className="hover:text-slate-900 dark:hover:text-white cursor-pointer"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-slate-900 dark:text-white font-semibold uppercase tracking-wider text-[11px]">
              Academic Policy
            </div>
            <div className="space-y-1.5">
              <div className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Privacy &amp; Data Ethics</div>
              <div className="hover:text-slate-900 dark:hover:text-white cursor-pointer">Originality Verification</div>
              <div className="hover:text-slate-900 dark:hover:text-white cursor-pointer">University Accreditation</div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400 dark:text-slate-500">
          <span>&copy; {new Date().getFullYear()} ProjectForge AI. All rights reserved.</span>
          <span>Google AI Studio • Built with Gemini 2.5 Flash</span>
        </div>
      </footer>
    </div>
  );
};
