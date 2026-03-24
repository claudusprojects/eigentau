import Anthropic from '@anthropic-ai/sdk';
import { decompose } from './decompose.js';
import { executeAll } from './execute.js';
import { synthesize } from './synthesize.js';
import { addMessage, getMessages, addTask, completeTask, updateAgentStats, updateWeight, saveRoute, getAgentKnowledge } from './db.js';

const client = new Anthropic();

export interface AgentConfig {
  id: string;
  name: string;
  system_prompt: string;
  model: string;
  autonomous: number;
  goal: string | null;
}

export interface ChatResponse {
  reply: string;
  routed: boolean;
  steps?: { task: string; faculty: string; subnet: string }[];
  quality?: number;
  latencyMs: number;
}

export async function chat(agent: AgentConfig, userMessage: string): Promise<ChatResponse> {
  const start = Date.now();

  // Save user message
  addMessage(agent.id, 'user', userMessage);

  // Get conversation history for context
  const history = getMessages(agent.id, 20) as any[];
  const messages = history.map((m: any) => ({
    role: m.role as 'user' | 'assistant',
    content: m.content,
  }));

  // Inject knowledge base
  const knowledge = getAgentKnowledge(agent.id);
  const fullPrompt = agent.system_prompt + knowledge;

  // First: let the agent decide if this needs multi-subnet routing or a direct answer
  const triage = await client.messages.create({
    model: agent.model || 'claude-haiku-4-5-20251001',
    max_tokens: 256,
    system: `${fullPrompt}

You are an autonomous AI agent powered by Eigentau's cognitive routing network on Bittensor.
You have access to 129+ specialized subnets across 10 cognitive faculties.

For each user message, decide: does this need multi-subnet cognitive routing, or can you answer directly?
Respond with JSON only (no fences): {"route": true/false, "reason": "brief reason"}
- route=true for: research tasks, analysis, predictions, complex questions, data gathering
- route=false for: greetings, simple questions, follow-ups, clarifications, opinions`,
    messages,
  });

  const triageText = triage.content[0].type === 'text' ? triage.content[0].text : '';
  let shouldRoute = false;
  try {
    const clean = triageText.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    shouldRoute = JSON.parse(clean).route === true;
  } catch {
    shouldRoute = userMessage.length > 80; // heuristic fallback
  }

  if (shouldRoute) {
    // Route through the cognitive network
    const taskId = addTask(agent.id, userMessage);

    const decomposition = await decompose(userMessage);
    const results = await executeAll(decomposition.subtasks);
    const synthesis = await synthesize(userMessage, results);

    const latencyMs = Date.now() - start;

    // Update learning
    for (const f of synthesis.faculties_used) {
      updateWeight(f, synthesis.quality);
    }

    // Save route
    saveRoute({
      query: userMessage,
      decomposition,
      results: results.map(r => ({
        task: r.subtask.task,
        faculty: r.subtask.faculty,
        subnet: r.subnet,
        result: r.result,
        source: r.source,
        latencyMs: r.latencyMs,
      })),
      synthesis: synthesis.answer,
      quality: synthesis.quality,
      totalLatencyMs: latencyMs,
      facultiesUsed: synthesis.faculties_used,
      subnetsUsed: synthesis.subnets_used,
    });

    completeTask(taskId, synthesis.answer, synthesis.quality, latencyMs);
    updateAgentStats(agent.id, synthesis.quality);

    // Now let the agent respond using the synthesis
    const agentReply = await client.messages.create({
      model: agent.model || 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: `${fullPrompt}

You just routed a query across Bittensor's cognitive network and got a synthesized result.
Use this result to give a helpful, natural response to the user. Add your own personality and insight.
Don't mention "subnets" or "routing" unless the user asked about it — just deliver the answer naturally.

Routing result (${synthesis.quality}% quality):
${synthesis.answer}`,
      messages,
    });

    const reply = agentReply.content[0].type === 'text' ? agentReply.content[0].text : synthesis.answer;

    addMessage(agent.id, 'assistant', reply);

    return {
      reply,
      routed: true,
      steps: results.map(r => ({
        task: r.subtask.task,
        faculty: r.subtask.faculty,
        subnet: `SN${r.subnet.netuid} ${r.subnet.name}`,
      })),
      quality: synthesis.quality,
      latencyMs,
    };
  } else {
    // Direct agent response (no routing)
    const agentReply = await client.messages.create({
      model: agent.model || 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: fullPrompt,
      messages,
    });

    const reply = agentReply.content[0].type === 'text' ? agentReply.content[0].text : '';
    addMessage(agent.id, 'assistant', reply);

    return {
      reply,
      routed: false,
      latencyMs: Date.now() - start,
    };
  }
}
