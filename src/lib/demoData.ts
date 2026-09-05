import {
  StudentProfile,
  ProjectIdea,
  ProjectBlueprint,
  ProjectArchitecture,
  ProjectRoadmap,
  ProjectPhase,
  ProjectTask,
  ProjectEvaluation,
  IdeaImprovement,
  EvaluationResult,
  ImprovedIdeaResult
} from '../types';

export const DEMO_PROFILE: StudentProfile = {
  name: 'Alex Rivera',
  college: 'National Institute of Technology',
  degree: 'Bachelor of Technology',
  branch: 'Computer Science & Engineering',
  year: '4th Year (Final Year)',
  skills: ['Python', 'React', 'SQL', 'Machine Learning', 'FastAPI'],
  interests: ['AI/ML', 'Healthcare', 'Web Development'],
  experience_level: 'Intermediate',
  team_size: 3,
  available_time: '3 months',
  hardware: 'Laptop with NVIDIA RTX 4060 GPU',
  budget: 'Zero budget / Free tier APIs',
  career_goal: 'AI/ML Engineer'
};

export const DEMO_BLUEPRINT: ProjectBlueprint = {
  project_overview: 'The AI Healthcare Risk Prediction Platform is an intelligent clinical decision support system designed to assist healthcare practitioners in stratifying patient risk for cardiovascular complications and metabolic disorders. By combining electronic health metrics with modern gradient boosting and explainable AI techniques (SHAP/LIME), the system provides doctors with actionable risk percentiles and diagnostic attribution factors in under 500 milliseconds.',
  problem_statement: 'Cardiovascular disease remains the leading cause of preventable mortality globally. Hospital triage units and outpatient clinics often lack real-time predictive analytics to detect rapid condition deterioration before acute events occur. Traditional heuristic scoring rules (e.g. Framingham risk scores) are static and fail to capture non-linear interactions across diverse longitudinal patient vitals.',
  background: 'Clinical decision support systems (CDSS) have evolved from rigid rule-based expert systems to statistical machine learning. However, modern hospitals require zero-trust data privacy, explainable model predictions that doctors can audit during peer review, and sub-second inference speeds across standard clinical workstations.',
  objectives: [
    'Train and validate a supervised gradient-boosted classifier achieving >88% ROC-AUC on patient cardiovascular datasets.',
    'Implement SHAP (SHapley Additive exPlanations) attribution vectors to display the top 5 contributing biometric risk factors per diagnosis.',
    'Build an interactive physician dashboard with responsive real-time vital sliders and automated risk tier badges.',
    'Implement exportable clinical audit reports formatted to HL7/FHIR compliant JSON standards.'
  ],
  target_users: [
    'Cardiologists and Internal Medicine Physicians seeking secondary diagnostic verification.',
    'Emergency Department Triage Nurses prioritizing inpatient admissions.',
    'Academic Capstone Reviewers evaluating clinical data handling and explainable AI.'
  ],
  proposed_solution: 'A modern full-stack web application featuring a Python FastAPI inference microservice, a PostgreSQL database for anonymized patient records, and a responsive React frontend equipped with interactive radar charts and risk progress rings.',
  core_features: [
    'Multi-Parameter Patient Intake Form with real-time range validation',
    'Real-Time Risk Probability Inference Engine with sub-200ms latency',
    'Interactive SHAP Factor Breakdown visualizer for clinician transparency',
    'Historical Patient Risk Trend Timeline tracking longitudinal readings',
    'One-Click Clinical Summary Report Generator with PDF download'
  ],
  advanced_features: [
    'What-If Parameter Simulation Sandbox (e.g., simulating 15% systolic blood pressure reduction)',
    'Synthetic Patient Generator using SMOTE and Gaussian Copula for student testing',
    'Local On-Device Inference mode utilizing ONNX Runtime for strict zero-cloud privacy'
  ],
  user_roles: ['Attending Physician', 'Triage Nurse', 'Clinical Auditor / Admin'],
  functional_requirements: [
    'The system shall compute risk scores based on 12 key biometric biomarkers.',
    'The system shall flag anomalous inputs exceeding physiological safety thresholds.',
    'The system shall output both aggregate risk percentile (0-100%) and categoric tier (Low, Moderate, High, Critical).',
    'The system shall maintain an immutable audit log of all risk assessments.'
  ],
  non_functional_requirements: [
    'Inference API response latency must not exceed 400ms at 95th percentile.',
    'Data at rest must be encrypted using AES-256 with salted HMAC hashing for patient identifiers.',
    'Client interface must render with zero layout shift (CLS < 0.05) across desktop and tablet tablets.'
  ],
  technology_stack: {
    frontend: ['React 19', 'TypeScript', 'Tailwind CSS', 'Lucide React', 'Recharts'],
    backend: ['Python 3.11', 'FastAPI', 'Pydantic v2', 'Uvicorn'],
    database: ['PostgreSQL 16', 'SQLAlchemy ORM', 'Alembic migrations'],
    ai_ml: ['Scikit-learn', 'XGBoost', 'SHAP', 'NumPy / Pandas', 'ONNX Runtime'],
    apis: ['RESTful OpenAPI v3 endpoints', 'WebSocket live monitor stream'],
    third_party: ['Supabase Auth / Storage', 'Docker container engine']
  },
  system_architecture_summary: 'Three-tier decoupled architecture: A React SPA serves the clinician interface, communicating via HTTPS REST with a Python FastAPI inference backend. The backend queries PostgreSQL for anonymized historical cohorts and runs cached pre-trained XGBoost inference artifacts stored in memory.',
  data_flow: [
    '1. Clinician inputs patient vitals via React form or selects a preloaded cohort profile.',
    '2. Frontend validates client-side constraints and submits payload to POST /api/v1/predict.',
    '3. FastAPI API Gateway verifies JWT bearer token and deserializes payload via Pydantic model.',
    '4. Preprocessing pipeline imputes missing signals, normalizes continuous metrics, and invokes model.predict_proba().',
    '5. SHAP TreeExplainer generates Shapley attribution values for top biometric features.',
    '6. Anonymized assessment record saved to PostgreSQL; JSON risk response dispatched to React frontend in <250ms.'
  ],
  database_schema: {
    tables: [
      {
        name: 'patients',
        description: 'De-identified patient demographic and baseline clinical records.',
        columns: ['id UUID PRIMARY KEY', 'anonymous_mrn VARCHAR(64) UNIQUE', 'age_years INT', 'gender VARCHAR(10)', 'created_at TIMESTAMP']
      },
      {
        name: 'risk_assessments',
        description: 'Historical prediction logs with calculated scores and primary biomarkers.',
        columns: ['id UUID PRIMARY KEY', 'patient_id UUID REFERENCES patients(id)', 'risk_percentage NUMERIC(5,2)', 'risk_category VARCHAR(20)', 'shap_values JSONB', 'assessed_at TIMESTAMP']
      },
      {
        name: 'vital_records',
        description: 'Longitudinal time-series biomarker samples.',
        columns: ['id UUID PRIMARY KEY', 'patient_id UUID REFERENCES patients(id)', 'systolic_bp INT', 'cholesterol_mgdl NUMERIC', 'glucose_fasting NUMERIC', 'recorded_at TIMESTAMP']
      }
    ]
  },
  api_structure: [
    { method: 'POST', endpoint: '/api/v1/predict', description: 'Computes patient risk score and SHAP attribution vectors.' },
    { method: 'GET', endpoint: '/api/v1/patients/{id}/history', description: 'Returns longitudinal risk trajectory and vital series.' },
    { method: 'POST', endpoint: '/api/v1/simulate', description: 'Executes what-if scenario prediction on adjusted vitals.' },
    { method: 'GET', endpoint: '/api/v1/export/report/{id}', description: 'Generates structured clinical summary report.' }
  ],
  security_considerations: [
    'Strict PII anonymization: no patient names, phone numbers, or government IDs stored.',
    'JWT Token Authentication with 60-minute expiration and secure HTTP-only cookies.',
    'Rate-limiting middleware (100 req/min/IP) to prevent brute-force inference extraction.',
    'HTTPS TLS 1.3 enforced across all API endpoints with strict Content Security Policies.'
  ],
  testing_strategy: [
    'Unit tests for ML preprocessing pipeline and threshold validators using Pytest.',
    'Cross-validation testing on held-out test splits evaluating Precision, Recall, and F1 score.',
    'API contract and regression testing using FastAPI TestClient.',
    'End-to-End browser workflow testing with Playwright.'
  ],
  deployment_plan: [
    'Containerize FastAPI backend and ML models with multi-stage Dockerfile.',
    'Deploy PostgreSQL database on Supabase or managed Cloud SQL instance.',
    'Host React frontend on Vercel/Cloud Run with automatic CI/CD deployment on main branch push.',
    'Set up Prometheus monitoring for endpoint latency and inference error rates.'
  ],
  risks: [
    { risk: 'Class imbalance in medical training datasets causing elevated false negatives.', mitigation: 'Apply SMOTE oversampling and tune decision threshold to prioritize high recall on high-risk tiers.' },
    { risk: 'Model interpretability skepticism from evaluating college professors.', mitigation: 'Integrate interactive SHAP force plots and feature importance waterfall charts directly into the UI.' },
    { risk: 'Hardware memory constraints when serving heavy ML libraries.', mitigation: 'Export trained model to lightweight ONNX runtime format, reducing RAM overhead by >65%.' }
  ],
  future_improvements: [
    'Integrate multimodal image analysis for chest X-ray and retinal scan inputs.',
    'Implement federated learning architecture for privacy-preserving collaborative model updates.',
    'Add multilingual voice dictation for automated symptom transcription during intake.'
  ]
};

