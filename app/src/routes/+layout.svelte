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

<!-- Simple scrolling page — no h-screen, no overflow-hidden -->
<div class="min-h-screen">
  <!-- Nav bar -->
  <nav class="sticky top-0 z-50 bg-bg/90 backdrop-blur-xl border-b border-line">
    <div class="flex items-center justify-between h-[64px] px-8 lg:px-16">
      <!-- Left: logo + tabs -->
      <div class="flex items-center gap-8">
        <a href="https://eigentau.ai" class="flex items-center gap-3 group shrink-0">
          <svg viewBox="0 0 88 88" width="28" height="28" fill="none">
            <polygon points="32,28 40,24 48,28 48,36 40,40 32,36" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".08"/>
            <polygon points="48,28 56,24 64,28 64,36 56,40 48,36" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".08"/>
            <polygon points="24,40 32,36 40,40 40,48 32,52 24,48" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".12"/>
            <polygon points="40,40 48,36 56,40 56,48 48,52 40,48" stroke="#00DBBC" stroke-width="2.5" fill="#00DBBC" fill-opacity=".25"/>
            <polygon points="56,40 64,36 72,40 72,48 64,52 56,48" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".12"/>
            <polygon points="32,52 40,48 48,52 48,60 40,64 32,60" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".08"/>
            <polygon points="48,52 56,48 64,52 64,60 56,64 48,60" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".08"/>
            <circle cx="48" cy="44" r="3.5" fill="#00DBBC"/>
          </svg>
          <span class="font-[var(--font-d)] text-[22px] italic text-text group-hover:text-teal transition-colors">Eigentau</span>
        </a>

        <div class="flex items-center gap-1">
          {#each tabs as t}
            {@const on = page.url.pathname === t.href}
            <a href={t.href}
              class="px-4 py-2 rounded-lg text-[15px] transition-colors
                {on ? 'text-text bg-card font-medium' : 'text-sec hover:text-p'}">
              {t.label}
            </a>
          {/each}
        </div>
      </div>

      <!-- Right -->
      <div class="flex items-center gap-6 shrink-0">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-teal animate-pulse"></span>
          <span class="font-[var(--font-m)] text-[12px] text-sec">Online</span>
        </div>
        <a href="https://x.com/eigentau" target="_blank" class="text-sec hover:text-teal transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <button class="bg-teal hover:bg-[#00c9ab] text-bg text-[14px] font-semibold whitespace-nowrap px-6 py-2.5 rounded-full transition-all hover:shadow-[0_0_30px_rgba(0,219,188,.2)]">
          Connect Wallet
        </button>
      </div>
    </div>
  </nav>

  <!-- Page content — full width with generous padding -->
  <div class="px-8 lg:px-16 py-16">
    {@render children()}
  </div>
</div>
