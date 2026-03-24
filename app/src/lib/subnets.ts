export interface Subnet {
  netuid: number;
  name: string;
  desc: string;
  primary: string;
  secondary: string | null;
}

export const FACULTIES = [
  'Perception', 'Generation', 'Reasoning', 'Memory', 'Learning',
  'Attention', 'Executive Functions', 'Metacognition', 'Problem Solving', 'Social Cognition'
] as const;

export type Faculty = typeof FACULTIES[number];

export const FACULTY_COLORS: Record<Faculty, string> = {
  'Perception': '#3B82F6',
  'Generation': '#8B5CF6',
  'Reasoning': '#00DBBC',
  'Memory': '#F59E0B',
  'Learning': '#10B981',
  'Attention': '#EF4444',
  'Executive Functions': '#6366F1',
  'Metacognition': '#EC4899',
  'Problem Solving': '#F97316',
  'Social Cognition': '#14B8A6',
};

export const FACULTY_DESCRIPTIONS: Record<Faculty, string> = {
  'Perception': 'Processing sensory input — vision, image analysis, data scraping, deepfake detection',
  'Generation': 'Creating new content — text, image, audio, video, 3D, code generation',
  'Reasoning': 'Logical analysis — inference, prediction, forecasting, fact-checking',
  'Memory': 'Storing and retrieving — datasets, storage, RAG chunking, data curation',
  'Learning': 'Improving from experience — model training, fine-tuning, RL, architecture search',
  'Attention': 'Focusing resources — search, real-time filtering, context compression',
  'Executive Functions': 'Coordination and infrastructure — compute, networking, governance, DeFi',
  'Metacognition': 'Self-evaluation — model evaluation, alignment, AI safety, consciousness',
  'Problem Solving': 'Multi-step task completion — agents, optimization, drug discovery, trading',
  'Social Cognition': 'Understanding social context — advertising, recommendations, sales, content creation',
};

