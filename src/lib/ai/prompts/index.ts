import { DOMAIN_KNOWLEDGE_BASE } from '../knowledgeBase';

export function buildGenerateIdeasPrompt(input: {
  name: string;
  skills: string[];
  interests: string[];
  experience_level: string;
  team_size: number;
  available_time: string;
  hardware: string;
  budget: string;
  career_goal: string;
}): string {
  const matchingDomains = input.interests
    .map(interest => DOMAIN_KNOWLEDGE_BASE[interest])
    .filter(Boolean);

  const domainContext = matchingDomains.length > 0
    ? `Consider domain best practices: ${matchingDomains.map(d => `${d.domain} (Tech: ${d.technologies.slice(0, 4).join(', ')}, Patterns: ${d.projectPatterns.slice(0, 2).join(', ')})`).join('; ')}`
    : '';

  return `You are the lead architect and final-year university project mentor for ProjectForge AI.
Generate exactly 5 distinct, high-impact, realistic, and practical final-year engineering project ideas tailored specifically for this student:

Student Profile:
- Name: ${input.name}
- Core Skills: ${input.skills.join(', ')}
- Domain Interests: ${input.interests.join(', ') || 'AI/ML, Web Development'}
- Experience Level: ${input.experience_level}
- Team Size: ${input.team_size} members
- Available Timeframe: ${input.available_time}
- Hardware: ${input.hardware}
- Budget: ${input.budget}
- Career Goal: ${input.career_goal}
${domainContext}

Requirements for Each Project:
1. Must be technically feasible within ${input.available_time} for a ${input.team_size}-person team with ${input.hardware}.
2. Must demonstrate genuine engineering rigor suitable for a college capstone/final-year evaluation defense.
3. Must leverage their skills (${input.skills.slice(0, 4).join(', ')}) while offering moderate learning headroom.
4. Calculate realistic scores:
   - match_score (75-98)
   - innovation_score (7.0-9.8)
   - feasibility_score (7.5-9.8)
   - impact_score (7.0-9.6)
   - career_score (7.5-9.8)
5. Provide: title, description, problem_statement, proposed_solution, target_users (array), real_world_relevance, required_skills (array), technology_stack (array), core_features (array of 4-6 strings), advanced_features (array of 3-4 strings), estimated_duration, difficulty ("Beginner" | "Intermediate" | "Advanced"), why_fit, potential_challenges (array of 3 strings), future_improvements (array of 3 strings).

Output strictly valid JSON with this exact shape:
{
  "ideas": [
    {
      "title": "string",
      "description": "string",
      "problem_statement": "string",
      "proposed_solution": "string",
      "target_users": ["string"],
      "real_world_relevance": "string",
      "required_skills": ["string"],
      "technology_stack": ["string"],
      "core_features": ["string"],
      "advanced_features": ["string"],
      "estimated_duration": "string",
      "difficulty": "Beginner" | "Intermediate" | "Advanced",
      "innovation_score": number,
      "feasibility_score": number,
      "impact_score": number,
      "career_score": number,
      "match_score": number,
      "why_fit": "string",
      "potential_challenges": ["string"],
      "future_improvements": ["string"]
    }
  ]
}`;
}

export function buildBlueprintPrompt(input: {
  project_title: string;
  description: string;
  skills: string[];
  tech_stack: string[];
  team_size: number;
  duration: string;
}): string {
  return `You are a Senior Systems Architect at ProjectForge AI.
Generate a comprehensive, industrial-grade Final-Year Project Blueprint for:
Project: "${input.project_title}"
Description: "${input.description}"
Technologies: ${input.tech_stack.join(', ')}
Team Size: ${input.team_size}
Duration: ${input.duration}

Generate complete, actionable content covering all 13 standard engineering specification sections:
1. project_overview (concise 2-3 paragraph executive summary)
2. problem_statement (detailed pain points, societal/business impact)
3. background (academic context, existing solutions & their limits)
4. objectives (array of 4-5 measurable SMART engineering objectives)
5. target_users (array of 3-4 distinct stakeholder personas)
6. proposed_solution (how the architecture addresses the gaps)
7. core_features (array of 5-7 baseline MVP deliverables)
8. advanced_features (array of 3-5 stretch/bonus innovations)
9. user_roles (array of 2-3 roles e.g. "Admin", "Student/Patient", "Reviewer")
10. functional_requirements (array of 6-8 system requirements)
11. non_functional_requirements (array of 4-6 requirements: latency, security, scale)
12. technology_stack (categorized: frontend[], backend[], database[], ai_ml[], apis[], third_party[])
13. system_architecture_summary (clear walkthrough of tier interactions)
14. data_flow (array of 4-6 numbered data flow steps)
15. database_schema: tables array with name, description, columns (array of column declarations like "id UUID PRIMARY KEY")
16. api_structure: array of endpoints with method ("GET"|"POST"|"PUT"|"DELETE"), endpoint, description
17. security_considerations (array of 4-5 items: JWT, encryption at rest, rate limiting, sanitization)
18. testing_strategy (array of 4 items: Unit testing with Jest/Pytest, Integration, E2E, Load test)
19. deployment_plan (array of 4 items: CI/CD, Containerization, Cloud hosting, Domain/SSL)
20. risks: array of objects with risk and mitigation
21. future_improvements (array of 4 long-term extensions)

Output strictly valid JSON conforming to the blueprint schema.`;
}

