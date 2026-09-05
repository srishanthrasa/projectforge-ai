import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { Btn } from '../ui/Primitives';
import {
  Sparkles,
  Menu,
  X,
  LayoutDashboard,
  Sun,
  Moon,
  LogOut,
  Play,
  ArrowRight,
  User,
  Lock,
  LogIn
} from 'lucide-react';

export const TopNav: React.FC = () => {
  const {
    activeRoute,
    navigateTo,
    user,
    logout,
    startDemoMode,
    theme,
    setTheme,
    profile,
    isDemoMode,
    isAuthenticated,
    openAuthModal
  } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Features', action: () => { navigateTo('/'); setTimeout(() => document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
    { label: 'How It Works', action: () => { navigateTo('/'); setTimeout(() => document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' }), 100); } },
    { label: 'AI Mentor', action: () => navigateTo('/mentor') },
    { label: 'Pricing', action: () => { navigateTo('/'); setTimeout(() => document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' }), 100); } }
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/90 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md font-['Poppins',sans-serif] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          onClick={() => navigateTo(user ? '/dashboard' : '/')}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center text-white shadow-xs shadow-indigo-600/20">
            <Sparkles className="w-4.5 h-4.5 text-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                ProjectForge
              </span>
              <span className="text-[10px] font-semibold text-white px-1.5 py-0.2 bg-indigo-600 rounded-md">
                AI
              </span>
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium tracking-wide uppercase hidden sm:inline -mt-0.5">
              Final-Year Project Mentor
            </span>
          </div>
        </motion.div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link, idx) => (
            <button
              key={idx}
              onClick={link.action}
              className="hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer py-1"
            >
              {link.label}
            </button>
          ))}
          {user && (
            <button
              onClick={() => navigateTo('/dashboard')}
              className={`hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                activeRoute === '/dashboard'
                  ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Dashboard</span>
            </button>
          )}
        </nav>

        {/* Right CTA / Auth controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme switcher */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer flex items-center justify-center border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>

          {!user ? (
            <>
              <button
                onClick={startDemoMode}
                className="text-xs font-medium px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer flex items-center gap-1.5 border border-slate-200/60 dark:border-slate-700/60"
              >
                <Play className="w-3 h-3 text-indigo-600 dark:text-indigo-400 fill-indigo-600 dark:fill-indigo-400" />
                <span>Try Demo</span>
              </button>
              <Btn variant="ghost" size="sm" onClick={() => navigateTo('/login')}>
                Login
              </Btn>
              <Btn variant="accent" size="sm" onClick={() => navigateTo('/onboarding')}>
                Get Started
              </Btn>
            </>
          ) : (
            <div className="flex items-center gap-2">
              {isDemoMode && (
                <Btn
                  variant="accent"
                  size="sm"
                  icon={<LogIn className="w-3.5 h-3.5" />}
                  onClick={() => openAuthModal('unlock full interactive mentor & AI tools')}
                  className="font-bold text-xs"
                >
                  Sign In
                </Btn>
              )}
              <button
                type="button"
                onClick={() => navigateTo('/profile')}
                className="flex items-center gap-2 px-2.5 py-1 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700/80 rounded-full border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                title="View Profile & Settings"
              >
                <div className="w-6 h-6 rounded-full overflow-hidden bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                  {profile?.avatar_url ? (
                    <img
                      src={profile.avatar_url}
                      alt={user.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span>{(user.name?.[0] || 'U').toUpperCase()}</span>
                  )}
                </div>
                <span className="text-xs font-medium text-slate-700 dark:text-slate-200 max-w-[110px] truncate">
                  {user.name}
                  {isDemoMode && <span className="ml-1 text-[10px] font-bold text-amber-500">(Demo)</span>}
                </span>
              </button>
              <Btn
                variant="subtle"
                size="sm"
                icon={<LogOut className="w-3.5 h-3.5" />}
                onClick={logout}
              >
                Sign out
              </Btn>
            </div>
          )}
        </div>

        {/* Mobile Hamburger button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with Framer Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 py-4 space-y-3 overflow-hidden shadow-lg"
          >
            {navLinks.map((link, idx) => (
              <div
                key={idx}
                onClick={() => {
                  link.action();
                  setMobileMenuOpen(false);
                }}
                className="py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer border-b border-slate-100 dark:border-slate-800"
              >
                {link.label}
              </div>
            ))}

            {user && (
              <div
                onClick={() => {
                  navigateTo('/dashboard');
                  setMobileMenuOpen(false);
                }}
                className="py-2 text-sm text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer border-b border-slate-100 dark:border-slate-800 flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Go to Dashboard</span>
              </div>
            )}

            <div className="pt-2 flex flex-col gap-2">
              {!user ? (
                <>
                  <Btn
                    variant="subtle"
                    size="sm"
                    icon={<Play className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                    onClick={() => {
                      startDemoMode();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Explore Demo Mode
                  </Btn>
                  <div className="grid grid-cols-2 gap-2">
                    <Btn
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        navigateTo('/login');
                        setMobileMenuOpen(false);
                      }}
                    >
                      Login
                    </Btn>
                    <Btn
                      variant="accent"
                      size="sm"
                      onClick={() => {
                        navigateTo('/onboarding');
                        setMobileMenuOpen(false);
                      }}
                    >
                      Get Started
                    </Btn>
                  </div>
                </>
              ) : (
                <Btn
                  variant="subtle"
                  size="sm"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign out
                </Btn>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

