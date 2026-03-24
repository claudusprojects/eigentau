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
    { cycle: 845, text: 'SN8 prediction accuracy drops below 60% during high-volatility periods. Route to SN1 reasoning instead.', type: 'caution' as const },
    { cycle: 842, text: 'Adding SN15 metacognition step improves quality by 8% but adds 1.2s latency. Worth it for complex queries.', type: 'positive' as const },
    { cycle: 839, text: 'Real-time subnets (SN64) have 3x higher failure rate during peak hours. Implement fallback routing.', type: 'caution' as const },
    { cycle: 836, text: 'Optimal decomposition depth is 3-5 subtasks. Beyond 5, synthesis quality degrades from context dilution.', type: 'insight' as const },
  ];
</script>

<div>
  <div class="mb-14 anim">
    <h1 class="font-[var(--font-display)] italic text-[56px] text-text leading-[1] tracking-[-0.04em] mb-4">Learning</h1>
    <p class="text-[17px] text-sub max-w-xl leading-relaxed">The engine evolves. Every query outcome adjusts routing weights and generates insights for future decisions.</p>
  </div>

  <div class="grid grid-cols-[1fr_1fr] gap-10 anim d1">
    <!-- Weights — visual bar chart style -->
    <div>
      <div class="flex items-baseline justify-between mb-8">
        <h2 class="font-[var(--font-display)] italic text-[24px] text-text">Routing Weights</h2>
        <span class="font-[var(--font-data)] text-[11px] text-ghost">Cycle 847 · EMA 0.80</span>
      </div>

      <!-- Horizontal bar chart -->
      <div class="space-y-5 mb-8">
        {#each weights as w}
          {@const delta = w.weight - w.prev}
          {@const pct = Math.round(w.weight * 100)}
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-[15px] text-text">{w.signal}</span>
              <div class="flex items-center gap-3">
                <span class="font-[var(--font-data)] text-[14px] text-sub">{w.weight.toFixed(3)}</span>
                <span class="font-[var(--font-data)] text-[12px] {delta >= 0 ? 'text-teal' : 'text-[#FF4D6A]'}">
                  {delta >= 0 ? '+' : ''}{delta.toFixed(3)}
                </span>
              </div>
            </div>
            <div class="h-[6px] rounded-full overflow-hidden bg-line">
              <div class="h-full rounded-full" style="width:{pct}%;background:{w.color};transition:width 1s cubic-bezier(.16,1,.3,1)"></div>
            </div>
          </div>
        {/each}
      </div>

      <div class="bg-panel border border-line rounded-2xl p-6 flex items-baseline justify-between">
        <span class="text-[15px] text-sub">Overall Accuracy</span>
        <span class="font-[var(--font-data)] text-[36px] text-teal font-medium leading-none">74.2%</span>
      </div>
    </div>

    <!-- Learnings feed -->
    <div>
      <div class="flex items-baseline justify-between mb-8">
        <h2 class="font-[var(--font-display)] italic text-[24px] text-text">Insights</h2>
        <span class="font-[var(--font-data)] text-[11px] text-ghost">296 total</span>
      </div>
      <div class="space-y-3">
        {#each learnings as l}
          <div class="bg-panel border border-line rounded-2xl px-6 py-5 hover:border-line-lite transition-all">
            <div class="flex items-center gap-3 mb-3">
              <span class="font-[var(--font-data)] text-[12px] text-faint">#{l.cycle}</span>
              <span class="font-[var(--font-data)] text-[10px] uppercase tracking-[.08em] px-2 py-0.5 rounded-full border
                {l.type === 'positive' ? 'text-teal border-teal/15 bg-teal-08' :
                 l.type === 'caution' ? 'text-[#FFB020] border-[#FFB020]/15 bg-[rgba(255,176,32,.06)]' :
                 'text-sub border-line bg-raised/50'}">{l.type}</span>
            </div>
            <p class="text-[15px] text-sub leading-[1.75]">{l.text}</p>
          </div>
        {/each}
        <p class="text-center font-[var(--font-data)] text-[11px] text-ghost pt-3">Mock data — learning engine not yet live</p>
      </div>
    </div>
  </div>
</div>
