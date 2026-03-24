<script lang="ts">
  import { subnets, FACULTIES, FACULTY_COLORS, getFacultyStats, type Faculty } from '$lib/subnets';

  const facultyStats = getFacultyStats();
  const avgScore = Math.round(facultyStats.reduce((s, f) => s + f.score, 0) / facultyStats.length);

  const stats = [
    { label: 'Subnets Mapped', value: subnets.length, sub: 'across Bittensor' },
    { label: 'Cognitive Faculties', value: '10 / 10', sub: '100% coverage' },
    { label: 'AGI Score', value: avgScore + '%', sub: 'weighted average' },
    { label: 'Strongest Faculty', value: 'Reasoning', sub: '28 subnets' },
  ];

  const recentRoutes = [
    { task: 'Research top Bittensor subnets by emission growth', subnets: ['SN1 Apex', 'SN13 Data Universe', 'SN22 Desearch'], quality: 92, time: '3.1s' },
    { task: 'Predict TAO price movement next 7 days', subnets: ['SN8 Vanta', 'SN50 Synth', 'SN6 Numinous'], quality: 78, time: '1.8s' },
    { task: 'Summarize latest subnet registrations', subnets: ['SN42 Gopher', 'SN1 Apex', 'SN33 ReadyAI'], quality: 88, time: '4.2s' },
    { task: 'Analyze validator consensus patterns', subnets: ['SN1 Apex', 'SN15 De-Val'], quality: 85, time: '2.7s' },
  ];
</script>

<div class="space-y-10">
  <!-- Hero heading -->
  <div>
    <h1 class="section-heading text-4xl mb-3">Overview</h1>
    <p class="text-text-secondary text-base max-w-lg">Monitor the AGI orchestration engine — routing performance, cognitive coverage, and subnet health.</p>
  </div>

  <!-- Stats grid -->
  <div class="grid grid-cols-4 gap-4">
    {#each stats as stat}
      <div class="card p-6">
        <div class="text-xs font-mono text-text-muted uppercase tracking-widest mb-3">{stat.label}</div>
        <div class="text-2xl font-mono font-medium text-text mb-1">{stat.value}</div>
        <div class="text-sm text-accent">{stat.sub}</div>
      </div>
    {/each}
  </div>

  <div class="grid grid-cols-5 gap-6">
    <!-- Cognitive Profile (left, wider) -->
    <div class="col-span-2 card p-6">
      <h2 class="text-lg font-semibold text-text mb-6">Cognitive Profile</h2>
      <div class="space-y-4">
        {#each facultyStats as f}
          {@const color = FACULTY_COLORS[f.faculty]}
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-text">{f.faculty}</span>
              <span class="text-sm font-mono text-text-muted">{f.primary} subnets</span>
            </div>
            <div class="h-2 bg-border rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all duration-700" style="width:{f.score}%;background:{color}"></div>
            </div>
          </div>
        {/each}
      </div>
      <div class="mt-6 pt-4 border-t border-border flex justify-between items-center">
        <span class="text-sm text-text-muted">Composite AGI Score</span>
        <span class="text-xl font-mono font-medium text-accent">{avgScore}%</span>
      </div>
    </div>

    <!-- Recent Routes (right) -->
    <div class="col-span-3 card overflow-hidden">
      <div class="px-6 py-5 border-b border-border flex items-center justify-between">
        <h2 class="text-lg font-semibold text-text">Recent Routes</h2>
        <span class="tag border-border-strong text-text-muted">mock data</span>
      </div>
      {#each recentRoutes as route}
        <div class="px-6 py-5 border-b border-border last:border-b-0 hover:bg-bg-card-hover transition-colors">
          <div class="flex items-start justify-between mb-3">
            <p class="text-[15px] text-text font-medium leading-snug max-w-[70%]">{route.task}</p>
            <div class="flex items-center gap-3 shrink-0">
              <span class="font-mono text-sm text-text-muted">{route.time}</span>
              <span class="font-mono text-sm px-2.5 py-1 rounded-lg {route.quality >= 90 ? 'text-accent bg-accent/10' : 'text-text-muted bg-bg-alt'}">
                {route.quality}%
              </span>
            </div>
          </div>
          <div class="flex gap-2 flex-wrap">
            {#each route.subnets as sn}
              <span class="text-xs font-mono px-3 py-1 rounded-lg bg-bg-elevated border border-border text-text-secondary">
                {sn}
              </span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
