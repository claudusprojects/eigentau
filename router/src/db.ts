import Database from 'better-sqlite3';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { mkdirSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbDir = join(__dirname, '..', 'data');
mkdirSync(dbDir, { recursive: true });

const db: InstanceType<typeof Database> = new Database(join(dbDir, 'eigentau.db'));
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS routes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    query TEXT NOT NULL,
    decomposition TEXT NOT NULL,
    results TEXT NOT NULL,
    synthesis TEXT NOT NULL,
    quality INTEGER NOT NULL,
    total_latency_ms INTEGER NOT NULL,
    faculties_used TEXT NOT NULL,
    subnets_used TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS weights (
    faculty TEXT PRIMARY KEY,
    weight REAL NOT NULL DEFAULT 0.1,
    total_uses INTEGER NOT NULL DEFAULT 0,
    avg_quality REAL NOT NULL DEFAULT 0,
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS insights (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cycle INTEGER NOT NULL,
    type TEXT NOT NULL,
    text TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS agents (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    system_prompt TEXT NOT NULL,
    model TEXT NOT NULL DEFAULT 'claude-haiku-4-5-20251001',
    autonomous INTEGER NOT NULL DEFAULT 0,
    goal TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    total_tasks INTEGER NOT NULL DEFAULT 0,
    avg_quality REAL NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS agent_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agent_id TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    route_id INTEGER,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (agent_id) REFERENCES agents(id)
  );

  CREATE TABLE IF NOT EXISTS agent_tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    agent_id TEXT NOT NULL,
    query TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    result TEXT,
    quality INTEGER,
    latency_ms INTEGER,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    completed_at TEXT,
    FOREIGN KEY (agent_id) REFERENCES agents(id)
  );
`);

// Initialize weights if empty
const count = db.prepare('SELECT COUNT(*) as n FROM weights').get() as { n: number };
if (count.n === 0) {
  const init = db.prepare('INSERT INTO weights (faculty, weight) VALUES (?, ?)');
  const faculties = [
    'Perception', 'Generation', 'Reasoning', 'Memory', 'Learning',
    'Attention', 'Executive Functions', 'Metacognition', 'Problem Solving', 'Social Cognition'
  ];
  for (const f of faculties) {
    init.run(f, 0.1);
  }
}

export function saveRoute(data: {
  query: string;
  decomposition: object;
  results: object;
  synthesis: string;
  quality: number;
  totalLatencyMs: number;
  facultiesUsed: string[];
  subnetsUsed: object[];
}) {
  db.prepare(`INSERT INTO routes (query, decomposition, results, synthesis, quality, total_latency_ms, faculties_used, subnets_used)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`).run(
    data.query,
    JSON.stringify(data.decomposition),
    JSON.stringify(data.results),
    data.synthesis,
    data.quality,
    data.totalLatencyMs,
    JSON.stringify(data.facultiesUsed),
    JSON.stringify(data.subnetsUsed),
  );
}

export function getRecentRoutes(limit = 10) {
  return db.prepare('SELECT * FROM routes ORDER BY id DESC LIMIT ?').all(limit);
}

export function getRouteCount() {
  return (db.prepare('SELECT COUNT(*) as n FROM routes').get() as { n: number }).n;
}

export function getWeights() {
  return db.prepare('SELECT * FROM weights ORDER BY weight DESC').all();
}

export function updateWeight(faculty: string, quality: number) {
  const EMA = 0.8;
  const row = db.prepare('SELECT * FROM weights WHERE faculty = ?').get(faculty) as any;
  if (!row) return;
  const newAvg = row.avg_quality * EMA + quality * (1 - EMA);
  const newWeight = Math.max(0.01, row.weight * EMA + (quality / 100) * (1 - EMA));
  db.prepare('UPDATE weights SET weight = ?, avg_quality = ?, total_uses = total_uses + 1, updated_at = datetime(\'now\') WHERE faculty = ?')
    .run(newWeight, newAvg, faculty);
}

export function getInsights(limit = 20) {
  return db.prepare('SELECT * FROM insights ORDER BY id DESC LIMIT ?').all(limit);
}

export function addInsight(cycle: number, type: string, text: string) {
  db.prepare('INSERT INTO insights (cycle, type, text) VALUES (?, ?, ?)').run(cycle, type, text);
}

export function getStats() {
  const routes = getRouteCount();
  const avgQuality = (db.prepare('SELECT AVG(quality) as avg FROM routes').get() as any)?.avg || 0;
  const weights = getWeights();
  return { totalRoutes: routes, avgQuality: Math.round(avgQuality), weights };
}

// ── AGENTS ──

export function createAgent(data: { id: string; name: string; description: string; systemPrompt: string; goal?: string; autonomous?: boolean }) {
  db.prepare(`INSERT INTO agents (id, name, description, system_prompt, goal, autonomous) VALUES (?, ?, ?, ?, ?, ?)`)
    .run(data.id, data.name, data.description, data.systemPrompt, data.goal || null, data.autonomous ? 1 : 0);
}

export function getAgent(id: string) {
  return db.prepare('SELECT * FROM agents WHERE id = ?').get(id) as any;
}

export function listAgents() {
  return db.prepare('SELECT * FROM agents ORDER BY created_at DESC').all();
}

export function updateAgentStats(id: string, quality: number) {
  const agent = getAgent(id);
  if (!agent) return;
  const EMA = 0.8;
  const newAvg = agent.avg_quality * EMA + quality * (1 - EMA);
  db.prepare('UPDATE agents SET total_tasks = total_tasks + 1, avg_quality = ?, updated_at = datetime(\'now\') WHERE id = ?')
    .run(newAvg, id);
}

export function deleteAgent(id: string) {
  db.prepare('DELETE FROM agent_messages WHERE agent_id = ?').run(id);
  db.prepare('DELETE FROM agent_tasks WHERE agent_id = ?').run(id);
  db.prepare('DELETE FROM agents WHERE id = ?').run(id);
}

// ── AGENT MESSAGES (conversation memory) ──

export function addMessage(agentId: string, role: string, content: string, routeId?: number) {
  db.prepare('INSERT INTO agent_messages (agent_id, role, content, route_id) VALUES (?, ?, ?, ?)')
    .run(agentId, role, content, routeId || null);
}

export function getMessages(agentId: string, limit = 50) {
  return db.prepare('SELECT * FROM agent_messages WHERE agent_id = ? ORDER BY id DESC LIMIT ?').all(agentId, limit).reverse();
}

// ── AGENT TASKS ──

export function addTask(agentId: string, query: string) {
  const r = db.prepare('INSERT INTO agent_tasks (agent_id, query) VALUES (?, ?)').run(agentId, query);
  return r.lastInsertRowid;
}

export function completeTask(taskId: number | bigint, result: string, quality: number, latencyMs: number) {
  db.prepare('UPDATE agent_tasks SET status = \'done\', result = ?, quality = ?, latency_ms = ?, completed_at = datetime(\'now\') WHERE id = ?')
    .run(result, quality, latencyMs, taskId);
}

export function getAgentTasks(agentId: string, limit = 20) {
  return db.prepare('SELECT * FROM agent_tasks WHERE agent_id = ? ORDER BY id DESC LIMIT ?').all(agentId, limit);
}

export function getAgentCount() {
  return (db.prepare('SELECT COUNT(*) as n FROM agents').get() as { n: number }).n;
}

export default db;
