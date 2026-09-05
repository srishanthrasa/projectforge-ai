import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Badge, Bar } from '../ui/Primitives';
import {
  LayoutDashboard,
  Sparkles,
  Lightbulb,
  Bookmark,
  GitCompare,
  Scale,
  Wand2,
  BotMessageSquare,
  User,
  Layers,
  FileText,
  Workflow,
  CheckSquare,
  ArrowRight,
  ChevronRight
} from 'lucide-react';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    activeRoute,
    navigateTo,
    activeProject,
    savedIdeaIds,
    compareIdeaIds,
    tasks,
    profile
  } = useApp();

  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const progressPercent = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const mainNav = [
    { label: 'Dashboard', route: '/dashboard', icon: LayoutDashboard },
    { label: 'Generate Ideas', route: '/generate', icon: Sparkles },
    { label: 'Browse Ideas', route: '/ideas', icon: Lightbulb },
    { label: 'Saved Ideas', route: '/saved', icon: Bookmark, badge: savedIdeaIds.length || undefined },
    { label: 'Compare Ideas', route: '/compare', icon: GitCompare, badge: compareIdeaIds.length || undefined },
    { label: 'Evaluate Project', route: '/evaluate', icon: Scale },
    { label: 'Improve Idea', route: '/improve', icon: Wand2 },
    { label: 'AI Mentor', route: '/mentor', icon: BotMessageSquare },
    { label: 'Student Profile', route: '/profile', icon: User }
  ];

  const projectSubNav = [
    { label: 'Project Overview', route: '/project', icon: Layers },
    { label: 'Blueprint', route: '/blueprint', icon: FileText },
    { label: 'Architecture', route: '/architecture', icon: Workflow },
    { label: 'Roadmap', route: '/roadmap', icon: ArrowRight },
    { label: 'Tasks & Progress', route: '/tasks', icon: CheckSquare, badge: `${completedTasks}/${tasks.length}` },
    { label: 'Project Mentor', route: '/mentor', icon: BotMessageSquare }
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row font-['Poppins',sans-serif] transition-colors duration-200">
      {/* Left Sidebar */}
      <aside className="w-full md:w-64 lg:w-72 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 p-4 shrink-0 flex flex-col justify-between">
        <div className="space-y-5">
          {/* Student mini-header */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 flex items-center gap-3 cursor-pointer"
            onClick={() => navigateTo('/profile')}
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-sm shadow-xs shadow-indigo-600/30 overflow-hidden shrink-0">
              {profile.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.name || 'Student'}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span>{profile.name ? profile.name.charAt(0) : 'S'}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">{profile.name || 'Student'}</div>
              <div className="text-[11px] text-slate-400 dark:text-slate-500 font-medium truncate">{profile.career_goal || 'Engineering Senior'}</div>
            </div>
          </motion.div>

          {/* Main Navigation */}
          <div className="space-y-0.5">
            <div className="px-3 text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Platform Modules
            </div>
            {mainNav.map(item => {
              const Icon = item.icon;
              const isActive = activeRoute === item.route;
              return (
                <motion.button
                  key={item.route}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => navigateTo(item.route)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-semibold'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[11px] px-2 py-0.2 rounded-full font-medium ${
                        isActive
                          ? 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Active Project Mini-Panel */}
          {activeProject && (
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active Project
                </span>
                <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/70 px-2 py-0.5 rounded-full">
                  {activeProject.match_score}% Match
                </span>
              </div>

              <motion.div
                whileHover={{ y: -1 }}
                onClick={() => navigateTo('/project', activeProject.id)}
                className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-100/70 dark:hover:bg-slate-800 cursor-pointer transition-colors group"
              >
                <div className="text-xs font-semibold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  {activeProject.title}
                </div>
                <div className="mt-2">
                  <Bar
                    progress={progressPercent}
                    label="Sprint Progress"
                    subLabel={`${progressPercent}%`}
                    colorClass="bg-indigo-600 dark:bg-indigo-500"
                  />
                </div>
              </motion.div>

              {/* Project Sub-routes */}
              <div className="space-y-0.5 pl-1">
                {projectSubNav.map(sub => {
                  const SubIcon = sub.icon;
                  const isSubActive = activeRoute === sub.route;
                  return (
                    <button
                      key={sub.route}
                      onClick={() => navigateTo(sub.route, activeProject.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        isSubActive
                          ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 font-semibold'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <SubIcon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{sub.label}</span>
                      </div>
                      {sub.badge && (
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">
                          {sub.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Support & Quick Helper */}
        <div className="pt-3 mt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500 flex items-center justify-between">
          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">ProjectForge AI</span>
          <button
            onClick={() => navigateTo('/mentor')}
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 cursor-pointer font-medium text-xs"
          >
            <span>Ask Mentor</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto">{children}</div>
      </main>
    </div>
  );
};

