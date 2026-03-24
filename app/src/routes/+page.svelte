<script lang="ts">
  import { subnets, FACULTIES, FACULTY_COLORS, getFacultyStats, type Faculty } from '$lib/subnets';

  const facultyStats = getFacultyStats();

  const stats = [
    { label: 'Subnets Mapped', value: subnets.length.toString(), delta: 'live' },
    { label: 'Faculties Covered', value: '10 / 10', delta: '100%' },
    { label: 'Cognitive Coverage', value: Math.round(facultyStats.reduce((s, f) => s + f.score, 0) / facultyStats.length) + '%', delta: 'avg score' },
    { label: 'Top Faculty', value: 'Reasoning', delta: facultyStats.find(f => f.faculty === 'Reasoning')?.primary + ' subnets' },
  ];

  const recentRoutes = [
    { id: 'RT-4821', task: 'Research top Bittensor subnets by growth', subnets: ['SN1', 'SN13', 'SN22'], faculties: ['Reasoning', 'Memory', 'Attention'], quality: 92, time: '3.1s' },
    { id: 'RT-4820', task: 'Predict TAO price movement next 7 days', subnets: ['SN8', 'SN50', 'SN6'], faculties: ['Problem Solving', 'Generation', 'Reasoning'], quality: 78, time: '1.8s' },
    { id: 'RT-4819', task: 'Summarize latest subnet registrations', subnets: ['SN42', 'SN1', 'SN33'], faculties: ['Perception', 'Reasoning', 'Memory'], quality: 88, time: '4.2s' },
    { id: 'RT-4818', task: 'Analyze validator consensus across subnets', subnets: ['SN1', 'SN15', 'SN0'], faculties: ['Reasoning', 'Metacognition', 'Executive Functions'], quality: 85, time: '2.7s' },
    { id: 'RT-4817', task: 'Generate report on emission distribution', subnets: ['SN42', 'SN1', 'SN82', 'SN15'], faculties: ['Perception', 'Reasoning', 'Reasoning', 'Metacognition'], quality: 94, time: '5.6s' },
  ];
</script>

<div class="space-y-6">
  <div>
    <h1 class="font-serif text-2xl italic text-text mb-1">Overview</h1>
    <p class="text-[13px] text-text-muted">Routing engine status and cognitive profile.</p>
  </div>

  <!-- Stats -->
  <div class="grid grid-cols-4 gap-3">
    {#each stats as stat}
      <div class="bg-bg-card border border-border rounded-lg p-5 hover:border-border-strong transition-colors">
        <div class="text-[10px] text-text-muted font-mono uppercase tracking-widest mb-2">{stat.label}</div>
        <div class="text-xl font-mono font-medium text-text tracking-tight">{stat.value}</div>
        <div class="text-[11px] font-mono text-accent mt-1">{stat.delta}</div>
      </div>
    {/each}
  </div>

  <div class="grid grid-cols-3 gap-4">
    <!-- Recent Routes -->
    <div class="col-span-2 bg-bg-card border border-border rounded-lg overflow-hidden">
      <div class="px-5 py-3 border-b border-border flex items-center justify-between">
        <h2 class="text-[13px] font-semibold text-text">Recent Routes</h2>
        <span class="text-[10px] font-mono text-text-muted">Mock data — router not yet live</span>
      </div>
      {#each recentRoutes as route}
        <div class="px-5 py-3.5 border-b border-border last:border-b-0 hover:bg-bg-card-hover transition-colors">
          <div class="flex items-center justify-between mb-1.5">
            <div class="flex items-center gap-2">
              <span class="text-[10px] font-mono text-text-muted">{route.id}</span>
              <span class="text-[13px] text-text">{route.task}</span>
            </div>
            <div class="flex items-center gap-2.5">
              <span class="text-[10px] font-mono text-text-muted">{route.time}</span>
              <span class="text-[10px] font-mono px-1.5 py-0.5 rounded
                {route.quality >= 90 ? 'text-accent bg-accent-dim' : 'text-text-muted bg-bg-alt'}">
                {route.quality}%
              </span>
            </div>
          </div>
          <div class="flex gap-1.5 flex-wrap">
            {#each route.subnets as sn, i}
              <span class="text-[10px] font-mono px-1.5 py-0.5 rounded border border-border text-text-muted">
                {sn} · {route.faculties[i]}
              </span>
            {/each}
          </div>
        </div>
      {/each}
    </div>

    <!-- Cognitive Profile -->
    <div class="bg-bg-card border border-border rounded-lg overflow-hidden">
      <div class="px-5 py-3 border-b border-border">
        <h2 class="text-[13px] font-semibold text-text">Cognitive Profile</h2>
      </div>
      <div class="p-5 space-y-3">
        {#each facultyStats as f}
          {@const color = FACULTY_COLORS[f.faculty]}
          <div>
            <div class="flex items-center justify-between mb-1">
              <span class="text-[12px] text-text-secondary">{f.faculty}</span>
              <span class="text-[11px] font-mono text-text-muted">{f.primary}</span>
            </div>
            <div class="h-1 bg-border rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all" style="width:{f.score}%;background:{color}"></div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
