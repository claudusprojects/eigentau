import Anthropic from '@anthropic-ai/sdk';
import type { ExecutionResult } from './execute.js';

const client = new Anthropic();

export interface SynthesisResult {
  answer: string;
  quality: number; // 0-100
  faculties_used: string[];
  subnets_used: { netuid: number; name: string }[];
}

export async function synthesize(
  originalQuery: string,
  results: ExecutionResult[]
): Promise<SynthesisResult> {
  const context = results.map((r, i) =>
    `[Step ${i + 1} — ${r.subtask.faculty} via SN${r.subnet.netuid} ${r.subnet.name}]\n${r.result}`
  ).join('\n\n');

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2048,
    system: `You are the synthesis engine for Eigentau, an AGI orchestration system on Bittensor.

You receive results from multiple specialized subnets, each handling a different cognitive faculty.
Your job: combine them into one coherent, high-quality answer.

Respond with raw JSON only — no markdown fences, no backticks, no explanation outside the JSON:
{
  "answer": "the synthesized answer in clear prose",
  "quality": 85
}

The quality score (0-100) should reflect:
- Completeness: did all sub-tasks produce useful results?
- Coherence: does the synthesis flow logically?
- Accuracy: are claims supported by the subnet results?
- Relevance: does it address the original query?`,
    messages: [{
      role: 'user',
      content: `Original query: ${originalQuery}\n\nSub-task results:\n${context}`
    }],
  });

  const text = msg.content[0].type === 'text' ? msg.content[0].text : '';

  try {
    // Strip markdown fences if present
    const clean = text.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
    const parsed = JSON.parse(clean);
    return {
      answer: parsed.answer || text,
      quality: Math.min(100, Math.max(0, parsed.quality || 70)),
      faculties_used: [...new Set(results.map(r => r.subtask.faculty))],
      subnets_used: results.map(r => r.subnet),
    };
  } catch {
    return {
      answer: text,
      quality: 65,
      faculties_used: [...new Set(results.map(r => r.subtask.faculty))],
      subnets_used: results.map(r => r.subnet),
    };
  }
}
