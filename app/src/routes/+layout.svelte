<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  let { children } = $props();

  const nav = [
    { href: '/', label: 'Overview' },
    { href: '/router', label: 'Router' },
    { href: '/cognitive', label: 'Cognitive Map' },
    { href: '/learning', label: 'Learning' },
    { href: '/subnets', label: 'Subnets' },
    { href: '/strategy', label: 'Strategy' },
  ];

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const ctx = canvas.getContext('2d')!;
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize);

    // Hex particle field
    const N = 40;
    const pts: { x:number; y:number; vx:number; vy:number; s:number; o:number }[] = [];
    for (let i = 0; i < N; i++) {
      pts.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - .5) * .15, vy: (Math.random() - .5) * .15,
        s: 3 + Math.random() * 5, o: .03 + Math.random() * .06,
      });
    }

    function hex(cx: number, cy: number, r: number) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = Math.PI / 3 * i - Math.PI / 6;
        const m = i === 0 ? 'moveTo' : 'lineTo';
        ctx[m](cx + r * Math.cos(a), cy + r * Math.sin(a));
      }
      ctx.closePath();
    }

    function frame() {
      ctx.clearRect(0, 0, w, h);
      // Draw connections
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < 200) {
            ctx.strokeStyle = `rgba(0,219,188,${.03 * (1 - d/200)})`;
            ctx.lineWidth = .5;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      // Draw hexes
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;
        hex(p.x, p.y, p.s);
        ctx.strokeStyle = `rgba(0,219,188,${p.o})`;
        ctx.lineWidth = .8;
        ctx.stroke();
      }
      requestAnimationFrame(frame);
    }
    frame();
    return () => window.removeEventListener('resize', resize);
  });

  function pageLabel(path: string) {
    if (path === '/') return 'Overview';
    return path.slice(1).charAt(0).toUpperCase() + path.slice(2);
  }
</script>

<!-- Background canvas -->
<canvas bind:this={canvas} class="fixed inset-0 z-0 pointer-events-none"></canvas>

<!-- Radial glow in top-right -->
<div class="fixed top-0 right-0 w-[600px] h-[600px] z-0 pointer-events-none"
  style="background:radial-gradient(circle at 80% 20%, rgba(0,219,188,.04) 0%, transparent 60%)"></div>

<div class="relative z-10 flex h-screen">
  <!-- LEFT RAIL — narrow icon+text, not a fat sidebar -->
  <aside class="w-[200px] shrink-0 flex flex-col py-6 px-4">
    <!-- Logo -->
    <a href="https://eigentau.ai" class="flex items-center gap-2.5 px-3 mb-8 group">
      <svg viewBox="0 0 88 88" width="26" height="26" fill="none" class="shrink-0">
        <polygon points="32,28 40,24 48,28 48,36 40,40 32,36" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".08"/>
        <polygon points="48,28 56,24 64,28 64,36 56,40 48,36" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".08"/>
        <polygon points="24,40 32,36 40,40 40,48 32,52 24,48" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".12"/>
        <polygon points="40,40 48,36 56,40 56,48 48,52 40,48" stroke="#00DBBC" stroke-width="2.5" fill="#00DBBC" fill-opacity=".25"/>
        <polygon points="56,40 64,36 72,40 72,48 64,52 56,48" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".12"/>
        <polygon points="32,52 40,48 48,52 48,60 40,64 32,60" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".08"/>
        <polygon points="48,52 56,48 64,52 64,60 56,64 48,60" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".08"/>
        <circle cx="48" cy="44" r="3.5" fill="#00DBBC" opacity=".9"/>
      </svg>
      <span class="font-[var(--font-display)] text-[19px] italic text-text opacity-80 group-hover:opacity-100 transition-opacity">Eigentau</span>
    </a>

    <!-- Nav links -->
    <nav class="flex-1 space-y-0.5">
      {#each nav as item}
        {@const active = page.url.pathname === item.href}
        <a href={item.href}
          class="block px-4 py-2.5 rounded-xl text-[14px] transition-all duration-200 relative
            {active ? 'text-teal bg-teal-soft font-medium' : 'text-muted hover:text-body hover:bg-[rgba(255,255,255,.02)]'}"
        >
          {#if active}<div class="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-teal rounded-r-full"></div>{/if}
          {item.label}
        </a>
      {/each}
    </nav>

    <!-- Bottom -->
    <div class="px-3 pt-4 border-t border-border-lite">
      <div class="flex items-center gap-2 mb-1">
        <span class="w-[6px] h-[6px] rounded-full bg-teal" style="animation:glow-pulse 3s infinite"></span>
        <span class="text-[12px] text-body">Online</span>
      </div>
      <div class="font-[var(--font-data)] text-[11px] text-muted">129 subnets · $308 TAO</div>
    </div>
  </aside>

  <!-- MAIN -->
  <div class="flex-1 flex flex-col min-w-0">
    <!-- Top bar -->
    <header class="shrink-0 flex items-center justify-between h-14 px-8">
      <div class="font-[var(--font-data)] text-[12px] text-muted tracking-wide">
        {pageLabel(page.url.pathname)}
      </div>
      <div class="flex items-center gap-5">
        <a href="https://eigentau.ai" target="_blank" class="text-[12px] text-muted hover:text-body font-[var(--font-data)] transition-colors">eigentau.ai</a>
        <a href="https://x.com/eigentau" target="_blank" class="text-muted hover:text-teal transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <button class="bg-teal/90 hover:bg-teal text-void text-[12px] font-semibold whitespace-nowrap px-5 py-[7px] rounded-full transition-all hover:shadow-[0_0_30px_rgba(0,219,188,.25)]">
          Connect Wallet
        </button>
      </div>
    </header>

    <!-- Content -->
    <main class="flex-1 overflow-y-auto px-8 pb-12">
      <div class="max-w-[1200px]">
        {@render children()}
      </div>
    </main>
  </div>
</div>
