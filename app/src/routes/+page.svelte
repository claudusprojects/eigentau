<script lang="ts">
  import { subnets, FACULTY_COLORS, getFacultyStats, type Faculty } from '$lib/subnets';

  const stats = getFacultyStats();
  const avgScore = Math.round(stats.reduce((s, f) => s + f.score, 0) / stats.length);

  const routes = [
    { task: 'Research top Bittensor subnets by emission growth', targets: ['SN1 Apex', 'SN13 Data Universe', 'SN22 Desearch'], quality: 92, time: '3.1s' },
    { task: 'Predict TAO price movement next 7 days', targets: ['SN8 Vanta', 'SN50 Synth', 'SN6 Numinous'], quality: 78, time: '1.8s' },
    { task: 'Summarize latest subnet registrations', targets: ['SN42 Gopher', 'SN1 Apex', 'SN33 ReadyAI'], quality: 88, time: '4.2s' },
    { task: 'Analyze validator consensus patterns', targets: ['SN1 Apex', 'SN15 De-Val'], quality: 85, time: '2.7s' },
  ];
</script>

<div class="pt-6">
  <!-- Hero heading -->
  <div class="mb-16 rise">
    <h1 class="font-[var(--font-display)] italic text-[clamp(48px,5vw,72px)] text-text leading-[.95] tracking-[-0.04em] mb-5">
      Overview
    </h1>
    <p class="text-[18px] text-body max-w-2xl leading-relaxed">
      The orchestration engine maps Bittensor's <span class="text-text font-medium">{subnets.length} subnets</span> across
      <span class="text-text font-medium">10 cognitive faculties</span> — routing complex tasks to specialized intelligence.
    </p>
  </div>

  <!-- Metric strip — big numbers, not cards -->
  <div class="flex gap-16 mb-16 rise rise-d1">
    {#each [
      { v: subnets.length.toString(), l: 'Subnets', accent: false },
      { v: '10', l: 'Faculties', accent: false },
      { v: avgScore + '%', l: 'AGI Score', accent: true },
      { v: '$308', l: 'TAO Price', accent: false },
    ] as m}
      <div>
        <div class="font-[var(--font-data)] text-[36px] font-medium leading-none mb-2
          {m.accent ? 'text-teal' : 'text-text'}">{m.v}</div>
        <div class="font-[var(--font-data)] text-[11px] text-muted uppercase tracking-[.15em]">{m.l}</div>
      </div>
    {/each}
  </div>

  <div class="glow-line mb-12 rise rise-d1"></div>

  <!-- Two columns: Cognitive Profile + Routes -->
  <div class="grid grid-cols-[380px_1fr] gap-10 rise rise-d2">
    <!-- Cognitive Profile -->
    <div>
      <h2 class="font-[var(--font-display)] italic text-[28px] text-text mb-8">Cognitive Profile</h2>
      <div class="space-y-5">
        {#each stats as f}
          {@const color = FACULTY_COLORS[f.faculty]}
          <div class="group cursor-default">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-3">
                <div class="w-[10px] h-[10px] rounded-[3px]" style="background:{color}"></div>
                <span class="text-[15px] text-body group-hover:text-text transition-colors">{f.faculty}</span>
              </div>
              <span class="font-[var(--font-data)] text-[13px] text-muted tabular-nums">{f.primary}</span>
            </div>
            <div class="h-[4px] rounded-full overflow-hidden" style="background:var(--color-border)">
              <div class="h-full rounded-full" style="width:{f.score}%;background:{color};transition:width 1s cubic-bezier(.16,1,.3,1)"></div>
            </div>
          </div>
        {/each}
      </div>
      <div class="mt-8 pt-6 border-t border-border-lite flex items-baseline justify-between">
        <span class="text-[14px] text-muted">Composite</span>
        <span class="font-[var(--font-data)] text-[28px] text-teal font-medium leading-none">{avgScore}%</span>
      </div>
    </div>

    <!-- Recent Routes -->
    <div>
      <div class="flex items-baseline justify-between mb-8">
        <h2 class="font-[var(--font-display)] italic text-[28px] text-text">Recent Routes</h2>
        <span class="font-[var(--font-data)] text-[11px] text-dim uppercase tracking-[.1em]">mock data</span>
      </div>
      <div class="space-y-3">
        {#each routes as route}
          <div class="glass rounded-2xl px-7 py-5 hover:bg-glass-hover transition-all group">
            <div class="flex items-start justify-between mb-4">
              <p class="text-[16px] text-text leading-snug max-w-[70%] group-hover:text-teal/90 transition-colors">{route.task}</p>
              <div class="flex items-center gap-3 shrink-0">
                <span class="font-[var(--font-data)] text-[12px] text-muted">{route.time}</span>
                <span class="font-[var(--font-data)] text-[13px] font-medium px-3 py-1 rounded-full
                  {route.quality >= 90
                    ? 'text-teal bg-teal-glow'
                    : 'text-body bg-[rgba(255,255,255,.04)]'}">{route.quality}%</span>
              </div>
            </div>
            <div class="flex gap-2 flex-wrap">
              {#each route.targets as t}
                <span class="font-[var(--font-data)] text-[11px] text-muted px-3 py-1.5 rounded-lg border border-border-lite">{t}</span>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
