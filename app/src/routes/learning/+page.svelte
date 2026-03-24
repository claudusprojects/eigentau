<script lang="ts">
  import { onMount } from 'svelte';
  const API = 'https://router-production-cb1b.up.railway.app';

  let weights: { faculty: string; weight: number; total_uses: number; avg_quality: number }[] = $state([]);
  let totalRoutes = $state(0);
  let avgQuality = $state(0);

  onMount(async () => {
    try {
      const [wRes, sRes] = await Promise.all([
        fetch(`${API}/api/weights`),
        fetch(`${API}/api/stats`),
      ]);
      if (wRes.ok) weights = (await wRes.json()).weights;
      if (sRes.ok) {
        const s = await sRes.json();
        totalRoutes = s.totalRoutes;
        avgQuality = s.avgQuality;
      }
    } catch {}
  });

  const maxWeight = $derived(Math.max(...weights.map(w => w.weight), 0.1));
</script>

<div style="margin-bottom:80px">
  <h1 style="font-family:var(--serif);font-size:clamp(48px,6vw,80px);font-weight:400;font-style:italic;color:var(--t1);line-height:.95;letter-spacing:-.04em;margin-bottom:24px">
    The router gets smarter<br>with every <span style="color:var(--ac);text-shadow:0 0 60px var(--acg)">query</span>
  </h1>
  <p style="font-size:16px;line-height:1.8;max-width:520px;color:var(--t2)">
    Routing weights adjust automatically via EMA blending after every query. Faculties that produce better results gain more weight.
  </p>
</div>

<!-- Routing weights — live from backend -->
<div style="display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start">
  <div>
    <h2 style="font-family:var(--serif);font-size:clamp(28px,3vw,40px);font-style:italic;color:var(--t1);line-height:1.1;letter-spacing:-.03em;margin-bottom:32px">Routing weights</h2>
    <div style="background:var(--card);border:1px solid var(--bdr);border-radius:16px;padding:32px;font-family:var(--mono)">
      <div style="font-size:10px;color:var(--t3);letter-spacing:.12em;text-transform:uppercase;margin-bottom:20px">Live Weights — {totalRoutes} routes processed</div>
      {#each weights as w}
        {@const pct = Math.round(w.weight / maxWeight * 100)}
        <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(24,24,34,.8)">
          <span style="font-size:13px;color:var(--t2);width:110px;flex-shrink:0">{w.faculty}</span>
          <div style="flex:1;height:6px;background:rgba(24,24,34,1);border-radius:3px;overflow:hidden">
            <div style="height:100%;border-radius:3px;background:linear-gradient(90deg,var(--ac),rgba(0,219,188,.4));width:{pct}%;transition:width 1.2s cubic-bezier(.16,1,.3,1)"></div>
          </div>
          <span style="font-size:11px;color:var(--t1);width:44px;text-align:right">{w.weight.toFixed(3)}</span>
          <span style="font-size:10px;width:30px;text-align:right;color:var(--t3)">{w.total_uses}x</span>
        </div>
      {/each}
      <div style="display:flex;justify-content:space-between;margin-top:16px;padding-top:16px;border-top:1px solid var(--bdr)">
        <span style="font-size:10px;color:var(--t3)">EMA blend: 80/20</span>
        <span style="font-size:10px;color:var(--ac)">Avg Quality: {avgQuality}%</span>
      </div>
    </div>
  </div>

  <!-- Stats -->
  <div>
    <h2 style="font-family:var(--serif);font-size:clamp(28px,3vw,40px);font-style:italic;color:var(--t1);line-height:1.1;letter-spacing:-.03em;margin-bottom:32px">Engine stats</h2>
    <div style="display:flex;flex-direction:column;gap:16px">
      <div style="background:var(--card);border:1px solid var(--bdr);border-radius:16px;padding:28px 24px">
        <div style="font-family:var(--mono);font-size:48px;font-weight:600;color:var(--ac);letter-spacing:-.03em">{totalRoutes}</div>
        <div style="font-size:13px;color:var(--t3);margin-top:4px">Total queries routed</div>
      </div>
      <div style="background:var(--card);border:1px solid var(--bdr);border-radius:16px;padding:28px 24px">
        <div style="font-family:var(--mono);font-size:48px;font-weight:600;color:var(--t1);letter-spacing:-.03em">{avgQuality}%</div>
        <div style="font-size:13px;color:var(--t3);margin-top:4px">Average synthesis quality</div>
      </div>
      <div style="background:var(--card);border:1px solid var(--bdr);border-radius:16px;padding:28px 24px">
        <div style="font-family:var(--mono);font-size:48px;font-weight:600;color:var(--t1);letter-spacing:-.03em">{weights.filter(w => w.total_uses > 0).length}/10</div>
        <div style="font-size:13px;color:var(--t3);margin-top:4px">Faculties actively used</div>
      </div>
    </div>
  </div>
</div>
