import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Card, Btn, Field, Pill, Bar } from '../ui/Primitives';
import { StudentProfile, DifficultyLevel } from '../../types';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Plus,
  Zap,
  Users,
  Clock,
  Laptop,
  DollarSign,
  User,
  GraduationCap,
  Building2,
  BookOpen,
  Code2,
  Compass,
  Briefcase,
  Target,
  Award,
  Layers,
  Cpu,
  Database,
  Globe,
  Activity,
  ShieldCheck,
  Flame,
  Check,
  X,
  Search,
  SlidersHorizontal,
  ChevronRight,
  School,
  Calendar
} from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    name: 'All Skills',
    skills: [
      'Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'React', 'Next.js',
      'Node.js', 'FastAPI', 'Django', 'SQL', 'PostgreSQL', 'MongoDB',
      'Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'NLP', 'Computer Vision',
      'Docker', 'Kubernetes', 'AWS', 'Google Cloud', 'Git', 'Tailwind CSS', 'GraphQL',
      'Cybersecurity', 'IoT', 'Blockchain', 'Solidity', 'UI/UX'
    ]
  },
  {
    name: 'Languages & Core',
    skills: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'C', 'Go', 'Rust', 'SQL']
  },
  {
    name: 'Web & Full-Stack',
    skills: ['React', 'Next.js', 'Node.js', 'FastAPI', 'Django', 'Tailwind CSS', 'GraphQL', 'PostgreSQL', 'MongoDB']
  },
  {
    name: 'AI & Data Science',
    skills: ['Machine Learning', 'Deep Learning', 'PyTorch', 'TensorFlow', 'NLP', 'Computer Vision', 'Data Science', 'Pandas']
  },
  {
    name: 'Cloud, DevOps & Systems',
    skills: ['Docker', 'Kubernetes', 'AWS', 'Google Cloud', 'Git', 'Linux', 'IoT', 'Cybersecurity', 'Blockchain']
  }
];

const DOMAINS_DATA = [
  {
    id: 'AI/ML',
    label: 'Artificial Intelligence & ML',
    icon: Sparkles,
    desc: 'Deep learning, LLMs, computer vision & predictive neural architectures.',
    color: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/30 text-indigo-400'
  },
  {
    id: 'Healthcare',
    label: 'Healthcare & Biomedical AI',
    icon: Activity,
    desc: 'Diagnostic imaging, patient vitals monitoring & clinical decision support.',
    color: 'from-rose-500/20 to-rose-600/10 border-rose-500/30 text-rose-400'
  },
  {
    id: 'Web Development',
    label: 'Full-Stack Web & SaaS',
    icon: Globe,
    desc: 'High-throughput microservices, real-time sync & modern reactive SPAs.',
    color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400'
  },
  {
    id: 'FinTech',
    label: 'FinTech & Quantitative Analysis',
    icon: DollarSign,
    desc: 'Algorithmic trading, automated fraud detection & decentralized ledger systems.',
    color: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400'
  },
  {
    id: 'Cybersecurity',
    label: 'Cybersecurity & Defense',
    icon: ShieldCheck,
    desc: 'Zero-trust networks, intrusion anomaly detection & cryptographic protocols.',
    color: 'from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400'
  },
  {
    id: 'IoT',
    label: 'IoT & Edge Computing',
    icon: Cpu,
    desc: 'Embedded sensor networks, MQTT telemetry pipelines & microcontrollers.',
    color: 'from-violet-500/20 to-violet-600/10 border-violet-500/30 text-violet-400'
  },
  {
    id: 'EdTech',
    label: 'EdTech & Smart Learning',
    icon: BookOpen,
    desc: 'Adaptive learning tutors, knowledge graphs & automated code assessment.',
    color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400'
  },
  {
    id: 'Social Impact',
    label: 'Social Impact & Environment',
    icon: Compass,
    desc: 'Carbon tracking, renewable energy optimization & civic transparency.',
    color: 'from-teal-500/20 to-teal-600/10 border-teal-500/30 text-teal-400'
  }
];