export const DEMO_ARCHITECTURE: ProjectArchitecture = {
  title: 'AI Healthcare Risk Prediction Platform System Architecture',
  summary: 'A resilient, low-latency 8-layer decoupled architecture separating secure physician UI interactions from high-throughput ML inference and immutable data storage.',
  layers: [
    {
      id: 'layer-1',
      name: 'Physician & Clinician Layer',
      role: 'Client Interaction & Intake',
      iconName: 'Users',
      techNote: 'Desktop & Tablet Browsers (Responsive Web)',
      technologies: ['Google Chrome', 'Safari', 'Firefox', 'Mobile Tablet'],
      details: 'Clinicians enter patient biometric inputs, inspect interactive SHAP waterfall graphs, and adjust what-if sliders.'
    },
    {
      id: 'layer-2',
      name: 'Frontend Application Tier',
      role: 'Presentation & Client State',
      iconName: 'Layout',
      techNote: 'React 19 + TypeScript + Tailwind CSS',
      technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Lucide React', 'Recharts'],
      details: 'Handles optimistic UI state, dynamic validation rules, accessibility compliance, and real-time visualization of risk trajectories.'
    },
    {
      id: 'layer-3',
      name: 'API Gateway & Reverse Proxy',
      role: 'Routing & Rate Limiting',
      iconName: 'Globe',
      techNote: 'FastAPI / Nginx Reverse Proxy',
      technologies: ['Nginx', 'CORS Middleware', 'SlowAPI Rate Limiter', 'Pydantic v2'],
      details: 'Enforces strict SSL/TLS termination, sanitizes incoming payloads, and caps request rates to protect against denial-of-service.'
    },
    {
      id: 'layer-4',
      name: 'Authentication & Access Control',
      role: 'Identity Verification & RBAC',
      iconName: 'ShieldCheck',
      techNote: 'Supabase Auth / JWT Tokens',
      technologies: ['Supabase Auth', 'JWT Bearer Tokens', 'Role-Based Policies (RLS)'],
      details: 'Verifies clinician credentials, issues cryptographically signed session tokens, and validates clinician authorization scopes.'
    },
    {
      id: 'layer-5',
      name: 'Backend Application Services',
      role: 'Business Logic & Orchestration',
      iconName: 'Server',
      techNote: 'FastAPI Python 3.11 Async Workers',
      technologies: ['FastAPI', 'AsyncIO', 'SQLAlchemy Core', 'Pydantic Serialization'],
      details: 'Executes clinical risk calculation workflows, coordinates with the ML inference pipeline, and generates audit logs.'
    },
    {
      id: 'layer-6',
      name: 'Database & Persistence Layer',
      role: 'Structured & Anonymized Storage',
      iconName: 'Database',
      techNote: 'PostgreSQL 16 with Row Level Security',
      technologies: ['PostgreSQL 16', 'Supabase DB', 'Alembic Migrations', 'Redis Cache'],
      details: 'Stores anonymized patient longitudinal records, prediction snapshots, and clinical audit logs with column-level encryption.'
    },
    {
      id: 'layer-7',
      name: 'AI & Machine Learning Engine',
      role: 'Inference & Explainability',
      iconName: 'Cpu',
      techNote: 'XGBoost + SHAP Explainability + Gemini API',
      technologies: ['XGBoost', 'Scikit-learn', 'SHAP TreeExplainer', 'Google Gemini API', 'ONNX Runtime'],
      details: 'Executes pre-trained gradient-boosted decision trees, generates Shapley attribution values, and produces natural language clinical summaries.'
    },
    {
      id: 'layer-8',
      name: 'External Services & Deployment',
      role: 'Cloud Infrastructure & Backing Services',
      iconName: 'Cloud',
      techNote: 'Supabase Storage, Cloud Run / Vercel',
      technologies: ['Docker Containers', 'Vercel CDN', 'Supabase Cloud Storage', 'GitHub Actions CI/CD'],
      details: 'Automated CI/CD deployment pipelines, PDF report document storage, and centralized error logging via Prometheus.'
    }
  ]
};

