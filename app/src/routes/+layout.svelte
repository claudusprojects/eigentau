<script lang="ts">
  import '../app.css';
  import { page } from '$app/state';
  let { children } = $props();

  const tabs = [
    { href: '/', label: 'Overview' },
    { href: '/cognitive', label: 'Cognitive Map' },
    { href: '/router', label: 'Router' },
    { href: '/subnets', label: 'Subnets' },
    { href: '/learning', label: 'Learning' },
    { href: '/strategy', label: 'Strategy' },
  ];
</script>

<div class="h-screen flex flex-col overflow-hidden">
  <!-- TOP NAV — full width, no sidebar -->
  <header class="shrink-0 border-b border-line px-8 bg-bg/80 backdrop-blur-xl z-20">
    <div class="flex items-center justify-between h-[56px] max-w-[1440px] mx-auto">
      <!-- Logo -->
      <a href="https://eigentau.ai" class="flex items-center gap-2.5 group mr-10">
        <svg viewBox="0 0 88 88" width="24" height="24" fill="none">
          <polygon points="32,28 40,24 48,28 48,36 40,40 32,36" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".08"/>
          <polygon points="48,28 56,24 64,28 64,36 56,40 48,36" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".08"/>
          <polygon points="24,40 32,36 40,40 40,48 32,52 24,48" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".12"/>
          <polygon points="40,40 48,36 56,40 56,48 48,52 40,48" stroke="#00DBBC" stroke-width="2.5" fill="#00DBBC" fill-opacity=".25"/>
          <polygon points="56,40 64,36 72,40 72,48 64,52 56,48" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".12"/>
          <polygon points="32,52 40,48 48,52 48,60 40,64 32,60" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".08"/>
          <polygon points="48,52 56,48 64,52 64,60 56,64 48,60" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".08"/>
          <circle cx="48" cy="44" r="3.5" fill="#00DBBC" opacity=".9"/>
        </svg>
        <span class="font-[var(--font-display)] text-[18px] italic text-text group-hover:text-teal transition-colors">Eigentau</span>
      </a>

      <!-- Tabs -->
      <nav class="flex items-center gap-1 flex-1">
        {#each tabs as tab}
          {@const active = page.url.pathname === tab.href}
          <a href={tab.href}
            class="relative px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all
              {active ? 'text-teal' : 'text-faint hover:text-sub'}">
            {tab.label}
            {#if active}
              <div class="absolute bottom-[-13px] left-1/2 -translate-x-1/2 w-5 h-[2px] bg-teal rounded-full"></div>
            {/if}
          </a>
        {/each}
      </nav>

      <!-- Right -->
      <div class="flex items-center gap-5">
        <div class="flex items-center gap-2">
          <span class="w-[5px] h-[5px] rounded-full bg-teal" style="animation:pulse-dot 3s infinite"></span>
          <span class="font-[var(--font-data)] text-[11px] text-faint">129 subnets · $308</span>
        </div>
        <a href="https://x.com/eigentau" target="_blank" class="text-faint hover:text-teal transition-colors">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <button class="bg-teal hover:bg-[#00c9ab] text-void text-[12px] font-semibold whitespace-nowrap px-4 py-[6px] rounded-full transition-all hover:shadow-[0_0_24px_rgba(0,219,188,.2)]">
          Connect Wallet
        </button>
      </div>
    </div>
  </header>

  <!-- CONTENT — full width, no sidebar stealing space -->
  <main class="flex-1 overflow-y-auto">
    <div class="max-w-[1440px] mx-auto px-8 py-10">
      {@render children()}
    </div>
  </main>
</div>
