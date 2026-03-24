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

## Current State (2026-03-24)

### What's Live
- **Website**: eigentau.ai (Hostinger) — immersive scroll-snap panels, 3D icosahedron hero, per-section geometric canvas animations, hexagonal brain logo, OG banners for X/Telegram
- **App**: app.eigentau.ai (Railway) — SvelteKit 2 dashboard with 6 pages, real subnet data (119 subnets classified by cognitive faculty), routes still mock
- **Docs**: eigentau.ai/docs — editorial documentation page explaining the project in plain language
- **GitHub**: github.com/claudusprojects/eigentau (public)
- **Domain**: eigentau.ai (purchased on Hostinger 2026-03-24)

### What's Built

**Website** (`website/index.html` ~770 lines)
- Full-viewport scroll-snap panels (not flowing sections)
- Hero: 3D rotating wireframe icosahedron with orbital rings, particle trails along edges, floating math symbols (lambda, sigma, nabla, tau, pi, etc.), mouse-interactive tilt, depth-based rendering
- Per-section canvas animations: rotating octahedron (What), warping dot matrix + eigenvector waves (How), Lissajous spirograph curves (Learn), rotating wireframe torus (Token)
- Radar/spider chart SVG for 10 cognitive faculties
- Pipeline steps with giant ghost numbers (01-04)
- Thesis quote block, stats strip with counter animations, two-column explainer, "Built With" strip
- Mix-blend-mode difference nav (always readable against any bg)
- Typography: Instrument Serif (italic display) + DM Sans (body) + JetBrains Mono (data)
- Colors: #040406 bg, #F0F0F2 text, #8A8A9E secondary, #55556A muted, #00DBBC accent
- Logo: hexagonal honeycomb brain (7 hexagons with gradient opacity, center glow node)
- IMPORTANT JS gotcha: section canvas animations must use uniquely-named helpers (proj2/rY2/rX2) to avoid scope collision with hero canvas IIFE

**Docs** (`website/docs.html`)
- Clean editorial layout, max-width 800px
- 7 sections: What is Eigentau, Why it matters, How the router works, Cognitive map, Learning engine, $TAU token, Roadmap
- Written in plain language, no code blocks — callout boxes, faculty table, roadmap with status
- Same design system as website

**App** (`app/` — SvelteKit 2 + Svelte 5 runes + Tailwind 4 + adapter-node)
- 6 pages: Overview, Router, Cognitive Map, Learning, Subnets, Strategy
- Sidebar nav with hexagonal brain logo
- All pages use mock/placeholder data — ready for backend API integration
- Typography: Instrument Serif (italic headings) + DM Sans (body) + JetBrains Mono (mono)
- Same color palette as website
- Dockerfile for Railway (node:20-alpine, npm install, node build)

**Logo & Favicons**
- Hexagonal honeycomb brain: 7 hexagons with gradient opacity (brighter center, faded edges) + center glow node
- Source files: `website/logo.svg` (clean), `website/logo-favicon.svg` (with dark bg rect)
- All sizes: favicon.svg, favicon.ico (16+32+48), PNG 16/32/48/180/192/512
- Applied everywhere: website nav + footer, docs nav, app sidebar, all favicon tags

### Completed Phases

**Phase 3: Cognitive Map Research** (2026-03-24) DONE
- Researched all 129 Bittensor subnets via SubnetRadar, SubnetAlpha, TaoStats, Yuma AI
- 119 active subnets classified by primary + secondary cognitive faculty (10 inactive/unknown excluded)
- Data file: `app/src/lib/subnets.ts` — typed interfaces, faculty colors, descriptions, computed stats
- App pages updated: Overview (real cognitive profile), Cognitive Map (expandable faculty cards), Subnets (searchable/filterable table)
- Faculty distribution: Reasoning (28), Executive Functions (27), Problem Solving (21), Learning (14), Generation (11), Perception (11), Memory (10), Social Cognition (5), Metacognition (4), Attention (3)

### TODO (Next Phases)

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

### Colors
- **Background**: `#040406` (primary), `#0C0C12` (cards), `#0F0F18` (elevated)
- **Text**: `#F0F0F2` (headings), `#8A8A9E` (body), `#55556A` (muted)
- **Accent**: `#00DBBC` (teal — Bittensor ecosystem native)
- **Borders**: `#181822`, `#24243A`

### Typography
- **Display**: Instrument Serif (italic) — distinctive, editorial
- **Body**: DM Sans — clean, readable
- **Mono**: JetBrains Mono — data, numbers, code

