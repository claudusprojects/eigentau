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

<div class="space-y-10">
  <div class="flex items-end justify-between">
    <div>
      <h1 class="section-heading text-4xl mb-3">Subnets</h1>
      <p class="text-text-secondary text-base">{subnets.length} Bittensor subnets classified by cognitive faculty.</p>
    </div>
    <div class="flex items-center gap-3">
      <input
        type="text"
        placeholder="Search..."
        bind:value={search}
        class="bg-bg-card border border-border rounded-xl px-4 py-2.5 text-sm text-text placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors w-52"
      />
      <select
        bind:value={filterFaculty}
        class="bg-bg-card border border-border rounded-xl px-4 py-2.5 text-sm text-text focus:outline-none focus:border-accent cursor-pointer"
      >
        <option value="all">All Faculties</option>
        {#each faculties as f}
          <option value={f}>{f}</option>
        {/each}
      </select>
    </div>
  </div>

  <div class="card overflow-hidden">
    <table class="w-full">
      <thead>
        <tr class="border-b border-border bg-bg-alt">
          <th class="text-left text-xs font-mono font-medium text-text-muted uppercase tracking-wider px-6 py-4 w-20">ID</th>
          <th class="text-left text-xs font-mono font-medium text-text-muted uppercase tracking-wider px-5 py-4 w-44">Name</th>
          <th class="text-left text-xs font-mono font-medium text-text-muted uppercase tracking-wider px-5 py-4 w-44">Faculty</th>
          <th class="text-left text-xs font-mono font-medium text-text-muted uppercase tracking-wider px-5 py-4 w-36">Secondary</th>
          <th class="text-left text-xs font-mono font-medium text-text-muted uppercase tracking-wider px-5 py-4">Description</th>
        </tr>
      </thead>
      <tbody>
        {#each filtered as sn}
          {@const color = FACULTY_COLORS[sn.primary as Faculty]}
          <tr class="border-b border-border/50 hover:bg-bg-card-hover transition-colors">
            <td class="px-6 py-3.5">
              <span class="font-mono text-sm text-text-muted">SN{sn.netuid}</span>
            </td>
            <td class="px-5 py-3.5">
              <span class="text-[15px] text-text font-medium">{sn.name}</span>
            </td>
            <td class="px-5 py-3.5">
              <span class="inline-flex items-center gap-2 text-sm font-mono px-3 py-1 rounded-lg" style="background: {color}15; color: {color}">
                <span class="w-2 h-2 rounded-full" style="background: {color}"></span>
                {sn.primary}
              </span>
            </td>
            <td class="px-5 py-3.5">
              {#if sn.secondary}
                {@const sc = FACULTY_COLORS[sn.secondary as Faculty]}
                <span class="text-sm font-mono text-text-muted">{sn.secondary}</span>
              {:else}
                <span class="text-sm text-text-muted opacity-30">—</span>
              {/if}
            </td>
            <td class="px-5 py-3.5">
              <span class="text-sm text-text-secondary">{sn.desc}</span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <div class="px-6 py-4 border-t border-border bg-bg-alt flex items-center justify-between">
      <span class="text-sm text-text-muted">{filtered.length} of {subnets.length} subnets</span>
      <span class="text-xs font-mono text-text-muted">Data: SubnetRadar, TaoStats, SubnetAlpha</span>
    </div>
  </div>
</div>
