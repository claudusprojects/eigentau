<script lang="ts">
  const subnets = [
    { id: 1, name: 'Apex', faculty: 'Reasoning', emission: 4.2, miners: 256, health: 98, weight: 0.359 },
    { id: 8, name: 'Taoshi', faculty: 'Executive', emission: 2.8, miners: 128, health: 94, weight: 0.233 },
    { id: 13, name: 'Data Universe', faculty: 'Perception', emission: 2.1, miners: 180, health: 91, weight: 0.209 },
    { id: 19, name: 'Nineteen', faculty: 'Attention', emission: 3.5, miners: 210, health: 96, weight: 0.144 },
    { id: 33, name: 'ReadyAI', faculty: 'Metacognition', emission: 1.4, miners: 256, health: 88, weight: 0.049 },
    { id: 5, name: 'Kaizen', faculty: 'Generation', emission: 3.1, miners: 190, health: 93, weight: 0.12 },
    { id: 9, name: 'Templar', faculty: 'Learning', emission: 1.8, miners: 95, health: 85, weight: 0.006 },
    { id: 21, name: 'FileTAO', faculty: 'Memory', emission: 1.2, miners: 64, health: 82, weight: 0.08 },
    { id: 4, name: 'Targon', faculty: 'Reasoning', emission: 2.4, miners: 220, health: 95, weight: 0.15 },
    { id: 14, name: 'LLM Defender', faculty: 'Problem Solving', emission: 0.9, miners: 48, health: 79, weight: 0.03 },
  ];
</script>

<div class="space-y-8">
  <div>
    <h1 class="font-serif text-3xl font-semibold italic text-text mb-2">Subnets</h1>
    <p class="text-sm text-text-muted">Bittensor subnets tracked by the routing engine.</p>
  </div>

  <div class="bg-bg-card border border-border rounded-xl overflow-hidden">
    <table class="w-full">
      <thead>
        <tr class="border-b border-border">
          <th class="text-left text-[10px] font-mono font-medium text-text-muted uppercase tracking-wider px-6 py-3">Subnet</th>
          <th class="text-left text-[10px] font-mono font-medium text-text-muted uppercase tracking-wider px-4 py-3">Faculty</th>
          <th class="text-right text-[10px] font-mono font-medium text-text-muted uppercase tracking-wider px-4 py-3">Emission</th>
          <th class="text-right text-[10px] font-mono font-medium text-text-muted uppercase tracking-wider px-4 py-3">Miners</th>
          <th class="text-right text-[10px] font-mono font-medium text-text-muted uppercase tracking-wider px-4 py-3">Health</th>
          <th class="text-right text-[10px] font-mono font-medium text-text-muted uppercase tracking-wider px-6 py-3">Route Weight</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-border">
        {#each subnets as sn}
          <tr class="hover:bg-bg-card-hover transition-colors">
            <td class="px-6 py-4">
              <span class="text-xs font-mono text-text-muted mr-2">SN{sn.id}</span>
              <span class="text-sm text-text">{sn.name}</span>
            </td>
            <td class="px-4 py-4">
              <span class="text-xs font-mono px-2 py-0.5 rounded bg-accent-dim text-accent">{sn.faculty}</span>
            </td>
            <td class="px-4 py-4 text-right font-mono text-sm text-text-secondary">{sn.emission.toFixed(1)}%</td>
            <td class="px-4 py-4 text-right font-mono text-sm text-text-secondary">{sn.miners}</td>
            <td class="px-4 py-4 text-right">
              <span class="font-mono text-sm {sn.health >= 90 ? 'text-accent' : sn.health >= 80 ? 'text-text-secondary' : 'text-danger'}">{sn.health}%</span>
            </td>
            <td class="px-6 py-4 text-right font-mono text-sm text-text-muted">{sn.weight.toFixed(3)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
