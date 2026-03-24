<script lang="ts">
  import { subnets, FACULTY_COLORS, getFacultyStats, type Faculty } from '$lib/subnets';

  const facultyStats = getFacultyStats();
  const avgScore = Math.round(facultyStats.reduce((s, f) => s + f.score, 0) / facultyStats.length);
  const topFaculty = facultyStats.sort((a, b) => b.primary - a.primary)[0];

  const recentRoutes = [
    { task: 'Research top Bittensor subnets by emission growth', targets: ['SN1 Apex', 'SN13 Data Universe', 'SN22 Desearch'], quality: 92, time: '3.1s' },
    { task: 'Predict TAO price movement next 7 days', targets: ['SN8 Vanta', 'SN50 Synth', 'SN6 Numinous'], quality: 78, time: '1.8s' },
    { task: 'Summarize latest subnet registrations', targets: ['SN42 Gopher', 'SN1 Apex', 'SN33 ReadyAI'], quality: 88, time: '4.2s' },
    { task: 'Analyze validator consensus patterns', targets: ['SN1 Apex', 'SN15 De-Val'], quality: 85, time: '2.7s' },
  ];
</script>

<div class="space-y-12 page-enter">
  <!-- Page header -->
  <div class="relative">
    <h1 class="font-serif italic text-[42px] text-text leading-none tracking-[-0.03em] mb-4 page-enter">Overview</h1>
    <p class="text-[17px] text-text-secondary max-w-xl page-enter page-enter-d1">Monitor the AGI orchestration engine — cognitive coverage, routing performance, and network health across Bittensor.</p>
    <!-- Decorative line -->
    <div class="absolute -left-10 top-0 w-[3px] h-full bg-gradient-to-b from-accent/40 via-accent/10 to-transparent rounded-full"></div>
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-4 gap-5 page-enter page-enter-d1">
    {#each [
      { label: 'Subnets Mapped', value: subnets.length, accent: false },
      { label: 'Cognitive Faculties', value: '10/10', accent: false },
      { label: 'AGI Score', value: avgScore + '%', accent: true },
      { label: 'Top Faculty', value: 'Reasoning', accent: false },
    ] as stat}
      <div class="relative bg-bg-surface border border-border rounded-2xl p-7 group hover:border-border-strong transition-all duration-300 overflow-hidden">
        {#if stat.accent}
          <div class="absolute inset-0 bg-gradient-to-br from-accent/[.04] to-transparent pointer-events-none"></div>
        {/if}
        <div class="relative">
          <div class="text-[11px] font-mono text-text-dim uppercase tracking-[.12em] mb-4">{stat.label}</div>
          <div class="text-[28px] font-mono font-medium text-text leading-none {stat.accent ? 'text-accent' : ''}">{stat.value}</div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Two-column: Cognitive + Routes -->
  <div class="grid grid-cols-5 gap-6 page-enter page-enter-d2">
    <!-- Cognitive Profile -->
    <div class="col-span-2 bg-bg-surface border border-border rounded-2xl p-7">
      <div class="flex items-center justify-between mb-8">
        <h2 class="font-serif italic text-[22px] text-text">Cognitive Profile</h2>
        <span class="font-mono text-[13px] text-accent">{avgScore}%</span>
      </div>
      <div class="space-y-5">
        {#each getFacultyStats() as f}
          {@const color = FACULTY_COLORS[f.faculty]}
          <div class="group">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2.5">
                <span class="w-2.5 h-2.5 rounded-sm shrink-0" style="background:{color}"></span>
                <span class="text-[14px] text-text-secondary group-hover:text-text transition-colors">{f.faculty}</span>
              </div>
              <span class="font-mono text-[13px] text-text-dim">{f.primary}</span>
            </div>
            <div class="h-[5px] bg-border rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-700 ease-out" style="width:{f.score}%;background:{color}"></div>
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Recent Routes -->
    <div class="col-span-3 bg-bg-surface border border-border rounded-2xl overflow-hidden">
      <div class="flex items-center justify-between px-7 py-5 border-b border-border">
        <h2 class="font-serif italic text-[22px] text-text">Recent Routes</h2>
        <span class="font-mono text-[11px] text-text-dim px-3 py-1 rounded-full border border-border bg-bg-alt">mock data</span>
      </div>
      {#each recentRoutes as route, i}
        <div class="px-7 py-5 border-b border-border/60 last:border-b-0 hover:bg-bg-surface-hover transition-colors">
          <div class="flex items-start justify-between mb-3">
            <p class="text-[15px] text-text leading-snug max-w-[65%]">{route.task}</p>
            <div class="flex items-center gap-3 shrink-0">
              <span class="font-mono text-[13px] text-text-dim">{route.time}</span>
              <span class="font-mono text-[13px] font-medium px-3 py-1 rounded-full
                {route.quality >= 90 ? 'text-accent bg-accent-glow' : 'text-text-dim bg-bg-elevated'}">
                {route.quality}%
              </span>
            </div>
          </div>
          <div class="flex gap-2 flex-wrap">
            {#each route.targets as t}
              <span class="font-mono text-[12px] px-3 py-1 rounded-lg bg-bg-elevated text-text-secondary border border-border/50">{t}</span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
