<script lang="ts">
  import { subnets, FACULTY_COLORS, getFacultyStats, type Faculty } from '$lib/subnets';
  const stats = getFacultyStats();
  const avg = Math.round(stats.reduce((s,f) => s+f.score, 0) / stats.length);

  // Radar
  const cx=200,cy=200,R=160;
  function pt(i:number,r:number){const a=Math.PI*2*i/10-Math.PI/2;return[cx+r*Math.cos(a),cy+r*Math.sin(a)];}
  const shape=stats.map((f,i)=>pt(i,R*f.score/100));
  const path=shape.map((p,i)=>(i?'L':'M')+p[0]+','+p[1]).join(' ')+'Z';

  const routes = [
    { task: 'Research top Bittensor subnets by emission growth', subs: ['SN1 Apex','SN13 Data Universe','SN22 Desearch'], q: 92, time: '3.1s' },
    { task: 'Predict TAO price movement next 7 days', subs: ['SN8 Vanta','SN50 Synth','SN6 Numinous'], q: 78, time: '1.8s' },
    { task: 'Summarize latest subnet registrations', subs: ['SN42 Gopher','SN1 Apex','SN33 ReadyAI'], q: 88, time: '4.2s' },
  ];
</script>

<!-- Hero — same style as website hero -->
<div style="margin-bottom:80px">
  <h1 style="font-family:var(--serif);font-size:clamp(48px,6vw,80px);font-weight:400;font-style:italic;color:var(--t1);line-height:.95;letter-spacing:-.04em;margin-bottom:24px">
    The cognitive network<br>at a <span style="color:var(--ac);text-shadow:0 0 60px var(--acg)">glance</span>
  </h1>
  <p style="font-size:16px;line-height:1.8;max-width:520px;color:var(--t2)">
    {subnets.length} subnets orchestrated across 10 cognitive faculties — routing complex tasks to specialized intelligence on Bittensor.
  </p>
</div>

<!-- Stats strip — same as website NUMBERS section -->
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:40px;margin-bottom:80px;padding:60px 0;border-top:1px solid var(--bdr);border-bottom:1px solid var(--bdr)">
  {#each [
    { v: subnets.length.toString(), l: 'Subnets mapped to cognitive faculties', accent: true },
    { v: '10', l: 'DeepMind AGI faculties covered', accent: false },
    { v: avg + '%', l: 'Composite AGI coverage score', accent: false },
    { v: '$308', l: 'TAO price — powering subnet queries', accent: false },
  ] as s}
    <div style="text-align:center">
      <div style="font-family:var(--mono);font-size:48px;font-weight:600;color:{s.accent ? 'var(--ac)' : 'var(--t1)'};letter-spacing:-.03em">{s.v}</div>
      <div style="font-size:13px;color:var(--t3);margin-top:4px">{s.l}</div>
    </div>
  {/each}
</div>

