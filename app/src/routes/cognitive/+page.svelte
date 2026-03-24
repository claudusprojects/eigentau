<script lang="ts">
  import { FACULTY_COLORS, FACULTY_DESCRIPTIONS, getFacultyStats, getSubnetsByFaculty, type Faculty } from '$lib/subnets';
  const stats = getFacultyStats();
  const total = Math.round(stats.reduce((s,f)=>s+f.score,0)/stats.length);
  let sel: Faculty|null = $state(null);
  const subs = $derived(sel ? getSubnetsByFaculty(sel) : []);
</script>

<div style="margin-bottom:80px">
  <h1 style="font-family:var(--serif);font-size:clamp(48px,6vw,80px);font-weight:400;font-style:italic;color:var(--t1);line-height:.95;letter-spacing:-.04em;margin-bottom:24px">
    Ten faculties of<br><span style="color:var(--ac);text-shadow:0 0 60px var(--acg)">intelligence</span>
  </h1>
  <p style="font-size:16px;line-height:1.8;max-width:520px;color:var(--t2)">
    DeepMind's cognitive framework mapped to {stats.reduce((s,f)=>s+f.total,0)} real Bittensor subnets.
    Overall AGI coverage: <span style="color:var(--ac);font-family:var(--mono)">{total}%</span>
  </p>
</div>

<!-- Faculty grid — 2 cols, website card style -->
<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:40px">
  {#each stats as f}
    {@const c = FACULTY_COLORS[f.faculty]}
    {@const on = sel === f.faculty}
    <button onclick={() => sel = on ? null : f.faculty}
      style="text-align:left;background:var(--card);border:1px solid {on ? 'var(--ac)' : 'var(--bdr)'};border-radius:16px;padding:32px 28px;transition:border-color .3s,box-shadow .3s;cursor:pointer;width:100%;{on ? 'box-shadow:0 0 40px rgba(0,219,188,.06)' : ''}">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:12px;height:12px;border-radius:3px;background:{c}"></div>
          <span style="font-size:18px;font-weight:700;color:var(--t1)">{f.faculty}</span>
        </div>
        <span style="font-family:var(--mono);font-size:28px;font-weight:600;color:var(--t1)">{f.score}<span style="font-size:14px;color:var(--t3)">%</span></span>
      </div>
      <p style="font-size:14px;color:var(--t2);line-height:1.7;margin-bottom:16px">{FACULTY_DESCRIPTIONS[f.faculty]}</p>
      <div style="height:6px;background:rgba(24,24,34,1);border-radius:3px;overflow:hidden;margin-bottom:12px">
        <div style="height:100%;border-radius:3px;background:{c};width:{f.score}%;transition:width 1s"></div>
      </div>
      <span style="font-family:var(--mono);font-size:11px;color:var(--t3)">{f.primary} primary · {f.secondary} secondary · {f.total} total</span>
    </button>
  {/each}
</div>

{#if sel}
  {@const c = FACULTY_COLORS[sel]}
  <div style="background:var(--card);border:1px solid var(--bdr);border-radius:16px;overflow:hidden">
    <div style="padding:24px 32px;border-bottom:1px solid var(--bdr);display:flex;align-items:center;justify-content:space-between">
      <div style="display:flex;align-items:center;gap:10px">
        <div style="width:12px;height:12px;border-radius:3px;background:{c}"></div>
        <span style="font-size:18px;font-weight:700;color:var(--t1)">{sel}</span>
        <span style="font-family:var(--mono);font-size:13px;color:var(--t3);margin-left:8px">{subs.length} subnets</span>
      </div>
      <button onclick={() => sel = null} style="color:var(--t3);font-size:24px;background:none;padding:4px 8px;line-height:1">&times;</button>
    </div>
    {#each subs as sn}
      <div style="padding:16px 32px;border-bottom:1px solid rgba(24,24,34,.5);display:flex;align-items:center;gap:24px;transition:background .2s"
        onmouseenter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,.01)'}
        onmouseleave={(e) => e.currentTarget.style.background = 'none'}>
        <span style="font-family:var(--mono);font-size:14px;color:var(--t3);width:52px;flex-shrink:0">SN{sn.netuid}</span>
        <span style="font-size:16px;color:var(--t1);font-weight:600;width:160px;flex-shrink:0">{sn.name}</span>
        <span style="font-size:14px;color:var(--t2);flex:1">{sn.desc}</span>
        {#if sn.primary !== sel}
          <span style="font-family:var(--mono);font-size:10px;color:var(--t3);padding:4px 10px;border:1px solid var(--bdr);border-radius:99px">secondary</span>
        {/if}
      </div>
    {/each}
  </div>
{/if}
