import express from 'express';
import cors from 'cors';
import { decompose } from './decompose.js';
import { executeAll } from './execute.js';
import { synthesize } from './synthesize.js';
import { saveRoute, getRecentRoutes, getRouteCount, getWeights, updateWeight, getInsights, getStats, createAgent, getAgent, listAgents, deleteAgent, getMessages, getAgentTasks, getAgentCount, createApiKey, validateApiKey, listApiKeys, addAgentFile, getAgentFiles, deleteAgentFile } from './db.js';
import { chat } from './agent.js';
import { randomUUID } from 'crypto';
import { ROUTING_TABLE, FACULTIES } from './subnets.js';
const app = express();
app.use(cors());
app.use(express.json());
const PORT = parseInt(process.env.PORT || '3001');
// Health check
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', service: 'eigentau-router', version: '1.0.0' });
});
// ── MAIN ROUTE ENDPOINT ──
app.post('/api/route', async (req, res) => {
    const { query } = req.body;
    if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'Missing query string' });
    }
    const start = Date.now();
    try {
        // 1. Decompose
        const decomposition = await decompose(query);
        // 2. Execute all sub-tasks
        const results = await executeAll(decomposition.subtasks);
        // 3. Synthesize
        const synthesis = await synthesize(query, results);
        const totalLatencyMs = Date.now() - start;
        // 4. Learn — update weights based on quality
        for (const faculty of synthesis.faculties_used) {
            updateWeight(faculty, synthesis.quality);
        }
        // 5. Save to DB
        saveRoute({
            query,
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
            totalLatencyMs,
            facultiesUsed: synthesis.faculties_used,
            subnetsUsed: synthesis.subnets_used,
        });
        // 6. Return
        res.json({
            query,
            decomposition: {
                strategy: decomposition.strategy,
                steps: results.map(r => ({
                    task: r.subtask.task,
                    faculty: r.subtask.faculty,
                    reasoning: r.subtask.reasoning,
                    subnet: `SN${r.subnet.netuid} ${r.subnet.name}`,
                    source: r.source,
                    latencyMs: r.latencyMs,
                })),
            },
            synthesis: synthesis.answer,
            quality: synthesis.quality,
            totalLatencyMs,
            facultiesUsed: synthesis.faculties_used,
            subnetsUsed: synthesis.subnets_used.map(s => `SN${s.netuid} ${s.name}`),
        });
    }
    catch (err) {
        console.error('Route error:', err);
        res.status(500).json({ error: err.message || 'Internal error' });
    }
});
// ── RECENT ROUTES ──
app.get('/api/routes', (_req, res) => {
    const routes = getRecentRoutes(20).map((r) => ({
        id: r.id,
        query: r.query,
        quality: r.quality,
        totalLatencyMs: r.total_latency_ms,
        facultiesUsed: JSON.parse(r.faculties_used),
        subnetsUsed: JSON.parse(r.subnets_used),
        createdAt: r.created_at,
    }));
    res.json({ routes, total: getRouteCount() });
});
// ── WEIGHTS ──
app.get('/api/weights', (_req, res) => {
    res.json({ weights: getWeights() });
});
// ── INSIGHTS ──
app.get('/api/insights', (_req, res) => {
    res.json({ insights: getInsights(50) });
});
// ── STATS ──
app.get('/api/stats', (_req, res) => {
    res.json(getStats());
});
// ── COGNITIVE MAP ──
app.get('/api/cognitive-map', (_req, res) => {
    const map = FACULTIES.map(f => ({
        faculty: f,
        subnets: ROUTING_TABLE[f],
    }));
    res.json({ faculties: map });
});
// ── STRATEGY / CONFIG ──
app.get('/api/strategy', (_req, res) => {
    const stats = getStats();
    const weights = stats.weights;
    // Compute regime from weight distribution
    const maxW = Math.max(...weights.map((w) => w.weight));
    const minW = Math.min(...weights.map((w) => w.weight));
    const spread = maxW - minW;
    const regime = spread > 0.3 ? 'CONCENTRATED' : spread > 0.15 ? 'DIVERGING' : 'NEUTRAL';
    // Real params derived from actual usage
    const avgLatency = stats.totalRoutes > 0
        ? Math.round(getRecentRoutes(20).reduce((s, r) => s + r.total_latency_ms, 0) / Math.min(stats.totalRoutes, 20))
        : 0;
    const activeFaculties = weights.filter((w) => w.total_uses > 0).length;
    res.json({
        regime,
        regimeDesc: regime === 'NEUTRAL'
            ? 'Weights evenly distributed. No strong routing preference detected yet.'
            : regime === 'DIVERGING'
                ? 'Some faculties emerging as preferred routes based on quality outcomes.'
                : 'Strong routing preferences established. Top faculties dominate routing decisions.',
        params: [
            { key: 'decomposition_depth', value: '2-5', reason: 'Claude decomposes into 2-5 sub-tasks based on query complexity.' },
            { key: 'ema_blend_factor', value: '0.80', reason: '80% current / 20% new — prevents catastrophic forgetting while allowing adaptation.' },
            { key: 'fallback_timeout_ms', value: '15000', reason: 'TensorGate subnet query timeout before falling back to Claude inference.' },
            { key: 'active_faculties', value: `${activeFaculties}/10`, reason: `${activeFaculties} of 10 cognitive faculties have been used in routing so far.` },
            { key: 'avg_latency_ms', value: avgLatency.toString(), reason: `Average end-to-end latency across ${stats.totalRoutes} routes processed.` },
            { key: 'avg_quality', value: `${stats.avgQuality}%`, reason: `Mean synthesis quality score across all routed queries.` },
        ],
    });
});
// ── TAO PRICE (CoinGecko) ──
let cachedTaoPrice = { price: 0, ts: 0 };
app.get('/api/tao-price', async (_req, res) => {
    if (Date.now() - cachedTaoPrice.ts < 60000 && cachedTaoPrice.price > 0) {
        return res.json({ price: cachedTaoPrice.price });
    }
    try {
        const r = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bittensor&vs_currencies=usd', {
            signal: AbortSignal.timeout(5000),
        });
        if (r.ok) {
            const d = await r.json();
            if (d.bittensor?.usd) {
                cachedTaoPrice = { price: d.bittensor.usd, ts: Date.now() };
            }
        }
    }
    catch { }
    res.json({ price: cachedTaoPrice.price });
});
// ══════════════════════════════════════
// AGENT PLATFORM
// ══════════════════════════════════════
// ── CREATE AGENT ──
app.post('/api/agents', (req, res) => {
    const { name, description, systemPrompt, goal, autonomous } = req.body;
    if (!name || !description || !systemPrompt) {
        return res.status(400).json({ error: 'Missing name, description, or systemPrompt' });
    }
    const id = randomUUID().slice(0, 8);
    createAgent({ id, name, description, systemPrompt, goal, autonomous: !!autonomous });
    res.json({ id, name, status: 'active' });
});
// ── LIST AGENTS ──
app.get('/api/agents', (_req, res) => {
    const agents = listAgents().map((a) => ({
        id: a.id,
        name: a.name,
        description: a.description,
        autonomous: !!a.autonomous,
        goal: a.goal,
        status: a.status,
        totalTasks: a.total_tasks,
        avgQuality: Math.round(a.avg_quality),
        createdAt: a.created_at,
    }));
    res.json({ agents, total: getAgentCount() });
});
// ── GET AGENT ──
app.get('/api/agents/:id', (req, res) => {
    const agent = getAgent(req.params.id);
    if (!agent)
        return res.status(404).json({ error: 'Agent not found' });
    res.json({
        id: agent.id,
        name: agent.name,
        description: agent.description,
        systemPrompt: agent.system_prompt,
        autonomous: !!agent.autonomous,
        goal: agent.goal,
        status: agent.status,
        totalTasks: agent.total_tasks,
        avgQuality: Math.round(agent.avg_quality),
        createdAt: agent.created_at,
    });
});
// ── DELETE AGENT ──
app.delete('/api/agents/:id', (req, res) => {
    const agent = getAgent(req.params.id);
    if (!agent)
        return res.status(404).json({ error: 'Agent not found' });
    deleteAgent(req.params.id);
    res.json({ deleted: true });
});
// ── CHAT WITH AGENT ──
app.post('/api/agents/:id/chat', async (req, res) => {
    const agent = getAgent(req.params.id);
    if (!agent)
        return res.status(404).json({ error: 'Agent not found' });
    const { message } = req.body;
    if (!message)
        return res.status(400).json({ error: 'Missing message' });
    try {
        const result = await chat(agent, message);
        res.json(result);
    }
    catch (err) {
        console.error('Agent chat error:', err);
        res.status(500).json({ error: err.message || 'Chat failed' });
    }
});
// ── AGENT MESSAGES ──
app.get('/api/agents/:id/messages', (req, res) => {
    const agent = getAgent(req.params.id);
    if (!agent)
        return res.status(404).json({ error: 'Agent not found' });
    const msgs = getMessages(req.params.id, 100).map((m) => ({
        role: m.role,
        content: m.content,
        createdAt: m.created_at,
    }));
    res.json({ messages: msgs });
});
// ── AGENT TASKS ──
app.get('/api/agents/:id/tasks', (req, res) => {
    const agent = getAgent(req.params.id);
    if (!agent)
        return res.status(404).json({ error: 'Agent not found' });
    const tasks = getAgentTasks(req.params.id, 50).map((t) => ({
        id: t.id,
        query: t.query,
        status: t.status,
        quality: t.quality,
        latencyMs: t.latency_ms,
        createdAt: t.created_at,
        completedAt: t.completed_at,
    }));
    res.json({ tasks });
});
// ══════════════════════════════════════
// PUBLIC API (v1) — API key authenticated
// ══════════════════════════════════════
function authMiddleware(req, res, next) {
    const key = req.headers.authorization?.replace('Bearer ', '') || req.query.api_key;
    if (!key || !validateApiKey(key)) {
        res.status(401).json({ error: 'Invalid or missing API key. Get one at app.eigentau.ai' });
        return;
    }
    next();
}
// ── API KEY MANAGEMENT (no auth needed for creation) ──
app.post('/v1/keys', (req, res) => {
    const { name } = req.body;
    if (!name)
        return res.status(400).json({ error: 'Missing name' });
    const key = createApiKey(name);
    res.json({ key, name, message: 'Save this key — it cannot be retrieved later.' });
});
app.get('/v1/keys', (req, res) => {
    res.json({ keys: listApiKeys() });
});
// ── All /v1/ endpoints below require auth ──
const v1 = express.Router();
v1.use(authMiddleware);
// Create agent
v1.post('/agents', (req, res) => {
    const { name, description, systemPrompt, goal, autonomous } = req.body;
    if (!name || !description || !systemPrompt) {
        return res.status(400).json({ error: 'Missing name, description, or systemPrompt' });
    }
    const id = randomUUID().slice(0, 8);
    createAgent({ id, name, description, systemPrompt, goal, autonomous: !!autonomous });
    res.json({ id, name, status: 'active' });
});
// List agents
v1.get('/agents', (_req, res) => {
    const agents = listAgents().map((a) => ({
        id: a.id, name: a.name, description: a.description,
        totalTasks: a.total_tasks, avgQuality: Math.round(a.avg_quality),
    }));
    res.json({ agents });
});
// Chat with agent
v1.post('/agents/:id/chat', async (req, res) => {
    const agent = getAgent(req.params.id);
    if (!agent)
        return res.status(404).json({ error: 'Agent not found' });
    const { message } = req.body;
    if (!message)
        return res.status(400).json({ error: 'Missing message' });
    try {
        const result = await chat(agent, message);
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// Get agent messages
v1.get('/agents/:id/messages', (req, res) => {
    const agent = getAgent(req.params.id);
    if (!agent)
        return res.status(404).json({ error: 'Agent not found' });
    res.json({ messages: getMessages(req.params.id, 100) });
});
// Upload file to agent knowledge base
v1.post('/agents/:id/files', (req, res) => {
    const agent = getAgent(req.params.id);
    if (!agent)
        return res.status(404).json({ error: 'Agent not found' });
    const { filename, content, mimeType } = req.body;
    if (!filename || !content)
        return res.status(400).json({ error: 'Missing filename or content' });
    addAgentFile(req.params.id, filename, content, mimeType || 'text/plain');
    res.json({ ok: true, filename });
});
// List agent files
v1.get('/agents/:id/files', (req, res) => {
    const agent = getAgent(req.params.id);
    if (!agent)
        return res.status(404).json({ error: 'Agent not found' });
    res.json({ files: getAgentFiles(req.params.id) });
});
// Delete agent file
v1.delete('/agents/:id/files/:fileId', (req, res) => {
    deleteAgentFile(req.params.id, parseInt(req.params.fileId));
    res.json({ deleted: true });
});
// Delete agent
v1.delete('/agents/:id', (req, res) => {
    const agent = getAgent(req.params.id);
    if (!agent)
        return res.status(404).json({ error: 'Agent not found' });
    deleteAgent(req.params.id);
    res.json({ deleted: true });
});
// Direct route (no agent, just cognitive routing)
v1.post('/route', async (req, res) => {
    const { query } = req.body;
    if (!query)
        return res.status(400).json({ error: 'Missing query' });
    const start = Date.now();
    try {
        const decomposition = await decompose(query);
        const results = await executeAll(decomposition.subtasks);
        const synthesis = await synthesize(query, results);
        const totalLatencyMs = Date.now() - start;
        for (const f of synthesis.faculties_used)
            updateWeight(f, synthesis.quality);
        saveRoute({
            query, decomposition,
            results: results.map(r => ({ task: r.subtask.task, faculty: r.subtask.faculty, subnet: r.subnet, result: r.result, source: r.source, latencyMs: r.latencyMs })),
            synthesis: synthesis.answer, quality: synthesis.quality, totalLatencyMs,
            facultiesUsed: synthesis.faculties_used, subnetsUsed: synthesis.subnets_used,
        });
        res.json({
            answer: synthesis.answer, quality: synthesis.quality, latencyMs: totalLatencyMs,
            steps: results.map(r => ({ task: r.subtask.task, faculty: r.subtask.faculty, subnet: `SN${r.subnet.netuid} ${r.subnet.name}` })),
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.use('/v1', v1);
app.listen(PORT, () => {
    console.log(`Eigentau Router running on port ${PORT}`);
});
