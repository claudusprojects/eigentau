<script lang="ts">
  import { FACULTIES, FACULTY_COLORS, FACULTY_DESCRIPTIONS, getFacultyStats, getSubnetsByFaculty, type Faculty } from '$lib/subnets';

  const stats = getFacultyStats();
  const totalScore = Math.round(stats.reduce((s, f) => s + f.score, 0) / stats.length);

  let expanded: Faculty | null = $state(null);
</script>

<div class="space-y-8">
  <div class="flex items-end justify-between">
    <div>
      <h1 class="font-serif text-2xl italic text-text mb-2">Cognitive Map</h1>
      <p class="text-sm text-text-muted">Bittensor's subnets mapped to DeepMind's 10 AGI cognitive faculties.</p>
    </div>
    <div class="text-right">
      <div class="text-3xl font-mono font-medium text-accent">{totalScore}%</div>
      <div class="text-xs text-text-muted font-mono">AGI Coverage</div>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-3">
    {#each stats as f}
      {@const color = FACULTY_COLORS[f.faculty]}
      {@const desc = FACULTY_DESCRIPTIONS[f.faculty]}
      <button
        class="bg-bg-card border border-border rounded-xl p-6 hover:border-border-strong transition-colors text-left w-full"
        onclick={() => expanded = expanded === f.faculty ? null : f.faculty}
      >
        <div class="flex items-start justify-between mb-4">
          <div>
            <h3 class="text-base font-semibold text-text mb-1">{f.faculty}</h3>
            <p class="text-xs text-text-muted">{desc}</p>
          </div>
          <span class="text-2xl font-mono font-medium text-text tabular-nums">{f.score}<span class="text-sm text-text-muted">%</span></span>
        </div>
        <div class="h-2 bg-border rounded-full overflow-hidden mb-4">
          <div class="h-full rounded-full transition-all" style="width: {f.score}%; background: {color}"></div>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-[11px] font-mono text-text-muted">{f.primary} primary · {f.secondary} secondary</span>
          <span class="text-[11px] font-mono text-text-muted">{f.total} subnets</span>
        </div>

        {#if expanded === f.faculty}
          <div class="mt-4 pt-4 border-t border-border space-y-1.5">
            {#each getSubnetsByFaculty(f.faculty) as sn}
              <div class="flex items-center justify-between text-[11px]">
                <div class="flex items-center gap-2">
                  <span class="font-mono text-text-muted w-8">SN{sn.netuid}</span>
                  <span class="text-text-secondary">{sn.name}</span>
                  {#if sn.primary !== f.faculty}
                    <span class="text-[9px] px-1 py-0.5 rounded bg-bg-alt text-text-muted">secondary</span>
                  {/if}
                </div>
                <span class="text-text-muted font-mono truncate ml-2 max-w-[200px]">{sn.desc}</span>
              </div>
            {/each}
          </div>
        {/if}
      </button>
    {/each}
  </div>
</div>
