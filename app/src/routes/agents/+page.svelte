<script lang="ts">
  import { onMount } from 'svelte';
  const API = 'https://router-production-cb1b.up.railway.app';

  // State
  let agents: any[] = $state([]);
  let total = $state(0);
  let showCreate = $state(false);
  let chatAgent: any = $state(null);
  let messages: any[] = $state([]);
  let msgInput = $state('');
  let sending = $state(false);
  let lastRouted = $state<any>(null);

  // Create form
  let cName = $state('');
  let cDesc = $state('');
  let cPrompt = $state('');
  let cGoal = $state('');
  let creating = $state(false);

  // API Keys
  let showKeys = $state(false);
  let apiKeys: any[] = $state([]);
  let newKeyName = $state('');
  let newKey = $state('');

  async function loadKeys() {
    const r = await fetch(`${API}/v1/keys`);
    if (r.ok) apiKeys = (await r.json()).keys;
  }

  async function createKey() {
    if (!newKeyName) return;
    const r = await fetch(`${API}/v1/keys`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newKeyName }),
    });
    if (r.ok) {
      const d = await r.json();
      newKey = d.key;
      newKeyName = '';
      await loadKeys();
    }
  }

  // File upload
  let fileAgent: any = $state(null);
  let agentFiles: any[] = $state([]);
  let fileName = $state('');
  let fileContent = $state('');

  async function loadFiles(agentId: string) {
    const r = await fetch(`${API}/api/agents/${agentId}/files`);
    if (r.ok) agentFiles = (await r.json()).files;
  }

  async function uploadFile() {
    if (!fileName || !fileContent || !fileAgent) return;
    await fetch(`${API}/api/agents/${fileAgent.id}/files`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: fileName, content: fileContent }),
    });
    fileName = ''; fileContent = '';
    await loadFiles(fileAgent.id);
  }

  async function loadAgents() {
    const r = await fetch(`${API}/api/agents`);
    if (r.ok) { const d = await r.json(); agents = d.agents; total = d.total; }
  }

  onMount(loadAgents);

  async function createAgent() {
    if (!cName || !cDesc || !cPrompt) return;
    creating = true;
    const r = await fetch(`${API}/api/agents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: cName, description: cDesc, systemPrompt: cPrompt, goal: cGoal || undefined }),
    });
    if (r.ok) {
      cName = ''; cDesc = ''; cPrompt = ''; cGoal = '';
      showCreate = false;
      await loadAgents();
    }
    creating = false;
  }

  async function openChat(agent: any) {
    chatAgent = agent;
    lastRouted = null;
    const r = await fetch(`${API}/api/agents/${agent.id}/messages`);
    if (r.ok) messages = (await r.json()).messages;
  }

  async function sendMessage() {
    if (!msgInput.trim() || sending) return;
    const text = msgInput;
    msgInput = '';
    sending = true;
    lastRouted = null;
    messages = [...messages, { role: 'user', content: text }];

    try {
      const r = await fetch(`${API}/api/agents/${chatAgent.id}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      if (r.ok) {
        const d = await r.json();
        messages = [...messages, { role: 'assistant', content: d.reply }];
        if (d.routed) lastRouted = d;
        await loadAgents(); // refresh stats
      }
    } catch {}
    sending = false;
  }

  async function deleteAgent(id: string) {
    await fetch(`${API}/api/agents/${id}`, { method: 'DELETE' });
    if (chatAgent?.id === id) chatAgent = null;
    await loadAgents();
  }
</script>

