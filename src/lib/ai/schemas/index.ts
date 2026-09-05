import { z } from 'zod';

export const difficultyEnum = z.preprocess((val) => {
  if (typeof val === 'string') {
    const lower = val.toLowerCase();
    if (lower.includes('begin') || lower.includes('easy')) return 'Beginner';
    if (lower.includes('adv') || lower.includes('hard')) return 'Advanced';
    return 'Intermediate';
  }
  return 'Intermediate';
}, z.enum(['Beginner', 'Intermediate', 'Advanced']));

const score10 = z.preprocess((val) => {
  const n = Number(val);
  if (isNaN(n)) return 8.5;
  if (n > 10) return Math.min(10, Math.round((n / 10) * 10) / 10);
  return Math.max(1, Math.min(10, Math.round(n * 10) / 10));
}, z.number().default(8.5));

const score100 = z.preprocess((val) => {
  const n = Number(val);
  if (isNaN(n)) return 88;
  if (n <= 10) return Math.min(100, Math.round(n * 10));
  return Math.max(1, Math.min(100, Math.round(n)));
}, z.number().default(88));

export const generateIdeasInputSchema = z.object({
  name: z.string().default('Student'),
  skills: z.array(z.string()).min(1, 'At least 1 skill required'),
  interests: z.array(z.string()).default([]),
  experience_level: difficultyEnum.default('Intermediate'),
  team_size: z.coerce.number().int().min(1).max(10).default(3),
  available_time: z.string().default('3 months'),
  hardware: z.string().default('Standard Laptop'),
  budget: z.string().default('Zero budget / Free tier'),
  career_goal: z.string().default('Software Developer')
});

export const singleProjectIdeaSchema = z.object({
  title: z.string().default('Innovative Engineering System'),
  description: z.string().default('High-impact final year engineering capstone project with modern architecture.'),
  problem_statement: z.string().default('Addressing key workflow inefficiencies and data processing latency.'),
  proposed_solution: z.string().default('A scalable, multi-tier system with modern cloud and machine learning algorithms.'),
  target_users: z.array(z.string()).default(['Engineering Students', 'Faculty', 'Industry Practitioners']),
  real_world_relevance: z.string().default('Addresses pressing challenges in automation and analytics.'),
  required_skills: z.array(z.string()).default(['TypeScript', 'React', 'Python', 'FastAPI']),
  technology_stack: z.array(z.string()).default(['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS']),
  core_features: z.array(z.string()).default(['Responsive Web Dashboard', 'RESTful API Services', 'Relational Database Schema', 'Role-Based Access Control']),
  advanced_features: z.array(z.string()).default(['AI-Powered Analytical Insights', 'Real-time WebSocket Notifications', 'Automated CI/CD Deployment']),
  estimated_duration: z.string().default('8-12 weeks'),
  difficulty: difficultyEnum.default('Intermediate'),
  innovation_score: score10,
  feasibility_score: score10,
  impact_score: score10,
  career_score: score10,
  match_score: score100,
  why_fit: z.string().default('Directly aligns with student skills and capstone evaluation defense criteria.'),
  potential_challenges: z.array(z.string()).default(['Managing API rate limits', 'Ensuring real-time state consistency', 'Data pipeline optimization']),
  future_improvements: z.array(z.string()).default(['Microservices migration', 'Mobile native companion app', 'Federated learning support'])
});

export const generateIdeasResponseSchema = z.object({
  ideas: z.array(singleProjectIdeaSchema).min(1)
});

export const blueprintInputSchema = z.object({
  project_title: z.string().default('Capstone Project'),
  description: z.string().default('Full-stack system architecture'),
  skills: z.array(z.string()).default([]),
  tech_stack: z.array(z.string()).default([]),
  team_size: z.coerce.number().default(3),
  duration: z.string().default('3 months')
});

