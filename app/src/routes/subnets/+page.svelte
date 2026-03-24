<script lang="ts">
  import { subnets, FACULTY_COLORS, type Faculty } from '$lib/subnets';

  let search = $state('');
  let filter = $state('all');
  const faculties = [...new Set(subnets.map(s=>s.primary))].sort();

  const list = $derived(
    subnets
      .filter(s=>filter==='all'||s.primary===filter)
      .filter(s=>search===''||s.name.toLowerCase().includes(search.toLowerCase())||s.desc.toLowerCase().includes(search.toLowerCase())||`sn${s.netuid}`.includes(search.toLowerCase()))
  );
</script>

<div>
  <div class="mb-20 up">
    <p class="font-[var(--font-m)] text-[13px] text-teal uppercase tracking-[.2em] mb-4">Subnet Directory</p>
    <h1 class="font-[var(--font-d)] italic text-[64px] text-text leading-[.95] tracking-[-0.04em] mb-6">
      {subnets.length} subnets,<br>classified
    </h1>
    <p class="text-[18px] text-body max-w-xl leading-relaxed">Every active Bittensor subnet mapped to its cognitive faculty. Search, filter, explore.</p>
  </div>

  <!-- Search bar -->
  <div class="flex gap-4 mb-10 up up1">
    <div class="relative flex-1">
      <svg class="absolute left-5 top-1/2 -translate-y-1/2 text-dim" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input type="text" placeholder="Search subnets by name, description, or ID..." bind:value={search}
        class="w-full bg-card border border-line rounded-2xl pl-14 pr-6 py-4 text-[17px] text-text placeholder:text-faint focus:outline-none focus:border-teal/30 transition-colors" />
    </div>
    <select bind:value={filter}
      class="bg-card border border-line rounded-2xl px-6 py-4 text-[16px] text-body focus:outline-none focus:border-teal/30 cursor-pointer min-w-[200px]">
      <option value="all">All Faculties</option>
      {#each faculties as f}<option value={f}>{f}</option>{/each}
    </select>
  </div>

  <!-- Table -->
  <div class="bg-card border border-line rounded-2xl overflow-hidden up up2">
    <table class="w-full">
      <thead>
        <tr class="border-b border-line">
          <th class="text-left font-[var(--font-m)] text-[12px] font-normal text-dim uppercase tracking-[.1em] px-8 py-4 w-20">ID</th>
          <th class="text-left font-[var(--font-m)] text-[12px] font-normal text-dim uppercase tracking-[.1em] px-5 py-4 w-44">Name</th>
          <th class="text-left font-[var(--font-m)] text-[12px] font-normal text-dim uppercase tracking-[.1em] px-5 py-4 w-48">Faculty</th>
          <th class="text-left font-[var(--font-m)] text-[12px] font-normal text-dim uppercase tracking-[.1em] px-5 py-4">Description</th>
        </tr>
      </thead>
      <tbody>
        {#each list as sn}
          {@const c=FACULTY_COLORS[sn.primary as Faculty]}
          <tr class="border-b border-line/40 hover:bg-card-hover transition-colors">
            <td class="px-8 py-4 font-[var(--font-m)] text-[14px] text-dim">SN{sn.netuid}</td>
            <td class="px-5 py-4 text-[16px] text-text font-medium">{sn.name}</td>
            <td class="px-5 py-4">
              <span class="inline-flex items-center gap-2 font-[var(--font-m)] text-[12px] px-3 py-1.5 rounded-lg" style="color:{c};background:{c}0D;border:1px solid {c}20">
                <span class="w-2 h-2 rounded" style="background:{c}"></span>
                {sn.primary}
              </span>
            </td>
            <td class="px-5 py-4 text-[15px] text-body">{sn.desc}</td>
          </tr>
        {/each}
      </tbody>
    </table>
    <div class="px-8 py-4 border-t border-line flex justify-between items-center">
      <span class="font-[var(--font-m)] text-[13px] text-dim">{list.length} of {subnets.length} subnets</span>
      <span class="font-[var(--font-m)] text-[11px] text-faint">SubnetRadar · TaoStats · SubnetAlpha</span>
    </div>
  </div>
</div>
