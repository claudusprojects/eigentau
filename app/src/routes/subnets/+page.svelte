<script lang="ts">
  import { subnets, FACULTY_COLORS, type Faculty } from '$lib/subnets';

  let search = $state('');
  let filterFaculty = $state('all');
  const faculties = [...new Set(subnets.map(s => s.primary))].sort();

  const filtered = $derived(
    subnets
      .filter(s => filterFaculty === 'all' || s.primary === filterFaculty)
      .filter(s => search === '' ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.desc.toLowerCase().includes(search.toLowerCase()) ||
        `sn${s.netuid}`.includes(search.toLowerCase()))
  );
</script>

<div class="pt-6">
  <div class="flex items-end justify-between mb-16 rise">
    <div>
      <h1 class="font-[var(--font-display)] italic text-[clamp(48px,5vw,72px)] text-text leading-[.95] tracking-[-0.04em] mb-5">Subnets</h1>
      <p class="text-[18px] text-body">{subnets.length} active Bittensor subnets classified by cognitive faculty.</p>
    </div>
    <div class="flex items-center gap-3 shrink-0">
      <div class="relative">
        <svg class="absolute left-4 top-1/2 -translate-y-1/2 text-dim" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" placeholder="Search..." bind:value={search}
          class="bg-[rgba(255,255,255,.03)] border border-border-lite rounded-xl pl-10 pr-4 py-2.5 text-[14px] text-text placeholder:text-dim focus:outline-none focus:border-teal/30 transition-colors w-52" />
      </div>
      <select bind:value={filterFaculty}
        class="bg-[rgba(255,255,255,.03)] border border-border-lite rounded-xl px-4 py-2.5 text-[14px] text-body focus:outline-none focus:border-teal/30 cursor-pointer appearance-none pr-9"
        style="background-image:url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2350505E%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>');background-repeat:no-repeat;background-position:right 12px center;">
        <option value="all">All Faculties</option>
        {#each faculties as f}<option value={f}>{f}</option>{/each}
      </select>
    </div>
  </div>

  <div class="glow-line mb-8 rise rise-d1"></div>

  <div class="glass overflow-hidden rise rise-d2">
    <table class="w-full">
      <thead>
        <tr class="border-b border-border-lite">
          <th class="text-left font-[var(--font-data)] text-[11px] font-normal text-dim uppercase tracking-[.1em] px-7 py-4 w-[72px]">ID</th>
          <th class="text-left font-[var(--font-data)] text-[11px] font-normal text-dim uppercase tracking-[.1em] px-4 py-4 w-[160px]">Name</th>
          <th class="text-left font-[var(--font-data)] text-[11px] font-normal text-dim uppercase tracking-[.1em] px-4 py-4 w-[180px]">Faculty</th>
          <th class="text-left font-[var(--font-data)] text-[11px] font-normal text-dim uppercase tracking-[.1em] px-4 py-4 w-[140px]">Secondary</th>
          <th class="text-left font-[var(--font-data)] text-[11px] font-normal text-dim uppercase tracking-[.1em] px-4 py-4">Description</th>
        </tr>
      </thead>
      <tbody>
        {#each filtered as sn}
          {@const color = FACULTY_COLORS[sn.primary as Faculty]}
          <tr class="border-b border-[rgba(255,255,255,.025)] hover:bg-glass-hover transition-colors">
            <td class="px-7 py-4 font-[var(--font-data)] text-[13px] text-muted">SN{sn.netuid}</td>
            <td class="px-4 py-4 text-[15px] text-text font-medium">{sn.name}</td>
            <td class="px-4 py-4">
              <span class="inline-flex items-center gap-2 font-[var(--font-data)] text-[11px] px-3 py-1.5 rounded-lg" style="color:{color};background:{color}0D;border:1px solid {color}1A">
                <span class="w-[6px] h-[6px] rounded-[2px]" style="background:{color}"></span>
                {sn.primary}
              </span>
            </td>
            <td class="px-4 py-4 font-[var(--font-data)] text-[13px] text-muted">{sn.secondary || '—'}</td>
            <td class="px-4 py-4 text-[14px] text-body">{sn.desc}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    <div class="px-7 py-4 border-t border-border-lite flex justify-between">
      <span class="font-[var(--font-data)] text-[12px] text-muted">{filtered.length} of {subnets.length}</span>
      <span class="font-[var(--font-data)] text-[11px] text-dim">SubnetRadar · TaoStats · SubnetAlpha</span>
    </div>
  </div>
</div>
