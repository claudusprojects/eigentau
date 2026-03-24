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

<div>
  <div class="flex items-end justify-between mb-14 anim">
    <div>
      <h1 class="font-[var(--font-display)] italic text-[56px] text-text leading-[1] tracking-[-0.04em] mb-4">Subnets</h1>
      <p class="text-[17px] text-sub">{subnets.length} active Bittensor subnets classified by cognitive faculty.</p>
    </div>
    <div class="flex items-center gap-3">
      <div class="relative">
        <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 text-ghost" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input type="text" placeholder="Search..." bind:value={search}
          class="bg-panel border border-line rounded-xl pl-10 pr-4 py-2.5 text-[14px] text-text placeholder:text-ghost focus:outline-none focus:border-teal/30 transition-colors w-48" />
      </div>
      <select bind:value={filterFaculty}
        class="bg-panel border border-line rounded-xl px-4 py-2.5 text-[14px] text-sub focus:outline-none focus:border-teal/30 cursor-pointer">
        <option value="all">All Faculties</option>
        {#each faculties as f}<option value={f}>{f}</option>{/each}
      </select>
    </div>
  </div>

  <div class="bg-panel border border-line rounded-2xl overflow-hidden anim d1">
    <table class="w-full">
      <thead>
        <tr class="border-b border-line bg-raised/50">
          <th class="text-left font-[var(--font-data)] text-[11px] font-normal text-ghost uppercase tracking-[.1em] px-6 py-3.5 w-[70px]">ID</th>
          <th class="text-left font-[var(--font-data)] text-[11px] font-normal text-ghost uppercase tracking-[.1em] px-4 py-3.5 w-[150px]">Name</th>
          <th class="text-left font-[var(--font-data)] text-[11px] font-normal text-ghost uppercase tracking-[.1em] px-4 py-3.5 w-[170px]">Faculty</th>
          <th class="text-left font-[var(--font-data)] text-[11px] font-normal text-ghost uppercase tracking-[.1em] px-4 py-3.5 w-[130px]">Secondary</th>
          <th class="text-left font-[var(--font-data)] text-[11px] font-normal text-ghost uppercase tracking-[.1em] px-4 py-3.5">Description</th>
        </tr>
      </thead>
      <tbody>
        {#each filtered as sn}
          {@const color = FACULTY_COLORS[sn.primary as Faculty]}
          <tr class="border-b border-line/40 hover:bg-raised/30 transition-colors">
            <td class="px-6 py-3.5 font-[var(--font-data)] text-[13px] text-faint">SN{sn.netuid}</td>
            <td class="px-4 py-3.5 text-[15px] text-text font-medium">{sn.name}</td>
            <td class="px-4 py-3.5">
              <span class="inline-flex items-center gap-2 font-[var(--font-data)] text-[11px] px-2.5 py-1 rounded-md" style="color:{color};background:{color}0A;border:1px solid {color}15">
                <span class="w-[5px] h-[5px] rounded-sm" style="background:{color}"></span>
                {sn.primary}
              </span>
            </td>
            <td class="px-4 py-3.5 font-[var(--font-data)] text-[13px] text-faint">{sn.secondary || '—'}</td>
            <td class="px-4 py-3.5 text-[14px] text-sub">{sn.desc}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    <div class="px-6 py-3.5 border-t border-line flex justify-between bg-raised/30">
      <span class="font-[var(--font-data)] text-[12px] text-faint">{filtered.length} of {subnets.length}</span>
      <span class="font-[var(--font-data)] text-[10px] text-ghost">SubnetRadar · TaoStats · SubnetAlpha</span>
    </div>
  </div>
</div>
