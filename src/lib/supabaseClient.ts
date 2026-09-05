import { createClient, SupabaseClient } from '@supabase/supabase-js';

const env = (import.meta as unknown as { env?: Record<string, string> }).env || {};
const supabaseUrl = env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY || '';

export let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http')) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (err) {
    console.warn('[Supabase] Initializing client failed, using local offline storage mode:', err);
  }
}

/**
 * FULL DATABASE SCHEMA FOR SUPABASE (Section 26 & 27)
 * You can execute this SQL in the Supabase SQL Editor to provision all tables & RLS policies:
 *
 * ```sql
 * -- 1. Profiles Table
 * CREATE TABLE IF NOT EXISTS profiles (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
 *   name TEXT NOT NULL,
 *   college TEXT,
 *   degree TEXT,
 *   branch TEXT,
 *   year TEXT,
 *   skills TEXT[] DEFAULT '{}',
 *   interests TEXT[] DEFAULT '{}',
 *   experience_level TEXT CHECK (experience_level IN ('Beginner', 'Intermediate', 'Advanced')),
 *   team_size INT DEFAULT 1,
 *   available_time TEXT,
 *   hardware TEXT,
 *   budget TEXT,
 *   career_goal TEXT,
 *   created_at TIMESTAMPTZ DEFAULT now(),
 *   updated_at TIMESTAMPTZ DEFAULT now()
 * );
 * ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Users can manage own profile" ON profiles
 *   FOR ALL USING (auth.uid() = user_id);
 *
 * -- 2. Projects Table
 * CREATE TABLE IF NOT EXISTS projects (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
 *   title TEXT NOT NULL,
 *   description TEXT NOT NULL,
 *   problem_statement TEXT,
 *   solution TEXT,
 *   difficulty TEXT CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
 *   duration TEXT,
 *   match_score INT,
 *   innovation_score NUMERIC(3,1),
 *   feasibility_score NUMERIC(3,1),
 *   impact_score NUMERIC(3,1),
 *   career_score NUMERIC(3,1),
 *   tech_stack TEXT[] DEFAULT '{}',
 *   features TEXT[] DEFAULT '{}',
 *   advanced_features TEXT[] DEFAULT '{}',
 *   target_users TEXT[] DEFAULT '{}',
 *   future_improvements TEXT[] DEFAULT '{}',
 *   blueprint JSONB,
 *   architecture JSONB,
 *   roadmap JSONB,
 *   created_at TIMESTAMPTZ DEFAULT now(),
 *   updated_at TIMESTAMPTZ DEFAULT now()
 * );
 * ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Users can manage own projects" ON projects
 *   FOR ALL USING (auth.uid() = user_id);
 *
 * -- 3. Project Tasks Table
 * CREATE TABLE IF NOT EXISTS project_tasks (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
 *   title TEXT NOT NULL,
 *   description TEXT,
 *   status TEXT CHECK (status IN ('Not Started', 'In Progress', 'Completed')) DEFAULT 'Not Started',
 *   priority TEXT CHECK (priority IN ('Low', 'Medium', 'High')) DEFAULT 'Medium',
 *   estimated_hours INT DEFAULT 4,
 *   due_date TIMESTAMPTZ,
 *   phase TEXT NOT NULL,
 *   created_at TIMESTAMPTZ DEFAULT now(),
 *   updated_at TIMESTAMPTZ DEFAULT now()
 * );
 * ALTER TABLE project_tasks ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Users can manage own tasks" ON project_tasks
 *   FOR ALL USING (
 *     EXISTS (
 *       SELECT 1 FROM projects WHERE projects.id = project_tasks.project_id AND projects.user_id = auth.uid()
 *     )
 *   );
 *
 * -- 4. Chat Sessions & Messages
 * CREATE TABLE IF NOT EXISTS chat_sessions (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
 *   project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
 *   title TEXT NOT NULL,
 *   created_at TIMESTAMPTZ DEFAULT now(),
 *   updated_at TIMESTAMPTZ DEFAULT now()
 * );
 * ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Users manage own chat sessions" ON chat_sessions
 *   FOR ALL USING (auth.uid() = user_id);
 *
 * CREATE TABLE IF NOT EXISTS chat_messages (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
 *   role TEXT CHECK (role IN ('user', 'assistant')),
 *   message TEXT NOT NULL,
 *   created_at TIMESTAMPTZ DEFAULT now()
 * );
 * ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Users manage own chat messages" ON chat_messages
 *   FOR ALL USING (
 *     EXISTS (
 *       SELECT 1 FROM chat_sessions WHERE chat_sessions.id = chat_messages.session_id AND chat_sessions.user_id = auth.uid()
 *     )
 *   );
 *
 * -- 5. Saved Ideas
 * CREATE TABLE IF NOT EXISTS saved_ideas (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
 *   project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
 *   created_at TIMESTAMPTZ DEFAULT now()
 * );
 * ALTER TABLE saved_ideas ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Users manage own saved ideas" ON saved_ideas
 *   FOR ALL USING (auth.uid() = user_id);
 *
 * -- 6. Documents Table
 * CREATE TABLE IF NOT EXISTS documents (
 *   id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
 *   user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
 *   project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
 *   file_name TEXT NOT NULL,
 *   storage_path TEXT NOT NULL,
 *   file_type TEXT NOT NULL,
 *   file_size INT NOT NULL,
 *   created_at TIMESTAMPTZ DEFAULT now()
 * );
 * ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
 * CREATE POLICY "Users manage own documents" ON documents
 *   FOR ALL USING (auth.uid() = user_id);
 * ```
 */
