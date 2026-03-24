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
  <div class="mb-20 up">
    <p class="font-[var(--font-m)] text-[13px] text-teal uppercase tracking-[.2em] mb-4">Strategy</p>
    <h1 class="font-[var(--font-d)] italic text-[64px] text-text leading-[.95] tracking-[-0.04em] mb-6">
      Auto-tuned routing<br>parameters
    </h1>
    <p class="text-[18px] text-body max-w-xl leading-relaxed">The learning engine continuously adjusts these parameters based on cumulative outcome quality.</p>
  </div>

  <!-- Regime -->
  <div class="bg-card border border-line rounded-2xl p-10 mb-16 up up1">
    <div class="flex items-center justify-between">
      <div>
        <p class="font-[var(--font-m)] text-[12px] text-dim uppercase tracking-[.15em] mb-3">Network Regime</p>
        <h2 class="font-[var(--font-m)] text-[48px] text-text font-medium leading-none mb-3">NEUTRAL</h2>
        <p class="text-[17px] text-body">No anomalies detected. Standard routing weights active.</p>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-4 h-4 rounded-full bg-teal" style="animation:dot 3s infinite"></span>
        <span class="text-[16px] text-body">Auto-detected</span>
      </div>
    </div>
  </div>

  <!-- Parameters -->
  <div class="up up2">
    <h2 class="font-[var(--font-d)] italic text-[36px] text-text mb-10">Learned parameters</h2>
    <div class="space-y-4">
      {#each params as p}
        <div class="bg-card border border-line rounded-2xl px-8 py-7 hover:border-[#2a2a40] transition-all group">
          <div class="flex items-baseline justify-between mb-3">
            <span class="font-[var(--font-m)] text-[18px] text-teal group-hover:text-[#2AECD0] transition-colors">{p.key}</span>
            <span class="font-[var(--font-m)] text-[28px] text-text font-medium leading-none">{p.value}</span>
          </div>
          <p class="text-[16px] text-body leading-relaxed">{p.reason}</p>
        </div>
      {/each}
    </div>
    <p class="text-center font-[var(--font-m)] text-[12px] text-faint mt-8">Mock data — strategy engine not yet live</p>
  </div>
</div>
