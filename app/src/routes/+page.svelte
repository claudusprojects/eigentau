<script lang="ts">
  import { subnets, FACULTY_COLORS, getFacultyStats, type Faculty } from '$lib/subnets';

  const fstats = getFacultyStats();
  const avg = Math.round(fstats.reduce((s, f) => s + f.score, 0) / fstats.length);

  // Radar chart
  const cx = 200, cy = 200, R = 160;
  function pt(i: number, r: number) {
    const a = Math.PI * 2 * i / 10 - Math.PI / 2;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  }
  const shape = fstats.map((f, i) => pt(i, R * f.score / 100));
  const path = shape.map((p, i) => (i ? 'L' : 'M') + p[0] + ',' + p[1]).join(' ') + 'Z';

  const routes = [
    { task: 'Research top Bittensor subnets by emission growth', subs: ['SN1 Apex', 'SN13 Data Universe', 'SN22 Desearch'], q: 92 },
    { task: 'Predict TAO price movement next 7 days', subs: ['SN8 Vanta', 'SN50 Synth'], q: 78 },
    { task: 'Summarize latest subnet registrations', subs: ['SN42 Gopher', 'SN1 Apex', 'SN33 ReadyAI'], q: 88 },
  ];
</script>

<!-- Hero -->
<div class="mb-20">
  <p class="font-[var(--font-m)] text-[13px] text-teal uppercase tracking-[.2em] mb-5">Dashboard</p>
  <h1 class="font-[var(--font-d)] italic text-[clamp(40px,5vw,68px)] text-text leading-[.95] tracking-[-0.03em] mb-6">
    The cognitive network<br>at a glance
  </h1>
  <p class="text-[18px] text-p max-w-2xl leading-relaxed">
    {subnets.length} subnets orchestrated across 10 cognitive faculties.
    Composite AGI score: <span class="text-teal font-[var(--font-m)] font-medium">{avg}%</span>
  </p>
</div>

<!-- Stats row — big numbers spread across full width -->
<div class="grid grid-cols-4 gap-6 mb-20">
  {#each [
    { v: subnets.length.toString(), l: 'Subnets Mapped', color: '' },
    { v: '10 / 10', l: 'Faculties Covered', color: '' },
    { v: avg + '%', l: 'AGI Score', color: 'text-teal' },
    { v: '$308', l: 'TAO Price', color: '' },
  ] as s}
    <div class="bg-card rounded-2xl p-8 border border-line hover:border-[#2a2a3e] transition-colors">
      <div class="font-[var(--font-m)] text-[11px] text-sec uppercase tracking-[.15em] mb-4">{s.l}</div>
      <div class="font-[var(--font-m)] text-[32px] font-medium text-text leading-none {s.color}">{s.v}</div>
    </div>
  {/each}
</div>

<!-- Radar + Faculty bars — two columns, full width -->
<div class="grid grid-cols-2 gap-12 items-start mb-20">
  <div>
    <h2 class="font-[var(--font-d)] italic text-[32px] text-text mb-8">Cognitive Profile</h2>
    <svg viewBox="0 0 400 400" class="w-full">
      {#each [.25, .5, .75, 1] as r}
        <polygon points={Array.from({length: 10}, (_, i) => pt(i, R * r).join(',')).join(' ')}
          fill="none" stroke="var(--color-line)" stroke-width="{r === 1 ? 1.5 : .5}" opacity="{r === 1 ? .5 : .2}"/>
      {/each}
      {#each fstats as _, i}
        <line x1={cx} y1={cy} x2={pt(i, R)[0]} y2={pt(i, R)[1]} stroke="var(--color-line)" stroke-width=".5" opacity=".15"/>
      {/each}
      <path d={path} fill="rgba(0,219,188,.1)" stroke="var(--color-teal)" stroke-width="2" stroke-linejoin="round"/>
      {#each shape as p, i}
        {@const c = FACULTY_COLORS[fstats[i].faculty]}
        <circle cx={p[0]} cy={p[1]} r="5" fill={c} stroke="var(--color-bg)" stroke-width="2.5"/>
      {/each}
      {#each fstats as f, i}
        {@const [lx, ly] = pt(i, R + 24)}
        {@const c = FACULTY_COLORS[f.faculty]}
        <text x={lx} y={ly}
          text-anchor={lx < cx - 10 ? 'end' : lx > cx + 10 ? 'start' : 'middle'}
          dominant-baseline={ly < cy - 10 ? 'auto' : ly > cy + 10 ? 'hanging' : 'middle'}
          fill={c} font-family="var(--font-m)" font-size="11" opacity=".9">
          {f.faculty.replace('Executive Functions', 'Executive').replace('Problem Solving', 'Problem').replace('Social Cognition', 'Social')}
        </text>
      {/each}
      <text x={cx} y={cy - 8} text-anchor="middle" fill="var(--color-text)" font-family="var(--font-m)" font-size="36" font-weight="500">{avg}%</text>
      <text x={cx} y={cy + 18} text-anchor="middle" fill="var(--color-sec)" font-family="var(--font-m)" font-size="10" letter-spacing=".15em">AGI SCORE</text>
    </svg>
  </div>

  <div>
    <h2 class="font-[var(--font-d)] italic text-[32px] text-text mb-8">Faculty Breakdown</h2>
    <div class="space-y-6">
      {#each fstats as f}
        {@const c = FACULTY_COLORS[f.faculty]}
        <div>
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded" style="background:{c}"></div>
              <span class="text-[17px] text-text">{f.faculty}</span>
            </div>
            <div class="flex items-center gap-4">
              <span class="font-[var(--font-m)] text-[15px] text-p">{f.primary} subnets</span>
              <span class="font-[var(--font-m)] text-[15px] text-text font-medium">{f.score}%</span>
            </div>
          </div>
          <div class="h-2.5 rounded-full bg-card overflow-hidden">
            <div class="h-full rounded-full transition-all duration-1000 ease-out" style="width:{f.score}%;background:{c}"></div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>

<!-- Recent Routes -->
<div>
  <div class="flex items-baseline justify-between mb-8">
    <h2 class="font-[var(--font-d)] italic text-[32px] text-text">Recent Routes</h2>
    <span class="font-[var(--font-m)] text-[12px] text-mut">mock data</span>
  </div>
  <div class="grid grid-cols-3 gap-6">
    {#each routes as r}
      <div class="bg-card rounded-2xl p-8 border border-line hover:border-[#2a2a3e] transition-all group">
        <div class="flex items-start justify-between mb-5">
          <p class="text-[17px] text-text leading-snug group-hover:text-teal transition-colors">{r.task}</p>
        </div>
        <div class="flex flex-wrap gap-2 mb-5">
          {#each r.subs as s}
            <span class="font-[var(--font-m)] text-[12px] text-sec px-3 py-1.5 rounded-lg border border-line bg-bg">{s}</span>
          {/each}
        </div>
        <div class="font-[var(--font-m)] text-[14px] {r.q >= 90 ? 'text-teal' : 'text-p'} font-medium">{r.q}% quality</div>
      </div>
    {/each}
  </div>
</div>
