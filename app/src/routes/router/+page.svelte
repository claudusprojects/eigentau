<script lang="ts">
  let query = $state('');
  let isRouting = $state(false);
  let showResult = $state(true);

  const result = {
    steps: [
      { task: 'Fetch latest subnet metrics from chain', sn: 'SN42', name: 'Gopher', faculty: 'Perception', color: '#3B82F6' },
      { task: 'Analyze emission trends and predict outlook', sn: 'SN8', name: 'Vanta', faculty: 'Problem Solving', color: '#F97316' },
      { task: 'Synthesize findings into coherent report', sn: 'SN1', name: 'Apex', faculty: 'Reasoning', color: '#00DBBC' },
      { task: 'Evaluate and score analysis quality', sn: 'SN15', name: 'De-Val', faculty: 'Metacognition', color: '#EC4899' },
    ],
    synthesis: 'Based on analysis of 129 active subnets, emission distribution shows increasing concentration toward inference-focused subnets (SN1, SN64). Top 10 subnets capture 47% of daily emissions. Registration rates are up 12% week-over-week, primarily in AI agent and compute subnets.',
    quality: 91,
    latency: '3.8s',
  };

  function submit() {
    if (!query.trim()) return;
    isRouting = true;
    setTimeout(() => { isRouting = false; showResult = true; }, 1500);
  }
</script>

<div>
  <div class="mb-14 anim">
    <h1 class="font-[var(--font-display)] italic text-[56px] text-text leading-[1] tracking-[-0.04em] mb-4">Router</h1>
    <p class="text-[17px] text-sub max-w-xl leading-relaxed">Decompose → Route → Synthesize. Send any complex task and watch it flow through the cognitive network.</p>
  </div>

  <!-- Query input -->
  <div class="bg-panel border border-line rounded-2xl p-6 mb-10 anim d1">
    <form onsubmit={(e) => { e.preventDefault(); submit(); }}>
      <div class="flex gap-3">
        <input type="text" bind:value={query}
          placeholder="What do you want to know? e.g. Research the top 5 Bittensor subnets by emission growth..."
          class="flex-1 bg-bg border border-line rounded-xl px-5 py-4 text-[16px] text-text placeholder:text-ghost focus:outline-none focus:border-teal/30 transition-colors" />
        <button type="submit"
          class="bg-teal hover:bg-[#00c9ab] text-void text-[15px] font-semibold whitespace-nowrap px-8 py-4 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(0,219,188,.2)] disabled:opacity-20"
          disabled={isRouting || !query.trim()}>
          {isRouting ? 'Routing...' : 'Route'}
        </button>
      </div>
    </form>
  </div>

  {#if showResult}
    <!-- Pipeline visualization — horizontal flow -->
    <div class="mb-10 anim d2">
      <div class="flex items-baseline justify-between mb-6">
        <h2 class="font-[var(--font-display)] italic text-[24px] text-text">Task Pipeline</h2>
        <div class="flex items-center gap-4">
          <span class="font-[var(--font-data)] text-[12px] text-faint">{result.latency}</span>
          <span class="font-[var(--font-data)] text-[14px] text-teal font-medium">{result.quality}% quality</span>
        </div>
      </div>

      <div class="flex gap-3">
        {#each result.steps as step, i}
          <div class="flex-1 bg-panel border border-line rounded-2xl p-6 relative group hover:border-line-lite transition-all">
            <!-- Step number -->
            <div class="font-[var(--font-data)] text-[48px] font-medium leading-none mb-4" style="color:{step.color}10">0{i+1}</div>
            <p class="text-[15px] text-text leading-snug mb-4">{step.task}</p>
            <div class="flex items-center gap-2 mb-2">
              <div class="w-[6px] h-[6px] rounded-[2px]" style="background:{step.color}"></div>
              <span class="font-[var(--font-data)] text-[12px]" style="color:{step.color}">{step.faculty}</span>
            </div>
            <span class="font-[var(--font-data)] text-[12px] text-faint">{step.sn} {step.name}</span>
            <!-- Arrow connector -->
            {#if i < result.steps.length - 1}
              <div class="absolute -right-[10px] top-1/2 -translate-y-1/2 text-ghost z-10">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
              </div>
            {/if}
          </div>
        {/each}
      </div>
    </div>

    <!-- Synthesis -->
    <div class="bg-panel border border-line rounded-2xl p-8 anim d3">
      <h3 class="font-[var(--font-display)] italic text-[22px] text-text mb-4">Synthesis</h3>
      <p class="text-[16px] text-sub leading-[1.8] max-w-3xl">{result.synthesis}</p>
      <div class="mt-6 pt-4 border-t border-line">
        <span class="font-[var(--font-data)] text-[11px] text-ghost">Router not yet live — showing mock decomposition</span>
      </div>
    </div>
  {/if}
</div>
