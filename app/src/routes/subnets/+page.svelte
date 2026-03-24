<script lang="ts">
  import { subnets, FACULTY_COLORS, type Faculty } from '$lib/subnets';
  let search = $state('');
  let filter = $state('all');
  const faculties = [...new Set(subnets.map(s => s.primary))].sort();
  const list = $derived(
    subnets
      .filter(s => filter === 'all' || s.primary === filter)
      .filter(s => search === '' || s.name.toLowerCase().includes(search.toLowerCase()) || s.desc.toLowerCase().includes(search.toLowerCase()) || `sn${s.netuid}`.includes(search.toLowerCase()))
  );
</script>

<div class="mb-20">
  <p class="font-[var(--font-m)] text-[13px] text-teal uppercase tracking-[.2em] mb-5">Subnet Directory</p>
  <h1 class="font-[var(--font-d)] italic text-[clamp(40px,5vw,68px)] text-text leading-[.95] tracking-[-0.03em] mb-6">{subnets.length} subnets, classified</h1>
  <p class="text-[18px] text-p max-w-2xl leading-relaxed">Every active Bittensor subnet mapped to its cognitive faculty.</p>
</div>

<div class="flex gap-4 mb-10">
  <div class="relative flex-1">
    <svg class="absolute left-5 top-1/2 -translate-y-1/2 text-sec" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    <input type="text" placeholder="Search subnets by name, description, or ID..." bind:value={search}
      class="w-full bg-card border border-line rounded-xl pl-14 pr-6 py-4 text-[17px] text-text placeholder:text-mut focus:outline-none focus:border-teal/30 transition-colors" />
  </div>
  <select bind:value={filter}
    class="bg-card border border-line rounded-xl px-6 py-4 text-[16px] text-p focus:outline-none cursor-pointer min-w-[220px]">
    <option value="all">All Faculties</option>
    {#each faculties as f}<option value={f}>{f}</option>{/each}
  </select>
</div>

<div class="bg-card border border-line rounded-2xl overflow-hidden">
  <table class="w-full">
    <thead>
      <tr class="border-b border-line">
        <th class="text-left font-[var(--font-m)] text-[12px] font-normal text-sec uppercase tracking-[.1em] px-8 py-4 w-20">ID</th>
        <th class="text-left font-[var(--font-m)] text-[12px] font-normal text-sec uppercase tracking-[.1em] px-5 py-4 w-44">Name</th>
        <th class="text-left font-[var(--font-m)] text-[12px] font-normal text-sec uppercase tracking-[.1em] px-5 py-4 w-48">Faculty</th>
        <th class="text-left font-[var(--font-m)] text-[12px] font-normal text-sec uppercase tracking-[.1em] px-5 py-4">Description</th>
      </tr>
    </thead>
    <tbody>
      {#each list as sn}
        {@const c = FACULTY_COLORS[sn.primary as Faculty]}
        <tr class="border-b border-line/40 hover:bg-card-h transition-colors">
          <td class="px-8 py-4 font-[var(--font-m)] text-[14px] text-sec">SN{sn.netuid}</td>
          <td class="px-5 py-4 text-[16px] text-text font-medium">{sn.name}</td>
          <td class="px-5 py-4">
            <span class="inline-flex items-center gap-2 font-[var(--font-m)] text-[12px] px-3 py-1.5 rounded-lg" style="color:{c};background:{c}0D;border:1px solid {c}20">
              <span class="w-2 h-2 rounded" style="background:{c}"></span>
              {sn.primary}
            </span>
          </td>
          <td class="px-5 py-4 text-[15px] text-p">{sn.desc}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <div class="px-8 py-4 border-t border-line flex justify-between">
    <span class="font-[var(--font-m)] text-[13px] text-sec">{list.length} of {subnets.length}</span>
    <span class="font-[var(--font-m)] text-[11px] text-mut">SubnetRadar · TaoStats · SubnetAlpha</span>
  </div>
</div>
