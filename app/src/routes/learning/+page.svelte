<script lang="ts">
  const weights = [
    { signal: 'Inference', weight: 0.359, prev: 0.318, color: '#00DBBC' },
    { signal: 'Prediction', weight: 0.233, prev: 0.215, color: '#8B5CF6' },
    { signal: 'Scraping', weight: 0.209, prev: 0.221, color: '#3B82F6' },
    { signal: 'Storage', weight: 0.144, prev: 0.137, color: '#F59E0B' },
    { signal: 'Annotation', weight: 0.049, prev: 0.052, color: '#EC4899' },
    { signal: 'Training', weight: 0.006, prev: 0.004, color: '#10B981' },
  ];

  const insights = [
    { cycle: 847, text: 'Multi-subnet queries with SN1+SN13 produce 23% higher quality than SN1 alone for research tasks.', type: 'positive' },
    { cycle: 845, text: 'SN8 prediction accuracy drops below 60% during high-volatility periods. Route to SN1 reasoning instead.', type: 'caution' },
    { cycle: 842, text: 'Adding SN15 metacognition step improves quality by 8% but adds 1.2s latency. Worth it for complex queries.', type: 'positive' },
    { cycle: 839, text: 'Real-time subnets (SN64) have 3x higher failure rate during peak hours. Implement fallback routing.', type: 'caution' },
    { cycle: 836, text: 'Optimal decomposition depth is 3-5 subtasks. Beyond 5, synthesis quality degrades from context dilution.', type: 'insight' },
  ];
</script>

<div>
  <div class="mb-20 up">
    <p class="font-[var(--font-m)] text-[13px] text-teal uppercase tracking-[.2em] mb-4">Learning Engine</p>
    <h1 class="font-[var(--font-d)] italic text-[64px] text-text leading-[.95] tracking-[-0.04em] mb-6">
      Every query makes<br>the router smarter
    </h1>
    <p class="text-[18px] text-body max-w-xl leading-relaxed">Self-evolving routing weights and insights. The engine learns which subnet combinations produce the best results.</p>
  </div>

  <!-- Weights — full width, big bars -->
  <div class="mb-20 up up1">
    <div class="flex items-baseline justify-between mb-10">
      <h2 class="font-[var(--font-d)] italic text-[36px] text-text">Routing weights</h2>
      <span class="font-[var(--font-m)] text-[13px] text-faint">Cycle 847 · EMA 0.80</span>
    </div>
    <div class="space-y-8">
      {#each weights as w}
        {@const d=w.weight-w.prev}
        {@const pct=Math.round(w.weight*100)}
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="text-[18px] text-text">{w.signal}</span>
            <div class="flex items-center gap-6">
              <span class="font-[var(--font-m)] text-[16px] text-body">{w.weight.toFixed(3)}</span>
              <span class="font-[var(--font-m)] text-[14px] {d>=0?'text-teal':'text-[#FF4D6A]'}">{d>=0?'+':''}{d.toFixed(3)}</span>
            </div>
          </div>
          <div class="h-3 rounded-full bg-card overflow-hidden">
            <div class="h-full rounded-full" style="width:{pct}%;background:{w.color};transition:width 1.2s cubic-bezier(.16,1,.3,1)"></div>
          </div>
        </div>
      {/each}
    </div>
    <div class="mt-10 bg-card border border-line rounded-2xl px-8 py-6 flex items-center justify-between">
      <span class="text-[18px] text-body">Overall routing accuracy</span>
      <span class="font-[var(--font-m)] text-[36px] text-teal font-medium leading-none">74.2%</span>
    </div>
  </div>

  <!-- Insights -->
  <div class="up up2">
    <div class="flex items-baseline justify-between mb-10">
      <h2 class="font-[var(--font-d)] italic text-[36px] text-text">Insights</h2>
      <span class="font-[var(--font-m)] text-[13px] text-faint">296 total</span>
    </div>
    <div class="space-y-4">
      {#each insights as l}
        <div class="bg-card border border-line rounded-2xl px-8 py-6 hover:border-[#2a2a40] transition-all">
          <div class="flex items-center gap-4 mb-3">
            <span class="font-[var(--font-m)] text-[14px] text-dim">Cycle {l.cycle}</span>
            <span class="font-[var(--font-m)] text-[12px] px-3 py-1 rounded-full border
              {l.type==='positive'?'text-teal border-teal/20 bg-teal/5':
               l.type==='caution'?'text-[#FFB020] border-[#FFB020]/20 bg-[#FFB020]/5':
               'text-body border-line bg-card'}">{l.type}</span>
          </div>
          <p class="text-[16px] text-body leading-[1.8]">{l.text}</p>
        </div>
      {/each}
      <p class="text-center font-[var(--font-m)] text-[12px] text-faint pt-4">Mock data — learning engine not yet live</p>
    </div>
  </div>
</div>