<!-- Two columns: Radar + Faculty bars -->
<div style="display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start;margin-bottom:80px">
  <!-- Radar chart -->
  <div>
    <h2 style="font-family:var(--serif);font-size:clamp(28px,3vw,40px);font-style:italic;color:var(--t1);line-height:1.1;letter-spacing:-.03em;margin-bottom:32px">Cognitive profile</h2>
    <svg viewBox="0 0 400 400" style="width:100%">
      {#each [.25,.5,.75,1] as r}
        <polygon points={Array.from({length:10},(_,i)=>pt(i,R*r).join(',')).join(' ')}
          fill="none" stroke="var(--bdr)" stroke-width="{r===1?1:.5}"/>
      {/each}
      {#each stats as _,i}
        <line x1={cx} y1={cy} x2={pt(i,R)[0]} y2={pt(i,R)[1]} stroke="var(--bdr)" stroke-width=".5"/>
      {/each}
      <path d={path} fill="rgba(0,219,188,.06)" stroke="var(--ac)" stroke-width="1.5" stroke-linejoin="round"/>
      {#each shape as p,i}
        <circle cx={p[0]} cy={p[1]} r="3" fill="var(--ac)"/>
      {/each}
      {#each stats as f,i}
        {@const [lx,ly]=pt(i,R+20)}
        <text x={lx} y={ly}
          text-anchor={lx<cx-10?'end':lx>cx+10?'start':'middle'}
          dominant-baseline={ly<cy-10?'auto':ly>cy+10?'hanging':'middle'}
          fill="var(--t2)" font-family="var(--sans)" font-size="9">
          {f.faculty.replace('Executive Functions','Executive').replace('Problem Solving','Problem').replace('Social Cognition','Social')}
        </text>
      {/each}
      <circle cx={cx} cy={cy} r="4" fill="var(--ac)" opacity=".8"/>
      <circle cx={cx} cy={cy} r="20" fill="url(#cg)" opacity=".3"/>
      <defs><radialGradient id="cg"><stop offset="0" stop-color="var(--ac)"/><stop offset="1" stop-color="var(--ac)" stop-opacity="0"/></radialGradient></defs>
    </svg>
  </div>

  <!-- Faculty breakdown — uses website .learn-visual style -->
  <div>
    <h2 style="font-family:var(--serif);font-size:clamp(28px,3vw,40px);font-style:italic;color:var(--t1);line-height:1.1;letter-spacing:-.03em;margin-bottom:32px">Faculty coverage</h2>
    <div style="background:var(--card);border:1px solid var(--bdr);border-radius:16px;padding:32px;font-family:var(--mono)">
      <div style="font-size:10px;color:var(--t3);letter-spacing:.12em;text-transform:uppercase;margin-bottom:20px">Coverage by Faculty</div>
      {#each stats as f}
        {@const c = FACULTY_COLORS[f.faculty]}
        <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(24,24,34,.8)">
          <span style="font-size:13px;color:var(--t2);width:110px;flex-shrink:0">{f.faculty}</span>
          <div style="flex:1;height:6px;background:rgba(24,24,34,1);border-radius:3px;overflow:hidden">
            <div style="height:100%;border-radius:3px;background:{c};width:{f.score}%;transition:width 1.2s cubic-bezier(.16,1,.3,1)"></div>
          </div>
          <span style="font-size:12px;color:var(--t1);width:36px;text-align:right">{f.score}%</span>
          <span style="font-size:11px;color:var(--ac);width:20px;text-align:right">{f.primary}</span>
        </div>
      {/each}
      <div style="display:flex;justify-content:space-between;margin-top:16px;padding-top:16px;border-top:1px solid var(--bdr)">
        <span style="font-size:10px;color:var(--t3)">Composite score</span>
        <span style="font-size:10px;color:var(--ac)">{avg}%</span>
      </div>
    </div>
  </div>
</div>

<!-- Recent Routes — uses website .pipe-step card style -->
<div>
  <h2 style="font-family:var(--serif);font-size:clamp(28px,3vw,40px);font-style:italic;color:var(--t1);line-height:1.1;letter-spacing:-.03em;margin-bottom:40px">Recent routes</h2>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
    {#each routes as r}
      <div style="background:var(--card);border:1px solid var(--bdr);border-radius:16px;padding:32px 24px;transition:border-color .3s,box-shadow .3s"
        onmouseenter={(e) => { e.currentTarget.style.borderColor = 'var(--ac)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(0,219,188,.06)'; }}
        onmouseleave={(e) => { e.currentTarget.style.borderColor = 'var(--bdr)'; e.currentTarget.style.boxShadow = 'none'; }}>
        <p style="font-size:16px;font-weight:700;color:var(--t1);margin-bottom:12px;letter-spacing:-.01em;line-height:1.4">{r.task}</p>
        <p style="font-size:13px;line-height:1.7;color:var(--t2);margin-bottom:16px">{r.time} · {r.q}% quality</p>
        <div style="display:flex;flex-wrap:wrap;gap:8px">
          {#each r.subs as s}
            <span style="font-family:var(--mono);font-size:11px;color:var(--ac);padding:6px 14px;border:1px solid rgba(0,219,188,.2);border-radius:99px;background:var(--acd)">{s}</span>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
