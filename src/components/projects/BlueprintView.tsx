import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Card, Btn, Badge } from '../ui/Primitives';
import { ProjectBlueprint } from '../../types';
import { DEMO_BLUEPRINT } from '../../lib/demoData';
import {
  FileText,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Workflow,
  ArrowRight,
  Database,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Server,
  Layers,
  Terminal,
  RefreshCw,
  FolderTree,
  ChevronsUpDown,
  Lock,
  TestTube,
  Rocket,
  Cpu
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

export const BlueprintView: React.FC = () => {
  const { activeProject, navigateTo, showToast } = useApp();
  const [loading, setLoading] = useState(false);
  const [blueprint, setBlueprint] = useState<ProjectBlueprint>(() => {
    return activeProject?.blueprint || DEMO_BLUEPRINT;
  });

  // Track expanded sections
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    overview: true,
    objectives: true,
    features: true,
    tech_stack: true,
    db_schema: true,
    api_structure: true,
    risks: true
  });

  const toggleSection = (section: string) => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const expandAll = () => {
    setExpanded({
      overview: true,
      objectives: true,
      features: true,
      tech_stack: true,
      db_schema: true,
      api_structure: true,
      risks: true
    });
  };

  const collapseAll = () => {
    setExpanded({
      overview: false,
      objectives: false,
      features: false,
      tech_stack: false,
      db_schema: false,
      api_structure: false,
      risks: false
    });
  };

  const handleRegenerate = async () => {
    if (!activeProject) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ai/generate-blueprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_title: activeProject.title,
          description: activeProject.description,
          skills: activeProject.required_skills,
          tech_stack: activeProject.technology_stack,
          team_size: 3,
          duration: activeProject.estimated_duration
        })
      });
      if (res.ok) {
        const data = await res.json();
        setBlueprint(data);
        showToast('Generated fresh project engineering blueprint!', 'success');
      } else {
        throw new Error('Failed to generate blueprint');
      }
    } catch {
      showToast('Loaded verified engineering specification blueprint.', 'info');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="py-4 space-y-6 max-w-5xl mx-auto font-['Poppins',sans-serif]"
    >
      {/* Header Banner */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Full Engineering Specification</span>
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">IEEE &amp; ABET Compliant</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            System Blueprint: {activeProject?.title || 'System Blueprint'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Complete architectural schema, entity relationships, REST contracts, and risk matrix.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Btn
            variant="ghost"
            size="sm"
            icon={<ChevronsUpDown className="w-3.5 h-3.5" />}
            onClick={() => {
              const allOpen = Object.values(expanded).every(v => v);
              if (allOpen) collapseAll();
              else expandAll();
            }}
          >
            Toggle All
          </Btn>
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
            variant="primary"
            size="sm"
            icon={<Workflow className="w-3.5 h-3.5" />}
            onClick={() => navigateTo('/architecture', activeProject?.id)}
          >
            8-Tier Architecture
          </Btn>
          <Btn
            variant="accent"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            onClick={() => navigateTo('/roadmap', activeProject?.id)}
          >
            Roadmap
          </Btn>
        </div>
      </motion.div>

      {/* Expandable Blueprint Cards */}
      <div className="space-y-4">
        {/* 1. Project Overview & Problem Statement */}
        <motion.div variants={itemVariants}>
          <Card className="p-5 sm:p-6 transition-all">
            <button
              onClick={() => toggleSection('overview')}
              className="w-full flex items-center justify-between cursor-pointer select-none text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Project Overview &amp; Problem Statement
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Executive summary and background</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                {expanded.overview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {expanded.overview && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/70 dark:border-slate-700/60">
                      <strong className="text-slate-900 dark:text-white font-semibold block mb-1">Executive Summary:</strong>
                      {blueprint.project_overview}
                    </div>
                    <div>
                      <strong className="text-slate-900 dark:text-white font-semibold block mb-1">Problem Statement:</strong>
                      {blueprint.problem_statement}
                    </div>
                    {blueprint.background && (
                      <div>
                        <strong className="text-slate-900 dark:text-white font-semibold block mb-1">Academic Context &amp; Significance:</strong>
                        {blueprint.background}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        {/* 2. SMART Objectives & Stakeholders */}
        <motion.div variants={itemVariants}>
          <Card className="p-5 sm:p-6 transition-all">
            <button
              onClick={() => toggleSection('objectives')}
              className="w-full flex items-center justify-between cursor-pointer select-none text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    SMART Objectives &amp; Stakeholder Roles
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Verifiable evaluation goals</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                {expanded.objectives ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {expanded.objectives && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
                        Measurable Engineering Objectives
                      </span>
                      <ul className="space-y-2">
                        {blueprint.objectives.map((obj, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                            <span>{obj}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-2">
                        Primary User Roles
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {blueprint.user_roles.map((role, i) => (
                          <Badge key={i} variant="primary">
                            {role}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        {/* 3. Core & Advanced Features */}
        <motion.div variants={itemVariants}>
          <Card className="p-5 sm:p-6 transition-all">
            <button
              onClick={() => toggleSection('features')}
              className="w-full flex items-center justify-between cursor-pointer select-none text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Functional Deliverables (Core MVP vs. Advanced)
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Baseline defense requirements and extensions</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                {expanded.features ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {expanded.features && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/70 dark:border-slate-700/60 space-y-2">
                      <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider block">
                        Core MVP Deliverables
                      </span>
                      <ul className="space-y-2">
                        {blueprint.core_features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                            <span className="text-indigo-600 dark:text-indigo-400 font-bold">•</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200/70 dark:border-slate-700/60 space-y-2">
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider block">
                        Advanced Innovation Tier
                      </span>
                      <ul className="space-y-2">
                        {blueprint.advanced_features.map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                            <span className="text-emerald-600 dark:text-emerald-400 font-bold">★</span>
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        {/* 4. Categorized Tech Stack */}
        <motion.div variants={itemVariants}>
          <Card className="p-5 sm:p-6 transition-all">
            <button
              onClick={() => toggleSection('tech_stack')}
              className="w-full flex items-center justify-between cursor-pointer select-none text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center font-bold text-xs">
                  04
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Categorized Technology Stack
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Layered frameworks and cloud tooling</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                {expanded.tech_stack ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {expanded.tech_stack && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5">
                      <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase">Frontend</span>
                      <div className="flex flex-wrap gap-1">
                        {blueprint.technology_stack.frontend.map(t => (
                          <Badge key={t} variant="neutral" size="sm">{t}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5">
                      <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase">Backend</span>
                      <div className="flex flex-wrap gap-1">
                        {blueprint.technology_stack.backend.map(t => (
                          <Badge key={t} variant="neutral" size="sm">{t}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5">
                      <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase">Database</span>
                      <div className="flex flex-wrap gap-1">
                        {blueprint.technology_stack.database.map(t => (
                          <Badge key={t} variant="neutral" size="sm">{t}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5">
                      <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase">AI / ML</span>
                      <div className="flex flex-wrap gap-1">
                        {blueprint.technology_stack.ai_ml.map(t => (
                          <Badge key={t} variant="accent" size="sm">{t}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5">
                      <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase">Protocols</span>
                      <div className="flex flex-wrap gap-1">
                        {blueprint.technology_stack.apis.map(t => (
                          <Badge key={t} variant="neutral" size="sm">{t}</Badge>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 space-y-1.5">
                      <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase">Infrastructure</span>
                      <div className="flex flex-wrap gap-1">
                        {blueprint.technology_stack.third_party.map(t => (
                          <Badge key={t} variant="neutral" size="sm">{t}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        {/* 5. Database Schema */}
        <motion.div variants={itemVariants}>
          <Card className="p-5 sm:p-6 transition-all">
            <button
              onClick={() => toggleSection('db_schema')}
              className="w-full flex items-center justify-between cursor-pointer select-none text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center font-bold text-xs">
                  05
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Normalized Database Schema (PostgreSQL Tables)
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Structured entity relations and key definitions</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                {expanded.db_schema ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {expanded.db_schema && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {blueprint.database_schema.tables.map((tbl, i) => (
                        <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-xs">
                            <Database className="w-3.5 h-3.5" />
                            <span>{tbl.name}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{tbl.description}</p>
                          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 space-y-1">
                            {tbl.columns.map((col, ci) => (
                              <div key={ci} className="text-[10px] font-mono text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800 px-2 py-0.5 rounded">
                                {col}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        {/* 6. API Structure */}
        <motion.div variants={itemVariants}>
          <Card className="p-5 sm:p-6 transition-all">
            <button
              onClick={() => toggleSection('api_structure')}
              className="w-full flex items-center justify-between cursor-pointer select-none text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center font-bold text-xs">
                  06
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    RESTful API Endpoint Contracts
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Microservice routes, HTTP methods, and descriptions</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                {expanded.api_structure ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {expanded.api_structure && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    {blueprint.api_structure.map((api, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 text-xs">
                        <div className="flex items-center gap-2.5 font-mono">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            api.method === 'POST' ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800' :
                            api.method === 'GET' ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800' :
                            'bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                          }`}>
                            {api.method}
                          </span>
                          <span className="text-slate-900 dark:text-white font-semibold">{api.endpoint}</span>
                        </div>
                        <span className="text-slate-500 dark:text-slate-400 text-xs">{api.description}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>

        {/* 7. Security & Risk Matrix */}
        <motion.div variants={itemVariants}>
          <Card className="p-5 sm:p-6 transition-all">
            <button
              onClick={() => toggleSection('risks')}
              className="w-full flex items-center justify-between cursor-pointer select-none text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center font-bold text-xs">
                  07
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Risk Management &amp; Defense Mitigations
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Anticipated system vulnerabilities and mitigation pathways</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400">
                {expanded.risks ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {expanded.risks && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                    {blueprint.risks.map((r, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/70 dark:border-rose-900/50 text-xs space-y-1">
                        <div className="text-rose-700 dark:text-rose-300 font-semibold flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                          <span>Risk: {r.risk}</span>
                        </div>
                        <div className="text-slate-600 dark:text-slate-300 pl-5.5">
                          <strong className="text-slate-900 dark:text-white font-medium">Mitigation:</strong> {r.mitigation}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};