{#if chatAgent}
  <!-- CHAT VIEW -->
  <div style="margin-bottom:40px">
    <button onclick={() => { chatAgent = null; messages = []; }}
      style="background:none;color:var(--t3);font-size:14px;margin-bottom:20px;display:flex;align-items:center;gap:6px">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
      Back to agents
    </button>
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:8px">
      <h1 style="font-family:var(--serif);font-size:clamp(36px,4vw,56px);font-weight:400;font-style:italic;color:var(--t1);line-height:1;letter-spacing:-.03em">{chatAgent.name}</h1>
      <span style="font-family:var(--mono);font-size:11px;color:var(--ac);padding:4px 12px;border:1px solid rgba(0,219,188,.2);border-radius:99px;background:var(--acd)">{chatAgent.totalTasks} tasks · {chatAgent.avgQuality}% avg</span>
    </div>
    <p style="font-size:15px;color:var(--t2)">{chatAgent.description}</p>
  </div>

  <!-- Messages -->
  <div style="display:flex;flex-direction:column;gap:16px;margin-bottom:24px;min-height:200px">
    {#if messages.length === 0}
      <p style="font-size:14px;color:var(--t3);text-align:center;padding:40px 0">Start a conversation with your agent</p>
    {/if}
    {#each messages as m}
      <div style="max-width:85%;{m.role === 'user' ? 'align-self:flex-end' : 'align-self:flex-start'}">
        <div style="background:{m.role === 'user' ? 'rgba(0,219,188,.08)' : 'var(--card)'};border:1px solid {m.role === 'user' ? 'rgba(0,219,188,.15)' : 'var(--bdr)'};border-radius:16px;padding:16px 20px">
          <p style="font-size:15px;color:var(--t1);line-height:1.7;white-space:pre-wrap">{m.content}</p>
        </div>
        <div style="font-family:var(--mono);font-size:10px;color:var(--t3);margin-top:4px;{m.role === 'user' ? 'text-align:right' : ''}">{m.role}</div>
      </div>
    {/each}
    {#if sending}
      <div style="align-self:flex-start;display:flex;align-items:center;gap:8px;padding:12px 16px">
        <span style="width:6px;height:6px;background:var(--ac);border-radius:50%;animation:pulse 1s infinite"></span>
        <span style="font-family:var(--mono);font-size:12px;color:var(--ac)">Routing across cognitive network...</span>
      </div>
    {/if}
  </div>

  <!-- Routing details (if last message was routed) -->
  {#if lastRouted}
    <div style="background:var(--card);border:1px solid var(--bdr);border-radius:12px;padding:16px 20px;margin-bottom:16px">
      <div style="font-family:var(--mono);font-size:10px;color:var(--t3);letter-spacing:.1em;text-transform:uppercase;margin-bottom:10px">Cognitive Route · {lastRouted.quality}% quality · {(lastRouted.latencyMs/1000).toFixed(1)}s</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        {#each lastRouted.steps as s}
          <span style="font-family:var(--mono);font-size:10px;color:var(--ac);padding:4px 10px;border:1px solid rgba(0,219,188,.2);border-radius:99px;background:var(--acd)">{s.faculty} → {s.subnet}</span>
        {/each}
      </div>
    </div>
  {/if}

  <!-- Input -->
  <form onsubmit={(e) => { e.preventDefault(); sendMessage(); }}
    style="display:flex;gap:12px">
    <input type="text" bind:value={msgInput} disabled={sending}
      placeholder="Message your agent..."
      style="flex:1;background:var(--card);border:1px solid var(--bdr);border-radius:12px;padding:14px 20px;font-size:15px;font-family:var(--sans);color:var(--t1);outline:none"
      onfocus={(e) => e.currentTarget.style.borderColor = 'var(--bdr2)'}
      onblur={(e) => e.currentTarget.style.borderColor = 'var(--bdr)'} />
    <button type="submit" disabled={sending || !msgInput.trim()}
      style="background:var(--ac);color:#000;padding:14px 28px;border-radius:99px;font-size:14px;font-weight:600;white-space:nowrap;opacity:{sending || !msgInput.trim() ? '.3' : '1'}">
      Send
    </button>
  </form>

{:else}
  <!-- AGENT LIST VIEW -->
  <div style="margin-bottom:60px">
    <h1 style="font-family:var(--serif);font-size:clamp(48px,6vw,80px);font-weight:400;font-style:italic;color:var(--t1);line-height:.95;letter-spacing:-.04em;margin-bottom:24px">
      Your <span style="color:var(--ac);text-shadow:0 0 60px var(--acg)">agents</span>
    </h1>
    <p style="font-size:16px;line-height:1.8;max-width:520px;color:var(--t2)">
      Create autonomous AI agents powered by Eigentau's cognitive routing network. Each agent decomposes tasks across {`129+`} Bittensor subnets.
    </p>
  </div>

  <!-- Buttons -->
  <div style="margin-bottom:40px;display:flex;gap:12px">
    <button onclick={() => { showKeys = !showKeys; if (showKeys) loadKeys(); showCreate = false; }}
      style="background:none;color:var(--t1);padding:12px 28px;border-radius:99px;font-size:14px;font-weight:600;border:1px solid var(--bdr2)">
      {showKeys ? 'Hide' : 'API Keys'}
    </button>
    <button onclick={() => { showCreate = !showCreate; showKeys = false; }}
      style="background:var(--ac);color:#000;padding:12px 28px;border-radius:99px;font-size:14px;font-weight:600;transition:box-shadow .2s"
      onmouseenter={(e) => e.currentTarget.style.boxShadow = '0 0 40px var(--acg)'}
      onmouseleave={(e) => e.currentTarget.style.boxShadow = 'none'}>
      {showCreate ? 'Cancel' : '+ Create Agent'}
    </button>
  </div>

  <!-- Create form -->
  {#if showCreate}
    <div style="background:var(--card);border:1px solid var(--bdr);border-radius:16px;padding:32px;margin-bottom:40px">
      <h3 style="font-family:var(--serif);font-size:24px;font-style:italic;color:var(--t1);margin-bottom:24px">Create new agent</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">
        <div>
          <label style="font-size:13px;color:var(--t3);display:block;margin-bottom:6px">Name</label>
          <input type="text" bind:value={cName} placeholder="e.g. Research Analyst"
            style="width:100%;background:var(--bg);border:1px solid var(--bdr);border-radius:10px;padding:12px 16px;font-size:15px;font-family:var(--sans);color:var(--t1);outline:none" />
        </div>
        <div>
          <label style="font-size:13px;color:var(--t3);display:block;margin-bottom:6px">Goal (optional)</label>
          <input type="text" bind:value={cGoal} placeholder="e.g. Track Bittensor ecosystem developments"
            style="width:100%;background:var(--bg);border:1px solid var(--bdr);border-radius:10px;padding:12px 16px;font-size:15px;font-family:var(--sans);color:var(--t1);outline:none" />
        </div>
      </div>
      <div style="margin-bottom:16px">
        <label style="font-size:13px;color:var(--t3);display:block;margin-bottom:6px">Description</label>
        <input type="text" bind:value={cDesc} placeholder="What does this agent do?"
          style="width:100%;background:var(--bg);border:1px solid var(--bdr);border-radius:10px;padding:12px 16px;font-size:15px;font-family:var(--sans);color:var(--t1);outline:none" />
      </div>
      <div style="margin-bottom:24px">
        <label style="font-size:13px;color:var(--t3);display:block;margin-bottom:6px">System Prompt</label>
        <textarea bind:value={cPrompt} rows="4" placeholder="You are a research analyst specializing in decentralized AI networks..."
          style="width:100%;background:var(--bg);border:1px solid var(--bdr);border-radius:10px;padding:12px 16px;font-size:15px;font-family:var(--sans);color:var(--t1);outline:none;resize:vertical;line-height:1.6"></textarea>
      </div>
      <button onclick={createAgent} disabled={creating || !cName || !cDesc || !cPrompt}
        style="background:var(--ac);color:#000;padding:12px 28px;border-radius:99px;font-size:14px;font-weight:600;opacity:{creating || !cName || !cDesc || !cPrompt ? '.3' : '1'}">
        {creating ? 'Creating...' : 'Create Agent'}
      </button>
    </div>
  {/if}

  <!-- API Keys panel -->
  {#if showKeys}
    <div style="background:var(--card);border:1px solid var(--bdr);border-radius:16px;padding:32px;margin-bottom:40px">
      <h3 style="font-family:var(--serif);font-size:24px;font-style:italic;color:var(--t1);margin-bottom:8px">API Keys</h3>
      <p style="font-size:13px;color:var(--t3);margin-bottom:20px">Use these keys to access your agents from Telegram bots, Discord bots, or any HTTP client.</p>

      {#if newKey}
        <div style="background:rgba(0,219,188,.05);border:1px solid rgba(0,219,188,.2);border-radius:10px;padding:16px;margin-bottom:20px">
          <p style="font-size:13px;color:var(--ac);margin-bottom:8px;font-weight:600">New key created — copy it now, it won't be shown again:</p>
          <code style="font-family:var(--mono);font-size:13px;color:var(--t1);word-break:break-all">{newKey}</code>
        </div>
      {/if}

      <div style="display:flex;gap:12px;margin-bottom:20px">
        <input type="text" bind:value={newKeyName} placeholder="Key name (e.g. telegram-bot)"
          style="flex:1;background:var(--bg);border:1px solid var(--bdr);border-radius:10px;padding:10px 16px;font-size:14px;font-family:var(--sans);color:var(--t1);outline:none" />
        <button onclick={createKey} disabled={!newKeyName}
          style="background:var(--ac);color:#000;padding:10px 24px;border-radius:99px;font-size:13px;font-weight:600;white-space:nowrap;opacity:{!newKeyName ? '.3' : '1'}">
          Generate Key
        </button>
      </div>

      {#if apiKeys.length > 0}
        <div style="border-top:1px solid var(--bdr);padding-top:16px">
          {#each apiKeys as k}
            <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(24,24,34,.5)">
              <div>
                <span style="font-size:14px;color:var(--t1)">{k.name}</span>
                <span style="font-family:var(--mono);font-size:11px;color:var(--t3);margin-left:12px">{k.key.slice(0, 12)}...{k.key.slice(-4)}</span>
              </div>
              <span style="font-family:var(--mono);font-size:11px;color:var(--t3)">{k.total_requests} requests</span>
            </div>
          {/each}
        </div>
      {/if}

      <div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--bdr)">
        <p style="font-family:var(--mono);font-size:11px;color:var(--t3);line-height:1.8">
          Base URL: https://router-production-cb1b.up.railway.app/v1<br>
          Auth: Authorization: Bearer YOUR_KEY<br>
          Endpoints: POST /v1/agents, POST /v1/agents/:id/chat, POST /v1/route
        </p>
      </div>
    </div>
  {/if}

  <!-- Agent cards -->
  {#if agents.length === 0 && !showCreate}
    <div style="background:var(--card);border:1px solid var(--bdr);border-radius:16px;padding:60px;text-align:center">
      <p style="font-size:18px;color:var(--t1);margin-bottom:8px">No agents yet</p>
      <p style="font-size:14px;color:var(--t3)">Create your first autonomous AI agent to get started</p>
    </div>
  {:else}
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px">
      {#each agents as a}
        <div style="background:var(--card);border:1px solid var(--bdr);border-radius:16px;padding:28px;transition:border-color .3s,box-shadow .3s"
          onmouseenter={(e) => { e.currentTarget.style.borderColor = 'var(--ac)'; e.currentTarget.style.boxShadow = '0 0 40px rgba(0,219,188,.06)'; }}
          onmouseleave={(e) => { e.currentTarget.style.borderColor = 'var(--bdr)'; e.currentTarget.style.boxShadow = 'none'; }}>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
            <h3 style="font-size:18px;font-weight:700;color:var(--t1)">{a.name}</h3>
            <div style="display:flex;align-items:center;gap:6px">
              <span style="width:6px;height:6px;border-radius:50%;background:var(--ac)"></span>
              <span style="font-family:var(--mono);font-size:10px;color:var(--ac)">{a.status}</span>
            </div>
          </div>
          <p style="font-size:14px;color:var(--t2);line-height:1.6;margin-bottom:16px">{a.description}</p>
          <div style="display:flex;gap:8px;margin-bottom:16px">
            <span style="font-family:var(--mono);font-size:11px;color:var(--t3);padding:4px 10px;border:1px solid var(--bdr);border-radius:99px">{a.totalTasks} tasks</span>
            {#if a.avgQuality > 0}
              <span style="font-family:var(--mono);font-size:11px;color:var(--ac);padding:4px 10px;border:1px solid rgba(0,219,188,.2);border-radius:99px;background:var(--acd)">{a.avgQuality}% quality</span>
            {/if}
          </div>
          <div style="display:flex;gap:8px">
            <button onclick={() => openChat(a)}
              style="background:var(--ac);color:#000;padding:8px 20px;border-radius:99px;font-size:13px;font-weight:600">Chat</button>
            <button onclick={() => { fileAgent = fileAgent?.id === a.id ? null : a; if (fileAgent) loadFiles(a.id); }}
              style="background:none;color:var(--t1);padding:8px 16px;border-radius:99px;font-size:13px;border:1px solid var(--bdr2)">Files</button>
            <button onclick={() => deleteAgent(a.id)}
              style="background:none;color:var(--t3);padding:8px 16px;border-radius:99px;font-size:13px;border:1px solid var(--bdr)">Delete</button>
          </div>

          {#if fileAgent?.id === a.id}
            <div style="margin-top:16px;padding-top:16px;border-top:1px solid var(--bdr)">
              <div style="font-size:13px;color:var(--t3);margin-bottom:12px;font-weight:600">Knowledge Base — files injected into agent context</div>
              {#each agentFiles as f}
                <div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid rgba(24,24,34,.5)">
                  <span style="font-family:var(--mono);font-size:13px;color:var(--t1)">{f.filename}</span>
                  <span style="font-family:var(--mono);font-size:11px;color:var(--t3)">{f.size_bytes} bytes</span>
                </div>
              {/each}
              <div style="display:flex;gap:8px;margin-top:12px">
                <input type="text" bind:value={fileName} placeholder="filename.txt"
                  style="width:160px;background:var(--bg);border:1px solid var(--bdr);border-radius:8px;padding:8px 12px;font-size:13px;font-family:var(--sans);color:var(--t1);outline:none" />
                <textarea bind:value={fileContent} placeholder="Paste content..."
                  rows="2" style="flex:1;background:var(--bg);border:1px solid var(--bdr);border-radius:8px;padding:8px 12px;font-size:13px;font-family:var(--sans);color:var(--t1);outline:none;resize:vertical"></textarea>
                <button onclick={uploadFile} disabled={!fileName || !fileContent}
                  style="background:var(--ac);color:#000;padding:8px 16px;border-radius:99px;font-size:12px;font-weight:600;white-space:nowrap;opacity:{!fileName || !fileContent ? '.3' : '1'}">Upload</button>
              </div>
            </div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
{/if}

<style>
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.3} }
</style>
