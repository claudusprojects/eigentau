<script lang="ts">
  const stats = [
    { label: 'Subnets Mapped', value: '129', delta: '+3' },
    { label: 'Queries Routed', value: '48,291', delta: '+847' },
    { label: 'Routing Accuracy', value: '74.2%', delta: '+1.8%' },
    { label: 'Avg Response', value: '2.4s', delta: '-0.3s' },
  ];

  const recentRoutes = [
    { id: 'RT-4821', task: 'Research top Bittensor subnets by growth', subnets: ['SN1', 'SN13', 'SN8'], faculties: ['Reasoning', 'Perception', 'Executive'], status: 'completed', quality: 92, time: '3.1s' },
    { id: 'RT-4820', task: 'Predict TAO price movement next 7 days', subnets: ['SN8', 'SN19'], faculties: ['Executive', 'Attention'], status: 'completed', quality: 78, time: '1.8s' },
    { id: 'RT-4819', task: 'Summarize latest subnet registrations', subnets: ['SN13', 'SN1', 'SN33'], faculties: ['Perception', 'Reasoning', 'Metacognition'], status: 'completed', quality: 88, time: '4.2s' },
    { id: 'RT-4818', task: 'Analyze validator consensus across subnets', subnets: ['SN1', 'SN8'], faculties: ['Reasoning', 'Executive'], status: 'completed', quality: 85, time: '2.7s' },
    { id: 'RT-4817', task: 'Generate report on emission distribution', subnets: ['SN13', 'SN1', 'SN8', 'SN33'], faculties: ['Perception', 'Reasoning', 'Executive', 'Metacognition'], status: 'completed', quality: 94, time: '5.6s' },
  ];

  const cognitiveScores = [
    { name: 'Perception', score: 78 },
    { name: 'Generation', score: 92 },
    { name: 'Reasoning', score: 88 },
    { name: 'Memory', score: 71 },
    { name: 'Attention', score: 65 },
    { name: 'Learning', score: 58 },
    { name: 'Executive', score: 62 },
    { name: 'Metacognition', score: 45 },
    { name: 'Problem Solving', score: 53 },
    { name: 'Social', score: 40 },
  ];
</script>

<div class="space-y-8">
  <!-- Header -->
  <div>
    <h1 class="text-3xl font-bold tracking-tight text-text mb-2">Overview</h1>
    <p class="text-sm text-text-muted">Eigentau routing engine status and performance metrics.</p>
  </div>

  <!-- Stats Grid -->
  <div class="grid grid-cols-4 gap-px">
    {#each stats as stat}
      <div class="bg-bg-card border border-border rounded-xl p-6">
        <div class="text-xs text-text-muted font-mono uppercase tracking-wider mb-3">{stat.label}</div>
        <div class="text-2xl font-mono font-medium text-text mb-1">{stat.value}</div>
        <div class="text-xs font-mono text-accent">{stat.delta} today</div>
      </div>
    {/each}
  </div>

  <div class="grid grid-cols-3 gap-6">
    <!-- Recent Routes -->
    <div class="col-span-2 bg-bg-card border border-border rounded-xl">
      <div class="px-6 py-4 border-b border-border flex items-center justify-between">
        <h2 class="text-sm font-semibold text-text">Recent Routes</h2>
        <span class="text-xs font-mono text-text-muted">Last 5 queries</span>
      </div>
      <div class="divide-y divide-border">
        {#each recentRoutes as route}
          <div class="px-6 py-4 hover:bg-bg-card-hover transition-colors">
            <div class="flex items-start justify-between mb-2">
              <div>
                <span class="text-xs font-mono text-text-muted mr-2">{route.id}</span>
                <span class="text-sm text-text">{route.task}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="text-xs font-mono text-text-muted">{route.time}</span>
                <span class="text-xs font-mono px-2 py-0.5 rounded-full
                  {route.quality >= 90 ? 'text-accent bg-accent-dim' : route.quality >= 75 ? 'text-text-secondary bg-bg-card-hover' : 'text-text-muted bg-bg-alt'}">
                  {route.quality}%
                </span>
              </div>
            </div>
            <div class="flex gap-2 flex-wrap">
              {#each route.subnets as sn, i}
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-alt border border-border text-text-muted">
                  {sn} <span class="text-text-muted opacity-50">{route.faculties[i]}</span>
                </span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Cognitive Profile -->
    <div class="bg-bg-card border border-border rounded-xl">
      <div class="px-6 py-4 border-b border-border">
        <h2 class="text-sm font-semibold text-text">Cognitive Profile</h2>
      </div>
      <div class="p-6 space-y-4">
        {#each cognitiveScores as faculty}
          <div>
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-xs text-text-secondary">{faculty.name}</span>
              <span class="text-xs font-mono text-text-muted">{faculty.score}%</span>
            </div>
            <div class="h-1.5 bg-border rounded-full overflow-hidden">
              <div class="h-full bg-accent rounded-full transition-all" style="width: {faculty.score}%"></div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
