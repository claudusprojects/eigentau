<script lang="ts">
  const weights = [
    { signal: 'Inference', w: 0.359, prev: 0.318 },
    { signal: 'Prediction', w: 0.233, prev: 0.215 },
    { signal: 'Scraping', w: 0.209, prev: 0.221 },
    { signal: 'Storage', w: 0.144, prev: 0.137 },
    { signal: 'Annotation', w: 0.049, prev: 0.052 },
    { signal: 'Training', w: 0.006, prev: 0.004 },
  ];
  const insights = [
    { c: 847, text: 'Multi-subnet queries with SN1+SN13 produce 23% higher quality than SN1 alone for research tasks.', type: 'positive' },
    { c: 845, text: 'SN8 prediction accuracy drops below 60% during high-volatility periods. Route to SN1 reasoning instead.', type: 'caution' },
    { c: 842, text: 'Adding SN15 metacognition step improves quality by 8% but adds 1.2s latency. Worth it for complex queries.', type: 'positive' },
    { c: 839, text: 'Real-time subnets (SN64) have 3x higher failure rate during peak hours. Implement fallback routing.', type: 'caution' },
    { c: 836, text: 'Optimal decomposition depth is 3-5 subtasks. Beyond 5, synthesis quality degrades from context dilution.', type: 'insight' },
  ];
</script>

<div style="margin-bottom:80px">
  <h1 style="font-family:var(--serif);font-size:clamp(48px,6vw,80px);font-weight:400;font-style:italic;color:var(--t1);line-height:.95;letter-spacing:-.04em;margin-bottom:24px">
    The router gets smarter<br>with every <span style="color:var(--ac);text-shadow:0 0 60px var(--acg)">query</span>
  </h1>
  <p style="font-size:16px;line-height:1.8;max-width:520px;color:var(--t2)">
    Signal-to-performance correlations computed after every cycle. Weights shift toward subnets that deliver. No human tuning — pure data-driven evolution.
  </p>
</div>

<!-- Routing weights — same visual style as website LEARN panel -->
<div style="display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:start">
  <div>
    <h2 style="font-family:var(--serif);font-size:clamp(28px,3vw,40px);font-style:italic;color:var(--t1);line-height:1.1;letter-spacing:-.03em;margin-bottom:32px">Routing weights</h2>
    <div style="background:var(--card);border:1px solid var(--bdr);border-radius:16px;padding:32px;font-family:var(--mono)">
      <div style="font-size:10px;color:var(--t3);letter-spacing:.12em;text-transform:uppercase;margin-bottom:20px">Routing Weights — Cycle 847</div>
      {#each weights as wt}
        {@const d = wt.w - wt.prev}
        {@const pct = Math.round(wt.w / 0.359 * 82)}
        <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(24,24,34,.8)">
          <span style="font-size:12px;color:var(--t2);width:90px;flex-shrink:0">{wt.signal}</span>
          <div style="flex:1;height:6px;background:rgba(24,24,34,1);border-radius:3px;overflow:hidden">
            <div style="height:100%;border-radius:3px;background:linear-gradient(90deg,var(--ac),rgba(0,219,188,.4));width:{pct}%;transition:width 1.2s cubic-bezier(.16,1,.3,1)"></div>
          </div>
          <span style="font-size:11px;color:var(--t1);width:44px;text-align:right">{wt.w.toFixed(3)}</span>
          <span style="font-size:10px;width:50px;text-align:right;color:{d >= 0 ? 'var(--ac)' : '#EF4444'}">{d >= 0 ? '+' : ''}{d.toFixed(3)}</span>
        </div>
      {/each}
      <div style="display:flex;justify-content:space-between;margin-top:16px;padding-top:16px;border-top:1px solid var(--bdr)">
        <span style="font-size:10px;color:var(--t3)">EMA blend: 80/20</span>
        <span style="font-size:10px;color:var(--ac)">Accuracy: 74.2%</span>
      </div>
    </div>
  </div>

  <!-- Insights -->
  <div>
    <h2 style="font-family:var(--serif);font-size:clamp(28px,3vw,40px);font-style:italic;color:var(--t1);line-height:1.1;letter-spacing:-.03em;margin-bottom:32px">Insights</h2>
    <div style="display:flex;flex-direction:column;gap:12px">
      {#each insights as l}
        <div style="background:var(--card);border:1px solid var(--bdr);border-radius:16px;padding:24px 28px;transition:border-color .3s"
          onmouseenter={(e) => e.currentTarget.style.borderColor = 'var(--bdr2)'}
          onmouseleave={(e) => e.currentTarget.style.borderColor = 'var(--bdr)'}>
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
            <span style="font-family:var(--mono);font-size:12px;color:var(--t3)">Cycle {l.c}</span>
            <span style="font-family:var(--mono);font-size:10px;padding:4px 10px;border-radius:99px;border:1px solid {l.type==='positive'?'rgba(0,219,188,.2)':l.type==='caution'?'rgba(239,68,68,.2)':'var(--bdr)'};color:{l.type==='positive'?'var(--ac)':l.type==='caution'?'#EF4444':'var(--t3)'};background:{l.type==='positive'?'var(--acd)':l.type==='caution'?'rgba(239,68,68,.08)':'none'}">{l.type}</span>
          </div>
          <p style="font-size:14px;color:var(--t2);line-height:1.7">{l.text}</p>
        </div>
      {/each}
      <p style="text-align:center;font-family:var(--mono);font-size:11px;color:var(--t3);padding-top:8px">Mock data — learning engine not yet live</p>
    </div>
  </div>
</div>
