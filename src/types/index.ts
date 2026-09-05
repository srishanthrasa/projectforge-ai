export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface StudentProfile {
  id?: string;
  user_id?: string;
  name: string;
  email?: string;
  avatar_url?: string;
  bio?: string;
  student_id?: string;
  college: string;
  degree: string;
  branch: string;
  year: string;
  skills: string[];
  interests: string[];
  experience_level: DifficultyLevel;
  team_size: number;
  available_time: string; // e.g. "3 months", "8 weeks"
  hardware: string; // e.g. "Standard Laptop", "GPU Laptop", "Raspberry Pi / Arduino"
  budget: string; // e.g. "Zero budget / Free tier", "Under $50", "$100+"
  career_goal: string;
  github_url?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectScores {
  match_score: number; // 0-100%
  innovation_score: number; // 0-10
  feasibility_score: number; // 0-10
  impact_score: number; // 0-10
  career_score: number; // 0-10
}

export interface ProjectIdea extends ProjectScores {
  id: string;
  user_id?: string;
  title: string;
  description: string;
  problem_statement: string;
  proposed_solution: string;
  target_users: string[];
  real_world_relevance: string;
  required_skills: string[];
  technology_stack: string[];
  core_features: string[];
  advanced_features: string[];
  estimated_duration: string;
  difficulty: DifficultyLevel;
  why_fit: string;
  potential_challenges: string[];
  future_improvements: string[];
  blueprint?: ProjectBlueprint;
  architecture?: ProjectArchitecture;
  roadmap?: ProjectRoadmap;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectBlueprint {
  project_overview: string;
  problem_statement: string;
  background: string;
  objectives: string[];
  target_users: string[];
  proposed_solution: string;
  core_features: string[];
  advanced_features: string[];
  user_roles: string[];
  functional_requirements: string[];
  non_functional_requirements: string[];
  technology_stack: {
    frontend: string[];
    backend: string[];
    database: string[];
    ai_ml: string[];
    apis: string[];
    third_party: string[];
  };
  system_architecture_summary: string;
  data_flow: string[];
  database_schema: {
    tables: {
      name: string;
      description: string;
      columns: string[];
    }[];
  };
  api_structure: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    endpoint: string;
    description: string;
  }[];
  security_considerations: string[];
  testing_strategy: string[];
  deployment_plan: string[];
  risks: {
    risk: string;
    mitigation: string;
  }[];
  future_improvements: string[];
}

export interface ArchitectureLayer {
  id: string;
  name: string;
  role: string;
  iconName: string;
  techNote: string;
  technologies: string[];
  details: string;
}

export interface ProjectArchitecture {
  title: string;
  summary: string;
  layers: ArchitectureLayer[];
}

export interface ProjectPhase {
  phase_number: number;
  phase_name: string;
  duration: string;
  goal: string;
  deliverables: string[];
  tasks: {
    id: string;
    title: string;
    estimated_hours: number;
    status: string;
  }[];
}

export interface ProjectRoadmap {
  title: string;
  total_duration: string;
  phases: ProjectPhase[];
}

export interface RoadmapTask {
  id: string;
  title: string;
  description: string;
  estimated_hours: number;
  completed?: boolean;
}

export interface ProjectRoadmapPhase {
  phase_number: number;
  name: string;
  description: string;
  estimated_hours: number;
  dependencies: string[];
  completion_criteria: string[];
  tasks: RoadmapTask[];
}

export type TaskStatus = 'Not Started' | 'In Progress' | 'Completed';
export type TaskPriority = 'Low' | 'Medium' | 'High';

export interface ProjectTask {
  id: string;
  project_id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  estimated_hours: number;
  due_date?: string;
  phase: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProjectEvaluation {
  overall_score: number; // 0-100
  innovation: number; // 0-10
  feasibility: number; // 0-10
  technical_complexity: number; // 0-10
  real_world_impact: number; // 0-10
  academic_value: number; // 0-10
  career_value: number; // 0-10
  scalability: number; // 0-10
  innovation_score?: number;
  feasibility_score?: number;
  market_score?: number;
  academic_rigor_score?: number;
  strengths: string[];
  weaknesses: string[];
  risks?: string[];
  missing_features?: string[];
  recommended_improvements?: string[];
  recommendations?: string[];
  viva_questions?: string[];
}

export interface IdeaImprovement {
  original_idea: string;
  problems: string[];
  improved_concept: string;
  why_better: string;
  new_features: string[];
  technology_suggestions: string[];
  ai_opportunities?: string[];
  innovation_opportunities?: string[];
  enhanced_title?: string;
  enhanced_summary?: string;
  advanced_features?: string[];
  modern_tech_stack?: string[];
  architecture_upgrade?: string;
  defense_pitch?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  phase_number: number;
  estimated_hours: number;
  status: 'Pending' | 'In Progress' | 'Completed';
  deadline: string;
}

export interface EvaluationResult {
  overall_score: number;
  innovation_score: number;
  feasibility_score: number;
  market_score: number;
  academic_rigor_score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  viva_questions: string[];
  innovation?: number;
  feasibility?: number;
  technical_complexity?: number;
  real_world_impact?: number;
  academic_value?: number;
  career_value?: number;
  scalability?: number;
  risks?: string[];
  missing_features?: string[];
  recommended_improvements?: string[];
}

export interface ImprovedIdeaResult {
  enhanced_title: string;
  enhanced_summary: string;
  advanced_features: string[];
  modern_tech_stack: string[];
  architecture_upgrade: string;
  defense_pitch: string;
  original_idea?: string;
  problems?: string[];
  improved_concept?: string;
  why_better?: string;
  new_features?: string[];
  technology_suggestions?: string[];
}

export interface ChatMessage {
  id: string;
  session_id?: string;
  role: 'user' | 'assistant';
  content: string;
  created_at?: string;
  timestamp?: string;
}

export interface UploadedDoc {
  id: string;
  file_name: string;
  file_size: number;
  file_type: string;
  uploaded_at: string;
  storage_path?: string;
}

export type ThemeMode = 'dark' | 'light' | 'system';
