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

<!-- Matches website nav exactly: fixed, backdrop-blur, border-bottom, max-width 1300px -->
<nav style="position:sticky;top:0;z-index:100;background:rgba(4,4,6,.85);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-bottom:1px solid rgba(24,24,34,.5)">
  <div style="max-width:1300px;margin:0 auto;padding:14px 40px;display:flex;align-items:center;justify-content:space-between">
    <!-- Logo — same as website -->
    <a href="https://eigentau.ai" style="font-family:var(--serif);font-size:20px;color:var(--t1);font-style:italic;display:flex;align-items:center;gap:8px">
      <svg viewBox="0 0 88 88" width="24" height="24" fill="none"><polygon points="32,28 40,24 48,28 48,36 40,40 32,36" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".1"/><polygon points="48,28 56,24 64,28 64,36 56,40 48,36" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".1"/><polygon points="24,40 32,36 40,40 40,48 32,52 24,48" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".15"/><polygon points="40,40 48,36 56,40 56,48 48,52 40,48" stroke="#00DBBC" stroke-width="2.5" fill="#00DBBC" fill-opacity=".2"/><polygon points="56,40 64,36 72,40 72,48 64,52 56,48" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".15"/><polygon points="32,52 40,48 48,52 48,60 40,64 32,60" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".1"/><polygon points="48,52 56,48 64,52 64,60 56,64 48,60" stroke="#00DBBC" stroke-width="2" fill="#00DBBC" fill-opacity=".1"/><circle cx="48" cy="44" r="4" fill="#00DBBC"/></svg>
      Eigentau
    </a>

    <!-- Tabs + right actions -->
    <div style="display:flex;align-items:center;gap:28px">
      {#each tabs as t}
        {@const on = page.url.pathname === t.href}
        <a href={t.href} style="font-size:13px;color:{on ? 'var(--t1)' : 'var(--t3)'};transition:color .2s;font-weight:{on ? '500' : '400'}"
          onmouseenter={(e) => { if (!on) e.currentTarget.style.color = 'var(--t1)' }}
          onmouseleave={(e) => { if (!on) e.currentTarget.style.color = 'var(--t3)' }}>
          {t.label}
        </a>
      {/each}

      <a href="https://x.com/eigentau" target="_blank" style="color:var(--t3);transition:color .2s"
        onmouseenter={(e) => e.currentTarget.style.color = 'var(--t1)'}
        onmouseleave={(e) => e.currentTarget.style.color = 'var(--t3)'}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>

      <!-- CTA — same style as website .n-cta -->
      <a href="#" style="background:var(--ac);color:#000;padding:8px 22px;border-radius:99px;font-size:12px;font-weight:600;letter-spacing:.02em;transition:box-shadow .2s;white-space:nowrap"
        onmouseenter={(e) => e.currentTarget.style.boxShadow = '0 0 24px var(--acg)'}
        onmouseleave={(e) => e.currentTarget.style.boxShadow = 'none'}>
        Connect Wallet
      </a>
    </div>
  </div>
</nav>

<!-- Content — same max-width and padding as website panels -->
<main style="max-width:1300px;margin:0 auto;padding:80px 40px 120px">
  {@render children()}
</main>
