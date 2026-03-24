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

<div class="space-y-12 page-enter">
  <div class="relative">
    <h1 class="font-serif italic text-[42px] text-text leading-none tracking-[-0.03em] mb-4">Strategy</h1>
    <p class="text-[17px] text-text-secondary max-w-xl">Learned parameters and routing strategy configuration. Auto-tuned by the learning engine.</p>
    <div class="absolute -left-10 top-0 w-[3px] h-full bg-gradient-to-b from-accent/40 via-accent/10 to-transparent rounded-full"></div>
  </div>

  <!-- Regime -->
  <div class="relative bg-bg-surface border border-border rounded-2xl p-8 overflow-hidden page-enter page-enter-d1">
    <div class="absolute inset-0 bg-gradient-to-r from-accent/[.03] to-transparent pointer-events-none"></div>
    <div class="relative flex items-center justify-between">
      <div>
        <div class="text-[13px] text-text-dim font-mono uppercase tracking-[.1em] mb-3">Network Regime</div>
        <div class="font-mono text-[36px] font-medium text-text leading-none mb-2">NEUTRAL</div>
        <p class="text-[14px] text-text-secondary">No anomalies detected. Standard routing weights active.</p>
      </div>
      <div class="flex items-center gap-3">
        <span class="w-3 h-3 rounded-full bg-accent" style="animation:dotPulse 2.5s infinite"></span>
        <span class="text-[14px] text-text-secondary">Auto-detected</span>
      </div>
    </div>
  </div>

  <!-- Learned Parameters -->
  <div class="bg-bg-surface border border-border rounded-2xl overflow-hidden page-enter page-enter-d2">
    <div class="flex items-center justify-between px-7 py-5 border-b border-border">
      <h2 class="font-serif italic text-[22px] text-text">Learned Parameters</h2>
      <span class="font-mono text-[11px] text-text-dim px-3 py-1 rounded-full border border-border">mock data</span>
    </div>
    {#each params as p, i}
      <div class="px-7 py-7 border-b border-border/40 last:border-b-0 hover:bg-bg-surface-hover transition-colors group">
        <div class="flex items-baseline justify-between mb-3">
          <span class="font-mono text-[16px] text-accent group-hover:text-[#00F0CC] transition-colors">{p.key}</span>
          <div class="flex items-baseline gap-6">
            <span class="font-mono text-[22px] text-text font-medium leading-none">{p.value}</span>
            <span class="font-mono text-[12px] text-text-dim">{p.updated}</span>
          </div>
        </div>
        <p class="text-[14px] text-text-secondary leading-relaxed">{p.reason}</p>
      </div>
    {/each}
  </div>
</div>
