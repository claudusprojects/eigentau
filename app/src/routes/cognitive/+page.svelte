<script lang="ts">
  import { FACULTY_COLORS, FACULTY_DESCRIPTIONS, getFacultyStats, getSubnetsByFaculty, type Faculty } from '$lib/subnets';

  const stats = getFacultyStats();
  const totalScore = Math.round(stats.reduce((s, f) => s + f.score, 0) / stats.length);

  let expanded: Faculty | null = $state(null);
</script>

<div class="space-y-10">
  <div class="flex items-end justify-between">
    <div>
      <h1 class="section-heading text-4xl mb-3">Cognitive Map</h1>
      <p class="text-text-secondary text-base max-w-lg">Bittensor's subnets mapped to DeepMind's 10 AGI cognitive faculties.</p>
    </div>
    <div class="text-right">
      <div class="text-4xl font-mono font-medium text-accent">{totalScore}%</div>
      <div class="text-sm text-text-muted">AGI Coverage</div>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-4">
    {#each stats as f}
      {@const color = FACULTY_COLORS[f.faculty]}
      {@const desc = FACULTY_DESCRIPTIONS[f.faculty]}
      {@const isOpen = expanded === f.faculty}
      <button
        class="card p-6 text-left w-full cursor-pointer {isOpen ? 'border-accent/30' : ''}"
        onclick={() => expanded = isOpen ? null : f.faculty}
      >
        <!-- Header -->
        <div class="flex items-start justify-between mb-5">
          <div>
            <div class="flex items-center gap-3 mb-2">
              <span class="w-3 h-3 rounded-full shrink-0" style="background: {color}"></span>
              <h3 class="text-lg font-semibold text-text">{f.faculty}</h3>
            </div>
            <p class="text-sm text-text-secondary leading-relaxed">{desc}</p>
          </div>
          <span class="text-3xl font-mono font-medium text-text tabular-nums ml-4">{f.score}<span class="text-base text-text-muted">%</span></span>
        </div>

        <!-- Bar -->
        <div class="h-2.5 bg-border rounded-full overflow-hidden mb-4">
          <div class="h-full rounded-full transition-all duration-500" style="width: {f.score}%; background: {color}"></div>
        </div>

        <!-- Meta -->
        <div class="flex items-center justify-between text-sm">
          <span class="text-text-muted">{f.primary} primary · {f.secondary} secondary</span>
          <span class="font-mono text-text-muted">{f.total} total</span>
        </div>

        <!-- Expanded subnet list -->
        {#if isOpen}
          <div class="mt-5 pt-5 border-t border-border space-y-2.5">
            {#each getSubnetsByFaculty(f.faculty) as sn}
              <div class="flex items-center justify-between py-1">
                <div class="flex items-center gap-3">
                  <span class="font-mono text-sm text-text-muted w-10">SN{sn.netuid}</span>
                  <span class="text-sm text-text font-medium">{sn.name}</span>
                  {#if sn.primary !== f.faculty}
                    <span class="text-xs px-2 py-0.5 rounded-full bg-bg-elevated border border-border text-text-muted">secondary</span>
                  {/if}
                </div>
                <span class="text-sm text-text-muted truncate ml-4 max-w-[240px] text-right">{sn.desc}</span>
              </div>
            {/each}
          </div>
        {/if}
      </button>
    {/each}
  </div>
</div>