export function buildArchitecturePrompt(input: {
  project_title: string;
  tech_stack: string[];
  description: string;
}): string {
  return `Generate an 8-layer vertical system architecture for the project: "${input.project_title}".
Description: "${input.description}"
Stack: ${input.tech_stack.join(', ')}

The 8 layers must strictly be in top-to-bottom sequence:
1. Student / End User (Client interface & interaction layer)
2. Frontend Application (UI framework, client routing, state management)
3. API Gateway / Router (Reverse proxy, rate limiting, request validation)
4. Authentication & Security (Session/JWT, OAuth, RBAC authorization)
5. Backend Application Services (Business logic, workers, controllers)
6. Database & Persistence Layer (Relational/Document store, caching)
7. AI & Machine Learning Layer (Gemini API, Inference models, vector pipelines)
8. External Services & Cloud Infrastructure (Cloud hosting, storage, third-party integrations)

Output strictly valid JSON with:
{
  "title": "${input.project_title} System Architecture",
  "summary": "High-level summary of the end-to-end data pipeline and security boundary.",
  "layers": [
    {
      "id": "layer-1",
      "name": "End User Layer",
      "role": "Client Interaction",
      "iconName": "Users",
      "techNote": "Desktop & Mobile Browsers",
      "technologies": ["Web Browser", "Responsive PWA"],
      "details": "Explanation of user touchpoints and request entry."
    },
    ...8 layers total...
  ]
}`;
}

export function buildRoadmapPrompt(input: {
  project_title: string;
  tech_stack: string[];
  team_size: number;
  duration: string;
  difficulty: string;
}): string {
  return `Generate a 9-phase final-year project development roadmap for:
Project: "${input.project_title}"
Stack: ${input.tech_stack.join(', ')}
Team Size: ${input.team_size} members
Duration: ${input.duration}

The 9 phases MUST be:
Phase 1: Requirement Analysis
Phase 2: Research & Literature Survey
Phase 3: Database & Schema Design
Phase 4: Backend API & Service Development
Phase 5: AI/ML & Core Algorithm Development
Phase 6: Frontend UI & State Integration
Phase 7: System Integration & Middleware
Phase 8: Comprehensive Testing & Security Audit
Phase 9: Deployment & Final Presentation Preparation

Each phase must include:
- phase_number (1 to 9)
- name
- description (specific to this project)
- estimated_hours (e.g. 15 to 45 hours)
- dependencies (names of prerequisite phases)
- completion_criteria (array of 3 verifiable checkmarks)
- tasks (array of 3-4 granular sub-tasks, each with id, title, description, estimated_hours)

Output strictly valid JSON with a "phases" array.`;
}

export function buildEvaluatePrompt(input: {
  title: string;
  description: string;
  technologies: string;
  target_users: string;
  features: string;
}): string {
  return `You are a Senior Engineering Project Examiner and Final-Year Project Review Committee Chair.
Critique and evaluate this project proposal:
Title: "${input.title}"
Description: "${input.description}"
Technologies: "${input.technologies}"
Target Users: "${input.target_users}"
Features: "${input.features}"

Provide an objective, rigorous academic & industry evaluation:
Scores (0-10, and overall_score 0-100):
- overall_score (weighted synthesis)
- innovation (creativity, novelty vs standard textbook projects)
- feasibility (achievability within typical semester constraints)
- technical_complexity (depth of algorithm/architecture)
- real_world_impact (utility to real stakeholders)
- academic_value (relevance to engineering syllabus & defense rubrics)
- career_value (impressiveness on resume/portfolio)
- scalability (cloud & concurrency readiness)

Also provide:
- strengths: array of 4 key highlights
- weaknesses: array of 3 realistic flaws or shortcomings
- risks: array of 3 potential blockers (e.g. API limits, dataset scarcity)
- missing_features: array of 3 crucial features needed to make it complete
- recommended_improvements: array of 4 concrete architectural or design enhancements

Output strictly valid JSON conforming to the evaluation schema.`;
}

export function buildImprovePrompt(idea: string): string {
  return `You are the Lead Innovation Architect at ProjectForge AI.
A student brings you this raw, basic project idea:
"${idea}"

Transform this generic idea into an outstanding, modern, AI-powered capstone project that will impress university evaluators and recruiters.

Provide:
1. original_idea: The student's raw input
2. problems: array of 3 reasons the original idea is too trivial, outdated, or common (e.g., "Standard CRUD app with no algorithmic complexity", "Easily copied template")
3. improved_concept: A modern, compelling project title and pitch
4. why_better: 2-3 sentences contrasting the new version with the old
5. new_features: array of 4-5 innovative, high-value features
6. technology_suggestions: array of 5 modern technologies (e.g., FastAPI, Next.js, Vector DB, WebSockets)
7. ai_opportunities: array of 3 ways modern AI/ML or Gemini can elevate the project
8. innovation_opportunities: array of 3 unique competitive edges or real-world integrations

Output strictly valid JSON conforming to the improvement schema.`;
}

export const MENTOR_SYSTEM_INSTRUCTION = `You are the ProjectForge AI Senior Engineering Mentor, dedicated to guiding university students through their final-year engineering capstone projects.
Core Principles:
1. Project-Specific: Always tie your advice directly to the student's project, current stack, and active roadmap phase.
2. Practical & Actionable: Give step-by-step instructions, clear architecture decisions, and concise, modern code snippets (TypeScript, Python, SQL, React) when relevant.
3. Supportive & Academic: Speak with the encouragement of a veteran tech lead who wants the student to ace their project defense.
4. Keep answers focused and readable with Markdown headings, bullet points, and code blocks.`;
