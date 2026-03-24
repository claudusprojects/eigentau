<script lang="ts">
  import { onMount } from 'svelte';
  const API = 'https://router-production-cb1b.up.railway.app';

  let regime = $state('—');
  let regimeDesc = $state('Loading...');
  let params: { key: string; value: string; reason: string }[] = $state([]);

  onMount(async () => {
    try {
      const res = await fetch(`${API}/api/strategy`);
      if (res.ok) {
        const d = await res.json();
        regime = d.regime;
        regimeDesc = d.regimeDesc;
        params = d.params;
      }
    } catch {}
  });
</script>

<div style="margin-bottom:80px">
  <h1 style="font-family:var(--serif);font-size:clamp(48px,6vw,80px);font-weight:400;font-style:italic;color:var(--t1);line-height:.95;letter-spacing:-.04em;margin-bottom:24px">
    Auto-tuned<br><span style="color:var(--ac);text-shadow:0 0 60px var(--acg)">strategy</span>
  </h1>
  <p style="font-size:16px;line-height:1.8;max-width:520px;color:var(--t2)">
    The learning engine continuously adjusts routing parameters based on cumulative outcome quality. All values below are live from the router.
  </p>
</div>

<!-- Regime -->
<div style="background:linear-gradient(180deg,transparent,rgba(0,219,188,.015),transparent);border-top:1px solid var(--bdr);border-bottom:1px solid var(--bdr);padding:60px 0;margin-bottom:64px">
  <div style="display:flex;align-items:center;justify-content:space-between">
    <div>
      <div style="font-family:var(--mono);font-size:11px;color:var(--ac);letter-spacing:.12em;text-transform:uppercase;margin-bottom:12px">Network Regime</div>
      <div style="font-family:var(--mono);font-size:48px;font-weight:600;color:var(--t1);letter-spacing:-.03em">{regime}</div>
      <p style="font-size:14px;color:var(--t2);margin-top:8px">{regimeDesc}</p>
    </div>
    <div style="display:flex;align-items:center;gap:8px">
      <span style="width:8px;height:8px;background:var(--ac);border-radius:50%;animation:pulse 2s infinite;box-shadow:0 0 8px var(--acg)"></span>
      <span style="font-family:var(--mono);font-size:12px;color:var(--ac)">Live</span>
    </div>
  </div>
</div>

<!-- Parameters -->
<h2 style="font-family:var(--serif);font-size:clamp(28px,3vw,40px);font-style:italic;color:var(--t1);line-height:1.1;letter-spacing:-.03em;margin-bottom:40px">Router parameters</h2>

{#if params.length === 0}
  <p style="font-family:var(--mono);font-size:13px;color:var(--t3)">Loading...</p>
{:else}
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
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
{/if}

<style>
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
</style>
