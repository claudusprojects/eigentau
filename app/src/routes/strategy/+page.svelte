<script lang="ts">
  const params = [
    { key: 'decomposition_depth', value: 4, reason: 'Optimal range 3-5. Beyond 5, synthesis quality degrades.', updated: '2026-03-24' },
    { key: 'confidence_threshold', value: 0.85, reason: 'Best win rate at confidence >= 0.85 (74% accuracy).', updated: '2026-03-24' },
    { key: 'max_subnets_per_query', value: 5, reason: 'Diminishing returns beyond 5 subnets per route.', updated: '2026-03-23' },
    { key: 'ema_blend_factor', value: 0.80, reason: '80% current / 20% new prevents catastrophic forgetting.', updated: '2026-03-22' },
    { key: 'fallback_timeout_ms', value: 10000, reason: 'Give subnets 10s before falling back to direct inference.', updated: '2026-03-22' },
    { key: 'min_quality_threshold', value: 60, reason: 'Below 60% quality triggers re-route with different subnet combo.', updated: '2026-03-21' },
  ];

  const regime = 'NEUTRAL';
</script>

<div class="space-y-8">
  <div>
    <h1 class="font-serif text-3xl font-semibold italic text-text mb-2">Strategy</h1>
    <p class="text-sm text-text-muted">Learned parameters and routing strategy configuration.</p>
  </div>

  <!-- Regime -->
  <div class="bg-bg-card border border-border rounded-xl p-6 flex items-center justify-between">
    <div>
      <div class="text-xs font-mono text-text-muted uppercase tracking-wider mb-1">Network Regime</div>
      <div class="text-xl font-mono font-medium text-text">{regime}</div>
    </div>
    <div class="flex items-center gap-2">
      <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
      <span class="text-xs font-mono text-text-muted">Auto-detected</span>
    </div>
  </div>

  <!-- Learned Parameters -->
  <div class="bg-bg-card border border-border rounded-xl">
    <div class="px-6 py-4 border-b border-border">
      <h2 class="text-sm font-semibold text-text">Learned Parameters</h2>
    </div>
    <div class="divide-y divide-border">
      {#each params as p}
        <div class="px-6 py-5 hover:bg-bg-card-hover transition-colors">
          <div class="flex items-center justify-between mb-2">
            <span class="font-mono text-sm text-accent">{p.key}</span>
            <div class="flex items-center gap-4">
              <span class="font-mono text-sm text-text font-medium">{p.value}</span>
              <span class="text-[10px] font-mono text-text-muted">{p.updated}</span>
            </div>
          </div>
          <p class="text-xs text-text-muted">{p.reason}</p>
        </div>
      {/each}
    </div>
  </div>
</div>
