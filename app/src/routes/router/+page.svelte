<script lang="ts">
  let query = $state('');
  let isRouting = $state(false);

  const mockResult = {
    decomposition: [
      { subtask: 'Fetch latest subnet metrics from chain', subnet: 'SN42 Gopher', faculty: 'Perception', status: 'done' },
      { subtask: 'Analyze emission trends and predict outlook', subnet: 'SN8 Vanta', faculty: 'Problem Solving', status: 'done' },
      { subtask: 'Synthesize findings into coherent report', subnet: 'SN1 Apex', faculty: 'Reasoning', status: 'done' },
      { subtask: 'Evaluate and tag analysis quality', subnet: 'SN15 De-Val', faculty: 'Metacognition', status: 'done' },
    ],
    synthesis: 'Based on analysis of 129 active subnets, emission distribution shows increasing concentration toward inference-focused subnets (SN1, SN64). Top 10 subnets capture 47% of daily emissions. Registration rates are up 12% week-over-week, primarily in AI agent and compute subnets.',
    quality: 91,
    latency: '3.8s',
    subnetsUsed: 4,
  };

  function handleSubmit() {
    if (!query.trim()) return;
    isRouting = true;
    setTimeout(() => { isRouting = false; }, 2000);
  }
</script>

<div class="space-y-10">
  <div>
    <h1 class="section-heading text-4xl mb-3">Router</h1>
    <p class="text-text-secondary text-base max-w-lg">Send a complex task to be decomposed, routed across subnets, and synthesized.</p>
  </div>

  <!-- Query Input -->
  <div class="card p-8">
    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <label class="text-sm font-medium text-text block mb-3">What do you want to know?</label>
      <div class="flex gap-4">
        <input
          type="text"
          bind:value={query}
          placeholder="e.g. Research the top 5 Bittensor subnets by emission growth and predict next month's outlook"
          class="flex-1 bg-bg border border-border rounded-xl px-5 py-3.5 text-[15px] text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
        />
        <button
          type="submit"
          class="bg-accent text-black font-semibold text-[15px] px-8 py-3.5 rounded-xl hover:shadow-[0_0_24px_rgba(0,219,188,.3)] transition-all cursor-pointer disabled:opacity-40"
          disabled={isRouting || !query.trim()}
        >
          {isRouting ? 'Routing...' : 'Route'}
        </button>
      </div>
    </form>
  </div>

  <!-- Result -->
  <div class="grid grid-cols-5 gap-6">
    <!-- Decomposition -->
    <div class="col-span-3 card overflow-hidden">
      <div class="px-6 py-5 border-b border-border flex items-center justify-between">
        <h2 class="text-lg font-semibold text-text">Task Decomposition</h2>
        <div class="flex items-center gap-4">
          <span class="tag border-border text-text-muted">{mockResult.subnetsUsed} subnets</span>
          <span class="tag border-border text-text-muted">{mockResult.latency}</span>
          <span class="tag border-accent/30 text-accent">{mockResult.quality}%</span>
        </div>
      </div>
      {#each mockResult.decomposition as step, i}
        <div class="px-6 py-5 border-b border-border/50 last:border-b-0 flex items-start gap-5">
          <span class="w-8 h-8 rounded-full bg-accent/10 text-accent text-sm font-mono flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
          <div class="flex-1">
            <p class="text-[15px] text-text mb-2">{step.subtask}</p>
            <div class="flex gap-2">
              <span class="text-xs font-mono px-3 py-1 rounded-lg bg-bg-elevated border border-border text-accent">{step.subnet}</span>
              <span class="text-xs font-mono px-3 py-1 rounded-lg bg-bg-elevated border border-border text-text-muted">{step.faculty}</span>
            </div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00DBBC" stroke-width="2" stroke-linecap="round" class="mt-1"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
      {/each}
    </div>

    <!-- Synthesis -->
    <div class="col-span-2 card overflow-hidden">
      <div class="px-6 py-5 border-b border-border">
        <h2 class="text-lg font-semibold text-text">Synthesis</h2>
      </div>
      <div class="p-6">
        <p class="text-[15px] text-text-secondary leading-relaxed">{mockResult.synthesis}</p>
        <div class="mt-6 pt-4 border-t border-border">
          <span class="tag border-border-strong text-text-muted">mock data — router not yet live</span>
        </div>
      </div>
    </div>
  </div>
</div>
