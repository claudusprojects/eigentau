<script lang="ts">
  import { FACULTY_COLORS, FACULTY_DESCRIPTIONS, getFacultyStats, getSubnetsByFaculty, type Faculty } from '$lib/subnets';
  const stats = getFacultyStats();
  const total = Math.round(stats.reduce((s,f) => s+f.score, 0) / stats.length);
  let sel: Faculty|null = $state(null);
  const subs = $derived(sel ? getSubnetsByFaculty(sel) : []);
</script>

<div class="mb-20">
  <p class="font-[var(--font-m)] text-[13px] text-teal uppercase tracking-[.2em] mb-5">Cognitive Map</p>
  <div class="flex items-end justify-between">
    <div>
      <h1 class="font-[var(--font-d)] italic text-[clamp(40px,5vw,68px)] text-text leading-[.95] tracking-[-0.03em] mb-6">
        Ten faculties of<br>general intelligence
      </h1>
      <p class="text-[18px] text-p max-w-2xl leading-relaxed">
        Every Bittensor subnet classified into DeepMind's cognitive framework.
        Overall coverage: <span class="text-teal font-[var(--font-m)] font-medium">{total}%</span>
      </p>
    </div>
  </div>
</div>

<!-- 2-col tiles -->
<div class="grid grid-cols-2 gap-5 mb-12">
  {#each stats as f}
    {@const c = FACULTY_COLORS[f.faculty]}
    {@const on = sel === f.faculty}
    <button onclick={() => sel = on ? null : f.faculty}
      class="text-left bg-card border rounded-2xl p-8 transition-all
        {on ? 'border-teal/30' : 'border-line hover:border-[#2a2a3e]'}">
      <div class="flex items-start justify-between mb-5">
        <div class="flex items-center gap-3">
          <div class="w-4 h-4 rounded" style="background:{c}"></div>
          <h3 class="text-[20px] text-text font-medium">{f.faculty}</h3>
        </div>
        <span class="font-[var(--font-m)] text-[28px] text-text font-medium leading-none">{f.score}<span class="text-[14px] text-sec">%</span></span>
      </div>
      <p class="text-[15px] text-p leading-relaxed mb-5">{FACULTY_DESCRIPTIONS[f.faculty]}</p>
      <div class="h-2.5 rounded-full bg-bg overflow-hidden mb-4">
        <div class="h-full rounded-full" style="width:{f.score}%;background:{c}"></div>
      </div>
      <div class="text-[14px] text-sec">{f.primary} primary · {f.secondary} secondary · {f.total} total</div>
    </button>
  {/each}
</div>

{#if sel}
  {@const c = FACULTY_COLORS[sel]}
  <div class="bg-card border border-line rounded-2xl overflow-hidden">
    <div class="px-8 py-6 border-b border-line flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-4 h-4 rounded" style="background:{c}"></div>
        <h2 class="text-[22px] text-text font-medium">{sel}</h2>
        <span class="font-[var(--font-m)] text-[14px] text-sec">{subs.length} subnets</span>
      </div>
      <button onclick={() => sel = null} class="text-sec hover:text-p text-[24px] leading-none px-2">&times;</button>
    </div>
    {#each subs as sn}
      <div class="px-8 py-5 border-b border-line/50 hover:bg-card-h transition-colors flex items-center gap-8">
        <span class="font-[var(--font-m)] text-[15px] text-sec w-14 shrink-0">SN{sn.netuid}</span>
        <span class="text-[17px] text-text font-medium w-44 shrink-0">{sn.name}</span>
        <span class="text-[15px] text-p flex-1">{sn.desc}</span>
        {#if sn.primary !== sel}
          <span class="font-[var(--font-m)] text-[11px] text-sec px-3 py-1 rounded-full border border-line shrink-0">secondary</span>
        {/if}
      </div>
    {/each}
  </div>
{/if}