export const DEMO_ROADMAP_RAW = [
  {
    phase_number: 1,
    name: 'Requirement Analysis & Clinical Scope',
    description: 'Define target biometric biomarkers, establish clinical thresholds with research papers, and document user roles.',
    estimated_hours: 18,
    dependencies: [],
    completion_criteria: [
      'Documented Software Requirement Specification (SRS) with 12 input biomarkers',
      'Target performance benchmarks defined (>85% Recall on high-risk cohort)',
      'Clinical advisor approval on de-identification protocols'
    ],
    tasks: [
      { id: 't-101', title: 'Survey clinical cardiovascular risk indicators (Framingham, AHA guidelines)', description: 'Extract standard diagnostic criteria from cardiology literature.', estimated_hours: 6, completed: true },
      { id: 't-102', title: 'Compile functional and non-functional requirements specification', description: 'Document latency, privacy, and accuracy parameters.', estimated_hours: 6, completed: true },
      { id: 't-103', title: 'Map out user journey for outpatient triage and emergency intake', description: 'Design workflow wireframes and role matrix.', estimated_hours: 6, completed: true }
    ]
  },
  {
    phase_number: 2,
    name: 'Research & Literature Survey',
    description: 'Acquire open-access medical datasets (Kaggle/PhysioNet), explore exploratory data analysis (EDA), and assess missing values.',
    estimated_hours: 24,
    dependencies: ['Requirement Analysis & Clinical Scope'],
    completion_criteria: [
      'Cleaned dataset with >5,000 patient records',
      'Jupyter notebook detailing correlation heatmaps and biomarker distributions',
      'Benchmark baseline established using Logistic Regression'
    ],
    tasks: [
      { id: 't-201', title: 'Download and audit Kaggle Cardiovascular Disease & Diabetes datasets', description: 'Verify license, data types, and check for outliers.', estimated_hours: 8, completed: true },
      { id: 't-202', title: 'Perform Exploratory Data Analysis (EDA) and correlation matrix generation', description: 'Analyze distributions of systolic BP, cholesterol, and blood glucose.', estimated_hours: 8, completed: true },
      { id: 't-203', title: 'Document comparative study of Logistic Regression vs Random Forest vs XGBoost', description: 'Summarize strengths and weaknesses for capstone report.', estimated_hours: 8, completed: true }
    ]
  },
  {
    phase_number: 3,
    name: 'Database & Schema Design',
    description: 'Model relational tables in PostgreSQL for de-identified patients, assessment snapshots, and vital history.',
    estimated_hours: 20,
    dependencies: ['Research & Literature Survey'],
    completion_criteria: [
      'Normalized schema (3NF) implemented in PostgreSQL',
      'Database migration scripts verified with rollback testing',
      'Row Level Security policies configured to restrict cross-tenant reads'
    ],
    tasks: [
      { id: 't-301', title: 'Design Entity-Relationship diagram for patients, assessments, and vitals', description: 'Draft ERD with UUID primary keys and foreign key constraints.', estimated_hours: 6, completed: true },
      { id: 't-302', title: 'Write Supabase/PostgreSQL schema definitions and indexes', description: 'Add B-tree indexes on patient_id and assessed_at columns.', estimated_hours: 8, completed: false },
      { id: 't-303', title: 'Implement Row Level Security (RLS) policies for user data isolation', description: 'Ensure doctors only access their assigned clinical records.', estimated_hours: 6, completed: false }
    ]
  },
  {
    phase_number: 4,
    name: 'Backend Development & API Layer',
    description: 'Build high-performance REST endpoints with FastAPI, request validation with Pydantic, and database ORM layer.',
    estimated_hours: 32,
    dependencies: ['Database & Schema Design'],
    completion_criteria: [
      'Working /api/v1/predict and /api/v1/patients endpoints',
      'Swagger OpenAPI interactive documentation auto-generated',
      'JWT authentication middleware protecting all patient routes'
    ],
    tasks: [
      { id: 't-401', title: 'Scaffold FastAPI application structure with routers and dependency injection', description: 'Configure CORS, logging, and environment variable loaders.', estimated_hours: 8, completed: false },
      { id: 't-402', title: 'Build Pydantic validation schemas with strict clinical range clamps', description: 'Validate age (1-120), systolic BP (70-250), heart rate (30-220).', estimated_hours: 8, completed: false },
      { id: 't-403', title: 'Implement database CRUD operations with SQLAlchemy async sessions', description: 'Write optimized async queries for patient risk trajectory retrieval.', estimated_hours: 8, completed: false },
      { id: 't-404', title: 'Add rate limiting and CORS security headers', description: 'Prevent endpoint flooding with SlowAPI middleware.', estimated_hours: 8, completed: false }
    ]
  },
  {
    phase_number: 5,
    name: 'AI/ML Development & Explainability Engine',
    description: 'Train XGBoost classification pipeline, tune hyperparameters via Optuna, and generate SHAP explainability vectors.',
    estimated_hours: 38,
    dependencies: ['Research & Literature Survey'],
    completion_criteria: [
      'Model achieves >89% ROC-AUC on validation split',
      'Sub-50ms SHAP TreeExplainer calculation per inference request',
      'Serialized model artifact (.onnx or .joblib) packaged for production'
    ],
    tasks: [
      { id: 't-501', title: 'Build robust data preprocessing pipeline (Imputer, Scaler, Encoder)', description: 'Handle missing clinical vitals using median imputation and RobustScaler.', estimated_hours: 10, completed: false },
      { id: 't-502', title: 'Train and fine-tune XGBoost classifier with cross-validation', description: 'Run hyperparameter optimization targeting F1-score on high-risk cases.', estimated_hours: 12, completed: false },
      { id: 't-503', title: 'Integrate SHAP TreeExplainer to produce feature attribution rankings', description: 'Format positive/negative attribution vectors for top 5 factors.', estimated_hours: 10, completed: false },
      { id: 't-504', title: 'Export model to ONNX runtime format for minimal server footprint', description: 'Verify inference numerical parity between scikit-learn and ONNX.', estimated_hours: 6, completed: false }
    ]
  },
  {
    phase_number: 6,
    name: 'Frontend Development & Visualizer',
    description: 'Create modern React dashboard with interactive intake forms, risk gauges, SHAP radar charts, and dark theme.',
    estimated_hours: 36,
    dependencies: ['Requirement Analysis & Clinical Scope'],
    completion_criteria: [
      'Pixel-perfect responsive clinician dashboard running on React + Tailwind',
      'Interactive risk score circular gauge and what-if simulation sliders',
      'Accessible WCAG AA contrast and full keyboard navigable forms'
    ],
    tasks: [
      { id: 't-601', title: 'Construct Patient Intake Form with real-time biometric feedback', description: 'Add quick preset buttons (e.g., "Normal Vitals", "Elevated Risk").', estimated_hours: 10, completed: false },
      { id: 't-602', title: 'Build dynamic Risk Score Ring with color-coded severity tiers', description: 'Low (emerald), Moderate (amber), High (orange), Critical (rose).', estimated_hours: 8, completed: false },
      { id: 't-603', title: 'Integrate SHAP Feature Attribution Waterfall / Radar visualizer', description: 'Display how blood pressure and cholesterol shifted the risk score.', estimated_hours: 10, completed: false },
      { id: 't-604', title: 'Implement What-If Parameter Simulation slider controls', description: 'Re-compute risk prediction dynamically as slider moves.', estimated_hours: 8, completed: false }
    ]
  },
  {
    phase_number: 7,
    name: 'System Integration & Middleware',
    description: 'Connect frontend with backend API endpoints, integrate Gemini AI for clinical natural language summaries, and handle errors.',
    estimated_hours: 26,
    dependencies: ['Backend Development & API Layer', 'Frontend Development & Visualizer', 'AI/ML Development & Explainability Engine'],
    completion_criteria: [
      'Full end-to-end flow operating from patient input to AI explanation',
      'Zero unhandled promise rejections or UI crashes',
      'Automated fallback mode when external services or APIs are unreachable'
    ],
    tasks: [
      { id: 't-701', title: 'Wire React data fetching with error boundaries and toast notifications', description: 'Display user-friendly errors on network timeouts or invalid inputs.', estimated_hours: 8, completed: false },
      { id: 't-702', title: 'Connect Gemini API for automated clinical narrative summaries', description: 'Generate doctor-friendly synthesis explaining SHAP results.', estimated_hours: 10, completed: false },
      { id: 't-703', title: 'Implement local offline caching with IndexedDB / localStorage fallback', description: 'Preserve student form draft state during network dropouts.', estimated_hours: 8, completed: false }
    ]
  },
  {
    phase_number: 8,
    name: 'Comprehensive Testing & Security Audit',
    description: 'Execute unit tests, clinical range edge case validation, security scanning, and verify OWASP top 10 safeguards.',
    estimated_hours: 20,
    dependencies: ['System Integration & Middleware'],
    completion_criteria: [
      '>80% test coverage across backend utility functions and API handlers',
      'Automated security scan passing with zero high-severity vulnerabilities',
      'Cross-browser verification on Chrome, Firefox, Safari, and Edge'
    ],
    tasks: [
      { id: 't-801', title: 'Write Pytest suite for preprocessing pipeline and threshold edge cases', description: 'Test extreme physiological values (e.g., systolic BP 300).', estimated_hours: 6, completed: false },
      { id: 't-802', title: 'Perform security audit for SQL injection, XSS, and broken access control', description: 'Sanitize all user-rendered strings and verify parameterized queries.', estimated_hours: 6, completed: false },
      { id: 't-803', title: 'Conduct user acceptance testing (UAT) with peer student reviewers', description: 'Collect feedback on UI clarity, font legibility, and loading speed.', estimated_hours: 8, completed: false }
    ]
  },
  {
    phase_number: 9,
    name: 'Deployment & Final Defense Preparation',
    description: 'Deploy production container build, compile final engineering documentation, and rehearse presentation demo script.',
    estimated_hours: 18,
    dependencies: ['Comprehensive Testing & Security Audit'],
    completion_criteria: [
      'Public HTTPS live demo URL operating with <1s cold-start',
      'Published GitHub repository with clean README and architecture diagrams',
      'Slide deck and 5-minute video presentation ready for university defense'
    ],
    tasks: [
      { id: 't-901', title: 'Configure production Dockerfile and deploy to Cloud Run / Vercel', description: 'Set up environment variables and automated health check route.', estimated_hours: 6, completed: false },
      { id: 't-902', title: 'Generate comprehensive Capstone Project Report PDF with all diagrams', description: 'Assemble introduction, literature survey, methodology, and results.', estimated_hours: 8, completed: false },
      { id: 't-903', title: 'Prepare 10-slide defense presentation deck with live demo walkthrough', description: 'Highlight novelty, model accuracy, SHAP explainability, and future work.', estimated_hours: 4, completed: false }
    ]
  }
];

