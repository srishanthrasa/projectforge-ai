import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import {
  generateProjectIdeas,
  generateProjectBlueprint,
  generateArchitecture,
  generateRoadmap,
  evaluateProject,
  improveProjectIdea,
  mentorChat,
  getMentorStatus
} from './src/lib/ai/services';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '15mb' }));

// Health & AI Status Checks
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'ProjectForge AI Engine',
    timestamp: new Date().toISOString()
  });
});

app.get(['/api/ai/mentor-status', '/api/ai/status'], (req, res) => {
  res.json(getMentorStatus());
});

// AI Service 1: Generate Ideas
app.post('/api/ai/generate-ideas', async (req, res) => {
  try {
    const result = await generateProjectIdeas(req.body);
    res.json(result);
  } catch (error: any) {
    console.error('Error generating project ideas:', error);
    res.status(400).json({ error: error.message || 'Failed to generate project ideas' });
  }
});

// AI Service 2: Generate Blueprint
app.post('/api/ai/generate-blueprint', async (req, res) => {
  try {
    const result = await generateProjectBlueprint(req.body);
    res.json(result);
  } catch (error: any) {
    console.error('Error generating blueprint:', error);
    res.status(400).json({ error: error.message || 'Failed to generate blueprint' });
  }
});

// AI Service 3: Generate Architecture
app.post('/api/ai/generate-architecture', async (req, res) => {
  try {
    const result = await generateArchitecture(req.body);
    res.json(result);
  } catch (error: any) {
    console.error('Error generating architecture:', error);
    res.status(400).json({ error: error.message || 'Failed to generate architecture' });
  }
});

// AI Service 4: Generate Roadmap
app.post('/api/ai/generate-roadmap', async (req, res) => {
  try {
    const result = await generateRoadmap(req.body);
    res.json(result);
  } catch (error: any) {
    console.error('Error generating roadmap:', error);
    res.status(400).json({ error: error.message || 'Failed to generate roadmap' });
  }
});

// AI Service 5: Project Evaluator (support both /api/ai/evaluate and /api/ai/evaluate-project)
app.post(['/api/ai/evaluate', '/api/ai/evaluate-project'], async (req, res) => {
  try {
    const result = await evaluateProject(req.body);
    res.json(result);
  } catch (error: any) {
    console.error('Error evaluating project:', error);
    res.status(400).json({ error: error.message || 'Failed to evaluate project' });
  }
});

// AI Service 6: Improve Idea (support both /api/ai/improve and /api/ai/improve-idea)
app.post(['/api/ai/improve', '/api/ai/improve-idea'], async (req, res) => {
  try {
    const result = await improveProjectIdea(req.body);
    res.json(result);
  } catch (error: any) {
    console.error('Error improving project idea:', error);
    res.status(400).json({ error: error.message || 'Failed to improve project idea' });
  }
});

// AI Service 7: Mentor Chat (support both /api/ai/mentor and /api/ai/mentor-chat)
app.post(['/api/ai/mentor', '/api/ai/mentor-chat'], async (req, res) => {
  try {
    const result = await mentorChat(req.body);
    res.json(result);
  } catch (error: any) {
    console.error('Error in mentor chat:', error);
    res.status(400).json({ error: error.message || 'Failed to communicate with AI mentor' });
  }
});

// Modular Project Email Share Service (Section 23)
app.post('/api/share/email', (req, res) => {
  const { recipient_email, project_title, summary, tech_stack } = req.body;
  if (!recipient_email || !project_title) {
    return res.status(400).json({ error: 'Recipient email and project title required' });
  }

  // Modular mock sender - structured for SendGrid, Resend, or SMTP integration
  console.log(`[Email Dispatcher] Project summary dispatched to ${recipient_email} for "${project_title}".`);
  res.json({
    success: true,
    message: `Project summary successfully prepared and sent to ${recipient_email}`,
    dispatched_at: new Date().toISOString()
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[ProjectForge AI] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
