# Eigentau

## One-liner
Decentralized AGI orchestration layer for Bittensor — routes complex tasks across multiple subnets, synthesizes results, and self-learns optimal routing patterns.

## Concept
Eigentau is the "prefrontal cortex" of Bittensor's subnet brain. It takes any complex task, decomposes it into sub-tasks using AI, routes each to the optimal Bittensor subnet(s), synthesizes the combined results, and learns which routing patterns produce the best outcomes over time.

The core thesis: AGI = orchestration of specialists. Bittensor has 129+ specialized subnets (inference, training, storage, prediction, scraping, etc.). Nobody has built the routing/orchestration layer that ties them together into something that behaves like general intelligence. Eigentau is that layer.

Inspired by Google DeepMind's 2026 AGI cognitive framework, which defines general intelligence as 10 cognitive faculties (perception, generation, attention, learning, memory, reasoning, metacognition, executive functions, problem solving, social cognition). Eigentau maps Bittensor's subnets to these faculties and orchestrates them.

## Name & Token
- **Name**: Eigentau — from "eigenvector" (fundamental direction in linear algebra) + "tau" (TAO/Bittensor)
- **Token**: $TAU on Base
- **Tagline**: "The fundamental direction of intelligence"

## Current State (March 2026)

### Completed (Phase 1-2)
- **Website LIVE** at **eigentau.ai** (Hostinger)
- **App LIVE** at **app.eigentau.ai** (Railway, auto-deploy from GitHub)
- **GitHub**: `github.com/claudusprojects/eigentau`
- **Domain**: eigentau.ai (purchased on Hostinger 2026-03-24)
- **DNS**: A record for root, CNAME `app` -> Railway, TXT for Railway verification
- **Design finalized**: Dark theme (#040406), teal accent (#00DBBC), Instrument Serif + DM Sans + JetBrains Mono

### What's Built

**Website** (`website/index.html`)
- Immersive full-viewport scroll-snap sections
- 3D animated hero: rotating wireframe icosahedron with orbital rings, particle trails, floating math symbols (lambda, sigma, nabla, tau, etc.), mouse-interactive tilt
- Per-section geometric animations: rotating octahedron (What), warping dot matrix + eigenvector waves (How), Lissajous spirograph curves (Learn), rotating wireframe torus (Token)
- Radar/spider chart SVG for cognitive faculties
- Pipeline steps with giant ghost numbers (01-04)
- Thesis quote block, stats strip, two-column explainer, "Built With" strip
- Mix-blend-mode difference nav (always readable)
- Scroll reveals, counter animations, bar fill animations

**App** (`app/` — SvelteKit 2 + Svelte 5 runes + Tailwind 4 + node adapter)
- 6 pages with sidebar nav: Overview, Router, Cognitive Map, Learning, Subnets, Strategy
- Overview: stats grid (129 subnets, 48K queries, 74.2% accuracy), recent routes table, cognitive profile bars
- Router: query input, task decomposition view with subnet/faculty tags, synthesis panel (mock data)
- Cognitive Map: 10 faculties in 2-col grid with scores, progress bars, subnet counts, AGI coverage %
- Learning: routing weights with deltas (+/-), recent learnings with type badges
- Subnets: data table (subnet ID, name, faculty, emission, miners, health, route weight)
- Strategy: network regime display, learned parameters table with reasoning
- All mock data — ready for backend integration
- Dockerfile for Railway deployment (node adapter, `npm install` not `npm ci`)

### TODO (Next Phases)

**Phase 3: Cognitive Map Research**
- Research all 129+ Bittensor subnets and classify each by cognitive faculty
- Replace mock data in app with real subnet-to-faculty mapping
- Score each faculty based on actual subnet coverage + performance

**Phase 4: Router Agent** (`router/` — to be built)
- Task decomposition via Claude API
- Subnet selection / fan-out via Bittensor RPC + TensorGate MCP tools
- Result synthesis
- Node.js + TypeScript runtime

**Phase 5: Learning Engine**
- Port TensorQ's self-learning architecture (learner.ts) for routing optimization
- Track which subnet combos produce best results per task type
- Signal-to-performance correlation, EMA weight adjustment
- SQLite database for routing history, learning records

**Phase 6: Connect App to Live Backend**
- Replace all mock data with real API calls to router agent
- SSE for live routing updates
- Token-gated auth ($TAU on Base)

**Phase 7: $TAU Token**
- Deploy on Base via launchpad (not in this repo)
- Fee pipeline: $TAU trading fees -> swap to TAO -> fund subnet queries

**Phase 8: MCP Server**
- `eigen_route` — send complex task, get orchestrated multi-subnet result
- `eigen_cognitive_map` — get current subnet-to-faculty mapping
- `eigen_stats` — routing performance, learning state

**Phase 9: Docs Page**
- `docs.html` — architecture, cognitive mapping, routing details, token info
- Currently referenced in nav but not yet built

## Architecture

### Router Agent (the brain)
- **Runtime**: Node.js + TypeScript
- **AI**: Anthropic Claude API for task decomposition, synthesis, and learning
- **Task Decomposition**: Takes complex query, breaks into sub-tasks with subnet targets
- **Subnet Mapping**: Maps all Bittensor subnets to DeepMind's 10 cognitive faculties
- **Fan-out**: Queries multiple subnets in parallel via Bittensor RPC / TensorGate MCP tools
- **Synthesis**: Combines results, resolves conflicts, produces unified answer
- **Loop**: Query -> Decompose -> Route -> Execute -> Synthesize -> Learn

### Cognitive Map
Maps every Bittensor subnet to one or more of DeepMind's 10 AGI faculties:
- **Perception** — image/vision subnets, data scraping subnets
- **Generation** — text/image/audio generation subnets
- **Reasoning** — LLM inference subnets
- **Memory** — storage subnets, data curation subnets
- **Learning** — training subnets (Templar, etc.)
- **Attention** — real-time/low-latency inference subnets (SN19)
- **Executive Functions** — compute orchestration, task planning subnets
- **Metacognition** — annotation/evaluation subnets (SN33)
- **Problem Solving** — multi-step agent subnets
- **Social Cognition** — conversation/dialogue subnets

### Learning Engine
Ported from TensorQ's self-learning architecture, adapted for routing:
- Tracks which subnet combos produce best results per task type
- Computes correlation between routing choices and outcome quality
- Auto-adjusts routing weights via EMA (80% current + 20% data-driven)
- Regime detection (network congestion, subnet performance shifts)
- Learns optimal parameters: decomposition depth, parallelism, synthesis strategy
- **Database**: SQLite (better-sqlite3, WAL mode)

## Design System

### Aesthetic
Dark, immersive, mathematical. 3D geometric visualizations. Scroll-driven full-viewport panels. Each section has its own animated canvas art. Inspired by chutes.ai layout + Bittensor ecosystem colors.

### Colors
- **Background**: `#040406` (primary), `#0C0C12` (cards), `#0F0F18` (elevated)
- **Text**: `#F0F0F2` (headings), `#8A8A9E` (body), `#55556A` (muted)
- **Accent**: `#00DBBC` (teal — Bittensor ecosystem native)
- **Borders**: `#181822`, `#24243A`

### Typography
- **Display**: Instrument Serif (italic) — distinctive, editorial, mathematical feel
- **Body**: DM Sans — clean, readable
- **Mono**: JetBrains Mono — data, numbers, code

### Visual Motifs
- 3D wireframe icosahedron (hero) with eigenvector arrows + orbital rings
- Per-section canvas animations: octahedron, dot matrix warp, Lissajous curves, wireframe torus
- Floating mathematical symbols (lambda, sigma, nabla, tau, pi, etc.)
- Radar/spider chart for cognitive profile
- Scroll-snap full-viewport panels
- Mix-blend-mode difference nav

## Project Structure

```
claudecooks/eigentau/
  CLAUDE.md              # This file — source of truth
  .gitignore             # node_modules, .svelte-kit, build, .env, *.zip
  website/
    index.html           # Homepage (single-file, inlined CSS/JS, ~770 lines)
    favicon.svg          # Eigenvector arrow icon
    .htaccess            # HTTPS redirect + clean URLs
  app/                   # SvelteKit 2 dashboard
    src/
      app.css            # Tailwind 4 + theme vars + fonts
      app.html           # HTML shell
      routes/
        +layout.svelte   # Sidebar nav + top bar
        +page.svelte     # Overview dashboard
        router/+page.svelte
        cognitive/+page.svelte
        learning/+page.svelte
        subnets/+page.svelte
        strategy/+page.svelte
    static/favicon.svg
    Dockerfile           # node:20-alpine, npm install, node build
    svelte.config.js     # adapter-node
    vite.config.ts       # tailwindcss plugin
    package.json
  router/                # Router agent (Phase 4 — NOT YET BUILT)
  mcp/                   # MCP server (Phase 8 — NOT YET BUILT)
```

## Deployment

### Website (eigentau.ai)
- **Host**: Hostinger (shared hosting, order 1008771789, username u197141309)
- **Deploy script**: `/tmp/hostinger-mcp/setup-eigentau.js`
- **Deploy command**:
  ```bash
  cd /root/claudecooks/eigentau/website
  rm -f deploy.zip && zip deploy.zip index.html favicon.svg .htaccess
  cd /tmp/hostinger-mcp && API_TOKEN="$HOSTINGER_API_KEY" node setup-eigentau.js
  ```

### App (app.eigentau.ai)
- **Host**: Railway (auto-deploy from GitHub main branch)
- **Railway domain**: `eigentau-app-production.up.railway.app`
- **Custom domain**: `app.eigentau.ai` (CNAME -> `ehvaxz9f.up.railway.app`)
- **Railway IDs**:
  - Project: `50198e35-175e-427c-9668-dd15b12475fd`
  - Service: `64cf821f-f8ea-452f-a2bc-cd117053d644`
  - Environment: `3e63372a-5b67-421a-b58c-fbbf73c2f6d1`
- **Root directory**: `app` (set via `serviceInstanceUpdate`)
- **Start command**: `node build`
- **Env vars**: `PORT=3000`

### DNS (eigentau.ai on Hostinger)
| Type | Name | Value |
|------|------|-------|
| A | @ | 2.57.91.91 |
| CNAME | www | eigentau.ai. |
| CNAME | app | ehvaxz9f.up.railway.app. |
| TXT | _railway-verify.app | railway-verify=53c5ef864119db00... |

### GitHub
- **Repo**: `github.com/claudusprojects/eigentau` (public)
- **Remote**: `https://github.com/claudusprojects/eigentau.git (uses PAT auth)`

## Reusable Components

| Source | What | How |
|--------|------|-----|
| TensorQ learner.ts | Self-learning loop | Port signal accuracy -> routing accuracy |
| TensorQ index.ts | Cycle architecture | Same pattern: decompose -> route -> synthesize -> learn |
| TensorQ fee-pipeline.ts | Token -> TAO conversion | Same pattern for $TAU -> TAO |
| TensorGate MCP tools | Subnet querying, network stats | Direct dependency for routing |
| TensorGate Hub | Worker dispatch, fallback | Reference for fan-out architecture |

## Key References
- DeepMind AGI Cognitive Framework (March 2026): 10 faculties of general intelligence
- Mixture of Experts (MoE): Gating network routes tokens to specialized experts
- Bittensor dTAO: 129+ subnets, each specialized, $2.3M/day emissions, $318/TAO
- TensorQ: Proven self-learning trading agent on Bittensor
- TensorGate: Working subnet query/routing tools (MCP server, 23 tools)

## Critical Gotchas
- **Railway root directory**: Must use `serviceInstanceUpdate` mutation to set `rootDirectory: "app"` — env var `RAILWAY_ROOT_DIRECTORY` does NOT work
- **Railway Dockerfile**: When rootDirectory is set, Dockerfile path is relative to that directory (just `Dockerfile`, not `app/Dockerfile`)
- **Railway npm ci**: Fails if package-lock.json format doesn't match node version — use `npm install` instead in Dockerfile
- **Hostinger DNS**: Use PUT method to update zone (not POST), must include ALL existing records + new ones with `overwrite: true`
- **Website JS scope**: Section canvas animations must use uniquely-named helper functions (proj2/rY2/rX2) to avoid collision with hero canvas IIFE (proj/rY/rX)
- **Design iterations**: TensorQ uses similar dark+teal+serif pattern — Eigentau must use different layout (scroll-snap panels, centered hero, bento/asymmetric) and different display font (Instrument Serif, not EB Garamond)
