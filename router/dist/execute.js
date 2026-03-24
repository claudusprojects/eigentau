import Anthropic from '@anthropic-ai/sdk';
import { ROUTING_TABLE } from './subnets.js';
const client = new Anthropic();
// TensorGate hub for subnet queries
const TGATE_HUB = 'https://hub-production-dcbd.up.railway.app';
async function queryTensorGate(prompt, subnetId) {
    try {
        const res = await fetch(`${TGATE_HUB}/api/v1/agent/query`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt, subnet_id: subnetId }),
            signal: AbortSignal.timeout(15000),
        });
        if (!res.ok)
            return null;
        const data = await res.json();
        return data.result || data.response || JSON.stringify(data);
    }
    catch {
        return null;
    }
}
async function claudeFallback(task, faculty) {
    const msg = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 1024,
        system: `You are a specialized AI performing a ${faculty} task for the Eigentau AGI orchestration system. Be concise and factual. Respond in 2-4 sentences.`,
        messages: [{ role: 'user', content: task }],
    });
    return msg.content[0].type === 'text' ? msg.content[0].text : '';
}
export async function executeSubTask(subtask) {
    const subnets = ROUTING_TABLE[subtask.faculty];
    const target = subnets[0]; // pick top-ranked subnet for this faculty
    const start = Date.now();
    // Try TensorGate first, fall back to Claude
    const tgResult = await queryTensorGate(subtask.task, target.netuid);
    if (tgResult) {
        return {
            subtask,
            subnet: target,
            result: tgResult,
            source: 'tensorgate',
            latencyMs: Date.now() - start,
        };
    }
    // Fallback to Claude
    const fallbackResult = await claudeFallback(subtask.task, subtask.faculty);
    return {
        subtask,
        subnet: target,
        result: fallbackResult,
        source: 'claude-fallback',
        latencyMs: Date.now() - start,
    };
}
export async function executeAll(subtasks) {
    // Execute in parallel where possible, but respect ordering for dependent tasks
    return Promise.all(subtasks.map(st => executeSubTask(st)));
}
