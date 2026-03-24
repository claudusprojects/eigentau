<script lang="ts">
  let query = $state('');
  let isRouting = $state(false);

  const mockResult = {
    decomposition: [
      { subtask: 'Fetch latest subnet metrics from chain', subnet: 'SN42', subName: 'Gopher', faculty: 'Perception' },
      { subtask: 'Analyze emission trends and predict outlook', subnet: 'SN8', subName: 'Vanta', faculty: 'Problem Solving' },
      { subtask: 'Synthesize findings into coherent report', subnet: 'SN1', subName: 'Apex', faculty: 'Reasoning' },
      { subtask: 'Evaluate and score analysis quality', subnet: 'SN15', subName: 'De-Val', faculty: 'Metacognition' },
    ],
    synthesis: 'Based on analysis of 129 active subnets, emission distribution shows increasing concentration toward inference-focused subnets (SN1, SN64). Top 10 subnets capture 47% of daily emissions. Registration rates are up 12% week-over-week, primarily in AI agent and compute subnets.',
    quality: 91,
    latency: '3.8s',
  };

  function handleSubmit() {
    if (!query.trim()) return;
    isRouting = true;
    setTimeout(() => { isRouting = false; }, 2000);
  }
</script>

<div class="space-y-12 page-enter">
  <div class="relative">
    <h1 class="font-serif italic text-[42px] text-text leading-none tracking-[-0.03em] mb-4">Router</h1>
    <p class="text-[17px] text-text-secondary max-w-xl">Send a complex task to be decomposed, routed across specialized subnets, and synthesized into a unified result.</p>
    <div class="absolute -left-10 top-0 w-[3px] h-full bg-gradient-to-b from-accent/40 via-accent/10 to-transparent rounded-full"></div>
  </div>

  <!-- Query box -->
  <div class="bg-bg-surface border border-border rounded-2xl p-8 page-enter page-enter-d1">
    <form onsubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
      <label class="text-[15px] font-medium text-text block mb-4">What do you want to know?</label>
      <div class="flex gap-4">
        <input
          type="text"
          bind:value={query}
          placeholder="e.g. Research the top 5 Bittensor subnets by emission growth and predict next month's outlook"
          class="flex-1 bg-bg border border-border rounded-xl px-5 py-4 text-[15px] text-text placeholder:text-text-dim focus:outline-none focus:border-accent/50 transition-colors"
        />
        <button
          type="submit"
          class="bg-accent hover:bg-[#00C5A8] text-[#040406] font-semibold text-[15px] whitespace-nowrap px-8 py-4 rounded-xl cursor-pointer transition-all hover:shadow-[0_0_28px_rgba(0,219,188,.3)] disabled:opacity-30 disabled:cursor-not-allowed"
          disabled={isRouting || !query.trim()}
        >
          {isRouting ? 'Routing...' : 'Route Task'}
        </button>
      </div>
    </form>
  </div>

  <!-- Results -->
  <div class="grid grid-cols-5 gap-6 page-enter page-enter-d2">
    <!-- Decomposition -->
    <div class="col-span-3 bg-bg-surface border border-border rounded-2xl overflow-hidden">
      <div class="flex items-center justify-between px-7 py-5 border-b border-border">
        <h2 class="font-serif italic text-[22px] text-text">Task Decomposition</h2>
        <div class="flex items-center gap-2.5">
          <span class="font-mono text-[12px] text-text-dim px-3 py-1 rounded-full border border-border">{mockResult.decomposition.length} steps</span>
          <span class="font-mono text-[12px] text-text-dim px-3 py-1 rounded-full border border-border">{mockResult.latency}</span>
          <span class="font-mono text-[12px] text-accent px-3 py-1 rounded-full border border-accent/20 bg-accent-glow">{mockResult.quality}%</span>
        </div>
      </div>
      {#each mockResult.decomposition as step, i}
        <div class="flex items-start gap-5 px-7 py-6 border-b border-border/40 last:border-b-0 hover:bg-bg-surface-hover transition-colors">
          <div class="w-9 h-9 rounded-xl bg-accent/8 border border-accent/15 text-accent font-mono text-[14px] flex items-center justify-center shrink-0">{i + 1}</div>
          <div class="flex-1 min-w-0">
            <p class="text-[15px] text-text mb-3 leading-snug">{step.subtask}</p>
            <div class="flex gap-2">
              <span class="font-mono text-[12px] px-3 py-1.5 rounded-lg bg-bg-elevated border border-border/50 text-accent">{step.subnet} {step.subName}</span>
              <span class="font-mono text-[12px] px-3 py-1.5 rounded-lg bg-bg-elevated border border-border/50 text-text-dim">{step.faculty}</span>
            </div>
          </div>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00DBBC" stroke-width="2" stroke-linecap="round" class="mt-1 shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
      {/each}
    </div>

    <!-- Synthesis -->
    <div class="col-span-2 bg-bg-surface border border-border rounded-2xl overflow-hidden flex flex-col">
      <div class="px-7 py-5 border-b border-border">
        <h2 class="font-serif italic text-[22px] text-text">Synthesis</h2>
      </div>
      <div class="p-7 flex-1">
        <p class="text-[15px] text-text-secondary leading-[1.8]">{mockResult.synthesis}</p>
      </div>
      <div class="px-7 py-4 border-t border-border bg-bg-alt">
        <span class="font-mono text-[11px] text-text-dim px-3 py-1 rounded-full border border-border">mock data — router not yet live</span>
      </div>
    </div>
  </div>
</div>
