<script lang="ts">
  import { FACULTY_COLORS, FACULTY_DESCRIPTIONS, getFacultyStats, getSubnetsByFaculty, type Faculty } from '$lib/subnets';

  const stats = getFacultyStats();
  const totalScore = Math.round(stats.reduce((s, f) => s + f.score, 0) / stats.length);

  let expanded: Faculty | null = $state(null);
  function toggle(f: Faculty) { expanded = expanded === f ? null : f; }
</script>

<div class="space-y-12 page-enter">
  <div class="relative flex items-end justify-between">
    <div>
      <h1 class="font-serif italic text-[42px] text-text leading-none tracking-[-0.03em] mb-4">Cognitive Map</h1>
      <p class="text-[17px] text-text-secondary max-w-xl">Bittensor's 129 subnets mapped to DeepMind's 10 AGI cognitive faculties. Click a faculty to explore its subnets.</p>
    </div>
    <div class="text-right shrink-0 ml-8">
      <div class="font-mono text-[48px] font-medium text-accent leading-none">{totalScore}<span class="text-[24px] text-text-dim">%</span></div>
      <div class="text-[13px] text-text-dim mt-1">AGI Coverage</div>
    </div>
    <div class="absolute -left-10 top-0 w-[3px] h-full bg-gradient-to-b from-accent/40 via-accent/10 to-transparent rounded-full"></div>
  </div>

  <div class="grid grid-cols-2 gap-4 page-enter page-enter-d1">
    {#each stats as f}
      {@const color = FACULTY_COLORS[f.faculty]}
      {@const desc = FACULTY_DESCRIPTIONS[f.faculty]}
      {@const isOpen = expanded === f.faculty}
      {@const subs = isOpen ? getSubnetsByFaculty(f.faculty) : []}
      <button
        class="relative bg-bg-surface border rounded-2xl p-7 text-left w-full cursor-pointer transition-all duration-300 overflow-hidden
          {isOpen ? 'border-accent/30' : 'border-border hover:border-border-strong'}"
        onclick={() => toggle(f.faculty)}
      >
        {#if isOpen}
          <div class="absolute inset-0 bg-gradient-to-br from-accent/[.03] to-transparent pointer-events-none"></div>
        {/if}
        <div class="relative">
          <!-- Header -->
          <div class="flex items-start justify-between mb-5">
            <div class="flex-1 mr-4">
              <div class="flex items-center gap-3 mb-2">
                <span class="w-3 h-3 rounded-sm shrink-0" style="background:{color}"></span>
                <h3 class="text-[18px] font-semibold text-text">{f.faculty}</h3>
              </div>
              <p class="text-[14px] text-text-secondary leading-relaxed">{desc}</p>
            </div>
            <div class="text-right shrink-0">
              <span class="font-mono text-[32px] font-medium text-text leading-none">{f.score}<span class="text-[16px] text-text-dim">%</span></span>
            </div>
          </div>

          <!-- Bar -->
          <div class="h-[6px] bg-border rounded-full overflow-hidden mb-4">
            <div class="h-full rounded-full transition-all duration-700 ease-out" style="width:{f.score}%;background:{color}"></div>
          </div>

          <div class="flex items-center justify-between text-[13px] text-text-dim">
            <span>{f.primary} primary · {f.secondary} secondary</span>
            <span class="font-mono">{f.total} subnets</span>
          </div>

          <!-- Expanded list -->
          {#if isOpen}
            <div class="mt-6 pt-5 border-t border-border space-y-2">
              {#each subs as sn}
                <div class="flex items-center justify-between py-1.5 group/row">
                  <div class="flex items-center gap-3">
                    <span class="font-mono text-[13px] text-text-dim w-10">SN{sn.netuid}</span>
                    <span class="text-[14px] text-text font-medium">{sn.name}</span>
                    {#if sn.primary !== f.faculty}
                      <span class="text-[11px] font-mono px-2 py-0.5 rounded-full bg-bg-elevated text-text-dim border border-border/50">2nd</span>
                    {/if}
                  </div>
                  <span class="text-[13px] text-text-dim truncate ml-4 max-w-[220px] text-right">{sn.desc}</span>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </button>
    {/each}
  </div>
</div>
