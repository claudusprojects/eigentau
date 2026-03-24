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
  <!-- Sidebar -->
  <aside class="w-[220px] shrink-0 border-r border-border bg-bg-alt flex flex-col">
    <!-- Logo -->
    <a href="https://eigentau.ai" class="flex items-center gap-3 px-6 py-5 border-b border-border group">
      <svg viewBox="0 0 88 88" width="24" height="24" fill="none" class="shrink-0">
        <polygon points="32,28 40,24 48,28 48,36 40,40 32,36" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".1"/>
        <polygon points="48,28 56,24 64,28 64,36 56,40 48,36" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".1"/>
        <polygon points="24,40 32,36 40,40 40,48 32,52 24,48" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".15"/>
        <polygon points="40,40 48,36 56,40 56,48 48,52 40,48" stroke="#00DBBC" stroke-width="2.5" fill="#00DBBC" fill-opacity=".2"/>
        <polygon points="56,40 64,36 72,40 72,48 64,52 56,48" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".15"/>
        <polygon points="32,52 40,48 48,52 48,60 40,64 32,60" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".1"/>
        <polygon points="48,52 56,48 64,52 64,60 56,64 48,60" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".1"/>
        <circle cx="48" cy="44" r="4" fill="#00DBBC"/>
      </svg>
      <span class="font-serif text-xl italic text-text group-hover:text-accent transition-colors">Eigentau</span>
    </a>

    <!-- Nav -->
    <nav class="flex-1 py-4 px-3 space-y-1">
      {#each nav as item}
        {@const active = page.url.pathname === item.href}
        <a
          href={item.href}
          class="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all
            {active ? 'bg-accent/10 text-accent' : 'text-text-muted hover:text-text hover:bg-bg-card'}"
        >
          <span class="w-5 h-5 flex items-center justify-center opacity-80">
            {#if item.icon === 'grid'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>
            {:else if item.icon === 'route'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4"/></svg>
            {:else if item.icon === 'brain'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
            {:else if item.icon === 'chart'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            {:else if item.icon === 'nodes'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><line x1="9" y1="6" x2="15" y2="6"/><line x1="6" y1="9" x2="6" y2="15"/><line x1="18" y1="9" x2="18" y2="15"/></svg>
            {:else if item.icon === 'sliders'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/></svg>
            {/if}
          </span>
          {item.label}
        </a>
      {/each}
    </nav>

    <!-- Footer -->
    <div class="px-5 py-4 border-t border-border">
      <div class="flex items-center gap-2.5 text-xs text-text-muted">
        <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
        <span class="font-mono">Network Online</span>
      </div>
      <div class="text-xs text-text-muted mt-2 font-mono opacity-60">129 subnets · $308 TAO</div>
    </div>
  </aside>

  <!-- Main -->
  <main class="flex-1 overflow-y-auto">
    <!-- Top bar -->
    <header class="h-16 border-b border-border flex items-center justify-between px-8 bg-bg/80 backdrop-blur-sm sticky top-0 z-10">
      <div class="font-mono text-sm text-text-muted tracking-wide">Dashboard</div>
      <div class="flex items-center gap-5">
        <a href="https://eigentau.ai" target="_blank" class="text-sm text-text-muted hover:text-text transition-colors">eigentau.ai</a>
        <a href="https://x.com/eigentau" target="_blank" class="text-text-muted hover:text-accent transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <button class="bg-accent text-black text-sm font-semibold px-5 py-2 rounded-xl cursor-pointer hover:shadow-[0_0_20px_rgba(0,219,188,.25)] transition-all">
          Connect Wallet
        </button>
      </div>
    </header>

    <!-- Content -->
    <div class="p-8 max-w-[1400px]">
      {@render children()}
    </div>
  </main>
</div>