export const DEMO_ROADMAP: ProjectRoadmap = {
  title: '9-Phase Engineering Sprint Roadmap',
  total_duration: '12-16 Weeks',
  phases: DEMO_ROADMAP_RAW.map(p => ({
    phase_number: p.phase_number,
    phase_name: p.name,
    duration: `${Math.max(1, Math.round(p.estimated_hours / 10))} weeks`,
    goal: p.description,
    deliverables: p.completion_criteria,
    tasks: p.tasks.map(t => ({
      id: t.id,
      title: t.title,
      estimated_hours: t.estimated_hours,
      status: t.completed ? 'Completed' : 'Pending'
    }))
  }))
};

export const DEMO_PROJECT_IDEAS: ProjectIdea[] = [
  {
    id: 'proj-demo-1',
    title: 'AI Healthcare Risk Prediction Platform',
    description: 'An explainable clinical decision-support system that predicts patient risk for cardiovascular complications using gradient boosting and SHAP attribution vectors.',
    problem_statement: 'Cardiovascular complications are often caught too late in outpatient triage due to static heuristic scoring systems that fail to detect multi-variable biometric deterioration.',
    proposed_solution: 'A modern web dashboard combining FastAPI ML inference with interactive SHAP explainability graphs, allowing clinicians to review risk percentiles and simulate treatment interventions in real time.',
    target_users: ['Outpatient Clinic Doctors', 'Emergency Triage Nurses', 'Cardiology Researchers'],
    real_world_relevance: 'Directly addresses preventable hospital readmissions and empowers junior physicians with explainable, data-backed diagnostic second opinions.',
    required_skills: ['Python', 'Machine Learning', 'FastAPI', 'React', 'SQL'],
    technology_stack: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Scikit-learn', 'XGBoost', 'SHAP'],
    core_features: [
      '12-Factor Biometric Intake Form with instant range validation',
      'Real-Time Risk Probability Calculator with color-coded severity badge',
      'SHAP Factor Waterfall Chart showing top contributing vital metrics',
      'Longitudinal Patient History Timeline tracking risk changes over time',
      'One-Click Exportable Clinical PDF Summary'
    ],
    advanced_features: [
      'Interactive What-If Parameter Simulation Slider Sandbox',
      'Synthetic Patient Generator using Gaussian Copula for test cohorts',
      'Local On-Device ONNX inference option for strict zero-cloud privacy'
    ],
    estimated_duration: '8 weeks',
    difficulty: 'Intermediate',
    match_score: 93,
    innovation_score: 8.7,
    feasibility_score: 9.1,
    impact_score: 9.2,
    career_score: 9.4,
    why_fit: 'This project directly leverages your Python, Machine Learning, and SQL skills, fits comfortably in your 3-member team and 3-month timeline, and serves as an exceptional portfolio centerpiece for your career goal as an AI/ML Engineer.',
    potential_challenges: [
      'Managing clinical dataset imbalance between healthy and critical patients',
      'Ensuring SHAP attribution calculation latency remains under 300ms',
      'Formulating rigorous ethical disclaimers for non-diagnostic academic use'
    ],
    future_improvements: [
      'Incorporate multimodal chest X-ray deep learning classification',
      'Add federated edge model retraining without raw data centralization',
      'Support HL7/FHIR EHR system interoperability protocols'
    ],
    blueprint: DEMO_BLUEPRINT,
    architecture: DEMO_ARCHITECTURE,
    roadmap: DEMO_ROADMAP
  },
  {
    id: 'proj-demo-2',
    title: 'Smart Adaptive Code Review & Security Auditor',
    description: 'An automated static analysis and LLM-powered assistant that inspects pull requests for OWASP vulnerabilities, algorithmic complexity bottlenecks, and architectural anti-patterns.',
    problem_statement: 'Junior developers frequently introduce security vulnerabilities (SQL injection, hardcoded secrets) and suboptimal O(N^2) loops that slip past peer reviews in fast-paced teams.',
    proposed_solution: 'A GitHub-integrated CI bot that parses abstract syntax trees (AST) and generates contextual refactoring pull-request comments with automated benchmark tests.',
    target_users: ['University Coding Labs', 'Student Hackathon Teams', 'Open Source Maintainers'],
    real_world_relevance: 'Accelerates developer onboarding, reduces code review fatigue, and teaches best security practices directly inside the workflow.',
    required_skills: ['Python', 'TypeScript', 'Node.js', 'Static Analysis', 'Gemini API'],
    technology_stack: ['TypeScript', 'Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Gemini API'],
    core_features: [
      'GitHub Webhook Integration for automated PR scanning',
      'AST-based syntax security pattern matching for credentials & injection flaws',
      'AI-Powered Code Refactoring with before-and-after side-by-side diffs',
      'Project Security Health Scorecard with historical trend badges',
      'Customizable lint and security rule enforcement configuration'
    ],
    advanced_features: [
      'Algorithmic Big-O Complexity estimator from control flow graphs',
      'Automated synthetic unit test generator for untested branches',
      'Interactive WebAssembly code sandbox for live patch testing'
    ],
    estimated_duration: '10 weeks',
    difficulty: 'Intermediate',
    match_score: 89,
    innovation_score: 8.9,
    feasibility_score: 8.8,
    impact_score: 8.5,
    career_score: 9.2,
    why_fit: 'Capitalizes on your React and Python abilities while showcasing modern developer tooling expertise that tech company recruiters actively seek.',
    potential_challenges: [
      'Minimizing false-positive security warnings to avoid developer alert fatigue',
      'Safely sandboxing untrusted student code during analysis',
      'Token consumption optimization when processing large repositories'
    ],
    future_improvements: [
      'Add multi-language support (Go, Rust, Java, C++)',
      'IDE extension for VS Code with inline red underlines',
      'Team-wide knowledge sharing leaderboard and common mistake highlights'
    ]
  },
  {
    id: 'proj-demo-3',
    title: 'Autonomous Campus Energy & HVAC Optimization Sentinel',
    description: 'An IoT and machine learning digital twin that models classroom energy usage and predicts optimal heating, cooling, and lighting schedules to reduce campus carbon footprint.',
    problem_statement: 'University buildings waste thousands of kilowatt-hours conditioning unoccupied lecture halls and running lighting systems during peak grid rate hours.',
    proposed_solution: 'A time-series forecasting pipeline integrating microclimate telemetry and campus class schedules to autonomously optimize HVAC setpoints.',
    target_users: ['Campus Sustainability Officers', 'Facilities Management Staff', 'Student Green Clubs'],
    real_world_relevance: 'Demonstrates tangible monetary savings and measurable carbon emissions reduction for institutional sustainability goals.',
    required_skills: ['Python', 'Time-Series ML', 'IoT Telemetry', 'React', 'PostgreSQL'],
    technology_stack: ['Python', 'FastAPI', 'Prophet/LSTM', 'React', 'TimescaleDB', 'MQTT'],
    core_features: [
      'Live Campus Building Energy Telemetry Heatmap',
      '24-Hour Predictive Load Forecast based on weather and timetable feeds',
      'Automated HVAC Setpoint Adjustment Recommendation alerts',
      'Carbon Savings & Energy Cost Reduction Counter',
      'Anomaly Alert notification on overnight power leaks'
    ],
    advanced_features: [
      'Digital Twin 3D classroom occupancy simulation in Three.js',
      'Demand-response grid peak shaving dispatch algorithm',
      'Solar micro-generation surplus diversion scheduler'
    ],
    estimated_duration: '12 weeks',
    difficulty: 'Advanced',
    match_score: 86,
    innovation_score: 9.2,
    feasibility_score: 8.1,
    impact_score: 9.3,
    career_score: 8.8,
    why_fit: 'Exciting crossover between Data Science, IoT telemetry, and Sustainability with high real-world campus defense demonstration impact.',
    potential_challenges: [
      'Simulating realistic sensor streams if physical IoT access is limited',
      'Handling sudden unseasonal weather volatility in forecast models',
      'Lag between HVAC adjustment commands and room temperature equilibrium'
    ],
    future_improvements: [
      'Hardware integration with physical ESP32 environmental sensors',
      'Reinforcement learning controller for dynamic multi-zone climate control',
      'Mobile app for faculty to report room comfort temperature votes'
    ]
  },
  {
    id: 'proj-demo-4',
    title: 'Decentralized Academic Credential & Skill Verification Ledger',
    description: 'A tamper-proof credential issuance and instant verification platform allowing universities to issue cryptographically signed digital diplomas and micro-certifications.',
    problem_statement: 'Resume fraud and diploma mills cost employers billions while legitimate graduates face weeks of bureaucratic delay when applying for overseas universities or jobs.',
    proposed_solution: 'A cryptographic verification registry where universities anchor credential hashes, enabling one-click instant QR verification without third-party fees.',
    target_users: ['University Registrars', 'Hiring Recruiters', 'Graduating Students'],
    real_world_relevance: 'Eliminates verification fraud and gives students permanent, sovereign ownership of their academic achievements.',
    required_skills: ['TypeScript', 'Cryptography / Web3', 'React', 'PostgreSQL', 'Node.js'],
    technology_stack: ['Next.js / React', 'TypeScript', 'Ethers.js', 'PostgreSQL', 'Tailwind CSS', 'IPFS'],
    core_features: [
      'Registrar Batch Credential Minting & Signing Portal',
      'Student Digital Wallet & Portfolio Showcase',
      'Public Instant QR Verification Scanner (zero login required)',
      'Granular Privacy Sharing (share degree without exposing GPA)',
      'Automated Revocation & Correction audit trail'
    ],
    advanced_features: [
      'Zero-Knowledge Proof credential attribute verification',
      'Decentralized IPFS encrypted transcript storage',
      'Automated LinkedIn credential badge sync'
    ],
    estimated_duration: '8 weeks',
    difficulty: 'Intermediate',
    match_score: 84,
    innovation_score: 9.0,
    feasibility_score: 8.7,
    impact_score: 8.6,
    career_score: 9.0,
    why_fit: 'Great fit for a full-stack engineering portfolio highlighting modern cryptography and security fundamentals.',
    potential_challenges: [
      'Explaining public key cryptography clearly to non-technical evaluators',
      'Ensuring compliance with student data protection regulations (FERPA/GDPR)',
      'Handling key loss and account recovery without centralized master keys'
    ],
    future_improvements: [
      'Standard W3C Verifiable Credentials (VC) specification compliance',
      'Multi-university consortium consensus network',
      'Direct integration with major HR applicant tracking systems (ATS)'
    ]
  },
  {
    id: 'proj-demo-5',
    title: 'Multi-Modal Voice & Video Interview Coach for Tech Roles',
    description: 'An AI-powered mock interview simulator that conducts realistic technical behavioral and coding interviews, evaluating body language, speech cadence, and technical depth.',
    problem_statement: 'Students from non-metropolitan engineering colleges often face high rejection rates in tech interviews due to lack of mock interview practice and communication anxiety.',
    proposed_solution: 'A browser-based interview coach that asks adaptive follow-up questions, monitors speech pace and filler words, and delivers actionable rubric feedback.',
    target_users: ['Pre-Final and Final-Year Students', 'College Placement Cells', 'Career Changers'],
    real_world_relevance: 'Democratizes high-tier interview preparation for thousands of students without requiring expensive private coaching.',
    required_skills: ['React', 'Python / Node.js', 'Speech Recognition', 'Gemini API', 'WebRTC'],
    technology_stack: ['React', 'Node.js', 'Web Speech API', 'Gemini API', 'PostgreSQL', 'Tailwind CSS'],
    core_features: [
      'Role-Specific Question Bank (Frontend, Backend, ML, DevOps)',
      'Real-Time Speech-to-Text Transcription with filler word detector',
      'Dynamic Adaptive AI Follow-up Questions based on student answers',
      'Comprehensive Scoring Breakdown (Technical accuracy, Clarity, Structure)',
      'Personalized Improvement Plan with model answer suggestions'
    ],
    advanced_features: [
      'Computer Vision eye contact and posture engagement meter',
      'Interactive Live Coding Whiteboard with syntax execution',
      'Company-specific interview culture simulators (FAANG, Startups, Consulting)'
    ],
    estimated_duration: '8 weeks',
    difficulty: 'Intermediate',
    match_score: 91,
    innovation_score: 9.4,
    feasibility_score: 8.9,
    impact_score: 9.5,
    career_score: 9.6,
    why_fit: 'Directly tackles a problem every final-year student experiences, making it an instant crowd favorite during college demonstrations.',
    potential_challenges: [
      'Handling background ambient microphone noise in student dorms',
      'Calibrating fair, encouraging scoring across varied accents',
      'Keeping streaming latency low during conversational turn-taking'
    ],
    future_improvements: [
      'System design interactive diagramming canvas',
      'Peer-to-peer collaborative mock interview rooms',
      'Alumni mentor pairing marketplace'
    ]
  }
];

