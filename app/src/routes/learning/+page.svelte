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
    { cycle: 842, text: 'Adding SN15 metacognition step improves quality by 8% but adds 1.2s latency. Worth it for complex queries.', type: 'positive' as const },
    { cycle: 839, text: 'Real-time subnets (SN64) have 3x higher failure rate during peak hours. Implement fallback routing.', type: 'caution' as const },
    { cycle: 836, text: 'Optimal decomposition depth is 3-5 subtasks. Beyond 5, synthesis quality degrades from context dilution.', type: 'insight' as const },
  ];
</script>

<div class="pt-6">
  <div class="mb-16 rise">
    <h1 class="font-[var(--font-display)] italic text-[clamp(48px,5vw,72px)] text-text leading-[.95] tracking-[-0.04em] mb-5">Learning</h1>
    <p class="text-[18px] text-body max-w-2xl leading-relaxed">Self-evolving routing weights and insights. The engine learns which subnet combinations produce the best results.</p>
  </div>

  <div class="glow-line mb-10 rise rise-d1"></div>

  <div class="grid grid-cols-[420px_1fr] gap-10 rise rise-d2">
    <!-- Weights -->
    <div>
      <div class="flex items-baseline justify-between mb-8">
        <h2 class="font-[var(--font-display)] italic text-[28px] text-text">Routing Weights</h2>
        <span class="font-[var(--font-data)] text-[11px] text-dim">Cycle 847</span>
      </div>
      <div class="space-y-7">
        {#each weights as w}
          {@const delta = w.weight - w.prev}
          {@const pct = Math.round(w.weight * 100)}
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-[16px] text-text">{w.signal}</span>
              <div class="flex items-center gap-4">
                <span class="font-[var(--font-data)] text-[14px] text-body">{w.weight.toFixed(3)}</span>
                <span class="font-[var(--font-data)] text-[13px] {delta >= 0 ? 'text-teal' : 'text-[#FF4D6A]'}">
                  {delta >= 0 ? '+' : ''}{delta.toFixed(3)}
                </span>
              </div>
            </div>
            <div class="h-[4px] rounded-full overflow-hidden" style="background:var(--color-border)">
              <div class="h-full rounded-full" style="width:{pct}%;background:{w.color};transition:width 1s cubic-bezier(.16,1,.3,1)"></div>
            </div>
          </div>
        {/each}
      </div>
      <div class="mt-10 pt-6 border-t border-border-lite flex items-baseline justify-between">
        <span class="text-[15px] text-muted">Overall Accuracy</span>
        <span class="font-[var(--font-data)] text-[32px] text-teal font-medium leading-none">74.2%</span>
      </div>
    </div>

    <!-- Learnings -->
    <div>
      <div class="flex items-baseline justify-between mb-8">
        <h2 class="font-[var(--font-display)] italic text-[28px] text-text">Learnings</h2>
        <span class="font-[var(--font-data)] text-[11px] text-dim">296 total</span>
      </div>
      <div class="space-y-3">
        {#each learnings as l}
          <div class="glass px-7 py-6">
            <div class="flex items-center gap-3 mb-3">
              <span class="font-[var(--font-data)] text-[12px] text-muted">Cycle {l.cycle}</span>
              <span class="font-[var(--font-data)] text-[10px] uppercase tracking-[.08em] px-2.5 py-1 rounded-full
                {l.type === 'positive' ? 'text-teal bg-teal-soft border border-teal/10' :
                 l.type === 'caution' ? 'text-[#FFB020] bg-[rgba(255,176,32,.06)] border border-[rgba(255,176,32,.1)]' :
                 'text-body bg-[rgba(255,255,255,.03)] border border-border-lite'}">{l.type}</span>
            </div>
            <p class="text-[15px] text-body leading-[1.8]">{l.text}</p>
          </div>
        {/each}
        <div class="text-center pt-4">
          <span class="font-[var(--font-data)] text-[11px] text-dim">Mock data — learning engine not yet live</span>
        </div>
      </div>
    </div>
  </div>
</div>