### Logo
- Hexagonal honeycomb brain: 7 hexagons with gradient opacity + center glow node
- Source: `website/logo.svg` (clean SVG), `website/logo-favicon.svg` (with dark bg for favicons)
- Nav/footer use compact inline SVG version (7 hex + center dot, viewBox 0 0 88 88)
- CSS for logo alignment: `.n-logo{display:flex;align-items:center;gap:8px}` + `.n-logo svg{flex-shrink:0}`

### Visual Motifs
- 3D wireframe icosahedron (hero) with eigenvector arrows + orbital rings
- Per-section canvas: octahedron, dot matrix warp, Lissajous curves, wireframe torus
- Floating mathematical symbols
- Radar/spider chart for cognitive profile
- Scroll-snap full-viewport panels

## Project Structure

```
claudecooks/eigentau/
  CLAUDE.md                    # This file — source of truth
  .gitignore                   # node_modules, .svelte-kit, build, .env, *.zip
  website/
    index.html                 # Homepage (~770 lines, single-file inlined CSS/JS)
    docs.html                  # Documentation page
    faviconexample.html        # Logo picker page (can be removed)
    logo.svg                   # Clean logo SVG
    logo-favicon.svg           # Logo with dark bg rect for favicons
    og-banner.svg              # OG preview banner source (1200x630)
    og-banner.png              # OG preview banner rendered PNG
    favicon.svg                # Same as logo.svg
    favicon.ico                # Multi-size ICO (16+32+48)
    favicon-16x16.png
    favicon-32x32.png
    favicon-48x48.png
    apple-touch-icon.png       # 180px for iOS
    android-chrome-192x192.png
    android-chrome-512x512.png
    .htaccess                  # HTTPS redirect + clean URLs (/docs, /faviconexample)
  app/                         # SvelteKit 2 dashboard
    src/
      lib/
        subnets.ts             # 119 Bittensor subnets with cognitive faculty classifications
      app.css                  # Tailwind 4 + theme vars + fonts
      app.html                 # HTML shell with all favicon + OG meta tags
      routes/
        +layout.svelte         # Sidebar nav + top bar
        +page.svelte           # Overview dashboard
        router/+page.svelte    # Query router with decomposition view
        cognitive/+page.svelte # 10 faculties grid
        learning/+page.svelte  # Routing weights + learnings
        subnets/+page.svelte   # Subnet data table
        strategy/+page.svelte  # Learned parameters
    static/                    # favicon.svg, .ico, PNGs
    Dockerfile                 # node:20-alpine, npm install, node build
    svelte.config.js           # adapter-node
    vite.config.ts             # tailwindcss plugin
    package.json
  router/                      # Router agent (Phase 4 — NOT YET BUILT)
  mcp/                         # MCP server (Phase 8 — NOT YET BUILT)
```

## Deployment

### Website (eigentau.ai)
- **Host**: Hostinger (shared hosting, order 1008771789, username u197141309)
- **Deploy script**: `/tmp/hostinger-mcp/setup-eigentau.js`
- **Deploy command**:
  ```bash
  cd /root/claudecooks/eigentau/website
  rm -f deploy.zip && zip deploy.zip index.html docs.html favicon.svg favicon.ico favicon-16x16.png favicon-32x32.png apple-touch-icon.png android-chrome-192x192.png android-chrome-512x512.png logo.svg logo-favicon.svg .htaccess
  cd /tmp/hostinger-mcp && API_TOKEN="$HOSTINGER_API_KEY" node setup-eigentau.js
  ```
- **Hostinger API key**: stored in `/root/claudecooks/Clawnomous/.env` as `HOSTINGER_API_KEY`

### App (app.eigentau.ai)
- **Host**: Railway (auto-deploy does NOT reliably trigger — use manual deploy)
- **Railway domain**: `eigentau-app-production.up.railway.app`
- **Custom domain**: `app.eigentau.ai` (CNAME -> `ehvaxz9f.up.railway.app`)
- **Railway IDs**:
  - Project: `50198e35-175e-427c-9668-dd15b12475fd`
  - Service: `64cf821f-f8ea-452f-a2bc-cd117053d644`
  - Environment: `3e63372a-5b67-421a-b58c-fbbf73c2f6d1`