const CAREER_GOALS_DATA = [
  { role: 'AI/ML Engineer', icon: Sparkles, focus: 'PyTorch, Model Deployment, Fast Inference' },
  { role: 'Software Developer', icon: Code2, focus: 'Data Structures, APIs, System Design' },
  { role: 'Full Stack Developer', icon: Globe, focus: 'React, Node.js/FastAPI, Distributed DBs' },
  { role: 'Data Scientist', icon: Database, focus: 'Statistical Modeling, SHAP, Feature Pipelines' },
  { role: 'Cybersecurity Specialist', icon: ShieldCheck, focus: 'Auth Protocols, Vulnerability Analysis' },
  { role: 'Cloud Engineer', icon: Layers, focus: 'Kubernetes, CI/CD Pipelines, Infrastructure as Code' },
  { role: 'Research Scientist', icon: GraduationCap, focus: 'Novel Algorithms, IEEE/ACM Publications' },
  { role: 'Tech Entrepreneur', icon: Target, focus: 'MVP Delivery, Scalable SaaS, Product-Market Fit' }
];

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year (Final Year)', 'Master / Postgraduate'];

const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 30 : -30,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1]
    }
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -30 : 30,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

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

export const OnboardingWizard: React.FC = () => {
  const { profile, updateProfile, navigateTo, showToast } = useApp();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [customSkill, setCustomSkill] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Skills');
  const [skillSearch, setSkillSearch] = useState('');

  // Form state initialized with current profile
  const [formData, setFormData] = useState<StudentProfile>(() => ({
    ...profile,
    name: profile.name || 'Alex Rivera',
    college: profile.college || 'National Institute of Technology',
    degree: profile.degree || 'Bachelor of Technology (B.Tech)',
    branch: profile.branch || 'Computer Science & Engineering',
    year: profile.year || '4th Year (Final Year)',
    skills: profile.skills.length > 0 ? profile.skills : ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Machine Learning'],
    interests: profile.interests.length > 0 ? profile.interests : ['AI/ML', 'Healthcare', 'Web Development'],
    experience_level: profile.experience_level || 'Intermediate',
    team_size: profile.team_size || 3,
    available_time: profile.available_time || '3 months',
    hardware: profile.hardware || 'Laptop with Dedicated GPU (NVIDIA RTX)',
    budget: profile.budget || 'Under $50',
    career_goal: profile.career_goal || 'AI/ML Engineer'
  }));

  const totalSteps = 6;
  const progressPercent = Math.round((step / totalSteps) * 100);

  const goToStep = (nextStep: number) => {
    if (nextStep === step) return;
    setDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
  };

  const handleNext = () => {
    if (step === 1 && (!formData.name.trim() || !formData.college.trim())) {
      showToast('Please provide your name and college to calibrate rubrics', 'warning');
      return;
    }
    if (step === 2 && formData.skills.length === 0) {
      showToast('Please select at least 1 technical skill', 'warning');
      return;
    }
    if (step === 3 && formData.interests.length === 0) {
      showToast('Please pick at least 1 domain of interest', 'warning');
      return;
    }
    goToStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      goToStep(step - 1);
    }
  };

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const addCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customSkill.trim()) return;
    const skillClean = customSkill.trim();
    if (!formData.skills.includes(skillClean)) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, skillClean]
      }));
      showToast(`Added ${skillClean} to your skill set`, 'success');
    }
    setCustomSkill('');
  };

  const toggleInterest = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(i => i !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const applyQuickPreset = (presetName: 'AI Specialist' | 'Full Stack Web' | 'IoT & Cloud') => {
    if (presetName === 'AI Specialist') {
      setFormData(prev => ({
        ...prev,
        skills: ['Python', 'FastAPI', 'PyTorch', 'Machine Learning', 'PostgreSQL', 'Docker', 'NLP'],
        interests: ['AI/ML', 'Healthcare', 'FinTech'],
        career_goal: 'AI/ML Engineer',
        experience_level: 'Intermediate'
      }));
      showToast('Applied AI & ML Specialist Profile', 'success');
    } else if (presetName === 'Full Stack Web') {
      setFormData(prev => ({
        ...prev,
        skills: ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
        interests: ['Web Development', 'FinTech', 'EdTech'],
        career_goal: 'Full Stack Developer',
        experience_level: 'Intermediate'
      }));
      showToast('Applied Full-Stack Developer Profile', 'success');
    } else {
      setFormData(prev => ({
        ...prev,
        skills: ['C++', 'Python', 'IoT', 'MQTT', 'Docker', 'AWS', 'Linux'],
        interests: ['IoT', 'Cybersecurity', 'Social Impact'],
        career_goal: 'Cloud Engineer',
        experience_level: 'Advanced'
      }));
      showToast('Applied IoT & Systems Profile', 'success');
    }
  };

  const handleFinish = () => {
    updateProfile(formData);
    showToast('Student engineering profile saved!', 'success');
    navigateTo('/generate');
  };

  // Filter skills based on category and search
  const currentCategoryObj = SKILL_CATEGORIES.find(c => c.name === activeCategory) || SKILL_CATEGORIES[0];
  const filteredSkills = currentCategoryObj.skills.filter(s =>
    s.toLowerCase().includes(skillSearch.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 font-['Poppins',sans-serif] space-y-6">
      {/* Top Banner / Welcome Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800"
      >
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Get Started • Capstone Calibration</span>
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Step {step} of {totalSteps}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {step === 1 && 'Academic Profile & Identity'}
            {step === 2 && 'Technical Skills Matrix'}
            {step === 3 && 'Target Research Domains'}
            {step === 4 && 'Engineering Depth & Experience'}
            {step === 5 && 'Capstone Constraints & Hardware'}
            {step === 6 && 'Career Goal & Profile Synthesis'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {step === 1 && 'Calibrate university grading rubrics, ABET/IEEE requirements, and team metadata.'}
            {step === 2 && 'Select languages and frameworks so generated projects align with your existing stack.'}
            {step === 3 && 'Pick 2-3 application domains to ground project ideas in impactful real-world scenarios.'}
            {step === 4 && 'Adjust algorithmic complexity and architectural tiers to match your comfort zone.'}
            {step === 5 && 'Define semester deadlines, team capacity, and development machine specs.'}
            {step === 6 && 'Align your project with target interview roles to maximize resume value.'}
          </p>
        </div>

        {/* Quick Recommended Presets */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => applyQuickPreset('AI Specialist')}
            className="text-[11px] font-semibold px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 transition-colors cursor-pointer flex items-center gap-1"
            title="Pre-fill with AI/ML Stack"
          >
            <Zap className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
            <span>AI Preset</span>
          </button>
          <button
            type="button"
            onClick={() => applyQuickPreset('Full Stack Web')}
            className="text-[11px] font-semibold px-3 py-1.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 hover:bg-cyan-100 dark:hover:bg-cyan-900/80 text-cyan-700 dark:text-cyan-300 border border-cyan-200/80 dark:border-cyan-800/80 transition-colors cursor-pointer flex items-center gap-1"
            title="Pre-fill with Full-Stack Web Stack"
          >
            <Globe className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
            <span>Web Preset</span>
          </button>
        </div>
      </motion.div>

      {/* Stepper Timeline Navigation */}
      <div className="space-y-2">
        <div className="grid grid-cols-6 gap-2">
          {[
            { num: 1, label: 'Profile', icon: User },
            { num: 2, label: 'Skills', icon: Code2 },
            { num: 3, label: 'Domains', icon: Compass },
            { num: 4, label: 'Depth', icon: Cpu },
            { num: 5, label: 'Limits', icon: SlidersHorizontal },
            { num: 6, label: 'Career', icon: Briefcase }
          ].map(s => {
            const isCurrent = s.num === step;
            const isCompleted = s.num < step;
            const Icon = s.icon;

            return (
              <button
                key={s.num}
                type="button"
                onClick={() => goToStep(s.num)}
                className={`py-2 px-2 rounded-xl text-center border transition-all cursor-pointer select-none flex flex-col sm:flex-row items-center justify-center gap-1.5 ${
                  isCurrent
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs shadow-indigo-600/30 font-semibold'
                    : isCompleted
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 hover:border-emerald-400 font-medium'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200/70 dark:border-slate-700/60 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <div className="flex items-center justify-center">
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Icon className="w-3.5 h-3.5" />
                  )}
                </div>
                <span className="text-[11px] truncate hidden sm:inline">{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-indigo-600 dark:bg-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Main Interactive Step Container with Framer Motion Transition */}
      <Card className="p-6 sm:p-8 space-y-6 relative overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="space-y-6"
          >
            {/* STEP 1: Academic Profile */}
            {step === 1 && (
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Full Name</span>
                      <span className="text-indigo-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Rivera"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-['Poppins']"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <School className="w-3.5 h-3.5 text-indigo-500" />
                      <span>College / University</span>
                      <span className="text-indigo-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.college}
                      onChange={e => setFormData({ ...formData, college: e.target.value })}
                      placeholder="e.g. National Institute of Technology"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-['Poppins']"
                    />
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Degree Program</span>
                    </label>
                    <input
                      type="text"
                      value={formData.degree}
                      onChange={e => setFormData({ ...formData, degree: e.target.value })}
                      placeholder="e.g. Bachelor of Technology (B.Tech)"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-['Poppins']"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Branch / Major</span>
                    </label>
                    <input
                      type="text"
                      value={formData.branch}
                      onChange={e => setFormData({ ...formData, branch: e.target.value })}
                      placeholder="e.g. Computer Science & Engineering"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-['Poppins']"
                    />
                  </motion.div>
                </div>

                <motion.div variants={itemVariants} className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Current Academic Standing</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                    {YEARS.map(y => {
                      const isSelected = formData.year === y;
                      return (
                        <button
                          key={y}
                          type="button"
                          onClick={() => setFormData({ ...formData, year: y })}
                          className={`py-2.5 px-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs shadow-indigo-600/30'
                              : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                          }`}
                        >
                          {y.replace(' (Final Year)', '')}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* STEP 2: Technical Skills */}
            {step === 2 && (
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-5">
                {/* Search & Category tabs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {SKILL_CATEGORIES.map(cat => (
                      <button
                        key={cat.name}
                        type="button"
                        onClick={() => setActiveCategory(cat.name)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                          activeCategory === cat.name
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full sm:w-48">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={skillSearch}
                      onChange={e => setSkillSearch(e.target.value)}
                      placeholder="Filter skills..."
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Skill Chips Matrix */}
                <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800 min-h-[160px]">
                  <div className="flex flex-wrap gap-2">
                    {filteredSkills.map(skill => {
                      const isSelected = formData.skills.includes(skill);
                      return (
                        <motion.button
                          key={skill}
                          type="button"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => toggleSkill(skill)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer flex items-center gap-1.5 select-none ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs shadow-indigo-600/30'
                              : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700'
                          }`}
                        >
                          <span>{skill}</span>
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Skill Addition */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                  <form onSubmit={addCustomSkill} className="flex gap-2 flex-1 max-w-md">
                    <input
                      type="text"
                      value={customSkill}
                      onChange={e => setCustomSkill(e.target.value)}
                      placeholder="Add custom tool (e.g. OpenCV, LangChain, Supabase)..."
                      className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                    />
                    <Btn type="submit" variant="subtle" size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
                      Add
                    </Btn>
                  </form>

                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">{formData.skills.length}</span>
                    <span>skills selected</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: Domains & Interests */}
            {step === 3 && (
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DOMAINS_DATA.map(domain => {
                    const isSelected = formData.interests.includes(domain.id);
                    const Icon = domain.icon;

                    return (
                      <motion.div
                        key={domain.id}
                        variants={itemVariants}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleInterest(domain.id)}
                        className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex items-start gap-3.5 select-none ${
                          isSelected
                            ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
                            : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-600'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {domain.label}
                            </span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 ml-1" />}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                            {domain.desc}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 4: Experience Depth */}
            {step === 4 && (
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    {
                      level: 'Beginner' as DifficultyLevel,
                      title: 'Guided & Structured',
                      badge: 'Tier 1 • Foundations',
                      desc: 'Comfortable with language basics. AI focuses on clean monolithic MVC patterns, step-by-step scaffolding, and straightforward REST APIs.',
                      tag: 'Best for standard capstones'
                    },
                    {
                      level: 'Intermediate' as DifficultyLevel,
                      title: 'Production Capstone',
                      badge: 'Tier 2 • Recommended',
                      desc: 'Built full-stack or ML tutorials before. Ready for decoupled APIs (FastAPI/Express), PostgreSQL indexes, Redis caching, and Docker.',
                      tag: 'High academic rubric scores'
                    },
                    {
                      level: 'Advanced' as DifficultyLevel,
                      title: 'Research & High Scale',
                      badge: 'Tier 3 • IEEE Ready',
                      desc: 'Prior experience with distributed systems or custom ML training. Synthesizes microservices, real-time WebSockets, SHAP explainability, and k8s.',
                      tag: 'Publication & viva ready'
                    }
                  ].map(lvl => {
                    const isSelected = formData.experience_level === lvl.level;

                    return (
                      <motion.div
                        key={lvl.level}
                        variants={itemVariants}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setFormData({ ...formData, experience_level: lvl.level })}
                        className={`p-5 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between select-none ${
                          isSelected
                            ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-500 dark:border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs'
                            : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold uppercase text-indigo-600 dark:text-indigo-400">
                              {lvl.badge}
                            </span>
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                          </div>
                          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                            {lvl.level} — {lvl.title}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                            {lvl.desc}
                          </p>
                        </div>
                        <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800">
                          <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
                            {lvl.tag}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 5: Constraints & Limits */}
            {step === 5 && (
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Team Size */}
                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Team Capacity</span>
                    </label>
                    <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl p-2 px-3">
                      <input
                        type="number"
                        min={1}
                        max={8}
                        value={formData.team_size}
                        onChange={e => setFormData({ ...formData, team_size: parseInt(e.target.value) || 1 })}
                        className="w-full bg-transparent text-sm font-semibold text-slate-900 dark:text-white focus:outline-none font-['Poppins']"
                      />
                      <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap font-medium">
                        {formData.team_size === 1 ? 'Solo Student' : `${formData.team_size} Collaborators`}
                      </span>
                    </div>
                  </motion.div>

                  {/* Available Duration */}
                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Semester Duration</span>
                    </label>
                    <select
                      value={formData.available_time}
                      onChange={e => setFormData({ ...formData, available_time: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-['Poppins']"
                    >
                      <option value="4 weeks">4 weeks (Rapid Sprint)</option>
                      <option value="8 weeks">8 weeks (Half Semester)</option>
                      <option value="3 months">3 months (Standard Semester)</option>
                      <option value="6 months">6 months (Full Academic Year)</option>
                    </select>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Hardware Environment */}
                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <Laptop className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Hardware Environment</span>
                    </label>
                    <select
                      value={formData.hardware}
                      onChange={e => setFormData({ ...formData, hardware: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-['Poppins']"
                    >
                      <option value="Standard Laptop (CPU Only, 8-16GB RAM)">Standard Laptop (CPU Only)</option>
                      <option value="Laptop with Dedicated GPU (NVIDIA RTX)">Laptop with Dedicated GPU</option>
                      <option value="Raspberry Pi / Arduino / Microcontrollers">Hardware / IoT Embedded Devices</option>
                      <option value="Cloud VM / Google Colab / Kaggle Only">Cloud VM / Google Colab Only</option>
                    </select>
                  </motion.div>

                  {/* Budget */}
                  <motion.div variants={itemVariants} className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-indigo-500" />
                      <span>Budget Tier</span>
                    </label>
                    <select
                      value={formData.budget}
                      onChange={e => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 font-['Poppins']"
                    >
                      <option value="Zero budget / Free tier APIs">Zero budget (Strictly Free Tiers)</option>
                      <option value="Under $50 (Domain, Basic Cloud)">Under $50 (Basic Cloud / Domain)</option>
                      <option value="$100+ (Hardware parts or GPU compute)">$100+ (Hardware parts / GPU compute)</option>
                    </select>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* STEP 6: Career Goal & Review */}
            {step === 6 && (
              <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Target className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Target Career Role Upon Graduation</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {CAREER_GOALS_DATA.map(goal => {
                      const isSelected = formData.career_goal === goal.role;
                      const Icon = goal.icon;

                      return (
                        <motion.button
                          key={goal.role}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData({ ...formData, career_goal: goal.role })}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between gap-1 select-none ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs shadow-indigo-600/30'
                              : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <Icon className="w-4 h-4" />
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                          </div>
                          <span className="text-xs font-bold leading-tight mt-1">{goal.role}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Profile Summary Card */}
                <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-indigo-950 dark:text-indigo-200">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>Ready to Synthesize Ideas for {formData.name}</span>
                    </span>
                    <span className="text-[11px] font-mono font-medium text-indigo-600 dark:text-indigo-400">
                      {formData.experience_level} • {formData.available_time}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {formData.skills.slice(0, 6).map(s => (
                      <span
                        key={s}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 font-medium"
                      >
                        {s}
                      </span>
                    ))}
                    {formData.skills.length > 6 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-medium">
                        +{formData.skills.length - 6} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Wizard Footer Controls */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          {step > 1 ? (
            <Btn
              type="button"
              variant="subtle"
              size="sm"
              icon={<ArrowLeft className="w-4 h-4" />}
              onClick={handleBack}
              className="rounded-xl"
            >
              Previous
            </Btn>
          ) : (
            <div />
          )}

          {step < totalSteps ? (
            <Btn
              type="button"
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={handleNext}
              className="rounded-xl font-semibold"
            >
              Continue
            </Btn>
          ) : (
            <Btn
              type="button"
              variant="accent"
              size="md"
              icon={<Sparkles className="w-4 h-4" />}
              onClick={handleFinish}
              className="rounded-xl font-bold shadow-md shadow-indigo-600/30"
            >
              Generate My Project Ideas
            </Btn>
          )}
        </div>
      </Card>
    </div>
  );
};