export const blueprintResponseSchema = z.object({
  project_overview: z.string().default('Comprehensive system overview of the engineering project.'),
  problem_statement: z.string().default('Core technical problem and stakeholder pain points.'),
  background: z.string().default('Academic background and comparative survey of existing solutions.'),
  objectives: z.array(z.string()).default(['Develop a scalable multi-tier architecture', 'Implement secure authentication and authorization', 'Ensure sub-200ms latency on core API endpoints']),
  target_users: z.array(z.string()).default(['Primary Users', 'System Administrators', 'Audit Reviewers']),
  proposed_solution: z.string().default('Modern modular service layer with responsive client interface.'),
  core_features: z.array(z.string()).default(['User Management', 'Interactive Dashboard', 'Data Persistence Layer', 'Analytical Reporting']),
  advanced_features: z.array(z.string()).default(['Predictive Machine Learning Engine', 'Real-Time Event Streaming', 'Exportable Audit Logs']),
  user_roles: z.array(z.string()).default(['Admin', 'Student', 'Guest']),
  functional_requirements: z.array(z.string()).default(['User authentication via JWT', 'CRUD operations on core entities', 'Real-time state synchronization']),
  non_functional_requirements: z.array(z.string()).default(['Response time under 250ms', '99.9% uptime SLA', 'OWASP Top 10 compliance']),
  technology_stack: z.object({
    frontend: z.array(z.string()).default(['React', 'TypeScript', 'Tailwind CSS']),
    backend: z.array(z.string()).default(['Node.js', 'Express', 'Python FastAPI']),
    database: z.array(z.string()).default(['PostgreSQL', 'Redis']),
    ai_ml: z.array(z.string()).default(['Gemini API', 'PyTorch / Scikit-learn']),
    apis: z.array(z.string()).default(['RESTful JSON', 'WebSockets']),
    third_party: z.array(z.string()).default(['Vercel / Cloud Run', 'GitHub Actions'])
  }).default({
    frontend: ['React', 'TypeScript', 'Tailwind CSS'],
    backend: ['Node.js', 'Express', 'Python FastAPI'],
    database: ['PostgreSQL', 'Redis'],
    ai_ml: ['Gemini API', 'Scikit-learn'],
    apis: ['RESTful JSON', 'WebSockets'],
    third_party: ['Cloud Run', 'GitHub Actions']
  }),
  system_architecture_summary: z.string().default('Multi-tier cloud architecture with decoupled presentation and persistence layers.'),
  data_flow: z.array(z.string()).default(['Client sends authenticated HTTPS request to API Gateway', 'Gateway validates JWT and routes to backend service', 'Service executes business logic and updates database', 'Response serialized and rendered in client UI']),
  database_schema: z.object({
    tables: z.array(z.object({
      name: z.string(),
      description: z.string(),
      columns: z.array(z.string())
    })).default([
      { name: 'users', description: 'User accounts and credentials', columns: ['id UUID PRIMARY KEY', 'email VARCHAR UNIQUE', 'created_at TIMESTAMP'] },
      { name: 'projects', description: 'Capstone project records', columns: ['id UUID PRIMARY KEY', 'user_id UUID REFERENCES users(id)', 'title VARCHAR', 'status VARCHAR'] }
    ])
  }).default({
    tables: [
      { name: 'users', description: 'User accounts and credentials', columns: ['id UUID PRIMARY KEY', 'email VARCHAR UNIQUE', 'created_at TIMESTAMP'] },
      { name: 'projects', description: 'Capstone project records', columns: ['id UUID PRIMARY KEY', 'user_id UUID REFERENCES users(id)', 'title VARCHAR', 'status VARCHAR'] }
    ]
  }),
  api_structure: z.array(z.object({
    method: z.preprocess((v) => {
      const s = String(v || '').toUpperCase();
      if (['GET', 'POST', 'PUT', 'DELETE'].includes(s)) return s;
      if (s === 'PATCH') return 'PUT';
      return 'GET';
    }, z.enum(['GET', 'POST', 'PUT', 'DELETE'])).default('GET'),
    endpoint: z.string().default('/api/v1/resource'),
    description: z.string().default('Standard API endpoint')
  })).default([
    { method: 'GET', endpoint: '/api/v1/projects', description: 'Retrieve student project collection' },
    { method: 'POST', endpoint: '/api/v1/projects', description: 'Create and initialize a new project specification' }
  ]),
  security_considerations: z.array(z.string()).default(['JWT authentication with short expiration', 'Bcrypt password hashing (12 salt rounds)', 'SQL injection mitigation via parameterized ORM queries', 'Strict CORS and Helmet security headers']),
  testing_strategy: z.array(z.string()).default(['Unit testing for core business models', 'API integration tests', 'End-to-end user workflow tests']),
  deployment_plan: z.array(z.string()).default(['Docker containerization', 'CI/CD pipeline with GitHub Actions', 'Automated Cloud Run deployment with SSL']),
  risks: z.array(z.object({
    risk: z.string(),
    mitigation: z.string()
  })).default([
    { risk: 'Third-party API rate limits', mitigation: 'Implement local caching with Redis and graceful client fallbacks' }
  ]),
  future_improvements: z.array(z.string()).default(['Native mobile application integration', 'Federated learning module', 'Real-time collaborative whiteboard'])
});

