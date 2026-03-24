<script lang="ts">
  import { FACULTY_COLORS, FACULTY_DESCRIPTIONS, getFacultyStats, getSubnetsByFaculty, subnets, type Faculty } from '$lib/subnets';

  const stats = getFacultyStats();
  const totalScore = Math.round(stats.reduce((s, f) => s + f.score, 0) / stats.length);
  let selected: Faculty | null = $state(null);
  const selectedSubs = $derived(selected ? getSubnetsByFaculty(selected) : []);
</script>

<div>
  <div class="flex items-start justify-between mb-14 anim">
    <div>
      <h1 class="font-[var(--font-display)] italic text-[56px] text-text leading-[1] tracking-[-0.04em] mb-4">Cognitive Map</h1>
      <p class="text-[17px] text-sub max-w-lg leading-relaxed">DeepMind's 10 AGI faculties mapped to real Bittensor subnets. Select a faculty to explore.</p>
    </div>
    <div class="text-right pt-3">
      <div class="font-[var(--font-data)] text-[48px] font-medium text-teal leading-none">{totalScore}%</div>
      <div class="font-[var(--font-data)] text-[10px] text-faint uppercase tracking-[.15em] mt-2">Coverage</div>
    </div>
  </div>

  <!-- Faculty grid — 5x2 compact tiles -->
  <div class="grid grid-cols-5 gap-3 mb-10 anim d1">
    {#each stats as f}
      {@const color = FACULTY_COLORS[f.faculty]}
      {@const active = selected === f.faculty}
      <button
        onclick={() => selected = active ? null : f.faculty}
        class="text-left bg-panel border rounded-2xl p-5 transition-all duration-200 group
          {active ? 'border-teal/30 ring-1 ring-teal/10' : 'border-line hover:border-line-lite'}"
      >
        <div class="flex items-center gap-2 mb-3">
          <div class="w-2.5 h-2.5 rounded-[3px]" style="background:{color}"></div>
          <span class="text-[13px] font-medium text-text truncate">{f.faculty}</span>
        </div>
        <div class="font-[var(--font-data)] text-[28px] font-medium text-text leading-none mb-3">{f.score}<span class="text-[12px] text-faint">%</span></div>
        <div class="h-[4px] rounded-full overflow-hidden bg-line">
          <div class="h-full rounded-full" style="width:{f.score}%;background:{color}"></div>
        </div>
        <div class="font-[var(--font-data)] text-[11px] text-faint mt-3">{f.primary} primary · {f.total} total</div>
      </button>
    {/each}
  </div>

  <!-- Expanded subnet list -->
  {#if selected}
    {@const color = FACULTY_COLORS[selected]}
    {@const desc = FACULTY_DESCRIPTIONS[selected]}
    <div class="bg-panel border border-line rounded-2xl overflow-hidden anim">
      <div class="px-8 py-6 border-b border-line flex items-start justify-between">
        <div>
          <div class="flex items-center gap-3 mb-2">
            <div class="w-3 h-3 rounded-[4px]" style="background:{color}"></div>
            <h2 class="text-[22px] font-medium text-text">{selected}</h2>
          </div>
          <p class="text-[15px] text-sub">{desc}</p>
        </div>
        <button onclick={() => selected = null} class="text-faint hover:text-sub text-[20px] px-2 transition-colors">×</button>
      </div>
      <div class="divide-y divide-line">
        {#each selectedSubs as sn}
          <div class="px-8 py-4 flex items-center gap-6 hover:bg-raised transition-colors">
            <span class="font-[var(--font-data)] text-[14px] text-faint w-[52px] shrink-0">SN{sn.netuid}</span>
            <span class="text-[16px] text-text font-medium w-[160px] shrink-0">{sn.name}</span>
            <span class="text-[14px] text-sub flex-1">{sn.desc}</span>
            {#if sn.primary !== selected}
              <span class="font-[var(--font-data)] text-[10px] text-faint px-2 py-0.5 rounded-full border border-line shrink-0">secondary</span>
            {/if}
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>