- **Root directory**: `app` (set via `serviceInstanceUpdate` mutation, NOT env var)
- **Start command**: `node build`
- **Manual deploy command**:
  ```bash
  export RAILWAY_TOKEN="720dd4c0-b76b-45d1-827b-44be40405b74"
  curl -s -H "Authorization: Bearer $RAILWAY_TOKEN" -H "Content-Type: application/json" \
    -X POST https://backboard.railway.app/graphql/v2 \
    -d '{"query":"mutation { serviceInstanceDeploy(serviceId: \"64cf821f-f8ea-452f-a2bc-cd117053d644\", environmentId: \"3e63372a-5b67-421a-b58c-fbbf73c2f6d1\") }"}'
  ```

### DNS (eigentau.ai on Hostinger)
| Type | Name | Value |
|------|------|-------|
| A | @ | 2.57.91.91 |
| CNAME | www | eigentau.ai. |
| CNAME | app | ehvaxz9f.up.railway.app. |
| TXT | _railway-verify.app | railway-verify=53c5ef864119db00... |

### GitHub
- **Repo**: `github.com/claudusprojects/eigentau` (public)
- **Remote uses PAT auth** (ghp token embedded in remote URL)

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
- TensorQ: Proven self-learning trading agent on Bittensor (at /root/claudecooks/TensorQ/)
- TensorGate: Working subnet query/routing tools (MCP server, 23 tools)

## Critical Gotchas
- **Railway root directory**: Must use `serviceInstanceUpdate` mutation — env var `RAILWAY_ROOT_DIRECTORY` does NOT work
- **Railway auto-deploy**: Does NOT reliably trigger on push — always manually trigger via GraphQL `serviceInstanceDeploy`
- **Railway Dockerfile**: When rootDirectory is set, Dockerfile path is relative to that dir. Use `npm install` not `npm ci` (lockfile format issues)
- **Hostinger DNS**: Use PUT method to update zone (not POST), must include ALL existing records + new ones with `overwrite: true`
- **Website JS scope**: Section canvas animations use proj2/rY2/rX2 (not proj/rY/rX) to avoid collision with hero IIFE
- **Logo alignment**: Nav/footer logo needs `display:flex;align-items:center;gap:8px` on the `.n-logo` class + `flex-shrink:0` on the svg
- **Design iterations**: Website went through multiple redesigns. Current version uses scroll-snap panels + 3D icosahedron hero. Avoid: curved crossbar tau logos (look like pickaxes), flat template layouts (look like every other Claude-made site), EB Garamond (too similar to TensorQ)
- **Hostinger deploy zip**: Must include ALL files needed (html, svg, ico, png, .htaccess) — anything not in the zip gets deleted
- **App fonts**: Must match website exactly (Instrument Serif + DM Sans + JetBrains Mono) for cohesive feel

## Session Handoff Notes (2026-03-24)

### Where We Left Off
- Phase 1-3 complete: website, app, docs, logo, favicons, DNS, deployments, subnet research
- Last commit: `7bf6249` — "Phase 3: Real subnet data — 119 subnets classified by cognitive faculty"
- Website navbar fixed (was mix-blend-mode:difference, now solid backdrop-blur)
- OG banners created and deployed (1200x630 PNG, og: + twitter: meta tags on all pages)
- App has real subnet data: Cognitive Map (expandable faculty cards), Subnets (searchable table), Overview (real cognitive profile)
- Routes in Overview page are still mock — will be replaced when router agent is built

### Immediate Next Steps
1. **Clean up**: Remove `faviconexample.html` and `eigen-logo-*.png` (DALL-E test images) from website dir
2. **Phase 4: Router Agent**: Build the actual routing engine in `router/` directory
3. **App polish**: Router page and Strategy page still use placeholder data
4. **Railway deploy gotcha**: `serviceInstanceDeploy` without `commitSha` (full 40-char SHA) reuses last successful commit. Always pass full SHA for new code.

### Design Decisions
- Dark theme with #00DBBC teal accent (Bittensor ecosystem native)
- Instrument Serif italic for display headings (NOT EB Garamond — too similar to TensorQ)
- DM Sans for body text
- Hexagonal honeycomb brain as logo (chosen by user from options)
- Immersive scroll-snap panels (NOT flowing sections — too template-y)
- 3D animated icosahedron as hero visual (NOT random dots/lines)
- Per-section geometric canvas animations (octahedron, dot matrix, Lissajous, torus)
- Nav: solid backdrop-blur (NOT mix-blend-mode:difference — caused inverted text bleed-through)
- The user is very particular about design quality — generic/template-looking designs are rejected
