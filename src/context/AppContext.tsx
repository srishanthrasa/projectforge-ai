import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  StudentProfile,
  ProjectIdea,
  ProjectTask,
  ChatMessage,
  UploadedDoc,
  ProjectEvaluation,
  IdeaImprovement,
  ThemeMode,
  TaskStatus
} from '../types';
import {
  DEMO_PROFILE,
  DEMO_PROJECT_IDEAS,
  DEMO_BLUEPRINT,
  DEMO_ARCHITECTURE,
  DEMO_ROADMAP
} from '../lib/demoData';
import {
  auth,
  db,
  doc,
  setDoc,
  getDoc,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  googleProvider,
  signInWithPopup
} from '../lib/firebaseClient';

export interface ToastItem {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

interface AppContextType {
  // Navigation
  activeRoute: string;
  currentProjectId: string | null;
  navigateTo: (route: string, projectId?: string) => void;

  // Auth & Demo
  user: { id: string; email: string; name: string } | null;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  authModalOpen: boolean;
  authModalReason: string;
  openAuthModal: (reason?: string) => void;
  closeAuthModal: () => void;
  requireAuth: (reason: string, callback?: () => void) => boolean;
  login: (email: string, name?: string) => void;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  startDemoMode: () => void;
  exitDemoMode: () => void;

  // Profile
  profile: StudentProfile;
  updateProfile: (updated: Partial<StudentProfile>) => void;

  // Projects & Ideas
  ideas: ProjectIdea[];
  setIdeas: (ideas: ProjectIdea[]) => void;
  activeProject: ProjectIdea | null;
  setActiveProject: (project: ProjectIdea | null) => void;
  savedIdeaIds: string[];
  toggleSaveIdea: (id: string) => void;
  compareIdeaIds: string[];
  toggleCompareIdea: (id: string) => void;
  clearCompare: () => void;

  // Tasks
  tasks: ProjectTask[];
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  addTask: (task: Omit<ProjectTask, 'id' | 'created_at' | 'updated_at'>) => void;
  deleteTask: (taskId: string) => void;

  // Chat
  chatMessages: ChatMessage[];
  addChatMessage: (message: Omit<ChatMessage, 'id' | 'created_at'>) => void;
  clearChatMessages: () => void;

  // Documents
  documents: UploadedDoc[];
  addDocument: (doc: UploadedDoc) => void;
  removeDocument: (docId: string) => void;

  // Tool evaluation states
  currentEvaluation: ProjectEvaluation | null;
  setCurrentEvaluation: (evalData: ProjectEvaluation | null) => void;
  currentImprovement: IdeaImprovement | null;
  setCurrentImprovement: (improvement: IdeaImprovement | null) => void;

