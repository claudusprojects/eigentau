<script lang="ts">
  let query = $state('');
  let isRouting = $state(false);

  const mockResult = {
    decomposition: [
      { subtask: 'Fetch latest subnet metrics from chain', subnet: 'SN13', faculty: 'Perception', status: 'done' },
      { subtask: 'Analyze emission trends and predict outlook', subnet: 'SN8', faculty: 'Executive', status: 'done' },
      { subtask: 'Synthesize findings into coherent report', subnet: 'SN1', faculty: 'Reasoning', status: 'done' },
      { subtask: 'Evaluate and tag analysis quality', subnet: 'SN33', faculty: 'Metacognition', status: 'done' },
    ],
    synthesis: 'Based on analysis of 129 active subnets, emission distribution shows increasing concentration toward inference-focused subnets (SN1, SN19). Top 10 subnets capture 47% of daily emissions. Registration rates are up 12% week-over-week, primarily in AI agent and compute subnets.',
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

<div class="space-y-8">
  <div>
    <h1 class="text-3xl font-bold tracking-tight text-text mb-2">Router</h1>
    <p class="text-sm text-text-muted">Send a complex task to be decomposed, routed across subnets, and synthesized.</p>
  </div>

  <!-- Query Input -->
  <div class="bg-bg-card border border-border rounded-xl p-6">
    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <label class="text-xs font-mono text-text-muted uppercase tracking-wider block mb-3">Query</label>
      <div class="flex gap-3">
        <input
          type="text"
          bind:value={query}
          placeholder="e.g. Research the top 5 Bittensor subnets by emission growth and predict next month's outlook"
          class="flex-1 bg-bg border border-border rounded-lg px-4 py-3 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors font-sans"
        />
        <button
          type="submit"
          class="bg-accent text-black font-semibold text-sm px-6 py-3 rounded-lg hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-40"
          disabled={isRouting || !query.trim()}
        >
          {isRouting ? 'Routing...' : 'Route'}
        </button>
      </div>
    </form>
  </div>

  <!-- Mock Result -->
  <div class="grid grid-cols-3 gap-6">
    <!-- Decomposition -->
    <div class="col-span-2 bg-bg-card border border-border rounded-xl">
      <div class="px-6 py-4 border-b border-border flex items-center justify-between">
        <h2 class="text-sm font-semibold text-text">Task Decomposition</h2>
        <div class="flex items-center gap-4 text-xs font-mono text-text-muted">
          <span>{mockResult.subnetsUsed} subnets</span>
          <span>{mockResult.latency}</span>
          <span class="text-accent">{mockResult.quality}% quality</span>
        </div>
      </div>
      <div class="divide-y divide-border">
        {#each mockResult.decomposition as step, i}
          <div class="px-6 py-4 flex items-center gap-4">
            <span class="w-6 h-6 rounded-full bg-accent-dim text-accent text-xs font-mono flex items-center justify-center">{i + 1}</span>
            <div class="flex-1">
              <div class="text-sm text-text mb-1">{step.subtask}</div>
              <div class="flex gap-2">
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-alt border border-border text-accent">{step.subnet}</span>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-alt border border-border text-text-muted">{step.faculty}</span>
              </div>
            </div>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#00DBBC" stroke-width="2" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
        {/each}
      </div>
    </div>

    <!-- Synthesis -->
    <div class="bg-bg-card border border-border rounded-xl">
      <div class="px-6 py-4 border-b border-border">
        <h2 class="text-sm font-semibold text-text">Synthesis</h2>
      </div>
      <div class="p-6">
        <p class="text-sm text-text-secondary leading-relaxed">{mockResult.synthesis}</p>
      </div>
    </div>
  </div>
</div>
