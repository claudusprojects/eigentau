<script lang="ts">
  let query = $state('');
  let routing = $state(false);
  const steps = [
    { task: 'Fetch latest subnet metrics from chain', sn: 'SN42 Gopher', faculty: 'Perception', color: '#3B82F6' },
    { task: 'Analyze emission trends and predict outlook', sn: 'SN8 Vanta', faculty: 'Problem Solving', color: '#F97316' },
    { task: 'Synthesize findings into coherent report', sn: 'SN1 Apex', faculty: 'Reasoning', color: '#00DBBC' },
    { task: 'Evaluate and score analysis quality', sn: 'SN15 De-Val', faculty: 'Metacognition', color: '#EC4899' },
  ];
  const synthesis = 'Based on analysis of 129 active subnets, emission distribution shows increasing concentration toward inference-focused subnets (SN1, SN64). Top 10 subnets capture 47% of daily emissions. Registration rates are up 12% week-over-week, primarily in AI agent and compute subnets.';
  function go() { if (!query.trim()) return; routing = true; setTimeout(() => routing = false, 1500); }
</script>

<div class="mb-20">
  <p class="font-[var(--font-m)] text-[13px] text-teal uppercase tracking-[.2em] mb-5">Router</p>
  <h1 class="font-[var(--font-d)] italic text-[clamp(40px,5vw,68px)] text-text leading-[.95] tracking-[-0.03em] mb-6">Decompose, route, synthesize</h1>
  <p class="text-[18px] text-p max-w-2xl leading-relaxed">Send any complex task. The router breaks it down, routes to the right subnets, and synthesizes the result.</p>
</div>

<div class="bg-card border border-line rounded-2xl p-8 mb-16">
  <form onsubmit={(e) => { e.preventDefault(); go(); }}>
    <label class="text-[17px] text-text block mb-4">What do you want to know?</label>
    <div class="flex gap-4">
      <input type="text" bind:value={query}
        placeholder="e.g. Research the top 5 Bittensor subnets by emission growth..."
        class="flex-1 bg-bg border border-line rounded-xl px-6 py-4 text-[17px] text-text placeholder:text-mut focus:outline-none focus:border-teal/30 transition-colors" />
      <button type="submit"
        class="bg-teal hover:bg-[#00c9ab] text-bg text-[16px] font-semibold whitespace-nowrap px-10 py-4 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(0,219,188,.2)] disabled:opacity-20"
        disabled={routing || !query.trim()}>
        {routing ? 'Routing...' : 'Route'}
      </button>
    </div>
  </form>
</div>

<div class="flex items-baseline justify-between mb-8">
  <h2 class="font-[var(--font-d)] italic text-[32px] text-text">Task decomposition</h2>
  <div class="flex items-center gap-4">
    <span class="font-[var(--font-m)] text-[14px] text-sec">3.8s</span>
    <span class="font-[var(--font-m)] text-[14px] text-teal font-medium">91% quality</span>
  </div>
</div>

<div class="grid grid-cols-4 gap-5 mb-16">
  {#each steps as s, i}
    <div class="bg-card border border-line rounded-2xl p-7 hover:border-[#2a2a3e] transition-all relative">
      <div class="font-[var(--font-m)] text-[52px] font-medium leading-none mb-5" style="color:{s.color}15">0{i+1}</div>
      <p class="text-[16px] text-text leading-snug mb-5">{s.task}</p>
      <div class="flex items-center gap-2 mb-2">
        <div class="w-2.5 h-2.5 rounded" style="background:{s.color}"></div>
        <span class="font-[var(--font-m)] text-[13px]" style="color:{s.color}">{s.faculty}</span>
      </div>
      <span class="font-[var(--font-m)] text-[13px] text-sec">{s.sn}</span>
      {#if i < steps.length - 1}
        <div class="absolute -right-3 top-1/2 -translate-y-1/2 text-mut z-10">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
        </div>
      {/if}
    </div>
  {/each}
</div>

<div class="bg-card border border-line rounded-2xl p-10">
  <h3 class="font-[var(--font-d)] italic text-[28px] text-text mb-5">Synthesis</h3>
  <p class="text-[17px] text-p leading-[1.85] mb-6">{synthesis}</p>
  <p class="font-[var(--font-m)] text-[12px] text-mut">Router not yet live — mock data</p>
</div>