export const architectureInputSchema = z.object({
  project_title: z.string().default('Capstone Project'),
  tech_stack: z.array(z.string()).default(['React', 'Node.js', 'PostgreSQL']),
  description: z.string().default('Full-stack system architecture')
});

export const architectureResponseSchema = z.object({
  title: z.string().default('System Architecture'),
  summary: z.string().default('Decoupled 8-tier vertical system architecture with secure API gateways and persistent storage.'),
  layers: z.array(z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
    iconName: z.string().default('Layers'),
    techNote: z.string().default('Production ready'),
    technologies: z.array(z.string()),
    details: z.string()
  })).min(1)
});

export const roadmapInputSchema = z.preprocess((raw: any) => {
  if (raw && typeof raw === 'object') {
    return {
      project_title: raw.project_title || raw.title || 'Engineering Project',
      tech_stack: Array.isArray(raw.tech_stack)
        ? raw.tech_stack
        : (typeof raw.tech_stack === 'string' ? raw.tech_stack.split(',').map((s: string) => s.trim()) : ['React', 'TypeScript', 'Node.js', 'PostgreSQL']),
      team_size: raw.team_size ?? 3,
      duration: raw.duration || '8 weeks',
      difficulty: raw.difficulty || raw.complexity || 'Intermediate'
    };
  }
  return raw;
}, z.object({
  project_title: z.string().default('Engineering Project'),
  tech_stack: z.array(z.string()).default(['React', 'TypeScript', 'Node.js', 'PostgreSQL']),
  team_size: z.coerce.number().default(3),
  duration: z.string().default('8 weeks'),
  difficulty: z.string().default('Intermediate')
}));

export const roadmapResponseSchema = z.object({
  phases: z.array(z.object({
    phase_number: z.coerce.number(),
    name: z.string(),
    description: z.string(),
    estimated_hours: z.coerce.number().default(20),
    dependencies: z.array(z.string()).default([]),
    completion_criteria: z.array(z.string()).default(['All core deliverables completed and verified']),
    tasks: z.array(z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      estimated_hours: z.coerce.number().default(5)
    })).default([])
  })).min(1)
});

