<script lang="ts">
  const params = [
    { key: 'decomposition_depth', value: '4', reason: 'Optimal range 3-5. Beyond 5, synthesis quality degrades due to context dilution.', updated: '2026-03-24' },
    { key: 'confidence_threshold', value: '0.85', reason: 'Best win rate at confidence >= 0.85 (74% accuracy).', updated: '2026-03-24' },
    { key: 'max_subnets_per_query', value: '5', reason: 'Diminishing returns beyond 5 subnets per route.', updated: '2026-03-23' },
    { key: 'ema_blend_factor', value: '0.80', reason: '80% current / 20% new prevents catastrophic forgetting while allowing adaptation.', updated: '2026-03-22' },
    { key: 'fallback_timeout_ms', value: '10000', reason: 'Give subnets 10s before falling back to direct inference.', updated: '2026-03-22' },
    { key: 'min_quality_threshold', value: '60', reason: 'Below 60% quality triggers re-route with different subnet combination.', updated: '2026-03-21' },
  ];
</script>

<div class="space-y-10">
  <div>
    <h1 class="section-heading text-4xl mb-3">Strategy</h1>
    <p class="text-text-secondary text-base max-w-lg">Learned parameters and routing strategy configuration.</p>
  </div>

  <!-- Regime -->
  <div class="card p-8 flex items-center justify-between">
    <div>
      <div class="text-sm text-text-muted mb-2">Network Regime</div>
      <div class="text-3xl font-mono font-medium text-text">NEUTRAL</div>
      <p class="text-sm text-text-muted mt-2">No anomalies detected. Standard routing weights active.</p>
    </div>
    <div class="flex items-center gap-3">
      <span class="w-3 h-3 rounded-full bg-accent animate-pulse"></span>
      <span class="text-sm text-text-muted">Auto-detected</span>
    </div>
  </div>

  <!-- Learned Parameters -->
  <div class="card overflow-hidden">
    <div class="px-6 py-5 border-b border-border flex items-center justify-between">
      <h2 class="text-lg font-semibold text-text">Learned Parameters</h2>
      <span class="tag border-border-strong text-text-muted">mock data</span>
    </div>
    {#each params as p}
      <div class="px-6 py-6 border-b border-border/50 last:border-b-0 hover:bg-bg-card-hover transition-colors">
        <div class="flex items-center justify-between mb-3">
          <span class="font-mono text-[15px] text-accent">{p.key}</span>
          <div class="flex items-center gap-5">
            <span class="font-mono text-lg text-text font-medium">{p.value}</span>
            <span class="text-sm text-text-muted">{p.updated}</span>
          </div>
        </div>
        <p class="text-sm text-text-secondary leading-relaxed">{p.reason}</p>
      </div>
    {/each}
  </div>
</div>
