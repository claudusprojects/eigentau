<script lang="ts">
  import '../app.css';
  let { children } = $props();
  import { page } from '$app/state';

  const nav = [
    { href: '/', label: 'Overview', icon: 'grid' },
    { href: '/router', label: 'Router', icon: 'route' },
    { href: '/cognitive', label: 'Cognitive Map', icon: 'brain' },
    { href: '/learning', label: 'Learning', icon: 'chart' },
    { href: '/subnets', label: 'Subnets', icon: 'nodes' },
    { href: '/strategy', label: 'Strategy', icon: 'sliders' },
  ];
</script>

<div class="flex h-screen overflow-hidden bg-bg">
  <!-- Sidebar -->
  <aside class="w-[240px] shrink-0 flex flex-col bg-bg-alt border-r border-border relative">
    <!-- Decorative corner hex -->
    <div class="geo-dot" style="top:12px;right:12px;width:8px;height:8px;opacity:.12"></div>
    <div class="geo-dot" style="top:24px;right:24px;width:5px;height:5px"></div>

    <!-- Logo -->
    <a href="https://eigentau.ai" class="flex items-center gap-3 px-7 py-6 group">
      <svg viewBox="0 0 88 88" width="28" height="28" fill="none" class="shrink-0 transition-transform duration-300 group-hover:scale-110">
        <polygon points="32,28 40,24 48,28 48,36 40,40 32,36" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".1"/>
        <polygon points="48,28 56,24 64,28 64,36 56,40 48,36" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".1"/>
        <polygon points="24,40 32,36 40,40 40,48 32,52 24,48" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".15"/>
        <polygon points="40,40 48,36 56,40 56,48 48,52 40,48" stroke="#00DBBC" stroke-width="2.5" fill="#00DBBC" fill-opacity=".25"/>
        <polygon points="56,40 64,36 72,40 72,48 64,52 56,48" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".15"/>
        <polygon points="32,52 40,48 48,52 48,60 40,64 32,60" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".1"/>
        <polygon points="48,52 56,48 64,52 64,60 56,64 48,60" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".1"/>
        <circle cx="48" cy="44" r="4" fill="#00DBBC"/>
      </svg>
      <div>
        <div class="font-serif text-[22px] italic text-text leading-none group-hover:text-accent transition-colors">Eigentau</div>
        <div class="font-mono text-[10px] text-text-dim tracking-[.15em] mt-1">DASHBOARD</div>
      </div>
    </a>

    <!-- Divider with glow -->
    <div class="mx-5 h-px bg-gradient-to-r from-transparent via-border-strong to-transparent"></div>

    <!-- Nav -->
    <nav class="flex-1 py-5 px-4 space-y-1">
      {#each nav as item}
        {@const active = page.url.pathname === item.href}
        <a
          href={item.href}
          class="relative flex items-center gap-3.5 px-4 py-3 rounded-xl text-[15px] transition-all duration-200
            {active
              ? 'text-accent font-medium bg-accent-subtle'
              : 'text-text-dim hover:text-text-secondary hover:bg-bg-surface'}"
        >
          {#if active}
            <div class="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-accent"></div>
          {/if}
          <span class="w-5 h-5 flex items-center justify-center">
            {#if item.icon === 'grid'}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></svg>
            {:else if item.icon === 'route'}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="5" r="3"/><circle cx="19" cy="19" r="3"/><circle cx="5" cy="19" r="3"/><path d="M12 8v4l5 5M12 12l-5 5"/></svg>
            {:else if item.icon === 'brain'}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.3 6L14 22h-4l-1.7-7A7 7 0 0 1 12 2z"/><path d="M9 10h6M10 14h4"/></svg>
            {:else if item.icon === 'chart'}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            {:else if item.icon === 'nodes'}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="2"/><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><path d="M7 7l3 3M14 9l3-2M7 17l3-3M17 16l-3-2"/></svg>
            {:else if item.icon === 'sliders'}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><circle cx="4" cy="12" r="2" fill="currentColor"/><circle cx="12" cy="10" r="2" fill="currentColor"/><circle cx="20" cy="14" r="2" fill="currentColor"/></svg>
            {/if}
          </span>
          {item.label}
        </a>
      {/each}
    </nav>

    <!-- Footer -->
    <div class="px-6 py-5 border-t border-border">
      <div class="flex items-center gap-2.5 mb-3">
        <span class="w-2 h-2 rounded-full bg-accent" style="animation:dotPulse 2.5s infinite"></span>
        <span class="text-[13px] text-text-secondary">Bittensor Online</span>
      </div>
      <div class="flex items-center justify-between font-mono text-[12px] text-text-dim">
        <span>129 subnets</span>
        <span>$308 TAO</span>
      </div>
    </div>
  </aside>

  <!-- Main content -->
  <div class="flex-1 flex flex-col overflow-hidden">
    <!-- Top bar -->
    <header class="shrink-0 h-[60px] border-b border-border flex items-center justify-between px-10 bg-bg/70 backdrop-blur-md z-10">
      <div class="flex items-center gap-3">
        <span class="font-serif italic text-text-dim text-[15px]">Dashboard</span>
        <span class="text-border-strong">/</span>
        <span class="font-mono text-[13px] text-text-dim">
          {page.url.pathname === '/' ? 'Overview' : page.url.pathname.slice(1).charAt(0).toUpperCase() + page.url.pathname.slice(2)}
        </span>
      </div>
      <div class="flex items-center gap-5">
        <a href="https://eigentau.ai" target="_blank" class="text-[13px] text-text-dim hover:text-text-secondary transition-colors font-mono">eigentau.ai</a>
        <a href="https://x.com/eigentau" target="_blank" class="text-text-dim hover:text-accent transition-colors">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <button class="bg-accent hover:bg-[#00C5A8] text-[#040406] text-[13px] font-semibold whitespace-nowrap px-5 py-2 rounded-full cursor-pointer transition-all hover:shadow-[0_0_28px_rgba(0,219,188,.3)]">
          Connect Wallet
        </button>
      </div>
    </header>

    <!-- Scrollable content -->
    <main class="flex-1 overflow-y-auto">
      <div class="px-10 py-10 max-w-[1300px]">
        {@render children()}
      </div>
    </main>
  </div>
</div>
