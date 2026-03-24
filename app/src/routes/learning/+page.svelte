<script lang="ts">
  const weights = [
    { signal: 'Inference', weight: 0.359, prev: 0.318, color: '#00DBBC' },
    { signal: 'Prediction', weight: 0.233, prev: 0.215, color: '#8B5CF6' },
    { signal: 'Scraping', weight: 0.209, prev: 0.221, color: '#3B82F6' },
    { signal: 'Storage', weight: 0.144, prev: 0.137, color: '#F59E0B' },
    { signal: 'Annotation', weight: 0.049, prev: 0.052, color: '#EC4899' },
    { signal: 'Training', weight: 0.006, prev: 0.004, color: '#10B981' },
  ];

  const learnings = [
    { cycle: 847, text: 'Multi-subnet queries involving SN1+SN13 produce 23% higher quality than SN1 alone for research tasks.', type: 'positive' as const },
    { cycle: 845, text: 'SN8 prediction accuracy drops below 60% during high-volatility network periods. Route to SN1 reasoning instead.', type: 'caution' as const },
    { cycle: 842, text: 'Adding SN15 metacognition step improves overall quality by 8% but adds 1.2s latency. Worth it for complex queries.', type: 'positive' as const },
    { cycle: 839, text: 'Real-time subnets (SN64 Chutes) have 3x higher failure rate during peak hours. Implement fallback routing.', type: 'caution' as const },
    { cycle: 836, text: 'Optimal decomposition depth is 3-5 subtasks. Beyond 5, synthesis quality degrades due to context dilution.', type: 'insight' as const },
  ];

  const typeMap = {
    positive: { label: 'positive', color: 'text-accent', bg: 'bg-accent/8 border-accent/15' },
    caution: { label: 'caution', color: 'text-amber', bg: 'bg-amber/8 border-amber/15' },
    insight: { label: 'insight', color: 'text-text-secondary', bg: 'bg-bg-elevated border-border' },
  };
</script>

<div class="space-y-12 page-enter">
  <div class="relative">
    <h1 class="font-serif italic text-[42px] text-text leading-none tracking-[-0.03em] mb-4">Learning Engine</h1>
    <p class="text-[17px] text-text-secondary max-w-xl">Self-evolving routing weights and insights derived from query outcomes over time.</p>
    <div class="absolute -left-10 top-0 w-[3px] h-full bg-gradient-to-b from-accent/40 via-accent/10 to-transparent rounded-full"></div>
  </div>

  <div class="grid grid-cols-2 gap-6">
    <!-- Weights -->
    <div class="bg-bg-surface border border-border rounded-2xl overflow-hidden page-enter page-enter-d1">
      <div class="flex items-center justify-between px-7 py-5 border-b border-border">
        <h2 class="font-serif italic text-[22px] text-text">Routing Weights</h2>
        <span class="font-mono text-[12px] text-text-dim px-3 py-1 rounded-full border border-border">Cycle 847</span>
      </div>
      <div class="p-7 space-y-7">
        {#each weights as w}
          {@const delta = w.weight - w.prev}
          {@const pct = Math.round(w.weight * 100)}
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-[15px] text-text font-medium">{w.signal}</span>
              <div class="flex items-center gap-4">
                <span class="font-mono text-[14px] text-text-secondary">{w.weight.toFixed(3)}</span>
                <span class="font-mono text-[13px] {delta >= 0 ? 'text-accent' : 'text-red'}">
                  {delta >= 0 ? '+' : ''}{delta.toFixed(3)}
                </span>
              </div>
            </div>
            <div class="h-[6px] bg-border rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-700" style="width:{pct}%;background:{w.color}"></div>
            </div>
          </div>
        {/each}
        <div class="pt-6 border-t border-border flex justify-between items-center">
          <span class="text-[14px] text-text-dim">Overall Accuracy</span>
          <span class="font-mono text-[24px] font-medium text-accent leading-none">74.2%</span>
        </div>
      </div>
    </div>

    <!-- Learnings -->
    <div class="bg-bg-surface border border-border rounded-2xl overflow-hidden page-enter page-enter-d2">
      <div class="flex items-center justify-between px-7 py-5 border-b border-border">
        <h2 class="font-serif italic text-[22px] text-text">Recent Learnings</h2>
        <span class="font-mono text-[12px] text-text-dim px-3 py-1 rounded-full border border-border">296 total</span>
      </div>
      {#each learnings as l}
        {@const t = typeMap[l.type]}
        <div class="px-7 py-6 border-b border-border/40 last:border-b-0">
          <div class="flex items-center gap-3 mb-3">
            <span class="font-mono text-[13px] text-text-dim">Cycle {l.cycle}</span>
            <span class="font-mono text-[11px] {t.color} px-2.5 py-1 rounded-full border {t.bg}">{t.label}</span>
          </div>
          <p class="text-[14px] text-text-secondary leading-[1.75]">{l.text}</p>
        </div>
      {/each}
      <div class="px-7 py-4 bg-bg-alt">
        <span class="font-mono text-[11px] text-text-dim px-3 py-1 rounded-full border border-border">mock data — learning engine not yet live</span>
      </div>
    </div>
  </div>
</div>
