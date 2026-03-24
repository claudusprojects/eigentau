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

## Architecture

### Router Agent (the brain)
- **Runtime**: Node.js + TypeScript
- **AI**: Anthropic Claude API for task decomposition, synthesis, and learning
- **Task Decomposition**: Takes complex query, breaks into sub-tasks with subnet targets
- **Subnet Mapping**: Maps all Bittensor subnets to DeepMind's 10 cognitive faculties
- **Fan-out**: Queries multiple subnets in parallel via Bittensor RPC / TensorGate MCP tools
- **Synthesis**: Combines results, resolves conflicts, produces unified answer
- **Loop**: Query → Decompose → Route → Execute → Synthesize → Learn

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
This becomes a live "AGI progress dashboard" — how much of general intelligence does Bittensor collectively cover?

### Learning Engine
Ported from TensorQ's self-learning architecture, adapted for routing:
- Tracks which subnet combos produce best results per task type
- Computes correlation between routing choices and outcome quality
- Auto-adjusts routing weights via EMA (80% current + 20% data-driven)
- Regime detection (network congestion, subnet performance shifts)
- Learns optimal parameters: decomposition depth, parallelism, synthesis strategy
- **Database**: SQLite (better-sqlite3, WAL mode) — routing history, learning records, cognitive profiles

### App (Dashboard)
- **Framework**: SvelteKit 2 (Svelte 5 runes) + Tailwind 4
- **Features**:
  - Live routing visualizations — watch queries fan out to subnets in real-time
  - Cognitive profile radar chart (10 faculties, scored by subnet coverage + performance)
  - Routing history with decomposition trees and per-subnet results
  - Learning progress — which routing patterns are improving, weight changes over time
  - Subnet explorer — all 129+ subnets mapped to faculties with health/performance
  - Strategy overview — current routing weights, what the system has learned
- **Auth**: Token-gated ($TAU on Base) or open with limited view
- **Deployment**: Railway (auto-deploy from GitHub)

### Website (Homepage + Docs)
- **Static HTML** — single-file per page, inlined CSS/JS
- **Pages**: `index.html` (homepage), `docs.html` (documentation)
- **Deploy**: Hostinger via TUS upload
- **Domain**: TBD (eigentau.xyz or eigentau.io)

### $TAU Token (Base)
- Pay for routing queries
- Stake for priority routing / higher quality synthesis
- Fee pipeline: $TAU trading fees -> swap to TAO -> fund subnet queries
- Launch separately on a launchpad (not in this repo)

### MCP Server (Phase 5)
- Expose Eigentau as MCP tools for other agents/users:
  - `eigen_route` — send complex task, get orchestrated multi-subnet result
  - `eigen_cognitive_map` — get current subnet-to-faculty mapping
  - `eigen_stats` — routing performance, learning state

## Design System — "Mathematical Precision"

### Aesthetic
Clean, mathematical, precise. Eigenvalue/linear algebra visual motifs. Matrix transformations, vector fields, coordinate grids. The design should feel like a research paper meets a high-end product. No flashy crypto aesthetics. Confident, intellectual, structural.

### Colors
TBD — likely:
- Dark/navy background with white/light text (or inverted: white bg, dark text)
- Accent: eigenvalue-inspired (gold/amber for lambda, or deep blue for precision)
- Success/danger: green/red for routing outcomes

### Typography
TBD — mathematical feel:
- Display: something geometric/precise
- Body: clean sans-serif
- Mono: JetBrains Mono or IBM Plex Mono (for code, addresses, routing data)

### Visual Motifs
- Eigenvector arrows / transformation matrices
- Network graphs with subnet nodes and routing edges
- Radar/spider charts (cognitive profile)
- Decomposition trees (task -> sub-tasks -> subnets)
- Grid/coordinate systems as backgrounds

## Project Structure (Planned)

```
claudecooks/eigentau/
  CLAUDE.md              # This file — source of truth
  website/
    index.html           # Homepage
    docs.html            # Documentation
    favicon.svg
    .htaccess
  router/                # Router agent
    src/
      index.ts           # Main loop
      decomposer.ts      # Task decomposition (Claude API)
      router.ts          # Subnet selection / fan-out
      synthesizer.ts     # Result synthesis
      learner.ts         # Self-learning engine (ported from TensorQ)
      cognitive-map.ts   # Subnet -> faculty mapping
      db.ts              # SQLite schema + queries
    package.json
    tsconfig.json
  app/                   # SvelteKit dashboard
    src/
    package.json
    svelte.config.js
  mcp/                   # MCP server (Phase 5)
    src/
    package.json
```

## Build Order

| Phase | Component | What |
|-------|-----------|------|
| 1 | CLAUDE.md | Source of truth (this file) |
| 2 | Website | Homepage + docs, establish brand, buy domain |
| 3 | Cognitive Map | Research all 129 subnets, classify by faculty |
| 4 | Router Agent | Task decomposition, subnet routing, synthesis |
| 5 | Learning Engine | Port TensorQ learner for routing optimization |
| 6 | Dashboard App | SvelteKit app with live routing viz |
| 7 | $TAU Token | Base deployment, separate launchpad |
| 8 | MCP Server | Expose as tools for other agents |

## Reusable Components

| Source | What | How |
|--------|------|-----|
| TensorQ learner.ts | Self-learning loop | Port signal accuracy -> routing accuracy |
| TensorQ index.ts | Cycle architecture | Same pattern: decompose -> route -> synthesize -> learn |
| TensorQ fee-pipeline.ts | Token -> TAO conversion | Same pattern for $TAU -> TAO |
| TensorGate MCP tools | Subnet querying, network stats | Direct dependency for routing |
| TensorGate Hub | Worker dispatch, fallback | Reference for fan-out architecture |
| All projects | Hostinger deploy, static HTML | Website deploy pattern |

## Key References
- DeepMind AGI Cognitive Framework (March 2026): 10 faculties of general intelligence
- Mixture of Experts (MoE): Gating network routes tokens to specialized experts
- Bittensor dTAO: 129+ subnets, each specialized, $2.3M/day emissions
- TensorQ: Proven self-learning trading agent on Bittensor
- TensorGate: Working subnet query/routing tools

## Deployment
- **Website**: TBD domain, Hostinger
- **Router/App**: Railway
- **GitHub**: claudusprojects/eigentau
