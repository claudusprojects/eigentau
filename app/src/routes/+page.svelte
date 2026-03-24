<script lang="ts">
  import { subnets, FACULTY_COLORS, getFacultyStats, FACULTIES, type Faculty } from '$lib/subnets';

  const stats = getFacultyStats();
  const avgScore = Math.round(stats.reduce((s, f) => s + f.score, 0) / stats.length);

  // Radar chart math
  const cx = 200, cy = 200, R = 160;
  function polar(i: number, r: number) {
    const a = (Math.PI * 2 * i) / 10 - Math.PI / 2;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  }
  const radarPoints = stats.map((f, i) => polar(i, R * f.score / 100));
  const radarPath = radarPoints.map((p, i) => (i === 0 ? 'M' : 'L') + p[0] + ',' + p[1]).join(' ') + 'Z';

  // Grid rings
  const rings = [.25, .5, .75, 1];

  const routes = [
    { task: 'Research top Bittensor subnets by emission growth', targets: ['SN1 Apex', 'SN13 Data Universe', 'SN22 Desearch'], quality: 92, time: '3.1s' },
    { task: 'Predict TAO price movement next 7 days', targets: ['SN8 Vanta', 'SN50 Synth'], quality: 78, time: '1.8s' },
    { task: 'Summarize latest subnet registrations', targets: ['SN42 Gopher', 'SN1 Apex', 'SN33 ReadyAI'], quality: 88, time: '4.2s' },
  ];
</script>

<div>
  <!-- Hero row: heading + big stats -->
  <div class="flex items-start justify-between mb-14 anim">
    <div>
      <h1 class="font-[var(--font-display)] italic text-[56px] text-text leading-[1] tracking-[-0.04em] mb-4">Overview</h1>
      <p class="text-[17px] text-sub max-w-lg leading-relaxed">Bittensor's cognitive architecture — {subnets.length} subnets across 10 faculties, orchestrated into general intelligence.</p>
    </div>
    <div class="flex gap-12 pt-3">
      {#each [
        { v: subnets.length, l: 'Subnets' },
        { v: '10', l: 'Faculties' },
        { v: avgScore + '%', l: 'AGI Score', accent: true },
      ] as m}
        <div class="text-right">
          <div class="font-[var(--font-data)] text-[32px] font-medium leading-none mb-1 {m.accent ? 'text-teal' : 'text-text'}">{m.v}</div>
          <div class="font-[var(--font-data)] text-[10px] text-faint uppercase tracking-[.15em]">{m.l}</div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Main content: Radar + Faculty list + Routes -->
  <div class="grid grid-cols-[400px_1fr_1fr] gap-10 anim d1">
    <!-- RADAR CHART — actual visual, not just bars -->
    <div class="flex flex-col items-center">
      <svg viewBox="0 0 400 400" class="w-full max-w-[400px]">
        <!-- Grid rings -->
        {#each rings as r}
          <polygon
            points={Array.from({length: 10}, (_, i) => polar(i, R * r).join(',')).join(' ')}
            fill="none" stroke="var(--color-line)" stroke-width="{r === 1 ? 1 : 0.5}" opacity="{r === 1 ? .6 : .3}"
          />
        {/each}
        <!-- Axis lines -->
        {#each stats as _, i}
          <line x1={cx} y1={cy} x2={polar(i, R)[0]} y2={polar(i, R)[1]}
            stroke="var(--color-line)" stroke-width="0.5" opacity=".2"/>
        {/each}
        <!-- Filled area -->
        <path d={radarPath} fill="var(--color-teal)" fill-opacity=".08" stroke="var(--color-teal)" stroke-width="1.5" stroke-linejoin="round"/>
        <!-- Data points -->
        {#each radarPoints as p, i}
          {@const color = FACULTY_COLORS[stats[i].faculty]}
          <circle cx={p[0]} cy={p[1]} r="4" fill={color} stroke="var(--color-bg)" stroke-width="2"/>
        {/each}
        <!-- Labels -->
        {#each stats as f, i}
          {@const [lx, ly] = polar(i, R + 24)}
          {@const color = FACULTY_COLORS[f.faculty]}
          <text x={lx} y={ly}
            text-anchor={lx < cx - 10 ? 'end' : lx > cx + 10 ? 'start' : 'middle'}
            dominant-baseline={ly < cy - 10 ? 'auto' : ly > cy + 10 ? 'hanging' : 'middle'}
            fill={color} font-family="var(--font-data)" font-size="10" letter-spacing=".02em">
            {f.faculty.replace('Executive Functions', 'Executive').replace('Problem Solving', 'Problem').replace('Social Cognition', 'Social')}
          </text>
        {/each}
        <!-- Center score -->
        <text x={cx} y={cy - 8} text-anchor="middle" fill="var(--color-teal)" font-family="var(--font-data)" font-size="28" font-weight="500">{avgScore}%</text>
        <text x={cx} y={cy + 14} text-anchor="middle" fill="var(--color-faint)" font-family="var(--font-data)" font-size="9" letter-spacing=".12em">AGI SCORE</text>
      </svg>
    </div>

    <!-- Faculty breakdown -->
    <div>
      <h2 class="font-[var(--font-display)] italic text-[24px] text-text mb-6">Faculty Coverage</h2>
      <div class="space-y-4">
        {#each stats as f}
          {@const color = FACULTY_COLORS[f.faculty]}
          <div class="flex items-center gap-4">
            <div class="w-[10px] h-[10px] rounded-[3px] shrink-0" style="background:{color}"></div>
            <span class="text-[14px] text-sub w-[140px] shrink-0">{f.faculty}</span>
            <div class="flex-1 h-[5px] rounded-full overflow-hidden bg-line">
              <div class="h-full rounded-full" style="width:{f.score}%;background:{color};transition:width 1s cubic-bezier(.16,1,.3,1)"></div>
            </div>
            <span class="font-[var(--font-data)] text-[13px] text-faint w-8 text-right shrink-0">{f.primary}</span>
          </div>
        {/each}
      </div>
    </div>

    <!-- Recent routes -->
    <div>
      <div class="flex items-baseline justify-between mb-6">
        <h2 class="font-[var(--font-display)] italic text-[24px] text-text">Recent Routes</h2>
        <span class="font-[var(--font-data)] text-[10px] text-ghost uppercase tracking-[.1em]">mock</span>
      </div>
      <div class="space-y-3">
        {#each routes as route}
          <div class="bg-panel border border-line rounded-2xl px-6 py-5 hover:border-line-lite transition-all group">
            <div class="flex items-start justify-between mb-3">
              <p class="text-[15px] text-text leading-snug group-hover:text-teal transition-colors">{route.task}</p>
              <span class="font-[var(--font-data)] text-[13px] font-medium shrink-0 ml-4
                {route.quality >= 90 ? 'text-teal' : 'text-sub'}">{route.quality}%</span>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              {#each route.targets as t}
                <span class="font-[var(--font-data)] text-[11px] text-faint px-2.5 py-1 rounded-md border border-line">{t}</span>
              {/each}
              <span class="font-[var(--font-data)] text-[11px] text-ghost ml-auto">{route.time}</span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
