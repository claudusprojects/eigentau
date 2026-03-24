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

  function go() { if(!query.trim())return; routing=true; setTimeout(()=>{routing=false},1500); }
</script>

<div>
  <div class="mb-20 up">
    <p class="font-[var(--font-m)] text-[13px] text-teal uppercase tracking-[.2em] mb-4">Router</p>
    <h1 class="font-[var(--font-d)] italic text-[64px] text-text leading-[.95] tracking-[-0.04em] mb-6">
      Decompose, route,<br>synthesize
    </h1>
    <p class="text-[18px] text-body max-w-xl leading-relaxed">Send any complex task. The router breaks it down, fans it across the right subnets, and synthesizes the result.</p>
  </div>

  <!-- Input -->
  <div class="bg-card border border-line rounded-2xl p-8 mb-16 up up1">
    <form onsubmit={(e)=>{e.preventDefault();go()}}>
      <label class="text-[17px] text-text block mb-4">What do you want to know?</label>
      <div class="flex gap-4">
        <input type="text" bind:value={query}
          placeholder="e.g. Research the top 5 Bittensor subnets by emission growth..."
          class="flex-1 bg-bg border border-line rounded-xl px-6 py-4 text-[17px] text-text placeholder:text-faint focus:outline-none focus:border-teal/30 transition-colors" />
        <button type="submit"
          class="bg-teal hover:bg-[#00c9ab] text-bg text-[16px] font-semibold whitespace-nowrap px-10 py-4 rounded-xl transition-all hover:shadow-[0_0_30px_rgba(0,219,188,.2)] disabled:opacity-20"
          disabled={routing||!query.trim()}>
          {routing?'Routing...':'Route'}
        </button>
      </div>
    </form>
  </div>

  <!-- Pipeline steps -->
  <div class="mb-16 up up2">
    <div class="flex items-baseline justify-between mb-10">
      <h2 class="font-[var(--font-d)] italic text-[36px] text-text">Task decomposition</h2>
      <div class="flex items-center gap-4">
        <span class="font-[var(--font-m)] text-[14px] text-dim">3.8s</span>
        <span class="font-[var(--font-m)] text-[14px] text-teal font-medium">91% quality</span>
      </div>
    </div>

    {#each steps as s, i}
      <div class="flex gap-6 mb-6">
        <!-- Step indicator -->
        <div class="flex flex-col items-center shrink-0">
          <div class="w-12 h-12 rounded-2xl border-2 flex items-center justify-center font-[var(--font-m)] text-[18px] font-medium"
            style="border-color:{s.color};color:{s.color}">
            {i+1}
          </div>
          {#if i < steps.length - 1}
            <div class="w-px flex-1 mt-2 mb-2" style="background:var(--color-line)"></div>
          {/if}
        </div>
        <!-- Content -->
        <div class="bg-card border border-line rounded-2xl px-8 py-6 flex-1 hover:border-[#2a2a40] transition-all">
          <p class="text-[18px] text-text leading-snug mb-4">{s.task}</p>
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-2 font-[var(--font-m)] text-[13px] px-4 py-2 rounded-xl border" style="color:{s.color};border-color:{s.color}30;background:{s.color}08">
              <span class="w-2 h-2 rounded" style="background:{s.color}"></span>
              {s.faculty}
            </span>
            <span class="font-[var(--font-m)] text-[13px] text-dim">{s.sn}</span>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Synthesis -->
  <div class="bg-card border border-line rounded-2xl p-10 up up3">
    <h3 class="font-[var(--font-d)] italic text-[28px] text-text mb-5">Synthesis</h3>
    <p class="text-[17px] text-body leading-[1.85] max-w-3xl mb-6">{synthesis}</p>
    <p class="font-[var(--font-m)] text-[12px] text-faint">Router not yet live — mock data shown above</p>
  </div>
</div>
