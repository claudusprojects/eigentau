<script lang="ts">
  let query = $state('');
  let routing = $state(false);
  const steps = [
    { n: '01', task: 'Fetch latest subnet metrics from chain', sn: 'SN42 Gopher', faculty: 'Perception' },
    { n: '02', task: 'Analyze emission trends and predict outlook', sn: 'SN8 Vanta', faculty: 'Problem Solving' },
    { n: '03', task: 'Synthesize findings into coherent report', sn: 'SN1 Apex', faculty: 'Reasoning' },
    { n: '04', task: 'Evaluate and score analysis quality', sn: 'SN15 De-Val', faculty: 'Metacognition' },
  ];
  const synthesis = 'Based on analysis of 129 active subnets, emission distribution shows increasing concentration toward inference-focused subnets (SN1, SN64). Top 10 subnets capture 47% of daily emissions. Registration rates are up 12% week-over-week, primarily in AI agent and compute subnets.';
  function go() { if(!query.trim())return; routing=true; setTimeout(()=>routing=false,1500); }
</script>

<div style="margin-bottom:80px">
  <h1 style="font-family:var(--serif);font-size:clamp(48px,6vw,80px);font-weight:400;font-style:italic;color:var(--t1);line-height:.95;letter-spacing:-.04em;margin-bottom:24px">
    Decompose, route,<br><span style="color:var(--ac);text-shadow:0 0 60px var(--acg)">synthesize</span>
  </h1>
  <p style="font-size:16px;line-height:1.8;max-width:520px;color:var(--t2)">Send any complex task. The router breaks it into sub-tasks, fans them across the right subnets, and combines the results.</p>
</div>

<!-- Input — website card style -->
<div style="background:var(--card);border:1px solid var(--bdr);border-radius:16px;padding:32px;margin-bottom:64px">
  <form onsubmit={(e)=>{e.preventDefault();go()}}>
    <div style="font-size:15px;color:var(--t1);margin-bottom:16px;font-weight:600">What do you want to know?</div>
    <div style="display:flex;gap:12px">
      <input type="text" bind:value={query}
        placeholder="e.g. Research the top 5 Bittensor subnets by emission growth..."
        style="flex:1;background:var(--bg);border:1px solid var(--bdr);border-radius:12px;padding:14px 20px;font-size:15px;font-family:var(--sans);color:var(--t1);outline:none;transition:border-color .2s"
        onfocus={(e) => e.currentTarget.style.borderColor = 'var(--bdr2)'}
        onblur={(e) => e.currentTarget.style.borderColor = 'var(--bdr)'} />
      <button type="submit" disabled={routing||!query.trim()}
        style="background:var(--ac);color:#000;padding:14px 32px;border-radius:99px;font-size:14px;font-weight:600;white-space:nowrap;transition:box-shadow .2s;opacity:{routing||!query.trim()?'.3':'1'}"
        onmouseenter={(e) => e.currentTarget.style.boxShadow = '0 0 40px var(--acg)'}
        onmouseleave={(e) => e.currentTarget.style.boxShadow = 'none'}>
        {routing ? 'Routing...' : 'Route Task'}
      </button>
    </div>
  </form>
</div>

<!-- Pipeline — same as website "How Eigentau thinks" section -->
<h2 style="font-family:var(--serif);font-size:clamp(28px,3vw,40px);font-style:italic;color:var(--t1);line-height:1.1;letter-spacing:-.03em;margin-bottom:40px">How it was routed</h2>
<div style="display:flex;align-items:stretch;gap:2px;margin-bottom:64px">
  {#each steps as s, i}
    <div style="flex:1;background:var(--card);border:1px solid var(--bdr);border-radius:16px;padding:32px 24px;transition:border-color .3s,box-shadow .3s"
      onmouseenter={(e) => { e.currentTarget.style.borderColor = 'var(--ac)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(0,219,188,.06)'; }}
      onmouseleave={(e) => { e.currentTarget.style.borderColor = 'var(--bdr)'; e.currentTarget.style.boxShadow = 'none'; }}>
      <div style="font-family:var(--mono);font-size:48px;font-weight:600;color:rgba(0,219,188,.12);line-height:1;margin-bottom:16px">{s.n}</div>
      <div style="font-size:16px;font-weight:700;color:var(--t1);margin-bottom:8px;letter-spacing:-.01em">{s.faculty}</div>
      <div style="font-size:13px;line-height:1.7;color:var(--t2);margin-bottom:12px">{s.task}</div>
      <span style="font-family:var(--mono);font-size:11px;color:var(--ac);padding:6px 14px;border:1px solid rgba(0,219,188,.2);border-radius:99px;background:var(--acd)">{s.sn}</span>
    </div>
    {#if i < steps.length - 1}
      <div style="display:flex;align-items:center;flex-shrink:0;padding:0 4px;color:var(--bdr2)">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
    {/if}
  {/each}
</div>

<!-- Synthesis -->
<div style="background:var(--card);border:1px solid var(--bdr);border-radius:16px;padding:40px">
  <h3 style="font-family:var(--serif);font-size:28px;font-style:italic;color:var(--t1);margin-bottom:16px">Synthesis</h3>
  <p style="font-size:15px;line-height:1.9;color:var(--t2);margin-bottom:20px">{synthesis}</p>
  <div style="display:flex;gap:12px;align-items:center;padding-top:16px;border-top:1px solid var(--bdr)">
    <span style="font-family:var(--mono);font-size:12px;color:var(--ac)">91% quality</span>
    <span style="color:var(--bdr2)">·</span>
    <span style="font-family:var(--mono);font-size:12px;color:var(--t3)">3.8s latency</span>
    <span style="color:var(--bdr2)">·</span>
    <span style="font-family:var(--mono);font-size:12px;color:var(--t3)">4 subnets</span>
    <span style="color:var(--bdr2)">·</span>
    <span style="font-family:var(--mono);font-size:11px;color:var(--t3)">mock data</span>
  </div>
</div>
