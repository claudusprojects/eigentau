<script lang="ts">
  import { subnets, FACULTY_COLORS, type Faculty } from '$lib/subnets';
  let search = $state('');
  let filter = $state('all');
  const faculties = [...new Set(subnets.map(s=>s.primary))].sort();
  const list = $derived(subnets.filter(s=>filter==='all'||s.primary===filter).filter(s=>search===''||s.name.toLowerCase().includes(search.toLowerCase())||s.desc.toLowerCase().includes(search.toLowerCase())||`sn${s.netuid}`.includes(search.toLowerCase())));
</script>

<div style="margin-bottom:64px">
  <h1 style="font-family:var(--serif);font-size:clamp(48px,6vw,80px);font-weight:400;font-style:italic;color:var(--t1);line-height:.95;letter-spacing:-.04em;margin-bottom:24px">
    Subnet <span style="color:var(--ac);text-shadow:0 0 60px var(--acg)">directory</span>
  </h1>
  <p style="font-size:16px;line-height:1.8;max-width:520px;color:var(--t2)">
    {subnets.length} active Bittensor subnets, each classified by cognitive faculty. Search, filter, explore.
  </p>
</div>

<!-- Search + filter -->
<div style="display:flex;gap:12px;margin-bottom:32px">
  <input type="text" placeholder="Search subnets by name or description..." bind:value={search}
    style="flex:1;background:var(--card);border:1px solid var(--bdr);border-radius:12px;padding:14px 20px;font-size:15px;font-family:var(--sans);color:var(--t1);outline:none"
    onfocus={(e) => e.currentTarget.style.borderColor = 'var(--bdr2)'}
    onblur={(e) => e.currentTarget.style.borderColor = 'var(--bdr)'} />
  <select bind:value={filter}
    style="background:var(--card);border:1px solid var(--bdr);border-radius:12px;padding:14px 20px;font-size:14px;font-family:var(--sans);color:var(--t2);outline:none;cursor:pointer;min-width:200px">
    <option value="all">All Faculties</option>
    {#each faculties as f}<option value={f}>{f}</option>{/each}
  </select>
</div>

<!-- Table -->
<div style="background:var(--card);border:1px solid var(--bdr);border-radius:16px;overflow:hidden">
  <table style="width:100%;border-collapse:collapse">
    <thead>
      <tr style="border-bottom:1px solid var(--bdr)">
        <th style="text-align:left;font-family:var(--mono);font-size:10px;color:var(--t3);letter-spacing:.1em;text-transform:uppercase;padding:14px 24px;font-weight:500;width:70px">ID</th>
        <th style="text-align:left;font-family:var(--mono);font-size:10px;color:var(--t3);letter-spacing:.1em;text-transform:uppercase;padding:14px 16px;font-weight:500;width:160px">Name</th>
        <th style="text-align:left;font-family:var(--mono);font-size:10px;color:var(--t3);letter-spacing:.1em;text-transform:uppercase;padding:14px 16px;font-weight:500;width:180px">Faculty</th>
        <th style="text-align:left;font-family:var(--mono);font-size:10px;color:var(--t3);letter-spacing:.1em;text-transform:uppercase;padding:14px 16px;font-weight:500">Description</th>
      </tr>
    </thead>
    <tbody>
      {#each list as sn}
        {@const c = FACULTY_COLORS[sn.primary as Faculty]}
        <tr style="border-bottom:1px solid rgba(24,24,34,.5);transition:background .2s"
          onmouseenter={(e) => e.currentTarget.style.background = 'rgba(12,12,18,.5)'}
          onmouseleave={(e) => e.currentTarget.style.background = 'none'}>
          <td style="padding:14px 24px;font-family:var(--mono);font-size:13px;color:var(--t3)">SN{sn.netuid}</td>
          <td style="padding:14px 16px;font-size:15px;color:var(--t1);font-weight:500">{sn.name}</td>
          <td style="padding:14px 16px">
            <span style="font-family:var(--mono);font-size:11px;color:var(--ac);padding:5px 12px;border:1px solid rgba(0,219,188,.2);border-radius:99px;background:var(--acd);display:inline-block">{sn.primary}</span>
          </td>
          <td style="padding:14px 16px;font-size:13px;color:var(--t2)">{sn.desc}</td>
        </tr>
      {/each}
    </tbody>
  </table>
  <div style="padding:14px 24px;border-top:1px solid var(--bdr);display:flex;justify-content:space-between;font-family:var(--mono);font-size:11px;color:var(--t3)">
    <span>{list.length} of {subnets.length} subnets</span>
    <span>Sources: SubnetRadar · TaoStats · SubnetAlpha</span>
  </div>
</div>