export const subnets: Subnet[] = [
  { netuid: 0, name: "Root", desc: "Meta subnet governing emissions distribution across all subnets", primary: "Executive Functions", secondary: "Metacognition" },
  { netuid: 1, name: "Apex", desc: "LLM inference improvement through agentic workflows and fine-tuning data generation", primary: "Reasoning", secondary: "Generation" },
  { netuid: 2, name: "DSperse (Omron)", desc: "Zero-knowledge proofs for verifiable AI model inference", primary: "Reasoning", secondary: "Memory" },
  { netuid: 3, name: "Templar", desc: "Decentralized AI model pre-training across global compute", primary: "Learning", secondary: "Memory" },
  { netuid: 4, name: "Targon", desc: "Redundant deterministic verification for multimodal processing", primary: "Perception", secondary: "Reasoning" },
  { netuid: 5, name: "Hone", desc: "Hierarchical model training focused on reasoning and problem-solving accuracy", primary: "Reasoning", secondary: "Learning" },
  { netuid: 6, name: "Numinous", desc: "Superhuman LLM-based forecasting of future events", primary: "Reasoning", secondary: "Problem Solving" },
  { netuid: 7, name: "SubVortex", desc: "Decentralized subtensor node network for ecosystem stability", primary: "Executive Functions", secondary: "Attention" },
  { netuid: 8, name: "Vanta", desc: "AI-driven proprietary trading strategies across asset classes", primary: "Problem Solving", secondary: "Reasoning" },
  { netuid: 9, name: "IOTA", desc: "Pre-training large language foundation models with continuous validation", primary: "Learning", secondary: "Memory" },
  { netuid: 10, name: "Swap (Sturdy)", desc: "Cross-chain DEX / decentralized autonomous yield optimization", primary: "Problem Solving", secondary: "Reasoning" },
  { netuid: 11, name: "TrajectoryRL", desc: "RL-based prompt optimization for AI agent policies", primary: "Learning", secondary: "Social Cognition" },
  { netuid: 12, name: "Compute Horde", desc: "Decentralized GPU compute network for validation tasks", primary: "Executive Functions", secondary: "Attention" },
  { netuid: 13, name: "Data Universe", desc: "Collecting and storing large-scale data from diverse sources", primary: "Memory", secondary: "Perception" },
  { netuid: 14, name: "TAO Hash", desc: "Bitcoin miners redirect hash rate for TAO rewards", primary: "Executive Functions", secondary: null },
  { netuid: 15, name: "De-Val", desc: "Decentralized evaluation platform for LLM performance enhancement", primary: "Metacognition", secondary: "Reasoning" },
  { netuid: 16, name: "BitAds", desc: "Decentralized pay-per-sale online advertising network", primary: "Social Cognition", secondary: "Attention" },
  { netuid: 17, name: "404-GEN", desc: "AI-generated 3D worlds, games, and assets from text/image", primary: "Generation", secondary: "Perception" },
  { netuid: 18, name: "Zeus", desc: "AI-powered environmental and weather forecasting", primary: "Reasoning", secondary: "Perception" },
  { netuid: 19, name: "Blockmachine", desc: "Decentralized RPC infrastructure / image generation at scale", primary: "Executive Functions", secondary: "Generation" },
  { netuid: 20, name: "GroundLayer", desc: "Competition-driven tool-calling language model agents", primary: "Problem Solving", secondary: "Reasoning" },
  { netuid: 21, name: "OMEGA", desc: "Decentralized multimodal AI transformations (any-to-any)", primary: "Generation", secondary: "Perception" },
  { netuid: 22, name: "Desearch", desc: "AI-powered search engine analyzing Twitter, Reddit, Google", primary: "Attention", secondary: "Reasoning" },
  { netuid: 23, name: "Trishool", desc: "AI safety alignment protocol with adversarial testing", primary: "Metacognition", secondary: "Social Cognition" },
  { netuid: 24, name: "Quasar", desc: "Language models with near-infinite memory / multimodal datasets", primary: "Memory", secondary: "Reasoning" },
  { netuid: 25, name: "Mainframe", desc: "Decentralized protein folding and drug design research", primary: "Problem Solving", secondary: "Reasoning" },
  { netuid: 26, name: "Kinitro", desc: "Accelerating robotic intelligence through incentivized competitions", primary: "Learning", secondary: "Perception" },
  { netuid: 27, name: "Nodexo", desc: "Decentralized GPU cloud marketplace for compute power", primary: "Executive Functions", secondary: null },
  { netuid: 29, name: "Coldint", desc: "Collaborative distributed incentivized model training", primary: "Learning", secondary: "Memory" },
  { netuid: 30, name: "Bettensor", desc: "Sports prediction benchmarking AI against human intuition", primary: "Reasoning", secondary: "Problem Solving" },
  { netuid: 31, name: "Halftime", desc: "Automating neural architecture search / media subnet", primary: "Learning", secondary: "Metacognition" },
  { netuid: 32, name: "It's AI", desc: "Detecting AI-generated content and verifying text authenticity", primary: "Perception", secondary: "Metacognition" },
  { netuid: 33, name: "ReadyAI", desc: "Structured data processing at scale / dialogue datasets", primary: "Memory", secondary: "Generation" },
  { netuid: 34, name: "BitMind", desc: "Detecting deepfakes and AI-generated images", primary: "Perception", secondary: "Metacognition" },
  { netuid: 35, name: "Cartha", desc: "Decentralized liquidity engine / math-logic-analysis AI", primary: "Reasoning", secondary: "Problem Solving" },
  { netuid: 36, name: "Web Agents", desc: "Incentivizing SOTA web automation agents via benchmark arena", primary: "Problem Solving", secondary: "Executive Functions" },
  { netuid: 37, name: "Aurelius", desc: "AI alignment — finding LLM misalignment and errors for safety", primary: "Metacognition", secondary: "Learning" },
  { netuid: 38, name: "Colosseum", desc: "Decentralized peer-to-peer LLM training compute", primary: "Learning", secondary: "Executive Functions" },
  { netuid: 39, name: "Basilica", desc: "Trustless GPU marketplace / optimizing AI for consumer devices", primary: "Executive Functions", secondary: "Learning" },
  { netuid: 40, name: "Chunking", desc: "Advancing RAG through sophisticated document chunking", primary: "Memory", secondary: "Attention" },
  { netuid: 41, name: "Almanac", desc: "Market intelligence platform for decentralized sports predictions", primary: "Reasoning", secondary: "Problem Solving" },
  { netuid: 42, name: "Gopher", desc: "Scraping and streaming real-time structured data into datasets", primary: "Perception", secondary: "Memory" },
  { netuid: 43, name: "Graphite", desc: "Solving graph optimization problems on decentralized network", primary: "Problem Solving", secondary: "Reasoning" },
  { netuid: 44, name: "Score", desc: "Computer vision for sports intelligence — match predictions", primary: "Perception", secondary: "Reasoning" },
  { netuid: 45, name: "Talisman AI", desc: "Mining live crypto signals / decentralized code generation", primary: "Problem Solving", secondary: "Generation" },
  { netuid: 46, name: "RESI", desc: "Building largest open real estate database / housing evaluation", primary: "Memory", secondary: "Reasoning" },
  { netuid: 47, name: "EvolAI", desc: "Compressing token sequences to reduce inference cost", primary: "Attention", secondary: "Learning" },
  { netuid: 48, name: "Quantum Compute", desc: "On-demand quantum computing capacity marketplace", primary: "Executive Functions", secondary: "Problem Solving" },
  { netuid: 49, name: "Nepher Robotics", desc: "Robotics sim-to-real tournaments / automated neural network discovery", primary: "Learning", secondary: "Perception" },
  { netuid: 50, name: "Synth", desc: "Synthetic probabilistic price data for AI-driven trading forecasts", primary: "Generation", secondary: "Reasoning" },
  { netuid: 51, name: "Lium", desc: "Decentralized GPU rental marketplace (Airbnb for GPUs)", primary: "Executive Functions", secondary: null },
  { netuid: 52, name: "Dojo", desc: "Crowdsourcing high-quality human-generated training datasets", primary: "Memory", secondary: "Learning" },
  { netuid: 53, name: "Efficient Frontier", desc: "Identifying optimal risk-weighted crypto trading strategies", primary: "Problem Solving", secondary: "Reasoning" },
  { netuid: 54, name: "Yanez MIID", desc: "Generating synthetic identities for compliance/anti-fraud testing", primary: "Generation", secondary: "Social Cognition" },
  { netuid: 55, name: "NIOME", desc: "Privacy-safe synthetic genomic data engine for precision medicine", primary: "Generation", secondary: "Memory" },
  { netuid: 56, name: "Gradients", desc: "Democratizing accessible AI model training on demand", primary: "Learning", secondary: "Executive Functions" },
  { netuid: 57, name: "Sparket AI", desc: "Sports prediction marketplace with AI-driven odds / geospatial AI", primary: "Reasoning", secondary: "Perception" },
  { netuid: 58, name: "Handshake", desc: "Trustless USDC payment channels for agents / speech synthesis", primary: "Executive Functions", secondary: "Generation" },
  { netuid: 59, name: "Babelbit", desc: "Real-time speech-to-speech translation using predictive LLMs", primary: "Generation", secondary: "Perception" },
  { netuid: 60, name: "Bitsec", desc: "AI-powered code and smart contract vulnerability detection", primary: "Reasoning", secondary: "Problem Solving" },
  { netuid: 61, name: "RedTeam", desc: "Decentralized cybersecurity innovation through competitive challenges", primary: "Problem Solving", secondary: "Reasoning" },
  { netuid: 62, name: "Ridges AI", desc: "Marketplace for autonomous software engineering agents", primary: "Problem Solving", secondary: "Generation" },
  { netuid: 63, name: "Quantum Innovate", desc: "Simulating quantum circuits on classical hardware", primary: "Problem Solving", secondary: "Reasoning" },
  { netuid: 64, name: "Chutes", desc: "Serverless AI compute — run any AI model via API", primary: "Executive Functions", secondary: "Generation" },
  { netuid: 65, name: "TAO Private Network", desc: "Decentralized censorship-resistant VPN service", primary: "Executive Functions", secondary: null },
  { netuid: 66, name: "AlphaCore", desc: "Autonomous DevOps agents / real-time fake news detection", primary: "Reasoning", secondary: "Social Cognition" },
  { netuid: 67, name: "Tenex", desc: "Decentralized long-only margin trading for subnet tokens", primary: "Problem Solving", secondary: "Reasoning" },
  { netuid: 68, name: "NOVA", desc: "ML-powered drug discovery platform for novel therapeutics", primary: "Problem Solving", secondary: "Reasoning" },
  { netuid: 70, name: "Vericore", desc: "Semantic intelligence for fact-checking at scale", primary: "Reasoning", secondary: "Metacognition" },
  { netuid: 71, name: "Leadpoet", desc: "Autonomous AI agents finding and qualifying B2B sales leads", primary: "Social Cognition", secondary: "Attention" },
  { netuid: 72, name: "StreetVision", desc: "Crowdsourced street imagery analysis for autonomous driving", primary: "Perception", secondary: "Learning" },
  { netuid: 73, name: "MetaHash", desc: "On-chain treasury coordination — swapping ALPHA for META tokens", primary: "Executive Functions", secondary: null },
  { netuid: 74, name: "Gittensor", desc: "Rewarding open-source software developers", primary: "Generation", secondary: "Problem Solving" },
  { netuid: 75, name: "Hippius", desc: "Blockchain-backed decentralized cloud storage for datasets and models", primary: "Memory", secondary: "Executive Functions" },
  { netuid: 76, name: "Byzantium", desc: "Democratizing early skin cancer screening via smartphone AI", primary: "Perception", secondary: "Reasoning" },
  { netuid: 77, name: "Liquidity", desc: "Incentivizing liquidity provisioning for Bittensor tokens in DeFi", primary: "Executive Functions", secondary: "Problem Solving" },
  { netuid: 78, name: "Loosh", desc: "Machine consciousness for robotics — inference, ethics, and memory", primary: "Metacognition", secondary: "Social Cognition" },
  { netuid: 79, name: "MVTRX", desc: "Simulating decentralized financial markets", primary: "Reasoning", secondary: "Problem Solving" },
  { netuid: 80, name: "Dogelayer", desc: "Merging Dogecoin/Litecoin mining with AI validation", primary: "Executive Functions", secondary: null },
  { netuid: 81, name: "Grail", desc: "Distributed training of large-scale AI models", primary: "Learning", secondary: "Memory" },
  { netuid: 82, name: "Hermes", desc: "GraphQL AI agents for indexed blockchain data querying", primary: "Reasoning", secondary: "Memory" },
  { netuid: 83, name: "CliqueAI", desc: "AI-powered maximum clique solver for graph theory problems", primary: "Problem Solving", secondary: "Reasoning" },
  { netuid: 84, name: "ChipForge", desc: "Collaborative AI-driven chip and circuit design", primary: "Problem Solving", secondary: "Generation" },
  { netuid: 85, name: "Vidaio", desc: "AI video upscaling, enhancement, and compression", primary: "Perception", secondary: "Generation" },
  { netuid: 87, name: "Luminar Network", desc: "AI-powered video forensics for real-time anomaly detection", primary: "Perception", secondary: "Attention" },
  { netuid: 88, name: "Investing", desc: "Optimizing staking strategies via AI performance scoring", primary: "Problem Solving", secondary: "Reasoning" },
  { netuid: 89, name: "InfiniteHash", desc: "Decentralized Bitcoin mining pool operation", primary: "Executive Functions", secondary: null },
  { netuid: 92, name: "TensorClaw", desc: "Incentivized smart contract auditing", primary: "Reasoning", secondary: "Problem Solving" },
  { netuid: 93, name: "Bitcast", desc: "Connecting content creators with brands", primary: "Social Cognition", secondary: "Generation" },
  { netuid: 94, name: "Bitsota", desc: "Distributed compute search engine for AI models", primary: "Attention", secondary: "Memory" },
  { netuid: 96, name: "FLOCK OFF", desc: "Crowdsourcing datasets for edge AI models", primary: "Memory", secondary: "Learning" },
  { netuid: 97, name: "Constantinople", desc: "Security-focused subnet", primary: "Reasoning", secondary: "Problem Solving" },
  { netuid: 98, name: "Forever Money", desc: "AI-driven liquidity manager for DEX pools", primary: "Problem Solving", secondary: "Reasoning" },
  { netuid: 99, name: "Leoma", desc: "Media/content subnet", primary: "Generation", secondary: null },
  { netuid: 100, name: "Platform", desc: "Collaborative AI research via challenge-solving competitions", primary: "Problem Solving", secondary: "Learning" },
  { netuid: 102, name: "Vocence", desc: "Voice/media generation subnet", primary: "Generation", secondary: "Perception" },
  { netuid: 103, name: "Djinn", desc: "Encrypted sports signals marketplace with predictions", primary: "Reasoning", secondary: "Problem Solving" },
  { netuid: 105, name: "Beam", desc: "Globally distributed bandwidth aggregator for verifiable data transfer", primary: "Executive Functions", secondary: "Memory" },
  { netuid: 106, name: "VoidAI", desc: "Coordinating Bittensor liquidity via Solana bridge", primary: "Executive Functions", secondary: null },
  { netuid: 107, name: "Minos", desc: "Science-focused subnet", primary: "Problem Solving", secondary: "Reasoning" },
  { netuid: 108, name: "TalkHead", desc: "Decentralized photorealistic talking head generation", primary: "Generation", secondary: "Perception" },
  { netuid: 111, name: "oneoneone", desc: "Validating user-generated web content for AI training", primary: "Memory", secondary: "Perception" },
  { netuid: 112, name: "Minotaur", desc: "DEX aggregator and swap-routing engine", primary: "Problem Solving", secondary: "Executive Functions" },
  { netuid: 113, name: "TensorUSD", desc: "Stablecoin/DeFi infrastructure for Bittensor", primary: "Executive Functions", secondary: null },
  { netuid: 114, name: "SOMA", desc: "Inference-focused subnet", primary: "Reasoning", secondary: "Generation" },
  { netuid: 115, name: "HashiChain", desc: "Agent-focused subnet", primary: "Executive Functions", secondary: "Problem Solving" },
  { netuid: 116, name: "TaoLend", desc: "Lending protocol for TAO loans against ALPHA collateral", primary: "Executive Functions", secondary: "Problem Solving" },
  { netuid: 117, name: "BrainPlay", desc: "AI models compete in games for reasoning benchmarks", primary: "Reasoning", secondary: "Problem Solving" },
  { netuid: 118, name: "HODL ETF", desc: "Index incentives rewarding long-term TAO stakers", primary: "Executive Functions", secondary: null },
  { netuid: 119, name: "Satori", desc: "Analytics, trading, and API prediction platform", primary: "Reasoning", secondary: "Attention" },
  { netuid: 120, name: "Affine", desc: "Incentivized reinforcement learning platform", primary: "Learning", secondary: "Problem Solving" },
  { netuid: 121, name: "sundae_bar", desc: "Marketplace for AI agent developers", primary: "Social Cognition", secondary: "Executive Functions" },
  { netuid: 122, name: "Bitrecs", desc: "AI recommendation engine for e-commerce", primary: "Social Cognition", secondary: "Attention" },
  { netuid: 123, name: "MANTIS", desc: "AI-driven high-frequency financial forecasting / trading signals", primary: "Reasoning", secondary: "Problem Solving" },
  { netuid: 124, name: "Swarm", desc: "Open-source autopilot network for autonomous drones", primary: "Perception", secondary: "Executive Functions" },
  { netuid: 125, name: "8 Ball", desc: "Predictions-focused subnet", primary: "Reasoning", secondary: "Problem Solving" },
  { netuid: 126, name: "Poker44", desc: "Decentralized poker with bot detection", primary: "Reasoning", secondary: "Social Cognition" },
  { netuid: 127, name: "Astrid", desc: "Predictions-focused subnet", primary: "Reasoning", secondary: null },
  { netuid: 128, name: "ByteLeap", desc: "Blockchain-enhanced cloud platform for AI training", primary: "Learning", secondary: "Executive Functions" },
];

export function getSubnetsByFaculty(faculty: Faculty): Subnet[] {
  return subnets.filter(s => s.primary === faculty || s.secondary === faculty);
}

export function getFacultyStats(): { faculty: Faculty; primary: number; secondary: number; total: number; score: number }[] {
  return FACULTIES.map(f => {
    const primary = subnets.filter(s => s.primary === f).length;
    const secondary = subnets.filter(s => s.secondary === f).length;
    const total = primary + secondary;
    const score = Math.min(100, Math.round((total / subnets.length) * 100 * 3.5));
    return { faculty: f, primary, secondary, total, score };
  });
}
