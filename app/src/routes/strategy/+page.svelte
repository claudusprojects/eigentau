<script lang="ts">
  const params = [
    { key: 'decomposition_depth', value: '4', reason: 'Optimal range 3-5. Beyond 5, synthesis quality degrades due to context dilution.' },
    { key: 'confidence_threshold', value: '0.85', reason: 'Best win rate at confidence >= 0.85 (74% accuracy).' },
    { key: 'max_subnets_per_query', value: '5', reason: 'Diminishing returns beyond 5 subnets per route.' },
    { key: 'ema_blend_factor', value: '0.80', reason: '80% current / 20% new prevents catastrophic forgetting.' },
    { key: 'fallback_timeout_ms', value: '10000', reason: '10s timeout before falling back to direct inference.' },
    { key: 'min_quality_threshold', value: '60', reason: 'Below 60% triggers re-route with different subnet combination.' },
  ];
</script>

<div style="margin-bottom:80px">
  <h1 style="font-family:var(--serif);font-size:clamp(48px,6vw,80px);font-weight:400;font-style:italic;color:var(--t1);line-height:.95;letter-spacing:-.04em;margin-bottom:24px">
    Auto-tuned<br><span style="color:var(--ac);text-shadow:0 0 60px var(--acg)">strategy</span>
  </h1>
  <p style="font-size:16px;line-height:1.8;max-width:520px;color:var(--t2)">
    The learning engine continuously adjusts routing parameters based on cumulative outcome quality. No manual tuning needed.
  </p>
</div>

<!-- Regime — accent card -->
<div style="background:linear-gradient(180deg,transparent,rgba(0,219,188,.015),transparent);border-top:1px solid var(--bdr);border-bottom:1px solid var(--bdr);padding:60px 0;margin-bottom:64px">
  <div style="display:flex;align-items:center;justify-content:space-between">
    <div>
      <div style="font-family:var(--mono);font-size:11px;color:var(--ac);letter-spacing:.12em;text-transform:uppercase;margin-bottom:12px">Network Regime</div>
      <div style="font-family:var(--mono);font-size:48px;font-weight:600;color:var(--t1);letter-spacing:-.03em">NEUTRAL</div>
      <p style="font-size:14px;color:var(--t2);margin-top:8px">No anomalies detected. Standard routing weights active.</p>
    </div>
    <div style="display:flex;align-items:center;gap:8px">
      <span style="width:8px;height:8px;background:var(--ac);border-radius:50%;animation:pulse 2s infinite;box-shadow:0 0 8px var(--acg)"></span>
      <span style="font-family:var(--mono);font-size:12px;color:var(--ac)">Auto-detected</span>
    </div>
  </div>
</div>

<!-- Parameters — website card style -->
<h2 style="font-family:var(--serif);font-size:clamp(28px,3vw,40px);font-style:italic;color:var(--t1);line-height:1.1;letter-spacing:-.03em;margin-bottom:40px">Learned parameters</h2>

<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:32px">
  {#each params as p}
    <div style="background:var(--card);border:1px solid var(--bdr);border-radius:16px;padding:28px 24px;transition:border-color .3s,box-shadow .3s"
      onmouseenter={(e) => { e.currentTarget.style.borderColor = 'var(--ac)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(0,219,188,.06)'; }}
      onmouseleave={(e) => { e.currentTarget.style.borderColor = 'var(--bdr)'; e.currentTarget.style.boxShadow = 'none'; }}>
      <div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:10px">
        <span style="font-family:var(--mono);font-size:14px;color:var(--ac)">{p.key}</span>
        <span style="font-family:var(--mono);font-size:24px;font-weight:600;color:var(--t1)">{p.value}</span>
      </div>
      <p style="font-size:13px;line-height:1.7;color:var(--t2)">{p.reason}</p>
    </div>
  {/each}
</div>

<p style="text-align:center;font-family:var(--mono);font-size:11px;color:var(--t3)">Mock data — strategy engine not yet live</p>

<style>
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
</style>
