<script lang="ts">
  let query = $state('');
  let isRouting = $state(false);

  const result = {
    steps: [
      { task: 'Fetch latest subnet metrics from chain', sn: 'SN42 Gopher', faculty: 'Perception' },
      { task: 'Analyze emission trends and predict outlook', sn: 'SN8 Vanta', faculty: 'Problem Solving' },
      { task: 'Synthesize findings into coherent report', sn: 'SN1 Apex', faculty: 'Reasoning' },
      { task: 'Evaluate and score analysis quality', sn: 'SN15 De-Val', faculty: 'Metacognition' },
    ],
    synthesis: 'Based on analysis of 129 active subnets, emission distribution shows increasing concentration toward inference-focused subnets (SN1, SN64). Top 10 subnets capture 47% of daily emissions. Registration rates are up 12% week-over-week, primarily in AI agent and compute subnets.',
    quality: 91,
    latency: '3.8s',
  };

  function submit() {
    if (!query.trim()) return;
    isRouting = true;
    setTimeout(() => { isRouting = false; }, 2000);
  }
</script>

<div class="pt-6">
  <div class="mb-16 rise">
    <h1 class="font-[var(--font-display)] italic text-[clamp(48px,5vw,72px)] text-text leading-[.95] tracking-[-0.04em] mb-5">Router</h1>
    <p class="text-[18px] text-body max-w-2xl leading-relaxed">Decompose complex tasks, route sub-queries across specialized subnets, synthesize into unified intelligence.</p>
  </div>

  <!-- Input -->
  <div class="glass p-8 mb-10 rise rise-d1">
    <form onsubmit={(e) => { e.preventDefault(); submit(); }}>
      <label class="text-[16px] text-text block mb-4">What do you want to know?</label>
      <div class="flex gap-4">
        <input
          type="text" bind:value={query}
          placeholder="Research the top 5 Bittensor subnets by emission growth..."
          class="flex-1 bg-[rgba(0,0,0,.3)] border border-border-lite rounded-2xl px-6 py-4 text-[16px] text-text placeholder:text-dim focus:outline-none focus:border-teal/30 transition-colors"
        />
        <button type="submit"
          class="bg-teal/90 hover:bg-teal text-void text-[15px] font-semibold whitespace-nowrap px-8 py-4 rounded-2xl transition-all hover:shadow-[0_0_30px_rgba(0,219,188,.25)] disabled:opacity-25"
          disabled={isRouting || !query.trim()}>
          {isRouting ? 'Routing...' : 'Route Task'}
        </button>
      </div>
    </form>
  </div>

  <div class="glow-line mb-10 rise rise-d1"></div>

  <!-- Result -->
  <div class="grid grid-cols-[1fr_360px] gap-8 rise rise-d2">
    <!-- Steps -->
    <div>
      <div class="flex items-baseline justify-between mb-8">
        <h2 class="font-[var(--font-display)] italic text-[28px] text-text">Decomposition</h2>
        <div class="flex items-center gap-3">
          <span class="font-[var(--font-data)] text-[12px] text-muted">{result.latency}</span>
          <span class="font-[var(--font-data)] text-[13px] text-teal font-medium px-3 py-1 rounded-full bg-teal-glow">{result.quality}%</span>
        </div>
      </div>
      <div class="space-y-3">
        {#each result.steps as step, i}
          <div class="glass px-7 py-6 flex items-start gap-6 group hover:bg-glass-hover transition-all">
            <div class="w-10 h-10 rounded-xl bg-teal-soft border border-teal/10 text-teal font-[var(--font-data)] text-[15px] flex items-center justify-center shrink-0">{i+1}</div>
            <div class="flex-1 min-w-0">
              <p class="text-[16px] text-text mb-3 leading-snug">{step.task}</p>
              <div class="flex gap-2">
                <span class="font-[var(--font-data)] text-[11px] text-teal px-3 py-1.5 rounded-lg border border-teal/15 bg-teal-soft">{step.sn}</span>
                <span class="font-[var(--font-data)] text-[11px] text-muted px-3 py-1.5 rounded-lg border border-border-lite">{step.faculty}</span>
              </div>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00DBBC" stroke-width="2" class="mt-1 shrink-0 opacity-50"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
        {/each}
      </div>
    </div>

    <!-- Synthesis -->
    <div class="glass p-7 self-start">
      <h3 class="font-[var(--font-display)] italic text-[22px] text-text mb-5">Synthesis</h3>
      <p class="text-[15px] text-body leading-[1.85]">{result.synthesis}</p>
      <div class="mt-6 pt-4 border-t border-border-lite">
        <span class="font-[var(--font-data)] text-[11px] text-dim">Router not yet live — mock data</span>
      </div>
    </div>
  </div>
</div>
