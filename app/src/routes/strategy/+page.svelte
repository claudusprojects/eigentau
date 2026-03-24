<script lang="ts">
  const params = [
    { key: 'decomposition_depth', value: '4', reason: 'Optimal range 3-5. Beyond 5, synthesis quality degrades due to context dilution.' },
    { key: 'confidence_threshold', value: '0.85', reason: 'Best win rate at confidence >= 0.85 (74% accuracy).' },
    { key: 'max_subnets_per_query', value: '5', reason: 'Diminishing returns beyond 5 subnets per route.' },
    { key: 'ema_blend_factor', value: '0.80', reason: '80% current / 20% new prevents catastrophic forgetting.' },
    { key: 'fallback_timeout_ms', value: '10000', reason: 'Give subnets 10s before falling back to direct inference.' },
    { key: 'min_quality_threshold', value: '60', reason: 'Below 60% triggers re-route with different subnet combination.' },
  ];
</script>

<div class="pt-6">
  <div class="mb-16 rise">
    <h1 class="font-[var(--font-display)] italic text-[clamp(48px,5vw,72px)] text-text leading-[.95] tracking-[-0.04em] mb-5">Strategy</h1>
    <p class="text-[18px] text-body max-w-2xl leading-relaxed">Auto-tuned routing parameters. The learning engine adjusts these based on outcome quality.</p>
  </div>

  <!-- Regime -->
  <div class="glass p-10 mb-10 relative overflow-hidden rise rise-d1">
    <div class="absolute inset-0 bg-gradient-to-r from-teal/[.03] to-transparent pointer-events-none"></div>
    <div class="relative flex items-center justify-between">
      <div>
        <div class="font-[var(--font-data)] text-[11px] text-muted uppercase tracking-[.15em] mb-3">Network Regime</div>
        <div class="font-[var(--font-data)] text-[42px] font-medium text-text leading-none mb-3">NEUTRAL</div>
        <p class="text-[15px] text-body">No anomalies detected. Standard routing weights active.</p>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-3 h-3 rounded-full bg-teal" style="animation:glow-pulse 3s infinite"></span>
        <span class="text-[14px] text-body">Auto-detected</span>
      </div>
    </div>
  </div>

  <div class="glow-line mb-10 rise rise-d1"></div>

  <!-- Parameters -->
  <div class="rise rise-d2">
    <div class="flex items-baseline justify-between mb-8">
      <h2 class="font-[var(--font-display)] italic text-[28px] text-text">Learned Parameters</h2>
      <span class="font-[var(--font-data)] text-[11px] text-dim">Mock data</span>
    </div>

    <div class="space-y-3">
      {#each params as p}
        <div class="glass px-8 py-7 group hover:bg-glass-hover transition-all">
          <div class="flex items-baseline justify-between mb-3">
            <span class="font-[var(--font-data)] text-[16px] text-teal group-hover:text-[#2AECD0] transition-colors">{p.key}</span>
            <span class="font-[var(--font-data)] text-[24px] text-text font-medium leading-none">{p.value}</span>
          </div>
          <p class="text-[14px] text-body leading-relaxed">{p.reason}</p>
        </div>
      {/each}
    </div>
  </div>
</div>
