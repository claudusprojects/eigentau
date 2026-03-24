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

<div class="h-screen flex flex-col">
  <!-- NAV -->
  <header class="shrink-0 border-b border-line">
    <div class="max-w-[1100px] mx-auto px-10 flex items-center justify-between h-16">
      <div class="flex items-center gap-10">
        <a href="https://eigentau.ai" class="flex items-center gap-3 group">
          <svg viewBox="0 0 88 88" width="26" height="26" fill="none">
            <polygon points="32,28 40,24 48,28 48,36 40,40 32,36" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".08"/>
            <polygon points="48,28 56,24 64,28 64,36 56,40 48,36" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".08"/>
            <polygon points="24,40 32,36 40,40 40,48 32,52 24,48" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".12"/>
            <polygon points="40,40 48,36 56,40 56,48 48,52 40,48" stroke="#00DBBC" stroke-width="2.5" fill="#00DBBC" fill-opacity=".25"/>
            <polygon points="56,40 64,36 72,40 72,48 64,52 56,48" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".12"/>
            <polygon points="32,52 40,48 48,52 48,60 40,64 32,60" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".08"/>
            <polygon points="48,52 56,48 64,52 64,60 56,64 48,60" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".08"/>
            <circle cx="48" cy="44" r="3.5" fill="#00DBBC"/>
          </svg>
          <span class="font-[var(--font-d)] text-[20px] italic text-text group-hover:text-teal transition-colors">Eigentau</span>
        </a>
        <nav class="flex items-center gap-1">
          {#each tabs as t}
            {@const on = page.url.pathname === t.href}
            <a href={t.href} class="px-4 py-2 rounded-lg text-[15px] transition-colors
              {on ? 'text-text bg-card font-medium' : 'text-dim hover:text-body'}">
              {t.label}
            </a>
          {/each}
        </nav>
      </div>
      <div class="flex items-center gap-6">
        <div class="flex items-center gap-2">
          <span class="w-[6px] h-[6px] rounded-full bg-teal" style="animation:dot 3s infinite"></span>
          <span class="font-[var(--font-m)] text-[12px] text-dim">Online</span>
        </div>
        <button class="bg-teal hover:bg-[#00c9ab] text-bg text-[13px] font-semibold whitespace-nowrap px-5 py-2 rounded-full transition-all hover:shadow-[0_0_30px_rgba(0,219,188,.2)]">
          Connect Wallet
        </button>
      </div>
    </div>
  </header>

  <main class="flex-1 overflow-y-auto">
    <div class="max-w-[1100px] mx-auto px-10 py-14">
      {@render children()}
    </div>
  </main>
</div>
