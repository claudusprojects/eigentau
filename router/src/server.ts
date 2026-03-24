import express from 'express';
import cors from 'cors';
import { decompose } from './decompose.js';
import { executeAll } from './execute.js';
import { synthesize } from './synthesize.js';
import { saveRoute, getRecentRoutes, getRouteCount, getWeights, updateWeight, getInsights, getStats } from './db.js';
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
  } catch (err: any) {
    console.error('Route error:', err);
    res.status(500).json({ error: err.message || 'Internal error' });
  }
});

// ── RECENT ROUTES ──
app.get('/api/routes', (_req, res) => {
  const routes = getRecentRoutes(20).map((r: any) => ({
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

app.listen(PORT, () => {
  console.log(`Eigentau Router running on port ${PORT}`);
});
