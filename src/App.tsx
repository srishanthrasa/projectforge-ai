import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from './context/AppContext';
import { TopNav } from './components/layout/TopNav';
import { DemoBanner } from './components/layout/DemoBanner';
import { AppShell } from './components/layout/AppShell';
import { ToastContainer } from './components/ui/Primitives';
import { AuthModal } from './components/auth/AuthModal';

// Views
import { LandingPage } from './components/landing/LandingPage';
import { AuthView } from './components/auth/AuthView';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { DashboardView } from './components/dashboard/DashboardView';
import { GenerateIdeasView } from './components/projects/GenerateIdeasView';
import { IdeasListView } from './components/projects/IdeasListView';
import { ProjectDetailView } from './components/projects/ProjectDetailView';
import { BlueprintView } from './components/projects/BlueprintView';
import { ArchitectureView } from './components/projects/ArchitectureView';
import { RoadmapView } from './components/projects/RoadmapView';
import { TasksView } from './components/projects/TasksView';
import { MentorChatView } from './components/mentor/MentorChatView';
import { ProjectEvaluatorView } from './components/tools/ProjectEvaluatorView';
import { ImproveIdeaView } from './components/tools/ImproveIdeaView';
import { CompareView } from './components/projects/CompareView';
import { SavedIdeasView } from './components/projects/SavedIdeasView';
import { ProfileView } from './components/profile/ProfileView';

export default function App() {
  const { activeRoute, isDemoMode, toasts, removeToast } = useApp();

  const renderContent = () => {
    switch (activeRoute) {
      case '/':
        return <LandingPage />;
      case '/login':
        return <AuthView mode="login" />;
      case '/signup':
        return <AuthView mode="signup" />;
      case '/onboarding':
        return <OnboardingWizard />;
      case '/dashboard':
        return (
          <AppShell>
            <DashboardView />
          </AppShell>
        );
      case '/generate':
        return (
          <AppShell>
            <GenerateIdeasView />
          </AppShell>
        );
      case '/ideas':
        return (
          <AppShell>
            <IdeasListView />
          </AppShell>
        );
      case '/project':
        return (
          <AppShell>
            <ProjectDetailView />
          </AppShell>
        );
      case '/blueprint':
        return (
          <AppShell>
            <BlueprintView />
          </AppShell>
        );
      case '/architecture':
        return (
          <AppShell>
            <ArchitectureView />
          </AppShell>
        );
      case '/roadmap':
        return (
          <AppShell>
            <RoadmapView />
          </AppShell>
        );
      case '/tasks':
        return (
          <AppShell>
            <TasksView />
          </AppShell>
        );
      case '/mentor':
        return (
          <AppShell>
            <MentorChatView />
          </AppShell>
        );
      case '/evaluate':
        return (
          <AppShell>
            <ProjectEvaluatorView />
          </AppShell>
        );
      case '/improve':
        return (
          <AppShell>
            <ImproveIdeaView />
          </AppShell>
        );
      case '/compare':
        return (
          <AppShell>
            <CompareView />
          </AppShell>
        );
      case '/saved':
        return (
          <AppShell>
            <SavedIdeasView />
          </AppShell>
        );
      case '/profile':
        return (
          <AppShell>
            <ProfileView />
          </AppShell>
        );
      default:
        return (
          <AppShell>
            <DashboardView />
          </AppShell>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-['Poppins',sans-serif] selection:bg-indigo-600 selection:text-white transition-colors duration-200">
      {/* Global Top Navbar */}
      <TopNav />

      {/* Demo Mode Banner (if active) */}
      {isDemoMode && <DemoBanner />}

      {/* Primary Route Surface with Framer Motion transitions */}
      <main className="w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRoute}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="w-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

      {/* Mandatory Authentication Modal for Gated Actions */}
      <AuthModal />
    </div>
  );
}
