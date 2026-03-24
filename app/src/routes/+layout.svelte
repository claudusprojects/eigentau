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
  <aside class="w-60 shrink-0 border-r border-border bg-bg-alt flex flex-col">
    <a href="https://eigentau.ai" class="flex items-center gap-2.5 px-5 h-16 border-b border-border no-underline">
      <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
        <path d="M14 2L14 26" stroke="#00DBBC" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M6 8L14 2L22 8" stroke="#00DBBC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="14" cy="14" r="4" stroke="#fff" stroke-width="1.5"/>
        <circle cx="14" cy="2" r="2" fill="#00DBBC"/>
      </svg>
      <span class="text-lg font-bold text-text tracking-tight">Eigentau</span>
    </a>

    <nav class="flex-1 py-4 px-3 space-y-1">
      {#each nav as item}
        <a
          href={item.href}
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors no-underline
            {page.url.pathname === item.href ? 'bg-accent-dim text-accent' : 'text-text-secondary hover:text-text hover:bg-bg-card'}"
        >
          <span class="w-5 h-5 flex items-center justify-center opacity-70">
            {#if item.icon === 'grid'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
            {:else if item.icon === 'route'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4"/></svg>
            {:else if item.icon === 'brain'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/></svg>
            {:else if item.icon === 'chart'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            {:else if item.icon === 'nodes'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="18" r="3"/><line x1="9" y1="6" x2="15" y2="6"/><line x1="6" y1="9" x2="6" y2="15"/><line x1="18" y1="9" x2="18" y2="15"/></svg>
            {:else if item.icon === 'sliders'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>
            {/if}
          </span>
          {item.label}
        </a>
      {/each}
    </nav>

    <div class="px-4 py-4 border-t border-border">
      <div class="flex items-center gap-2 text-xs text-text-muted font-mono">
        <span class="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
        Network Online
      </div>
    </div>
  </aside>

  <!-- Main -->
  <main class="flex-1 overflow-y-auto">
    <header class="h-16 border-b border-border flex items-center justify-between px-8 bg-bg sticky top-0 z-10">
      <div></div>
      <div class="flex items-center gap-4">
        <a href="https://eigentau.ai" target="_blank" class="text-xs text-text-muted font-mono hover:text-text-secondary transition-colors no-underline">eigentau.ai</a>
        <a href="https://x.com/eigentau" target="_blank" class="text-text-muted hover:text-text-secondary transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <button class="bg-accent text-black text-xs font-semibold px-4 py-2 rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
          Connect Wallet
        </button>
      </div>
    </header>
    <div class="p-8">
      {@render children()}
    </div>
  </main>
</div>
