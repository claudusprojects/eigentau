<script lang="ts">
  import { subnets, FACULTY_COLORS, getFacultyStats, type Faculty } from '$lib/subnets';

  const fstats = getFacultyStats();
  const avg = Math.round(fstats.reduce((s, f) => s + f.score, 0) / fstats.length);

  // Radar
  const cx=180,cy=180,R=145;
  function pt(i:number,r:number){const a=Math.PI*2*i/10-Math.PI/2;return[cx+r*Math.cos(a),cy+r*Math.sin(a)];}
  const shape=fstats.map((f,i)=>pt(i,R*f.score/100));
  const path=shape.map((p,i)=>(i?'L':'M')+p[0]+','+p[1]).join(' ')+'Z';

  const routes = [
    { task: 'Research top Bittensor subnets by emission growth', subs: ['SN1 Apex','SN13 Data Universe','SN22 Desearch'], q: 92 },
    { task: 'Predict TAO price movement next 7 days', subs: ['SN8 Vanta','SN50 Synth'], q: 78 },
    { task: 'Summarize latest subnet registrations', subs: ['SN42 Gopher','SN1 Apex','SN33 ReadyAI'], q: 88 },
  ];
</script>

<div>
  <!-- Hero -->
  <div class="mb-20 up">
    <p class="font-[var(--font-m)] text-[13px] text-teal uppercase tracking-[.2em] mb-4">Dashboard</p>
    <h1 class="font-[var(--font-d)] italic text-[64px] text-text leading-[.95] tracking-[-0.04em] mb-6">
      The cognitive<br>network at a glance
    </h1>
    <p class="text-[18px] text-body max-w-xl leading-relaxed">
      {subnets.length} subnets orchestrated across 10 cognitive faculties. Composite AGI score: <span class="text-teal font-[var(--font-m)] font-medium">{avg}%</span>
    </p>
  </div>

  <!-- Radar + Stats side by side -->
  <div class="grid grid-cols-2 gap-20 items-center mb-24 up up1">
    <!-- Radar -->
    <div class="flex justify-center">
      <svg viewBox="0 0 360 360" class="w-full max-w-[360px]">
        {#each [.25,.5,.75,1] as r}
          <polygon points={Array.from({length:10},(_,i)=>pt(i,R*r).join(',')).join(' ')}
            fill="none" stroke="var(--color-line)" stroke-width="{r===1?1:.5}" opacity="{r===1?.5:.2}"/>
        {/each}
        {#each fstats as _,i}
          <line x1={cx} y1={cy} x2={pt(i,R)[0]} y2={pt(i,R)[1]} stroke="var(--color-line)" stroke-width=".5" opacity=".15"/>
        {/each}
        <path d={path} fill="rgba(0,219,188,.1)" stroke="var(--color-teal)" stroke-width="2" stroke-linejoin="round"/>
        {#each shape as p,i}
          {@const c=FACULTY_COLORS[fstats[i].faculty]}
          <circle cx={p[0]} cy={p[1]} r="5" fill={c} stroke="var(--color-bg)" stroke-width="2.5"/>
        {/each}
        {#each fstats as f,i}
          {@const [lx,ly]=pt(i,R+22)}
          {@const c=FACULTY_COLORS[f.faculty]}
          <text x={lx} y={ly}
            text-anchor={lx<cx-10?'end':lx>cx+10?'start':'middle'}
            dominant-baseline={ly<cy-10?'auto':ly>cy+10?'hanging':'middle'}
            fill={c} font-family="var(--font-m)" font-size="10" opacity=".85">
            {f.faculty.replace('Executive Functions','Executive').replace('Problem Solving','Problem').replace('Social Cognition','Social')}
          </text>
        {/each}
        <text x={cx} y={cy-6} text-anchor="middle" fill="var(--color-text)" font-family="var(--font-m)" font-size="32" font-weight="500">{avg}%</text>
        <text x={cx} y={cy+18} text-anchor="middle" fill="var(--color-dim)" font-family="var(--font-m)" font-size="10" letter-spacing=".15em">AGI SCORE</text>
      </svg>
    </div>

    <!-- Faculty list — big and readable -->
    <div class="space-y-6">
      {#each fstats as f}
        {@const c=FACULTY_COLORS[f.faculty]}
        <div>
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-3">
              <div class="w-3 h-3 rounded" style="background:{c}"></div>
              <span class="text-[17px] text-text">{f.faculty}</span>
            </div>
            <div class="flex items-center gap-4">
              <span class="font-[var(--font-m)] text-[15px] text-body">{f.primary} subnets</span>
              <span class="font-[var(--font-m)] text-[15px] text-text font-medium w-10 text-right">{f.score}%</span>
            </div>
          </div>
          <div class="h-2 rounded-full bg-card overflow-hidden">
            <div class="h-full rounded-full" style="width:{f.score}%;background:{c};transition:width 1.2s cubic-bezier(.16,1,.3,1)"></div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Recent Routes -->
  <div class="up up2">
    <div class="flex items-baseline justify-between mb-8">
      <h2 class="font-[var(--font-d)] italic text-[36px] text-text">Recent routes</h2>
      <span class="font-[var(--font-m)] text-[12px] text-faint">mock data</span>
    </div>
    <div class="space-y-4">
      {#each routes as r}
        <div class="bg-card border border-line rounded-2xl px-8 py-7 hover:border-[#2a2a40] transition-all group">
          <div class="flex items-start justify-between mb-5">
            <p class="text-[18px] text-text leading-snug group-hover:text-teal transition-colors">{r.task}</p>
            <span class="font-[var(--font-m)] text-[16px] font-medium shrink-0 ml-6 {r.q>=90?'text-teal':'text-body'}">{r.q}%</span>
          </div>
          <div class="flex gap-3 flex-wrap">
            {#each r.subs as s}
              <span class="font-[var(--font-m)] text-[13px] text-dim px-4 py-2 rounded-xl border border-line bg-bg">{s}</span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
