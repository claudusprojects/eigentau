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

export default db;
