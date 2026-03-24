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
    { cycle: 847, text: 'Multi-subnet queries involving SN1+SN13 produce 23% higher quality than SN1 alone for research tasks.', type: 'positive' as const },
    { cycle: 845, text: 'SN8 prediction accuracy drops below 60% during high-volatility network periods. Route to SN1 reasoning instead.', type: 'caution' as const },
    { cycle: 842, text: 'Adding SN15 metacognition step improves overall quality by 8% but adds 1.2s latency. Worth it for complex queries.', type: 'positive' as const },
    { cycle: 839, text: 'Real-time subnets (SN64 Chutes) have 3x higher failure rate during peak hours. Implement fallback routing.', type: 'caution' as const },
    { cycle: 836, text: 'Optimal decomposition depth is 3-5 subtasks. Beyond 5, synthesis quality degrades due to context dilution.', type: 'insight' as const },
  ];

  const typeColors = {
    positive: { text: 'text-accent', bg: 'bg-accent/10' },
    caution: { text: 'text-warn', bg: 'bg-warn/10' },
    insight: { text: 'text-text-secondary', bg: 'bg-bg-elevated' },
  };
</script>

<div class="space-y-10">
  <div>
    <h1 class="section-heading text-4xl mb-3">Learning Engine</h1>
    <p class="text-text-secondary text-base max-w-lg">Self-evolving routing weights and insights from query outcomes.</p>
  </div>

  <div class="grid grid-cols-2 gap-6">
    <!-- Weights -->
    <div class="card overflow-hidden">
      <div class="px-6 py-5 border-b border-border flex items-center justify-between">
        <h2 class="text-lg font-semibold text-text">Routing Weights</h2>
        <span class="tag border-border text-text-muted">Cycle 847 · EMA 0.80</span>
      </div>
      <div class="p-6 space-y-6">
        {#each weights as w}
          {@const delta = w.weight - w.prev}
          <div>
            <div class="flex items-center justify-between mb-2.5">
              <span class="text-[15px] text-text">{w.signal}</span>
              <div class="flex items-center gap-4">
                <span class="font-mono text-sm text-text-secondary">{w.weight.toFixed(3)}</span>
                <span class="font-mono text-sm {delta >= 0 ? 'text-accent' : 'text-danger'}">
                  {delta >= 0 ? '+' : ''}{delta.toFixed(3)}
                </span>
              </div>
            </div>
            <div class="h-2 bg-border rounded-full overflow-hidden">
              <div class="h-full bg-accent/70 rounded-full transition-all duration-500" style="width: {w.perf}%"></div>
            </div>
          </div>
        {/each}
        <div class="pt-5 border-t border-border flex justify-between items-center">
          <span class="text-sm text-text-muted">Overall Accuracy</span>
          <span class="text-xl font-mono font-medium text-accent">74.2%</span>
        </div>
      </div>
    </div>

    <!-- Learnings -->
    <div class="card overflow-hidden">
      <div class="px-6 py-5 border-b border-border flex items-center justify-between">
        <h2 class="text-lg font-semibold text-text">Recent Learnings</h2>
        <span class="tag border-border text-text-muted">296 total</span>
      </div>
      {#each learnings as l}
        {@const colors = typeColors[l.type]}
        <div class="px-6 py-5 border-b border-border/50 last:border-b-0">
          <div class="flex items-center gap-3 mb-3">
            <span class="font-mono text-sm text-text-muted">Cycle {l.cycle}</span>
            <span class="text-xs font-mono px-2.5 py-1 rounded-lg {colors.text} {colors.bg}">
              {l.type}
            </span>
          </div>
          <p class="text-[15px] text-text-secondary leading-relaxed">{l.text}</p>
        </div>
      {/each}
      <div class="px-6 py-4 bg-bg-alt">
        <span class="tag border-border-strong text-text-muted">mock data — learning engine not yet live</span>
      </div>
    </div>
  </div>
</div>