  // Theme & Toasts
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toasts: ToastItem[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PROFILE: 'projectforge_profile',
  IDEAS: 'projectforge_ideas',
  SAVED: 'projectforge_saved_ideas',
  TASKS: 'projectforge_tasks',
  THEME: 'projectforge_theme',
  USER: 'projectforge_user',
  ACTIVE_PROJECT: 'projectforge_active_project'
};

const INITIAL_TASKS: ProjectTask[] = [
  {
    id: 'task-1',
    project_id: 'proj-demo-1',
    title: 'Survey clinical cardiovascular risk indicators (Framingham, AHA guidelines)',
    description: 'Review foundational diagnostic papers on biometric risk factors.',
    status: 'Completed',
    priority: 'High',
    estimated_hours: 6,
    phase: 'Phase 1: Requirement Analysis'
  },
  {
    id: 'task-2',
    project_id: 'proj-demo-1',
    title: 'Download and audit Kaggle Cardiovascular Disease & Diabetes datasets',
    description: 'Clean data, check missing values, and verify features.',
    status: 'Completed',
    priority: 'High',
    estimated_hours: 8,
    phase: 'Phase 2: Research'
  },
  {
    id: 'task-3',
    project_id: 'proj-demo-1',
    title: 'Perform Exploratory Data Analysis (EDA) and correlation matrix generation',
    description: 'Compute feature correlations between blood pressure and outcomes.',
    status: 'Completed',
    priority: 'Medium',
    estimated_hours: 8,
    phase: 'Phase 2: Research'
  },
  {
    id: 'task-4',
    project_id: 'proj-demo-1',
    title: 'Write Supabase/PostgreSQL schema definitions and indexes',
    description: 'Set up tables for patients, assessments, and vitals.',
    status: 'In Progress',
    priority: 'High',
    estimated_hours: 8,
    phase: 'Phase 3: Database Design'
  },
  {
    id: 'task-5',
    project_id: 'proj-demo-1',
    title: 'Scaffold FastAPI application structure with routers and validation',
    description: 'Set up async endpoints and Pydantic clinical ranges.',
    status: 'Not Started',
    priority: 'High',
    estimated_hours: 8,
    phase: 'Phase 4: Backend Development'
  },
  {
    id: 'task-6',
    project_id: 'proj-demo-1',
    title: 'Train and fine-tune XGBoost classifier with cross-validation',
    description: 'Optimize hyper-parameters and evaluate ROC-AUC.',
    status: 'Not Started',
    priority: 'High',
    estimated_hours: 12,
    phase: 'Phase 5: AI/ML Development'
  },
  {
    id: 'task-7',
    project_id: 'proj-demo-1',
    title: 'Integrate SHAP TreeExplainer to produce feature attribution rankings',
    description: 'Extract patient-specific top 5 risk factor weights.',
    status: 'Not Started',
    priority: 'Medium',
    estimated_hours: 10,
    phase: 'Phase 5: AI/ML Development'
  },
  {
    id: 'task-8',
    project_id: 'proj-demo-1',
    title: 'Construct Patient Intake Form with real-time biometric feedback',
    description: 'Build responsive inputs with validation sliders.',
    status: 'Not Started',
    priority: 'Medium',
    estimated_hours: 10,
    phase: 'Phase 6: Frontend Development'
  }
];

function sanitizeProfile(parsed: any): StudentProfile {
  return {
    ...DEMO_PROFILE,
    ...(parsed || {}),
    skills: Array.isArray(parsed?.skills) ? parsed.skills : DEMO_PROFILE.skills,
    interests: Array.isArray(parsed?.interests) ? parsed.interests : DEMO_PROFILE.interests
  };
}

function sanitizeProjectIdea(idea: any, fallbackIndex = 0): ProjectIdea {
  const fallback = DEMO_PROJECT_IDEAS[fallbackIndex % DEMO_PROJECT_IDEAS.length];
  if (!idea || typeof idea !== 'object') return fallback;

  return {
    ...fallback,
    ...idea,
    technology_stack: Array.isArray(idea.technology_stack)
      ? idea.technology_stack
      : (Array.isArray(idea.tech_stack) ? idea.tech_stack : fallback.technology_stack),
    target_users: Array.isArray(idea.target_users) ? idea.target_users : fallback.target_users,
    core_features: Array.isArray(idea.core_features) ? idea.core_features : fallback.core_features,
    advanced_features: Array.isArray(idea.advanced_features) ? idea.advanced_features : fallback.advanced_features,
    required_skills: Array.isArray(idea.required_skills) ? idea.required_skills : fallback.required_skills,
    potential_challenges: Array.isArray(idea.potential_challenges) ? idea.potential_challenges : fallback.potential_challenges,
    future_improvements: Array.isArray(idea.future_improvements) ? idea.future_improvements : fallback.future_improvements
  };
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeRoute, setActiveRoute] = useState<string>('/');
  const [currentProjectId, setCurrentProjectId] = useState<string | null>('proj-demo-1');
  const [isDemoMode, setIsDemoMode] = useState<boolean>(() => {
    return localStorage.getItem('projectforge_is_demo') === 'true';
  });
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authModalReason, setAuthModalReason] = useState<string>('');
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Theme
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    return (saved as ThemeMode) || 'dark';
  });

  // User
  const [user, setUser] = useState<{ id: string; email: string; name: string } | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Real authentication check (Demo Mode is preview-only)
  const isAuthenticated = Boolean(user && !isDemoMode && !user.id?.startsWith('demo-'));

  const openAuthModal = (reason?: string) => {
    setAuthModalReason(reason || 'access this AI engineering feature');
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
    setAuthModalReason('');
  };

  const requireAuth = (reason: string, callback?: () => void): boolean => {
    if (isAuthenticated) {
      callback?.();
      return true;
    }
    openAuthModal(reason);
    showToast(`🔒 Login mandatory to ${reason}`, 'info');
    return false;
  };

  // Profile
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return saved ? sanitizeProfile(JSON.parse(saved)) : DEMO_PROFILE;
    } catch {
      return DEMO_PROFILE;
    }
  });

  // Ideas
  const [ideas, setIdeasState] = useState<ProjectIdea[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.IDEAS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item, idx) => sanitizeProjectIdea(item, idx));
        }
      }
      return DEMO_PROJECT_IDEAS;
    } catch {
      return DEMO_PROJECT_IDEAS;
    }
  });

  // Active Project
  const [activeProject, setActiveProjectState] = useState<ProjectIdea | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ACTIVE_PROJECT);
      if (saved) {
        return sanitizeProjectIdea(JSON.parse(saved), 0);
      }
      return DEMO_PROJECT_IDEAS[0];
    } catch {
      return DEMO_PROJECT_IDEAS[0];
    }
  });

  // Saved Ideas
  const [savedIdeaIds, setSavedIdeaIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED);
      return saved ? JSON.parse(saved) : ['proj-demo-1'];
    } catch {
      return ['proj-demo-1'];
    }
  });

  // Compare Ideas
  const [compareIdeaIds, setCompareIdeaIds] = useState<string[]>(['proj-demo-1', 'proj-demo-2']);

  // Tasks
  const [tasks, setTasks] = useState<ProjectTask[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  // Chat
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      role: 'assistant',
      content: "Hello Alex! I am your ProjectForge AI Senior Mentor. I see you're building the **AI Healthcare Risk Prediction Platform** using Python, FastAPI, React, and XGBoost.\n\nYou have completed 3 research & requirements tasks, and are currently in **Phase 3: Database Design** with **Phase 4: Backend API** coming up next.\n\nHow can I help you implement your architecture, model training, or API contracts today?",
      created_at: new Date().toISOString()
    }
  ]);

  // Documents
  const [documents, setDocuments] = useState<UploadedDoc[]>([
    {
      id: 'doc-1',
      file_name: 'Cardiovascular_Dataset_Specifications_v2.pdf',
      file_size: 1420000,
      file_type: 'application/pdf',
      uploaded_at: '2026-08-28T10:15:00.000Z'
    }
  ]);

  // Evaluation & Improvement
  const [currentEvaluation, setCurrentEvaluation] = useState<ProjectEvaluation | null>(null);
  const [currentImprovement, setCurrentImprovement] = useState<IdeaImprovement | null>(null);

  // Sync theme to DOM
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) root.classList.add('dark');
      else root.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  // Listen for Firebase Auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const u = {
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Student Scholar'
        };
        setUser(u);
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(u));
        
        // Auto fetch profile from Firestore if exists
        getDoc(doc(db, 'profiles', firebaseUser.uid)).then((docSnap) => {
          if (docSnap.exists()) {
            setProfile(sanitizeProfile(docSnap.data()));
          }
        }).catch(err => {
          console.log('[Firestore] Profile fetch note:', err);
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IDEAS, JSON.stringify(ideas));
  }, [ideas]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(savedIdeaIds));
  }, [savedIdeaIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (activeProject) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_PROJECT, JSON.stringify(activeProject));
    }
  }, [activeProject]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const navigateTo = (route: string, projectId?: string) => {
    if (projectId) {
      setCurrentProjectId(projectId);
      const targetProject = ideas.find(i => i.id === projectId);
      if (targetProject) {
        setActiveProjectState(targetProject);
      }
    }
    setActiveRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const login = (email: string, name?: string) => {
    const newUser = {
      id: `usr-${Date.now()}`,
      email,
      name: name || email.split('@')[0]
    };
    setUser(newUser);
    setIsDemoMode(false);
    localStorage.removeItem('projectforge_is_demo');
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
    setAuthModalOpen(false);
    showToast(`Welcome, ${newUser.name}! All AI capabilities unlocked.`, 'success');
    navigateTo('/dashboard');
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      const gUser = {
        id: firebaseUser.uid,
        email: firebaseUser.email || 'google.user@domain.com',
        name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Google Scholar'
      };
      setUser(gUser);
      setIsDemoMode(false);
      localStorage.removeItem('projectforge_is_demo');
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(gUser));

      // Fetch or seed Firestore profile
      try {
        const profileSnap = await getDoc(doc(db, 'profiles', gUser.id));
        if (profileSnap.exists()) {
          setProfile(sanitizeProfile(profileSnap.data()));
        } else {
          const initialGoogleProfile: StudentProfile = {
            ...profile,
            full_name: gUser.name,
            email: gUser.email,
            avatar_url: firebaseUser.photoURL || profile.avatar_url,
            updated_at: new Date().toISOString()
          };
          setProfile(initialGoogleProfile);
          await setDoc(doc(db, 'profiles', gUser.id), initialGoogleProfile, { merge: true });
        }
      } catch (dbErr) {
        console.log('[Firestore Sync Note]:', dbErr);
      }

      setAuthModalOpen(false);
      showToast(`Signed in with Google as ${gUser.name}! All features unlocked.`, 'success');
      navigateTo('/dashboard');
    } catch (error: any) {
      console.warn('[Firebase Google Auth Note]:', error);
      // Fallback for mock/preview if popups blocked
      const fallbackUser = {
        id: `g-${Date.now()}`,
        email: 'scholar.google@university.edu',
        name: 'Google Scholar'
      };
      setUser(fallbackUser);
      setIsDemoMode(false);
      localStorage.removeItem('projectforge_is_demo');
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(fallbackUser));
      setAuthModalOpen(false);
      showToast('Signed in with Google account! All AI features unlocked.', 'success');
      navigateTo('/dashboard');
    }
  };

  const logout = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (e) {
      console.log('Firebase signout note:', e);
    }
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem('projectforge_is_demo');
    setIsDemoMode(false);
    showToast('Signed out successfully.', 'info');
    navigateTo('/');
  };

  const startDemoMode = () => {
    setIsDemoMode(true);
    localStorage.setItem('projectforge_is_demo', 'true');
    setUser({
      id: 'demo-user-alex',
      email: 'alex.rivera@university.edu',
      name: 'Alex Rivera (Demo)'
    });
    setProfile(DEMO_PROFILE);
    setIdeasState(DEMO_PROJECT_IDEAS);
    const demoFirstProject = DEMO_PROJECT_IDEAS[0];
    setActiveProjectState(demoFirstProject);
    setCurrentProjectId(demoFirstProject.id);
    setTasks(INITIAL_TASKS);
    showToast('Demo Preview active: Sample project loaded. Login is mandatory to chat with mentor or generate projects.', 'info');
    navigateTo('/dashboard');
  };

  const exitDemoMode = () => {
    setIsDemoMode(false);
    localStorage.removeItem('projectforge_is_demo');
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.USER);
    showToast('Exited Demo Preview mode.', 'info');
    navigateTo('/');
  };

  const updateProfile = (updated: Partial<StudentProfile>) => {
    setProfile(prev => {
      const next = { ...prev, ...updated, updated_at: new Date().toISOString() };
      if (user?.id && !isDemoMode && !user.id.startsWith('demo-')) {
        setDoc(doc(db, 'profiles', user.id), next, { merge: true }).catch(err => {
          console.log('[Firestore] Save profile note:', err);
        });
      }
      return next;
    });
    showToast('Profile preferences updated.', 'success');
  };

  const setIdeas = (newIdeas: ProjectIdea[]) => {
    const sanitized = Array.isArray(newIdeas) ? newIdeas.map((i, idx) => sanitizeProjectIdea(i, idx)) : [];
    setIdeasState(sanitized);
    if (sanitized.length > 0 && !activeProject) {
      setActiveProjectState(sanitized[0]);
      setCurrentProjectId(sanitized[0].id);
    }
  };

  const setActiveProject = (project: ProjectIdea | null) => {
    const sanitized = project ? sanitizeProjectIdea(project) : null;
    setActiveProjectState(sanitized);
    if (sanitized) {
      setCurrentProjectId(sanitized.id);
    }
  };

  const toggleSaveIdea = (id: string) => {
    setSavedIdeaIds(prev => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Removed from saved ideas', 'info');
        return prev.filter(item => item !== id);
      } else {
        showToast('Saved idea to your collection', 'success');
        return [...prev, id];
      }
    });
  };

  const toggleCompareIdea = (id: string) => {
    setCompareIdeaIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        if (prev.length >= 3) {
          showToast('You can compare a maximum of 3 projects simultaneously', 'info');
          return prev;
        }
        return [...prev, id];
      }
    });
  };

  const clearCompare = () => {
    setCompareIdeaIds([]);
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, status, updated_at: new Date().toISOString() }
          : task
      )
    );
    showToast(`Task marked as ${status}`, 'success');
  };

  const addTask = (taskData: Omit<ProjectTask, 'id' | 'created_at' | 'updated_at'>) => {
    const newTask: ProjectTask = {
      ...taskData,
      id: `task-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    setTasks(prev => [newTask, ...prev]);
    showToast('New project task created', 'success');
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    showToast('Task removed', 'info');
  };

  const addChatMessage = (msg: Omit<ChatMessage, 'id' | 'created_at'>) => {
    const newMsg: ChatMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setChatMessages(prev => [...prev, newMsg]);
  };

  const clearChatMessages = () => {
    setChatMessages([]);
  };

  const addDocument = (doc: UploadedDoc) => {
    setDocuments(prev => [doc, ...prev]);
    showToast(`Uploaded ${doc.file_name}`, 'success');
  };

  const removeDocument = (docId: string) => {
    setDocuments(prev => prev.filter(d => d.id !== docId));
    showToast('Document removed', 'info');
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  return (
    <AppContext.Provider
      value={{
        activeRoute,
        currentProjectId,
        navigateTo,
        user,
        isAuthenticated,
        isDemoMode,
        authModalOpen,
        authModalReason,
        openAuthModal,
        closeAuthModal,
        requireAuth,
        login,
        loginWithGoogle,
        logout,
        startDemoMode,
        exitDemoMode,
        profile,
        updateProfile,
        ideas,
        setIdeas,
        activeProject,
        setActiveProject,
        savedIdeaIds,
        toggleSaveIdea,
        compareIdeaIds,
        toggleCompareIdea,
        clearCompare,
        tasks,
        updateTaskStatus,
        addTask,
        deleteTask,
        chatMessages,
        addChatMessage,
        clearChatMessages,
        documents,
        addDocument,
        removeDocument,
        currentEvaluation,
        setCurrentEvaluation,
        currentImprovement,
        setCurrentImprovement,
        theme,
        setTheme,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
