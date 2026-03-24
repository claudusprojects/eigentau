<script lang="ts">
  const weights = [
    { signal: 'Inference', weight: 0.359, prev: 0.318, perf: 82 },
    { signal: 'Prediction', weight: 0.233, prev: 0.215, perf: 58 },
    { signal: 'Scraping', weight: 0.209, prev: 0.221, perf: 48 },
    { signal: 'Storage', weight: 0.144, prev: 0.137, perf: 34 },
    { signal: 'Annotation', weight: 0.049, prev: 0.052, perf: 18 },
    { signal: 'Training', weight: 0.006, prev: 0.004, perf: 8 },
  ];

  const learnings = [
    { cycle: 847, text: 'Multi-subnet queries involving SN1+SN13 produce 23% higher quality than SN1 alone for research tasks.', type: 'positive' },
    { cycle: 845, text: 'SN8 prediction accuracy drops below 60% during high-volatility network periods. Route to SN1 reasoning instead.', type: 'caution' },
    { cycle: 842, text: 'Adding SN33 metacognition step improves overall quality by 8% but adds 1.2s latency. Worth it for complex queries.', type: 'positive' },
    { cycle: 839, text: 'Real-time subnets (SN19) have 3x higher failure rate during peak hours. Implement fallback routing.', type: 'caution' },
    { cycle: 836, text: 'Optimal decomposition depth is 3-5 subtasks. Beyond 5, synthesis quality degrades due to context dilution.', type: 'insight' },
  ];
</script>

<div class="space-y-8">
  <div>
    <h1 class="font-serif text-3xl font-semibold italic text-text mb-2">Learning Engine</h1>
    <p class="text-sm text-text-muted">Self-evolving routing weights and insights from query outcomes.</p>
  </div>

  <div class="grid grid-cols-2 gap-6">
    <!-- Weights -->
    <div class="bg-bg-card border border-border rounded-xl">
      <div class="px-6 py-4 border-b border-border flex items-center justify-between">
        <h2 class="text-sm font-semibold text-text">Routing Weights</h2>
        <span class="text-xs font-mono text-text-muted">Cycle 847 / EMA 0.80</span>
      </div>
      <div class="p-6 space-y-5">
        {#each weights as w}
          {@const delta = w.weight - w.prev}
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm font-mono text-text-secondary">{w.signal}</span>
              <div class="flex items-center gap-3">
                <span class="text-xs font-mono text-text-muted">{w.weight.toFixed(3)}</span>
                <span class="text-xs font-mono {delta >= 0 ? 'text-accent' : 'text-danger'}">
                  {delta >= 0 ? '+' : ''}{delta.toFixed(3)}
                </span>
              </div>
            </div>
            <div class="h-1.5 bg-border rounded-full overflow-hidden">
              <div class="h-full bg-accent rounded-full" style="width: {w.perf}%"></div>
            </div>
          </div>
        {/each}
        <div class="pt-4 border-t border-border flex justify-between">
          <span class="text-xs font-mono text-text-muted">Overall Accuracy</span>
          <span class="text-xs font-mono text-accent">74.2%</span>
        </div>
      </div>
    </div>

    <!-- Learnings -->
    <div class="bg-bg-card border border-border rounded-xl">
      <div class="px-6 py-4 border-b border-border flex items-center justify-between">
        <h2 class="text-sm font-semibold text-text">Recent Learnings</h2>
        <span class="text-xs font-mono text-text-muted">296 total</span>
      </div>
      <div class="divide-y divide-border">
        {#each learnings as l}
          <div class="px-6 py-4">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-[10px] font-mono text-text-muted">Cycle {l.cycle}</span>
              <span class="text-[10px] font-mono px-1.5 py-0.5 rounded
                {l.type === 'positive' ? 'text-accent bg-accent-dim' : l.type === 'caution' ? 'text-yellow-400 bg-yellow-400/10' : 'text-text-secondary bg-bg-alt'}">
                {l.type}
              </span>
            </div>
            <p class="text-sm text-text-secondary leading-relaxed">{l.text}</p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
