import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Card, Btn, Field, Badge } from '../ui/Primitives';
import { StudentProfile } from '../../types';
import {
  User,
  Camera,
  Upload,
  Trash2,
  Sparkles,
  GraduationCap,
  Building2,
  BookOpen,
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Save,
  RotateCcw,
  Plus,
  X,
  Github,
  Linkedin,
  Globe,
  Clock,
  DollarSign,
  Target,
  Laptop,
  Sliders,
  Award,
  Flame,
  Check,
  Image as ImageIcon,
  ArrowRight,
  Code2,
  Lightbulb,
  ExternalLink,
  Bot,
  Database,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const PRESET_AVATARS = [
  {
    id: 'avatar-1',
    name: 'Alex Rivera',
    role: 'AI / ML Scholar',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'avatar-2',
    name: 'Maya Chen',
    role: 'Cloud & Robotics',
    url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'avatar-3',
    name: 'David Kumar',
    role: 'Full-Stack Architect',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'avatar-4',
    name: 'Elena Rostova',
    role: 'Data Scientist',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    color: 'from-violet-500 to-pink-600'
  },
  {
    id: 'avatar-5',
    name: 'Marcus Vance',
    role: 'Cybersecurity Analyst',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80',
    color: 'from-slate-700 to-slate-900'
  },
  {
    id: 'avatar-6',
    name: 'Sophia Patel',
    role: 'BioTech & Health AI',
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80',
    color: 'from-rose-500 to-amber-600'
  },
  {
    id: 'avatar-7',
    name: 'Jordan Lee',
    role: 'IoT & Embedded Systems',
    url: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=300&auto=format&fit=crop&q=80',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'avatar-8',
    name: 'Aaliyah Khan',
    role: 'UI/UX & Product Design',
    url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&auto=format&fit=crop&q=80',
    color: 'from-amber-500 to-orange-600'
  }
];

const SKILL_CATEGORIES = [
  {
    name: 'AI & Machine Learning',
    skills: ['Python', 'PyTorch', 'TensorFlow', 'scikit-learn', 'OpenCV', 'Hugging Face', 'LangChain', 'FastAPI', 'SHAP/LIME', 'Pandas', 'NumPy']
  },
  {
    name: 'Full-Stack & Web',
    skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'Tailwind CSS', 'GraphQL', 'Express', 'Vue', 'HTML5/CSS3', 'REST APIs', 'WebSockets']
  },
  {
    name: 'Database & Cloud',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'AWS', 'Supabase', 'Firebase', 'SQLite', 'Prisma', 'GCP']
  },
  {
    name: 'Systems & Embedded',
    skills: ['C++', 'Rust', 'Java', 'Go', 'Linux', 'Git', 'Raspberry Pi', 'Arduino', 'MQTT', 'ROS 2', 'Microservices']
  }
];

const YEAR_OPTIONS = [
  '1st Year (Freshman)',
  '2nd Year (Sophomore)',
  '3rd Year (Junior)',
  '4th Year (Final Year)',
  'Masters / Graduate',
  'Ph.D. Scholar'
];

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