export const evaluateInputSchema = z.preprocess((raw: any) => {
  if (raw && typeof raw === 'object') {
    return {
      title: raw.title || raw.project_title || 'Engineering Project',
      description: raw.description || raw.problem_statement || 'Final-year capstone project proposal',
      technologies: Array.isArray(raw.tech_stack)
        ? raw.tech_stack.join(', ')
        : (raw.technologies || raw.tech_stack || 'React, TypeScript, Node.js, Python'),
      target_users: raw.target_users || 'Students, Faculty, Industry Evaluators',
      features: raw.features || 'Core dashboard, authentication, RESTful APIs, data visualization'
    };
  }
  return raw;
}, z.object({
  title: z.string().default('Engineering Project'),
  description: z.string().default('Final-year capstone project proposal'),
  technologies: z.string().default('React, TypeScript, Node.js, Python'),
  target_users: z.string().default('Students, Faculty, Industry Evaluators'),
  features: z.string().default('Core dashboard, authentication, RESTful APIs, data visualization')
}));

export const evaluateResponseSchema = z.object({
  overall_score: score100,
  innovation: score10,
  feasibility: score10,
  technical_complexity: score10,
  real_world_impact: score10,
  academic_value: score10,
  career_value: score10,
  scalability: score10,
  strengths: z.array(z.string()).default(['Strong technical alignment with modern software patterns', 'Feasible scope for semester completion']),
  weaknesses: z.array(z.string()).default(['Requires rigorous unit testing across edge cases', 'Database query optimization needed under high concurrency']),
  risks: z.array(z.string()).default(['Third-party service rate limits', 'Dataset validation and noise handling']),
  missing_features: z.array(z.string()).default(['Automated test pipeline', 'Role-based access control policies']),
  recommended_improvements: z.array(z.string()).default(['Add caching layer with Redis', 'Implement Docker containerization for rapid reproducibility'])
});

export const improveInputSchema = z.preprocess((raw: any) => {
  if (raw && typeof raw === 'object') {
    const combined = raw.idea || [
      raw.original_title,
      raw.original_description,
      raw.improvement_goal ? `Goal: ${raw.improvement_goal}` : '',
      Array.isArray(raw.current_tech_stack) ? `Current Tech: ${raw.current_tech_stack.join(', ')}` : ''
    ].filter(Boolean).join(' - ');
    return { idea: combined || 'Smart Engineering System' };
  }
  return raw;
}, z.object({
  idea: z.string().min(2).default('Smart Engineering System')
}));

export const improveResponseSchema = z.object({
  original_idea: z.string(),
  problems: z.array(z.string()).default(['Generic implementation scope', 'Lack of algorithmic depth']),
  improved_concept: z.string().default('Next-Generation Distributed Intelligence Platform'),
  why_better: z.string().default('Elevates a standard system with real-time analytics, robust caching, and explainable AI insights.'),
  new_features: z.array(z.string()).default(['Real-time streaming pipeline', 'Automated anomaly detection', 'Role-based analytics dashboard']),
  technology_suggestions: z.array(z.string()).default(['FastAPI', 'PostgreSQL', 'Redis', 'React 18', 'Docker']),
  ai_opportunities: z.array(z.string()).default(['Gemini API integration for contextual reasoning', 'Automated document parsing']),
  innovation_opportunities: z.array(z.string()).default(['Edge computation', 'Zero-trust role authorization'])
});

export const mentorChatInputSchema = z.preprocess((raw: any) => {
  if (raw && typeof raw === 'object') {
    return {
      message: raw.message || '',
      conversation_history: raw.conversation_history || [],
      context: raw.context || raw.project_context || {}
    };
  }
  return raw;
}, z.object({
  message: z.string().min(1),
  conversation_history: z.array(z.object({
    role: z.string(),
    content: z.string()
  })).default([]),
  context: z.object({
    student_name: z.string().optional(),
    career_goal: z.string().optional(),
    project_title: z.string().optional(),
    project_description: z.string().optional(),
    tech_stack: z.array(z.string()).optional(),
    current_phase: z.string().optional(),
    completed_tasks_count: z.number().optional(),
    total_tasks_count: z.number().optional(),
    current_task: z.string().optional()
  }).optional()
}));