export const DEMO_EVALUATION: ProjectEvaluation = {
  overall_score: 91,
  innovation: 8.8,
  feasibility: 9.2,
  technical_complexity: 8.9,
  real_world_impact: 9.4,
  academic_value: 9.3,
  career_value: 9.5,
  scalability: 8.7,
  innovation_score: 8.8,
  feasibility_score: 9.2,
  market_score: 9.4,
  academic_rigor_score: 9.3,
  strengths: [
    'Directly targets clinical explainability using SHAP, overcoming the classic black-box critique from medical examiners.',
    'Clear, feasible 3-tier architecture with sub-500ms inference latency suitable for real-time triage demonstration.',
    'High portfolio and resume value for competitive AI/ML engineering roles.',
    'Realistic scope achievable by a 3-member team within an 8-to-12 week semester timeframe.'
  ],
  weaknesses: [
    'Relies on secondary public datasets (Kaggle/MIMIC) which may not reflect local hospital demographic variations.',
    'Lacks real-time streaming integration with live bedside ICU monitors without simulated hardware.'
  ],
  risks: [
    'Potential class imbalance causing false negative bias on critical heart failure cohorts if unaddressed by SMOTE.',
    'Strict regulatory boundaries: requires prominent clinical disclaimer that the software is for academic research only.'
  ],
  missing_features: [
    'Synthetic what-if parameter slider to allow doctors to simulate vital improvements.',
    'Clinical PDF export containing clinician sign-off signature blocks.',
    'Audit trail logging who accessed and ran inferences on each patient record.'
  ],
  recommended_improvements: [
    'Implement what-if simulation sliders to dramatically increase interactive presentation appeal during defense.',
    'Export trained models to ONNX format to highlight low-latency edge deployment knowledge.',
    'Include a confusion matrix and ROC-AUC curve viewer in the admin evaluation tab.',
    'Add an automated synthetic patient generator to facilitate live demonstration without real patient PII.'
  ],
  recommendations: [
    'Implement what-if simulation sliders to dramatically increase interactive presentation appeal during defense.',
    'Export trained models to ONNX format to highlight low-latency edge deployment knowledge.',
    'Include a confusion matrix and ROC-AUC curve viewer in the admin evaluation tab.',
    'Add an automated synthetic patient generator to facilitate live demonstration without real patient PII.'
  ],
  viva_questions: [
    'Why did you choose XGBoost over a Deep Neural Network for this specific clinical tabular dataset?',
    'How do SHAP TreeExplainer values calculate marginal contribution across correlated physiological features?',
    'How would your architecture maintain HIPAA/privacy compliance if patient vitals were streamed from external hospital clinics?'
  ]
};

