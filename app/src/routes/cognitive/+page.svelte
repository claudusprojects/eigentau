<script lang="ts">
  const faculties = [
    { name: 'Perception', subnets: 'Image, Vision, Scraping', score: 78, count: 14, desc: 'Extract and process information from the environment' },
    { name: 'Generation', subnets: 'Text, Image, Audio Gen', score: 92, count: 22, desc: 'Produce outputs including text, speech, and actions' },
    { name: 'Attention', subnets: 'Real-time, Low-latency', score: 65, count: 8, desc: 'Focus cognitive resources on relevant stimuli' },
    { name: 'Learning', subnets: 'Training, Fine-tuning', score: 58, count: 6, desc: 'Acquire new knowledge through experience' },
    { name: 'Memory', subnets: 'Storage, Data Curation', score: 71, count: 11, desc: 'Store and retrieve information over time' },
    { name: 'Reasoning', subnets: 'LLM Inference', score: 88, count: 18, desc: 'Draw valid conclusions through logical inference' },
    { name: 'Metacognition', subnets: 'Annotation, Evaluation', score: 45, count: 4, desc: 'Monitor and understand own cognitive processes' },
    { name: 'Executive Functions', subnets: 'Compute, Orchestration', score: 62, count: 9, desc: 'Planning, inhibition, and cognitive flexibility' },
    { name: 'Problem Solving', subnets: 'Multi-step Agents', score: 53, count: 5, desc: 'Find effective solutions to domain problems' },
    { name: 'Social Cognition', subnets: 'Dialogue, Conversation', score: 40, count: 3, desc: 'Process and interpret social information' },
  ];

  const totalScore = Math.round(faculties.reduce((s, f) => s + f.score, 0) / faculties.length);
</script>

<div class="space-y-8">
  <div class="flex items-end justify-between">
    <div>
      <h1 class="font-serif text-2xl italic text-text mb-2">Cognitive Map</h1>
      <p class="text-sm text-text-muted">Bittensor's subnets mapped to DeepMind's 10 AGI cognitive faculties.</p>
    </div>
    <div class="text-right">
      <div class="text-3xl font-mono font-medium text-accent">{totalScore}%</div>
      <div class="text-xs text-text-muted font-mono">AGI Coverage</div>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-px">
    {#each faculties as f}
      <div class="bg-bg-card border border-border rounded-xl p-6 hover:border-border-strong transition-colors group">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-base font-semibold text-text mb-1">{f.name}</h3>
            <p class="text-xs text-text-muted">{f.desc}</p>
          </div>
          <span class="text-2xl font-mono font-medium text-text tabular-nums">{f.score}<span class="text-sm text-text-muted">%</span></span>
        </div>
        <div class="h-2 bg-border rounded-full overflow-hidden mb-4">
          <div class="h-full bg-accent rounded-full transition-all" style="width: {f.score}%"></div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-mono text-text-muted">{f.subnets}</span>
          <span class="text-[11px] font-mono text-text-muted">{f.count} subnets</span>
        </div>
      </div>
    {/each}
  </div>
</div>