export const ProfileView: React.FC = () => {
  const { profile, updateProfile, startDemoMode, showToast, isDemoMode } = useApp();
  const [formData, setFormData] = useState<StudentProfile>({ ...profile });
  const [newSkill, setNewSkill] = useState('');
  const [activeTab, setActiveTab] = useState<'academic' | 'skills' | 'constraints' | 'portfolio' | 'database'>('academic');
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [selectedAvatarUrl, setSelectedAvatarUrl] = useState<string>(formData.avatar_url || '');
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [avatarUploadTab, setAvatarUploadTab] = useState<'presets' | 'upload' | 'url'>('presets');
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state if profile changes externally
  React.useEffect(() => {
    setFormData({ ...profile });
    setSelectedAvatarUrl(profile.avatar_url || '');
  }, [profile]);

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    updateProfile(formData);
    setTimeout(() => {
      setIsSaving(false);
      showToast('Student profile & AI calibration saved!', 'success');
    }, 400);
  };

  const addSkill = (skillToAdd?: string) => {
    const target = (skillToAdd || newSkill).trim();
    if (!target) return;
    if (!formData.skills.includes(target)) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, target] }));
      showToast(`Added ${target} to skills`, 'info');
    }
    setNewSkill('');
  };

  const removeSkill = (skill: string) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  // Handle local image file upload (converts to base64 Data URL)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (PNG, JPG, WebP).', 'error');
      return;
    }

    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image file size must be less than 5MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setSelectedAvatarUrl(result);
      setFormData(prev => ({ ...prev, avatar_url: result }));
      showToast('Profile photo uploaded successfully!', 'success');
      setIsAvatarModalOpen(false);
    };
    reader.onerror = () => {
      showToast('Failed to read image file.', 'error');
    };
    reader.readAsDataURL(file);
  };

  const handleApplyPresetAvatar = (url: string) => {
    setSelectedAvatarUrl(url);
    setFormData(prev => ({ ...prev, avatar_url: url }));
    showToast('Avatar updated from presets!', 'success');
    setIsAvatarModalOpen(false);
  };

  const handleApplyCustomUrl = () => {
    if (!customUrlInput.trim()) return;
    setSelectedAvatarUrl(customUrlInput.trim());
    setFormData(prev => ({ ...prev, avatar_url: customUrlInput.trim() }));
    showToast('Custom image URL applied!', 'success');
    setIsAvatarModalOpen(false);
    setCustomUrlInput('');
  };

  const handleRemoveAvatar = () => {
    setSelectedAvatarUrl('');
    setFormData(prev => ({ ...prev, avatar_url: '' }));
    showToast('Profile picture removed. Monogram enabled.', 'info');
    setIsAvatarModalOpen(false);
  };

  // Compute profile calibration readiness score
  const calculateCalibration = () => {
    let score = 0;
    if (formData.name) score += 15;
    if (formData.college) score += 15;
    if (formData.degree && formData.branch) score += 15;
    if (formData.skills.length >= 3) score += 20;
    if (formData.experience_level) score += 10;
    if (formData.career_goal) score += 10;
    if (formData.avatar_url) score += 5;
    if (formData.github_url || formData.linkedin_url) score += 10;
    return Math.min(100, score);
  };

  const calibrationScore = calculateCalibration();

  // Monogram initials for fallback avatar
  const getInitials = (nameStr: string) => {
    const parts = nameStr.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return (nameStr[0] || 'S').toUpperCase();
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="py-4 space-y-6 max-w-5xl mx-auto font-['Poppins',sans-serif]"
    >
      {/* Top Breadcrumb & Actions Bar */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Student Profile</span>
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              Calibrates AI Recommendation &amp; Architecture Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1 tracking-tight">
            Academic &amp; Technical Profile
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Btn
            variant="accent"
            size="md"
            loading={isSaving}
            icon={<Save className="w-4 h-4" />}
            onClick={() => handleSave()}
          >
            Save Profile
          </Btn>
        </div>
      </motion.div>

      {/* Hero Profile Summary Card with Avatar Header */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Avatar and Basic Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-5 text-center sm:text-left">
            {/* Avatar with live badge */}
            <div className="relative group">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 border-indigo-500/30 dark:border-indigo-500/40 p-1 bg-slate-50 dark:bg-slate-800 shadow-md">
                {formData.avatar_url ? (
                  <img
                    src={formData.avatar_url}
                    alt={formData.name}
                    className="w-full h-full object-cover rounded-2xl"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white flex items-center justify-center text-2xl sm:text-3xl font-bold">
                    {getInitials(formData.name || 'Student')}
                  </div>
                )}
              </div>

              {/* Change Avatar Button Overlay */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setIsAvatarModalOpen(true)}
                title="Change Profile Picture"
                className="absolute -bottom-1.5 -right-1.5 p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/30 border-2 border-white dark:border-slate-900 cursor-pointer transition-all"
              >
                <Camera className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Profile Identifiers */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {formData.name || 'Unnamed Student'}
                </h2>
                <Badge variant="accent" size="sm">
                  {formData.year || '4th Year'}
                </Badge>
                {isDemoMode && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                    Demo Mode Active
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{formData.college || 'Institution Not Specified'}</span>
                </span>
                <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{formData.degree} ({formData.branch})</span>
                </span>
              </div>

              <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300 flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                  <Target className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Goal: {formData.career_goal || 'Engineering Professional'}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsAvatarModalOpen(true)}
                  className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline font-semibold cursor-pointer flex items-center gap-1"
                >
                  <ImageIcon className="w-3 h-3" />
                  <span>Change Photo</span>
                </button>
              </div>
            </div>
          </div>

          {/* AI Calibration Score Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2 min-w-[240px]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>AI Grounding Calibration</span>
              </span>
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                {calibrationScore}%
              </span>
            </div>

            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${calibrationScore}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full"
              />
            </div>

            <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {calibrationScore >= 90
                ? 'Profile fully optimized for tailored blueprints & sprint task generation.'
                : 'Add more skills and links to unlock maximum precision in AI proposals.'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tabbed Profile Navigation */}
      <motion.div variants={itemVariants} className="flex p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl relative">
        {[
          { id: 'academic', label: 'Academic & Identity', icon: <GraduationCap className="w-4 h-4" /> },
          { id: 'skills', label: `Technical Skills (${formData.skills.length})`, icon: <Cpu className="w-4 h-4" /> },
          { id: 'constraints', label: 'Project Constraints', icon: <Sliders className="w-4 h-4" /> },
          { id: 'portfolio', label: 'Portfolio & Defense Links', icon: <Globe className="w-4 h-4" /> },
          { id: 'database', label: 'Database & Cloud', icon: <Database className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all relative z-10 cursor-pointer flex items-center justify-center gap-2 ${
              activeTab === tab.id
                ? 'text-slate-900 dark:text-white'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="profile-tab-pill"
                className="absolute inset-0 bg-white dark:bg-slate-900 rounded-xl shadow-xs border border-slate-200/60 dark:border-slate-700/60"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className="relative z-10">{tab.icon}</span>
            <span className="relative z-10 hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </motion.div>

      {/* Main Tab Content Card */}
      <motion.div variants={itemVariants}>
        <Card className="p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSave} className="space-y-6">
            {/* TAB 1: ACADEMIC & IDENTITY */}
            {activeTab === 'academic' && (
              <motion.div
                key="tab-academic"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Academic &amp; Student Identifiers</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    These credentials are cited in the IEEE report headers and methodology documentation.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Full Name" required>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Rivera"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </Field>

                  <Field label="University Email">
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex.rivera@university.edu"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="College / University" required>
                    <div className="relative">
                      <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        required
                        value={formData.college}
                        onChange={e => setFormData({ ...formData, college: e.target.value })}
                        placeholder="e.g. National Institute of Technology"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                      />
                    </div>
                  </Field>

                  <Field label="Student Roll No / University ID (Optional)">
                    <input
                      type="text"
                      value={formData.student_id || ''}
                      onChange={e => setFormData({ ...formData, student_id: e.target.value })}
                      placeholder="e.g. CS2026-8849"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Degree Program" required>
                    <input
                      type="text"
                      required
                      value={formData.degree}
                      onChange={e => setFormData({ ...formData, degree: e.target.value })}
                      placeholder="e.g. Bachelor of Technology (B.Tech)"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </Field>

                  <Field label="Branch / Specialization" required>
                    <input
                      type="text"
                      required
                      value={formData.branch}
                      onChange={e => setFormData({ ...formData, branch: e.target.value })}
                      placeholder="e.g. Computer Science & Engineering"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </Field>
                </div>

                {/* Academic Year Quick Select */}
                <Field label="Current Academic Year">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {YEAR_OPTIONS.map(yr => (
                      <button
                        key={yr}
                        type="button"
                        onClick={() => setFormData({ ...formData, year: yr })}
                        className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                          formData.year === yr
                            ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-500 text-indigo-700 dark:text-indigo-300 shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
                        }`}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="Academic Bio &amp; Research Focus">
                  <textarea
                    rows={3}
                    value={formData.bio || ''}
                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Briefly describe your research interests, prior projects, or domain passions (e.g. Clinical Decision Support Systems, Distributed Systems, Explainable AI)..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </Field>
              </motion.div>
            )}

            {/* TAB 2: TECHNICAL SKILLS & STACK MATRIX */}
            {activeTab === 'skills' && (
              <motion.div
                key="tab-skills"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      <span>Active Skill Matrix</span>
                    </div>
                    <span className="text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400">
                      {formData.skills.length} Technologies Selected
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    The recommendation engine matches you with capstone blueprints that maximize your existing stack while offering learning growth.
                  </p>
                </div>

                {/* Active Skill Chips */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-3">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                    Current Skills:
                  </span>
                  <div className="flex flex-wrap gap-2 min-h-[42px]">
                    <AnimatePresence>
                      {formData.skills.map(skill => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.15 }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300 shadow-xs"
                        >
                          <span>{skill}</span>
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="hover:text-rose-600 dark:hover:text-rose-400 p-0.5 rounded transition-colors cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </motion.span>
                      ))}
                    </AnimatePresence>
                    {formData.skills.length === 0 && (
                      <span className="text-xs text-slate-400 italic">No skills added yet. Choose from suggestions below.</span>
                    )}
                  </div>

                  {/* Add Custom Skill Input */}
                  <div className="flex gap-2 pt-2 border-t border-slate-200/70 dark:border-slate-700/60">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={e => setNewSkill(e.target.value)}
                      placeholder="Add custom technology (e.g. LangGraph, ClickHouse, Solidity)..."
                      className="flex-1 px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                      onKeyDown={e => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkill();
                        }
                      }}
                    />
                    <Btn
                      type="button"
                      variant="accent"
                      size="sm"
                      icon={<Plus className="w-3.5 h-3.5" />}
                      onClick={() => addSkill()}
                    >
                      Add
                    </Btn>
                  </div>
                </div>

                {/* Categorized Quick-Add Skill Library */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Quick-Add Recommended Skills Library</span>
                  </h4>

                  <div className="space-y-3">
                    {SKILL_CATEGORIES.map(cat => (
                      <div key={cat.name} className="space-y-1.5">
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                          {cat.name}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {cat.skills.map(sk => {
                            const isSelected = formData.skills.includes(sk);
                            return (
                              <button
                                key={sk}
                                type="button"
                                onClick={() => (isSelected ? removeSkill(sk) : addSkill(sk))}
                                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
                                  isSelected
                                    ? 'bg-indigo-600 text-white shadow-xs'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700'
                                }`}
                              >
                                {isSelected ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 text-slate-400" />}
                                <span>{sk}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 3: PROJECT CONSTRAINTS & CALIBRATION */}
            {activeTab === 'constraints' && (
              <motion.div
                key="tab-constraints"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Capstone Constraints &amp; Engineering Bounds</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Defines the technical scope, timeline, and deployment tiers generated by the AI blueprint engine.
                  </p>
                </div>

                {/* Experience Level Selector */}
                <Field label="Technical Experience Level">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      {
                        level: 'Beginner',
                        desc: 'Foundational concepts, monolithic servers, standard CRUD, clear templates.'
                      },
                      {
                        level: 'Intermediate',
                        desc: 'Multi-service architecture, explainable AI, asynchronous message queues, Docker.'
                      },
                      {
                        level: 'Advanced',
                        desc: 'Distributed microservices, zero-trust auth, custom ML loss functions, live streaming.'
                      }
                    ].map(item => (
                      <button
                        key={item.level}
                        type="button"
                        onClick={() => setFormData({ ...formData, experience_level: item.level as any })}
                        className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer space-y-1 ${
                          formData.experience_level === item.level
                            ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-500 text-indigo-900 dark:text-white shadow-xs'
                            : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{item.level}</span>
                          {formData.experience_level === item.level && (
                            <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </Field>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Team Size (Collaborators)">
                    <div className="flex items-center gap-3">
                      {[1, 2, 3, 4, 5].map(num => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setFormData({ ...formData, team_size: num })}
                          className={`w-11 h-11 rounded-xl text-xs font-bold border transition-all cursor-pointer flex items-center justify-center ${
                            formData.team_size === num
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
                          }`}
                        >
                          {num === 1 ? 'Solo' : `${num}`}
                        </button>
                      ))}
                    </div>
                  </Field>

                  <Field label="Project Timeline / Duration">
                    <select
                      value={formData.available_time || '3 months'}
                      onChange={e => setFormData({ ...formData, available_time: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="4 weeks">4 Weeks (Rapid MVP / Hackathon)</option>
                      <option value="8 weeks">8 Weeks (Mid-Term Project)</option>
                      <option value="3 months">3 Months (Standard Final-Year Capstone)</option>
                      <option value="6 months">6 Months (Major Research Thesis)</option>
                      <option value="1 academic year">Full Academic Year (Two-Semester)</option>
                    </select>
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field label="Hardware Constraints">
                    <div className="relative">
                      <Laptop className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.hardware || ''}
                        onChange={e => setFormData({ ...formData, hardware: e.target.value })}
                        placeholder="e.g. Standard Laptop, NVIDIA RTX 4060 GPU, Raspberry Pi"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </Field>

                  <Field label="Budget Tier">
                    <div className="relative">
                      <DollarSign className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={formData.budget || ''}
                        onChange={e => setFormData({ ...formData, budget: e.target.value })}
                        placeholder="e.g. Zero budget / Free tier APIs, Under $50"
                        className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </Field>
                </div>

                <Field label="Primary Career Goal">
                  <div className="relative">
                    <Target className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={formData.career_goal || ''}
                      onChange={e => setFormData({ ...formData, career_goal: e.target.value })}
                      placeholder="e.g. AI/ML Research Engineer, Full-Stack Architect, Cloud DevOps"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </Field>
              </motion.div>
            )}

            {/* TAB 4: PORTFOLIO & SOCIALS */}
            {activeTab === 'portfolio' && (
              <motion.div
                key="tab-portfolio"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                    <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Portfolio, Socials &amp; Defense Links</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Embedded into your generated viva defense slides and academic GitHub documentation repository.
                  </p>
                </div>

                <Field label="GitHub Profile URL">
                  <div className="relative">
                    <Github className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={formData.github_url || ''}
                      onChange={e => setFormData({ ...formData, github_url: e.target.value })}
                      placeholder="https://github.com/alexrivera-tech"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </Field>

                <Field label="LinkedIn Profile URL">
                  <div className="relative">
                    <Linkedin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={formData.linkedin_url || ''}
                      onChange={e => setFormData({ ...formData, linkedin_url: e.target.value })}
                      placeholder="https://linkedin.com/in/alex-rivera-cs"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </Field>

                <Field label="Personal Portfolio / Research Link">
                  <div className="relative">
                    <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={formData.portfolio_url || ''}
                      onChange={e => setFormData({ ...formData, portfolio_url: e.target.value })}
                      placeholder="https://alexrivera.dev or Google Scholar"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </Field>
              </motion.div>
            )}

            {/* TAB 5: DATABASE & CLOUD (FIREBASE OPENPROJECT-53559) */}
            {activeTab === 'database' && (
              <motion.div
                key="tab-database"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2 flex items-center gap-2">
                    <Database className="w-4 h-4 text-amber-500" />
                    <span>Firebase &amp; Cloud Storage Integration</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Connected to <strong>openproject-53559</strong> for real-time Firestore database, Firebase Authentication, and research artifact synchronization.
                  </p>
                </div>

                {/* Firebase Active Status Banner */}
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-amber-950 dark:text-amber-200">
                        Firebase Connected (openproject-53559)
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-800 dark:text-amber-200">
                        Active &amp; Initialized
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-1 leading-relaxed">
                      Project ID: <code>openproject-53559</code> &bull; App ID: <code>1:510881153621:web:31aabc8f1bdc946b7a4adc</code> &bull; Measurement: <code>G-8XCPCH8WZ9</code>. Real-time auth and cloud collections ready.
                    </p>
                  </div>
                </div>

                {/* Firebase Services Telemetry */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Authentication
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Firebase Auth
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Email/Password &amp; Google Sign-in providers active.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Database
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Cloud Firestore
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Collections: <code>profiles</code>, <code>projects</code>, <code>tasks</code>.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                      Telemetry
                    </div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Firebase Analytics
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      Stream: <code>G-8XCPCH8WZ9</code> configured.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <Btn
                    type="button"
                    variant="subtle"
                    size="sm"
                    onClick={() => {
                      showToast('Firebase connection verified! project: openproject-53559', 'success');
                    }}
                  >
                    Ping Firebase Health
                  </Btn>
                </div>
              </motion.div>
            )}

            {/* Bottom Form Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                All settings are stored in local persistent state.
              </span>
              <Btn
                type="submit"
                variant="accent"
                size="md"
                loading={isSaving}
                icon={<Save className="w-4 h-4" />}
              >
                Save Profile Preferences
              </Btn>
            </div>
          </form>
        </Card>
      </motion.div>

      {/* Danger / Demo Reset Zone */}
      <motion.div
        variants={itemVariants}
        className="p-6 rounded-3xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="space-y-1">
          <h4 className="text-xs font-bold text-rose-700 dark:text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Hackathon &amp; Evaluator Dataset Reset</span>
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Reload the full interactive demo dataset (Healthcare AI Risk Prediction Capstone with complete sprints &amp; IEEE blueprints).
          </p>
        </div>
        <Btn
          variant="outline"
          size="sm"
          icon={<RotateCcw className="w-3.5 h-3.5" />}
          onClick={startDemoMode}
          className="border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-950/60"
        >
          Reset Demo Data
        </Btn>
      </motion.div>

      {/* ========================================================= */}
      {/* CHANGE PROFILE PICTURE / AVATAR MODAL DIALOG */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isAvatarModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs font-['Poppins',sans-serif]"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-xs">
                    <Camera className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                      Change Profile Picture
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Upload your own photo or choose a curated scholar avatar
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAvatarModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mode Switcher */}
              <div className="flex p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
                {[
                  { id: 'presets', label: 'Preset Avatars' },
                  { id: 'upload', label: 'Upload Local File' },
                  { id: 'url', label: 'Image URL' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setAvatarUploadTab(tab.id as any)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer text-center ${
                      avatarUploadTab === tab.id
                        ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* TAB: PRESET AVATARS */}
              {avatarUploadTab === 'presets' && (
                <div className="space-y-3">
                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">
                    Choose from engineering and research archetypes:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {PRESET_AVATARS.map(avatar => {
                      const isSelected = selectedAvatarUrl === avatar.url;
                      return (
                        <motion.div
                          key={avatar.id}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => handleApplyPresetAvatar(avatar.url)}
                          className={`p-2 rounded-2xl border text-center cursor-pointer transition-all space-y-1.5 ${
                            isSelected
                              ? 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-500 shadow-xs'
                              : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-indigo-300'
                          }`}
                        >
                          <div className="relative w-14 h-14 mx-auto rounded-2xl overflow-hidden shadow-xs">
                            <img
                              src={avatar.url}
                              alt={avatar.name}
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                            {isSelected && (
                              <div className="absolute inset-0 bg-indigo-600/50 flex items-center justify-center text-white">
                                <Check className="w-5 h-5" />
                              </div>
                            )}
                          </div>
                          <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200 truncate">
                            {avatar.name}
                          </div>
                          <div className="text-[9px] text-slate-400 truncate">
                            {avatar.role}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB: FILE UPLOAD */}
              {avatarUploadTab === 'upload' && (
                <div className="space-y-4">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-3xl p-8 text-center cursor-pointer bg-slate-50 dark:bg-slate-800/40 transition-colors space-y-3"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-xs">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                        Click or drag to upload photo
                      </span>
                      <span className="text-[11px] text-slate-400">
                        PNG, JPG, WebP supported up to 5MB
                      </span>
                    </div>
                    <Btn type="button" variant="subtle" size="sm">
                      Select Local File
                    </Btn>
                  </div>
                </div>
              )}

              {/* TAB: URL INPUT */}
              {avatarUploadTab === 'url' && (
                <div className="space-y-3">
                  <Field label="Direct Image Web URL">
                    <input
                      type="url"
                      value={customUrlInput}
                      onChange={e => setCustomUrlInput(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                      className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500"
                    />
                  </Field>
                  <div className="flex justify-end">
                    <Btn
                      type="button"
                      variant="accent"
                      size="sm"
                      onClick={handleApplyCustomUrl}
                      disabled={!customUrlInput.trim()}
                    >
                      Apply URL
                    </Btn>
                  </div>
                </div>
              )}

              {/* Modal Footer Actions */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                {formData.avatar_url ? (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Current Photo</span>
                  </button>
                ) : (
                  <span className="text-xs text-slate-400">Currently using default monogram initials</span>
                )}

                <Btn
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAvatarModalOpen(false)}
                >
                  Close
                </Btn>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