export const DEMO_EVALUATION_RESULT: EvaluationResult = {
  ...DEMO_EVALUATION,
  innovation_score: 8.8,
  feasibility_score: 9.2,
  market_score: 9.4,
  academic_rigor_score: 9.3,
  recommendations: DEMO_EVALUATION.recommendations!,
  viva_questions: DEMO_EVALUATION.viva_questions!
};

export const DEMO_IMPROVEMENT: IdeaImprovement = {
  original_idea: 'A basic college attendance system using barcodes or RFID cards.',
  problems: [
    'Extremely common textbook project with virtually zero algorithmic complexity or novelty.',
    'Prone to proxy attendance (students passing cards or barcode photos to friends).',
    'Fails to provide actionable insights into student engagement or dropout risk.'
  ],
  improved_concept: 'AI-Powered Smart Attendance & Student Engagement Analytics Platform',
  why_better: 'Transforms passive administrative logging into an intelligent educational sentinel. Instead of simply checking attendance, it combines computer vision face verification with longitudinal attendance pattern analytics to proactively identify students at risk of falling behind before exams.',
  new_features: [
    'Multi-face anti-spoofing liveness detection running in-browser via WebAssembly',
    'Early Warning Dropout Risk predictor combining attendance velocity and quiz scores',
    'Automated Parent & Mentor SMS/Email alerts on consecutive absences',
    'Interactive Class Engagement Heatmap correlating seat position with course outcomes',
    'Professor 1-Click Roster Sync with major LMS platforms (Canvas, Moodle)'
  ],
  technology_suggestions: [
    'Next.js 16 / React 19',
    'FastAPI (Python 3.11)',
    'MediaPipe / OpenCV Face Mesh',
    'PostgreSQL with TimescaleDB',
    'Scikit-learn Logistic Regression for At-Risk Flagging'
  ],
  ai_opportunities: [
    'Liveness & anti-spoofing verification to completely prevent photo/video replay proxies',
    'Predictive regression modeling to alert academic advisors 3 weeks before midterms',
    'Natural language lecture summary generator for students with legitimate medical leaves'
  ],
  innovation_opportunities: [
    'Edge processing on mobile devices: zero student biometric photos stored on centralized servers (privacy-preserving)',
    'Dynamic QR rotating cryptographic tokens for classrooms without high-res webcams',
    'Actionable analytics for department heads comparing attendance across different teaching styles'
  ],
  enhanced_title: 'AI-Powered Smart Attendance & Student Engagement Analytics Platform',
  enhanced_summary: 'Transforms passive administrative logging into an intelligent educational sentinel. Combines browser-based computer vision face verification with longitudinal attendance pattern analytics to proactively identify students at risk of falling behind.',
  advanced_features: [
    'Multi-face anti-spoofing liveness detection running in-browser via WebAssembly',
    'Early Warning Dropout Risk predictor combining attendance velocity and quiz scores',
    'Automated Parent & Mentor SMS/Email alerts on consecutive absences',
    'Interactive Class Engagement Heatmap correlating seat position with course outcomes'
  ],
  modern_tech_stack: ['Next.js 15', 'React 19', 'FastAPI', 'MediaPipe', 'PostgreSQL', 'TimescaleDB', 'Docker'],
  architecture_upgrade: 'Migrated from a monolithic RFID card scanner to an edge-evaluated WebAssembly computer vision pipeline with asynchronous event queues and TimescaleDB analytics.',
  defense_pitch: 'Elevates a traditional student project into an enterprise-grade academic operations suite by addressing real-world biometric spoofing and early student retention indicators.'
};

export const DEMO_IMPROVED_RESULT: ImprovedIdeaResult = {
  enhanced_title: DEMO_IMPROVEMENT.enhanced_title!,
  enhanced_summary: DEMO_IMPROVEMENT.enhanced_summary!,
  advanced_features: DEMO_IMPROVEMENT.advanced_features!,
  modern_tech_stack: DEMO_IMPROVEMENT.modern_tech_stack!,
  architecture_upgrade: DEMO_IMPROVEMENT.architecture_upgrade!,
  defense_pitch: DEMO_IMPROVEMENT.defense_pitch!,
  original_idea: DEMO_IMPROVEMENT.original_idea,
  problems: DEMO_IMPROVEMENT.problems,
  improved_concept: DEMO_IMPROVEMENT.improved_concept,
  why_better: DEMO_IMPROVEMENT.why_better,
  new_features: DEMO_IMPROVEMENT.new_features,
  technology_suggestions: DEMO_IMPROVEMENT.technology_suggestions
};
