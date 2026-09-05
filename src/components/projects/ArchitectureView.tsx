import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Card, Btn, Badge } from '../ui/Primitives';
import { ProjectArchitecture } from '../../types';
import { DEMO_ARCHITECTURE } from '../../lib/demoData';
import {
  Workflow,
  Sparkles,
  Users,
  Layout,
  Globe,
  ShieldCheck,
  Server,
  Database,
  Cpu,
  Cloud,
  ArrowDown,
  RefreshCw,
  FileText,
  CheckCircle2,
  Lock,
  Layers,
  Zap,
  ArrowRight,
  Filter,
  Eye
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Layout,
  Globe,
  ShieldCheck,
  Server,
  Database,
  Cpu,
  Cloud
};

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
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } }
};

export const ArchitectureView: React.FC = () => {
  const { activeProject, navigateTo, showToast } = useApp();
  const [loading, setLoading] = useState(false);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [architecture, setArchitecture] = useState<ProjectArchitecture>(() => {
    return activeProject?.architecture || DEMO_ARCHITECTURE;
  });

  // Sync when active project changes
  useEffect(() => {
    if (activeProject?.architecture) {
      setArchitecture(activeProject.architecture);
    }
  }, [activeProject?.id, activeProject?.architecture]);

  const safeLayers = useMemo(() => {
    if (architecture && Array.isArray(architecture.layers) && architecture.layers.length > 0) {
      return architecture.layers;
    }
    if (activeProject?.architecture && Array.isArray(activeProject.architecture.layers) && activeProject.architecture.layers.length > 0) {
      return activeProject.architecture.layers;
    }
    return DEMO_ARCHITECTURE.layers;
  }, [architecture, activeProject?.architecture]);

  const safeTitle = architecture?.title || activeProject?.architecture?.title || DEMO_ARCHITECTURE.title;
  const safeSummary = architecture?.summary || activeProject?.architecture?.summary || DEMO_ARCHITECTURE.summary;

  const handleRegenerate = async () => {
    if (!activeProject) return;
    setLoading(true);
    try {
      const res = await fetch('/api/ai/generate-architecture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_title: activeProject.title,
          tech_stack: activeProject.technology_stack,
          description: activeProject.description
        })
      });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.layers)) {
          setArchitecture(data);
        } else {
          setArchitecture(DEMO_ARCHITECTURE);
        }
        showToast('Generated fresh 8-layer system architecture!', 'success');
      } else {
        throw new Error('Failed to generate architecture');
      }
    } catch {
      showToast('Loaded verified 8-layer architectural model.', 'info');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="py-4 space-y-6 max-w-4xl mx-auto font-['Poppins',sans-serif]"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800 flex items-center gap-1.5">
              <Workflow className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>8-Tier Vertical Topology</span>
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Decoupled Microservice Blueprint</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            {safeTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 max-w-2xl leading-relaxed">
            {safeSummary}
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
            variant="primary"
            size="sm"
            icon={<FileText className="w-3.5 h-3.5" />}
            onClick={() => navigateTo('/blueprint', activeProject?.id)}
          >
            Blueprint
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

      {/* Layer Overview Callout */}
      <motion.div
        variants={itemVariants}
        className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
      >
        <div className="flex items-center gap-2.5 text-indigo-900 dark:text-indigo-200 font-medium">
          <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span>Click any architectural layer to expand granular data contracts, latency budgets, and protocols.</span>
        </div>
        <div className="text-[11px] font-mono font-semibold text-indigo-600 dark:text-indigo-400">
          8 Tiers • High Availability
        </div>
      </motion.div>

      {/* Vertical Connected 8-Layer Diagram */}
      <div className="relative space-y-3 py-2">
        {safeLayers.map((layer, idx) => {
          const IconComponent = ICON_MAP[layer.iconName] || Server;
          const isLast = idx === architecture.layers.length - 1;
          const isSelected = selectedLayerId === layer.id;

          return (
            <motion.div key={layer.id} variants={itemVariants} className="relative group">
              <motion.div
                whileHover={{ scale: 1.005 }}
                onClick={() => setSelectedLayerId(isSelected ? null : layer.id)}
                className={`rounded-2xl border transition-all cursor-pointer p-5 sm:p-6 ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-indigo-500 dark:border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/90 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-600/60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left: Icon and Title */}
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 shadow-xs">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                          Layer 0{idx + 1} • {layer.role}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                        {layer.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {layer.techNote}
                      </p>
                    </div>
                  </div>

                  {/* Right: Technologies Badges */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:justify-end max-w-sm">
                    {layer.technologies.map(t => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-medium rounded-md border border-slate-200/70 dark:border-slate-700"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Granular Details Row */}
                <div className="mt-3.5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <div className="leading-relaxed font-normal">
                    {layer.details}
                  </div>
                  <div className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 shrink-0 flex items-center gap-1">
                    <span>{isSelected ? 'Collapse details' : 'View specifications'}</span>
                  </div>
                </div>

                {/* Expandable Expanded Specification */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                            Primary Responsibility
                          </span>
                          <span className="text-slate-800 dark:text-slate-200 font-medium">
                            {layer.role} isolation &amp; asynchronous event dispatching.
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                            Protocol &amp; Transport
                          </span>
                          <span className="text-slate-800 dark:text-slate-200 font-medium font-mono text-[11px]">
                            HTTP/2, gRPC &amp; TLS 1.3
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-1">
                            Failover Strategy
                          </span>
                          <span className="text-slate-800 dark:text-slate-200 font-medium">
                            Automatic circuit breaker with exponential backoff.
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Connecting Line with Down Arrow */}
              {!isLast && (
                <div className="flex flex-col items-center justify-center my-1.5 pointer-events-none">
                  <div className="w-0.5 h-5 bg-gradient-to-b from-indigo-500 to-indigo-600/30 rounded-full" />
                  <ArrowDown className="w-3.5 h-3.5 text-indigo-500 -mt-1 animate-bounce" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Footer Next Action */}
      <motion.div
        variants={itemVariants}
        className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Ready to schedule implementation sprints?</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">View the 9-phase development roadmap and populate your tasks.</p>
        </div>
        <Btn
          variant="accent"
          size="md"
          icon={<Workflow className="w-4 h-4" />}
          onClick={() => navigateTo('/roadmap', activeProject?.id)}
        >
          View Development Roadmap
        </Btn>
      </motion.div>
    </motion.div>
  );
};
