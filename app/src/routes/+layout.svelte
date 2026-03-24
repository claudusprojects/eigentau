<script lang="ts">
  import '../app.css';
  let { children } = $props();

  const nav = [
    { href: '/', label: 'Overview', icon: 'grid' },
    { href: '/router', label: 'Router', icon: 'route' },
    { href: '/cognitive', label: 'Cognitive Map', icon: 'brain' },
    { href: '/learning', label: 'Learning', icon: 'chart' },
    { href: '/subnets', label: 'Subnets', icon: 'nodes' },
    { href: '/strategy', label: 'Strategy', icon: 'sliders' },
  ];

  import { page } from '$app/state';
</script>

<div class="flex h-screen overflow-hidden">
  <aside class="w-56 shrink-0 border-r border-border bg-bg-alt flex flex-col">
    <a href="https://eigentau.ai" class="flex items-center gap-2.5 px-5 h-14 border-b border-border no-underline">
      <svg viewBox="0 0 120 140" width="20" height="23" fill="none">
        <path d="M 8 8 C 8 8,20 2,60 2 C 100 2,112 8,112 8 L 114 14 C 114 20,108 28,98 32 L 76 38 L 76 110 C 76 122,68 132,60 136 C 52 132,44 122,44 110 L 44 38 L 22 32 C 12 28,6 20,6 14 Z" fill="#00DBBC"/>
      </svg>
      <span class="font-serif text-lg italic text-text">Eigentau</span>
    </a>

    <nav class="flex-1 py-3 px-2.5 space-y-0.5">
      {#each nav as item}
        <a
          href={item.href}
          class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all no-underline
            {page.url.pathname === item.href ? 'bg-accent-dim text-accent' : 'text-text-muted hover:text-text-secondary hover:bg-bg-card'}"
        >
          <span class="w-4 h-4 flex items-center justify-center">
            {#if item.icon === 'grid'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            {:else if item.icon === 'route'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4"/></svg>
            {:else if item.icon === 'brain'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
            {:else if item.icon === 'chart'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            {:else if item.icon === 'nodes'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><line x1="9" y1="6" x2="15" y2="6"/><line x1="6" y1="9" x2="6" y2="15"/><line x1="18" y1="9" x2="18" y2="15"/></svg>
            {:else if item.icon === 'sliders'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/></svg>
            {/if}
          </span>
          {item.label}
        </a>
      {/each}
    </nav>

    <div class="px-4 py-3 border-t border-border">
      <div class="flex items-center gap-2 text-[11px] text-text-muted font-mono">
        <span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
        Network Online
      </div>
    </div>
  </aside>

  <main class="flex-1 overflow-y-auto">
    <header class="h-14 border-b border-border flex items-center justify-between px-6 bg-bg sticky top-0 z-10">
      <div class="text-[11px] font-mono text-text-muted tracking-wide uppercase">Dashboard</div>
      <div class="flex items-center gap-4">
        <a href="https://eigentau.ai" target="_blank" class="text-[11px] text-text-muted font-mono hover:text-text-secondary transition-colors no-underline">eigentau.ai</a>
        <a href="https://x.com/eigentau" target="_blank" class="text-text-muted hover:text-text-secondary transition-colors">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <button class="bg-accent text-black text-[11px] font-semibold px-3.5 py-1.5 rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
          Connect Wallet
        </button>
      </div>
    </header>
    <div class="p-6">
      {@render children()}
    </div>
  </main>
</div>
