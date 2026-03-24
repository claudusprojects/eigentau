<script lang="ts">
  const params = [
    { key: 'decomposition_depth', value: '4', reason: 'Optimal range 3-5. Beyond 5, synthesis quality degrades due to context dilution.' },
    { key: 'confidence_threshold', value: '0.85', reason: 'Best win rate at confidence >= 0.85 (74% accuracy).' },
    { key: 'max_subnets_per_query', value: '5', reason: 'Diminishing returns beyond 5 subnets per route.' },
    { key: 'ema_blend_factor', value: '0.80', reason: '80% current / 20% new prevents catastrophic forgetting.' },
    { key: 'fallback_timeout_ms', value: '10000', reason: '10s timeout before falling back to direct inference.' },
    { key: 'min_quality_threshold', value: '60', reason: 'Below 60% triggers re-route with different subnet combo.' },
  ];
</script>

<div>
  <div class="mb-14 anim">
    <h1 class="font-[var(--font-display)] italic text-[56px] text-text leading-[1] tracking-[-0.04em] mb-4">Strategy</h1>
    <p class="text-[17px] text-sub max-w-xl leading-relaxed">Auto-tuned routing parameters. The learning engine adjusts these based on cumulative outcome quality.</p>
  </div>

  <!-- Regime card -->
  <div class="bg-panel border border-line rounded-2xl p-8 mb-10 flex items-center justify-between anim d1">
    <div>
      <div class="font-[var(--font-data)] text-[10px] text-ghost uppercase tracking-[.15em] mb-2">Network Regime</div>
      <div class="font-[var(--font-data)] text-[40px] font-medium text-text leading-none mb-2">NEUTRAL</div>
      <p class="text-[15px] text-sub">No anomalies detected. Standard routing weights active.</p>
    </div>
    <div class="flex items-center gap-3">
      <span class="w-3 h-3 rounded-full bg-teal" style="animation:pulse-dot 3s infinite"></span>
      <span class="text-[14px] text-sub">Auto-detected</span>
    </div>
  </div>

  <!-- Parameters — two-column grid for variety -->
  <h2 class="font-[var(--font-display)] italic text-[24px] text-text mb-6 anim d2">Learned Parameters</h2>
  <div class="grid grid-cols-2 gap-3 anim d2">
    {#each params as p}
      <div class="bg-panel border border-line rounded-2xl p-6 hover:border-line-lite transition-all group">
        <div class="flex items-baseline justify-between mb-3">
          <span class="font-[var(--font-data)] text-[14px] text-teal group-hover:text-[#2AECD0] transition-colors">{p.key}</span>
          <span class="font-[var(--font-data)] text-[22px] text-text font-medium leading-none">{p.value}</span>
        </div>
        <p class="text-[14px] text-sub leading-relaxed">{p.reason}</p>
      </div>
    {/each}
  </div>
  <p class="text-center font-[var(--font-data)] text-[11px] text-ghost mt-6 anim d3">Mock data — strategy engine not yet live</p>
</div>
