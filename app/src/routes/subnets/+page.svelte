<script lang="ts">
  import { subnets, FACULTY_COLORS, type Faculty } from '$lib/subnets';

  let search = $state('');
  let filterFaculty = $state('all');

  const faculties = [...new Set(subnets.map(s => s.primary))].sort();

  const filtered = $derived(
    subnets
      .filter(s => filterFaculty === 'all' || s.primary === filterFaculty)
      .filter(s =>
        search === '' ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.desc.toLowerCase().includes(search.toLowerCase()) ||
        `sn${s.netuid}`.includes(search.toLowerCase())
      )
  );
</script>

<div class="space-y-10 page-enter">
  <div class="relative flex items-end justify-between">
    <div>
      <h1 class="font-serif italic text-[42px] text-text leading-none tracking-[-0.03em] mb-4">Subnets</h1>
      <p class="text-[17px] text-text-secondary">{subnets.length} active Bittensor subnets classified by cognitive faculty.</p>
    </div>
    <div class="flex items-center gap-3 shrink-0">
      <div class="relative">
        <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-dim" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          type="text"
          placeholder="Search subnets..."
          bind:value={search}
          class="bg-bg-surface border border-border rounded-xl pl-10 pr-4 py-2.5 text-[14px] text-text placeholder:text-text-dim focus:outline-none focus:border-accent/50 transition-colors w-56"
        />
      </div>
      <select
        bind:value={filterFaculty}
        class="bg-bg-surface border border-border rounded-xl px-4 py-2.5 text-[14px] text-text-secondary focus:outline-none focus:border-accent/50 cursor-pointer appearance-none pr-8"
        style="background-image:url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%235C5C74%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>');background-repeat:no-repeat;background-position:right 12px center;"
      >
        <option value="all">All Faculties</option>
        {#each faculties as f}
          <option value={f}>{f}</option>
        {/each}
      </select>
    </div>
    <div class="absolute -left-10 top-0 w-[3px] h-full bg-gradient-to-b from-accent/40 via-accent/10 to-transparent rounded-full"></div>
  </div>

  <div class="bg-bg-surface border border-border rounded-2xl overflow-hidden page-enter page-enter-d1">
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-border">
            <th class="text-left text-[11px] font-mono font-medium text-text-dim uppercase tracking-[.1em] px-7 py-4 w-20">ID</th>
            <th class="text-left text-[11px] font-mono font-medium text-text-dim uppercase tracking-[.1em] px-5 py-4 w-40">Name</th>
            <th class="text-left text-[11px] font-mono font-medium text-text-dim uppercase tracking-[.1em] px-5 py-4 w-48">Faculty</th>
            <th class="text-left text-[11px] font-mono font-medium text-text-dim uppercase tracking-[.1em] px-5 py-4 w-40">Secondary</th>
            <th class="text-left text-[11px] font-mono font-medium text-text-dim uppercase tracking-[.1em] px-5 py-4">Description</th>
          </tr>
        </thead>
        <tbody>
          {#each filtered as sn, i}
            {@const color = FACULTY_COLORS[sn.primary as Faculty]}
            <tr class="border-b border-border/40 hover:bg-bg-surface-hover transition-colors">
              <td class="px-7 py-4">
                <span class="font-mono text-[14px] text-text-dim">SN{sn.netuid}</span>
              </td>
              <td class="px-5 py-4">
                <span class="text-[15px] text-text font-medium">{sn.name}</span>
              </td>
              <td class="px-5 py-4">
                <span class="inline-flex items-center gap-2 font-mono text-[12px] px-3 py-1.5 rounded-lg" style="background:{color}10;color:{color};border:1px solid {color}20">
                  <span class="w-[6px] h-[6px] rounded-sm" style="background:{color}"></span>
                  {sn.primary}
                </span>
              </td>
              <td class="px-5 py-4">
                {#if sn.secondary}
                  {@const sc = FACULTY_COLORS[sn.secondary as Faculty]}
                  <span class="font-mono text-[13px] text-text-dim">{sn.secondary}</span>
                {:else}
                  <span class="text-text-dim opacity-25">—</span>
                {/if}
              </td>
              <td class="px-5 py-4">
                <span class="text-[14px] text-text-secondary">{sn.desc}</span>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
    <div class="px-7 py-4 border-t border-border flex items-center justify-between bg-bg-alt">
      <span class="font-mono text-[13px] text-text-dim">{filtered.length} of {subnets.length} subnets</span>
      <span class="font-mono text-[11px] text-text-dim">Sources: SubnetRadar · TaoStats · SubnetAlpha</span>
    </div>
  </div>
</div>
