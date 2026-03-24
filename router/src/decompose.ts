import Anthropic from '@anthropic-ai/sdk';
import { FACULTIES, type Faculty } from './subnets.js';

const client = new Anthropic();

export interface SubTask {
  task: string;
  faculty: Faculty;
  reasoning: string;
}

export interface Decomposition {
  subtasks: SubTask[];
  strategy: string;
}

const SYSTEM = `You are the task decomposition engine for Eigentau, an AGI orchestration layer on Bittensor.

Your job: take a complex user query and break it into 2-5 atomic sub-tasks. Each sub-task must be mapped to exactly one of these 10 cognitive faculties:
${FACULTIES.join(', ')}

Faculty definitions:
- Perception: data gathering, scraping, image/video analysis, sensor input
- Generation: creating text, images, audio, video, code, 3D content
- Reasoning: logical analysis, inference, prediction, forecasting, fact-checking
- Memory: storing/retrieving data, datasets, RAG, data curation
- Learning: model training, fine-tuning, RL, architecture optimization
- Attention: search, real-time filtering, context compression, focus
- Executive Functions: coordination, compute orchestration, governance, infrastructure
- Metacognition: self-evaluation, model evaluation, AI safety, quality scoring
- Problem Solving: multi-step agents, optimization, drug discovery, trading strategies
- Social Cognition: social context, advertising, recommendations, content moderation

You MUST decompose into at least 2 sub-tasks for any non-trivial query. Only use 1 sub-task for very simple factual questions.

Respond with raw JSON only — no markdown fences, no backticks, no explanation outside the JSON:
{
  "subtasks": [
    { "task": "description of atomic sub-task", "faculty": "FacultyName", "reasoning": "why this faculty" }
  ],
  "strategy": "brief explanation of decomposition approach"
}

Rules:
- Each sub-task should be independently executable
- Order matters — later tasks may depend on earlier results
- Use 2-5 sub-tasks. Simple queries need fewer.
- Always include a Reasoning or Metacognition step for synthesis/evaluation
- Be specific in task descriptions — include what data to fetch, analyze, or generate`;

export async function decompose(query: string): Promise<Decomposition> {
  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    system: SYSTEM,
    messages: [{ role: 'user', content: query }],
  });

  const text = msg.content[0].type === 'text' ? msg.content[0].text : '';

  try {
    const clean = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    const parsed = JSON.parse(clean);
    // Validate faculties
    for (const st of parsed.subtasks) {
      if (!FACULTIES.includes(st.faculty)) {
        st.faculty = 'Reasoning'; // fallback
      }
    }
    return parsed as Decomposition;
  } catch {
    // Fallback: single reasoning task
    return {
      subtasks: [{ task: query, faculty: 'Reasoning', reasoning: 'Direct query — no decomposition needed' }],
      strategy: 'Single-step direct query',
    };
  }
}
