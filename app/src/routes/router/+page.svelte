<script lang="ts">
  const API = 'https://router-production-cb1b.up.railway.app';

  let query = $state('');
  let routing = $state(false);
  let error = $state('');

  let result: {
    steps: { task: string; faculty: string; subnet: string; source: string; latencyMs: number }[];
    synthesis: string;
    quality: number;
    totalLatencyMs: number;
    subnetsUsed: string[];
    strategy: string;
  } | null = $state(null);

  async function go() {
    if (!query.trim() || routing) return;
    routing = true;
    error = '';
    result = null;
    try {
      const res = await fetch(`${API}/api/route`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const d = await res.json();
      result = {
        steps: d.decomposition.steps,
        synthesis: d.synthesis,
        quality: d.quality,
        totalLatencyMs: d.totalLatencyMs,
        subnetsUsed: d.subnetsUsed,
        strategy: d.decomposition.strategy,
      };
    } catch (e: any) {
      error = e.message || 'Failed to route query';
    } finally {
      routing = false;
    }
  }
</script>

<div style="margin-bottom:80px">
  <h1 style="font-family:var(--serif);font-size:clamp(48px,6vw,80px);font-weight:400;font-style:italic;color:var(--t1);line-height:.95;letter-spacing:-.04em;margin-bottom:24px">
    Decompose, route,<br><span style="color:var(--ac);text-shadow:0 0 60px var(--acg)">synthesize</span>
  </h1>
  <p style="font-size:16px;line-height:1.8;max-width:520px;color:var(--t2)">Send any complex task. The router breaks it into sub-tasks, fans them across the right subnets, and combines the results.</p>
</div>

<!-- Input -->
<div style="background:var(--card);border:1px solid var(--bdr);border-radius:16px;padding:32px;margin-bottom:64px">
  <form onsubmit={(e) => { e.preventDefault(); go(); }}>
    <div style="font-size:15px;color:var(--t1);margin-bottom:16px;font-weight:600">What do you want to know?</div>
    <div style="display:flex;gap:12px">
      <input type="text" bind:value={query}
        placeholder="e.g. Research the top 5 Bittensor subnets by emission growth..."
        style="flex:1;background:var(--bg);border:1px solid var(--bdr);border-radius:12px;padding:14px 20px;font-size:15px;font-family:var(--sans);color:var(--t1);outline:none;transition:border-color .2s"
        onfocus={(e) => e.currentTarget.style.borderColor = 'var(--bdr2)'}
        onblur={(e) => e.currentTarget.style.borderColor = 'var(--bdr)'} />
      <button type="submit" disabled={routing || !query.trim()}
        style="background:var(--ac);color:#000;padding:14px 32px;border-radius:99px;font-size:14px;font-weight:600;white-space:nowrap;transition:box-shadow .2s;opacity:{routing || !query.trim() ? '.3' : '1'}"
        onmouseenter={(e) => e.currentTarget.style.boxShadow = '0 0 40px var(--acg)'}
        onmouseleave={(e) => e.currentTarget.style.boxShadow = 'none'}>
        {routing ? 'Routing...' : 'Route Task'}
      </button>
    </div>
  </form>
  {#if routing}
    <div style="margin-top:20px;display:flex;align-items:center;gap:8px">
      <span style="width:8px;height:8px;background:var(--ac);border-radius:50%;animation:pulse 1s infinite"></span>
      <span style="font-family:var(--mono);font-size:13px;color:var(--ac)">Decomposing and routing across subnets...</span>
    </div>
  {/if}
  {#if error}
    <div style="margin-top:16px;font-family:var(--mono);font-size:13px;color:#EF4444">{error}</div>
  {/if}
</div>

{#if result}
  <!-- Pipeline -->
  <h2 style="font-family:var(--serif);font-size:clamp(28px,3vw,40px);font-style:italic;color:var(--t1);line-height:1.1;letter-spacing:-.03em;margin-bottom:16px">How it was routed</h2>
  <p style="font-size:13px;color:var(--t3);margin-bottom:32px;font-family:var(--mono)">Strategy: {result.strategy} · {result.totalLatencyMs}ms total</p>
  <div style="display:flex;align-items:stretch;gap:2px;margin-bottom:64px">
    {#each result.steps as s, i}
      <div style="flex:1;background:var(--card);border:1px solid var(--bdr);border-radius:16px;padding:32px 24px;transition:border-color .3s,box-shadow .3s"
        onmouseenter={(e) => { e.currentTarget.style.borderColor = 'var(--ac)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(0,219,188,.06)'; }}
        onmouseleave={(e) => { e.currentTarget.style.borderColor = 'var(--bdr)'; e.currentTarget.style.boxShadow = 'none'; }}>
        <div style="font-family:var(--mono);font-size:48px;font-weight:600;color:rgba(0,219,188,.12);line-height:1;margin-bottom:16px">0{i + 1}</div>
        <div style="font-size:16px;font-weight:700;color:var(--t1);margin-bottom:8px;letter-spacing:-.01em">{s.faculty}</div>
        <div style="font-size:13px;line-height:1.7;color:var(--t2);margin-bottom:12px">{s.task}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <span style="font-family:var(--mono);font-size:11px;color:var(--ac);padding:6px 14px;border:1px solid rgba(0,219,188,.2);border-radius:99px;background:var(--acd)">{s.subnet}</span>
          <span style="font-family:var(--mono);font-size:10px;color:var(--t3);padding:6px 10px;border:1px solid var(--bdr);border-radius:99px">{s.source} · {s.latencyMs}ms</span>
        </div>
      </div>
      {#if i < result.steps.length - 1}
        <div style="display:flex;align-items:center;flex-shrink:0;padding:0 4px;color:var(--bdr2)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
      {/if}
    {/each}
  </div>

  <!-- Synthesis -->
  <div style="background:var(--card);border:1px solid var(--bdr);border-radius:16px;padding:40px">
    <h3 style="font-family:var(--serif);font-size:28px;font-style:italic;color:var(--t1);margin-bottom:16px">Synthesis</h3>
    <p style="font-size:15px;line-height:1.9;color:var(--t2);margin-bottom:20px">{result.synthesis}</p>
    <div style="display:flex;gap:12px;align-items:center;padding-top:16px;border-top:1px solid var(--bdr)">
      <span style="font-family:var(--mono);font-size:12px;color:var(--ac)">{result.quality}% quality</span>
      <span style="color:var(--bdr2)">·</span>
      <span style="font-family:var(--mono);font-size:12px;color:var(--t3)">{(result.totalLatencyMs / 1000).toFixed(1)}s latency</span>
      <span style="color:var(--bdr2)">·</span>
      <span style="font-family:var(--mono);font-size:12px;color:var(--t3)">{result.steps.length} steps</span>
      <span style="color:var(--bdr2)">·</span>
      <span style="font-family:var(--mono);font-size:12px;color:var(--t3)">{result.subnetsUsed.length} subnets</span>
    </div>
  </div>
{/if}

<style>
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
</style>
