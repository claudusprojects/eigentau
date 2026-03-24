<script lang="ts">
  import { FACULTY_COLORS, FACULTY_DESCRIPTIONS, getFacultyStats, getSubnetsByFaculty, type Faculty } from '$lib/subnets';

  const stats = getFacultyStats();
  const totalScore = Math.round(stats.reduce((s, f) => s + f.score, 0) / stats.length);
  let expanded: Faculty | null = $state(null);
</script>

<div class="pt-6">
  <div class="flex items-end justify-between mb-16 rise">
    <div>
      <h1 class="font-[var(--font-display)] italic text-[clamp(48px,5vw,72px)] text-text leading-[.95] tracking-[-0.04em] mb-5">
        Cognitive Map
      </h1>
      <p class="text-[18px] text-body max-w-2xl leading-relaxed">
        DeepMind's 10 AGI cognitive faculties mapped to real Bittensor subnets. Click any faculty to see which subnets power it.
      </p>
    </div>
    <div class="text-right shrink-0 ml-12">
      <div class="font-[var(--font-data)] text-[56px] font-medium text-teal leading-none">{totalScore}<span class="text-[24px] text-muted ml-1">%</span></div>
      <div class="font-[var(--font-data)] text-[11px] text-muted uppercase tracking-[.15em] mt-2">AGI Coverage</div>
    </div>
  </div>

  <div class="glow-line mb-10 rise rise-d1"></div>

  <div class="grid grid-cols-2 gap-4 rise rise-d2">
    {#each stats as f}
      {@const color = FACULTY_COLORS[f.faculty]}
      {@const open = expanded === f.faculty}
      {@const subs = open ? getSubnetsByFaculty(f.faculty) : []}
      <button
        class="glass text-left w-full p-7 transition-all duration-300
          {open ? 'ring-1 ring-teal/20' : ''}"
        onclick={() => expanded = open ? null : f.faculty}
      >
        <div class="flex items-start justify-between mb-5">
          <div class="flex-1 mr-6">
            <div class="flex items-center gap-3 mb-2">
              <div class="w-3 h-3 rounded-[4px]" style="background:{color}"></div>
              <h3 class="text-[20px] font-medium text-text">{f.faculty}</h3>
            </div>
            <p class="text-[14px] text-body leading-relaxed">{FACULTY_DESCRIPTIONS[f.faculty]}</p>
          </div>
          <div class="text-right shrink-0">
            <div class="font-[var(--font-data)] text-[32px] font-medium text-text leading-none">{f.score}<span class="text-[14px] text-muted ml-0.5">%</span></div>
          </div>
        </div>

        <div class="h-[5px] rounded-full overflow-hidden mb-4" style="background:var(--color-border)">
          <div class="h-full rounded-full" style="width:{f.score}%;background:{color};transition:width .8s cubic-bezier(.16,1,.3,1)"></div>
        </div>

        <div class="flex items-center justify-between text-[13px] text-muted">
          <span>{f.primary} primary · {f.secondary} secondary</span>
          <span class="font-[var(--font-data)]">{f.total} subnets ›</span>
        </div>

        {#if open}
          <div class="mt-6 pt-5 border-t border-border-lite">
            <div class="grid gap-1">
              {#each subs as sn}
                <div class="flex items-center justify-between py-2 px-1 rounded-lg hover:bg-[rgba(255,255,255,.02)] transition-colors">
                  <div class="flex items-center gap-3 min-w-0">
                    <span class="font-[var(--font-data)] text-[13px] text-muted w-10 shrink-0">SN{sn.netuid}</span>
                    <span class="text-[14px] text-text font-medium truncate">{sn.name}</span>
                    {#if sn.primary !== f.faculty}
                      <span class="text-[10px] font-[var(--font-data)] text-dim px-2 py-0.5 rounded-full border border-border-lite shrink-0">2nd</span>
                    {/if}
                  </div>
                  <span class="text-[13px] text-muted truncate ml-4 max-w-[220px] text-right hidden md:block">{sn.desc}</span>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      </button>
    {/each}
  </div>
</div>
