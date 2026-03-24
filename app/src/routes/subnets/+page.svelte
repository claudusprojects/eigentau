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

<div class="space-y-6">
  <div class="flex items-end justify-between">
    <div>
      <h1 class="font-serif text-2xl italic text-text mb-2">Subnets</h1>
      <p class="text-sm text-text-muted">{subnets.length} Bittensor subnets classified by cognitive faculty.</p>
    </div>
    <div class="flex items-center gap-3">
      <input
        type="text"
        placeholder="Search subnets..."
        bind:value={search}
        class="bg-bg-card border border-border rounded-lg px-3 py-1.5 text-xs text-text font-mono placeholder:text-text-muted focus:outline-none focus:border-accent w-48"
      />
      <select
        bind:value={filterFaculty}
        class="bg-bg-card border border-border rounded-lg px-3 py-1.5 text-xs text-text font-mono focus:outline-none focus:border-accent"
      >
        <option value="all">All Faculties</option>
        {#each faculties as f}
          <option value={f}>{f}</option>
        {/each}
      </select>
    </div>
  </div>

  <div class="bg-bg-card border border-border rounded-xl overflow-hidden">
    <table class="w-full">
      <thead>
        <tr class="border-b border-border">
          <th class="text-left text-[10px] font-mono font-medium text-text-muted uppercase tracking-wider px-6 py-3 w-16">ID</th>
          <th class="text-left text-[10px] font-mono font-medium text-text-muted uppercase tracking-wider px-4 py-3">Name</th>
          <th class="text-left text-[10px] font-mono font-medium text-text-muted uppercase tracking-wider px-4 py-3">Faculty</th>
          <th class="text-left text-[10px] font-mono font-medium text-text-muted uppercase tracking-wider px-4 py-3">Secondary</th>
          <th class="text-left text-[10px] font-mono font-medium text-text-muted uppercase tracking-wider px-4 py-3">Description</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-border">
        {#each filtered as sn}
          {@const color = FACULTY_COLORS[sn.primary as Faculty]}
          <tr class="hover:bg-bg-card-hover transition-colors">
            <td class="px-6 py-3">
              <span class="text-xs font-mono text-text-muted">SN{sn.netuid}</span>
            </td>
            <td class="px-4 py-3">
              <span class="text-sm text-text font-medium">{sn.name}</span>
            </td>
            <td class="px-4 py-3">
              <span class="text-[11px] font-mono px-2 py-0.5 rounded" style="background: {color}22; color: {color}">{sn.primary}</span>
            </td>
            <td class="px-4 py-3">
              {#if sn.secondary}
                {@const sc = FACULTY_COLORS[sn.secondary as Faculty]}
                <span class="text-[11px] font-mono px-2 py-0.5 rounded" style="background: {sc}15; color: {sc}">{sn.secondary}</span>
              {:else}
                <span class="text-[11px] text-text-muted">—</span>
              {/if}
            </td>
            <td class="px-4 py-3">
              <span class="text-xs text-text-muted">{sn.desc}</span>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
    <div class="px-6 py-3 border-t border-border flex items-center justify-between">
      <span class="text-[11px] font-mono text-text-muted">{filtered.length} of {subnets.length} subnets</span>
    </div>
  </div>
</div>
