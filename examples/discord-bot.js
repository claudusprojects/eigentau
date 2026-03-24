/**
 * Eigentau Discord Bot
 *
 * Connect any Eigentau agent to Discord.
 *
 * Setup:
 *   1. Create a Discord bot at discord.com/developers
 *   2. Get an Eigentau API key: POST https://router-production-cb1b.up.railway.app/v1/keys
 *   3. Create an agent: POST https://router-production-cb1b.up.railway.app/v1/agents
 *   4. Set env vars and run: node discord-bot.js
 *
 * Install: npm install discord.js
 */

import { Client, GatewayIntentBits } from 'discord.js';

const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const EIGENTAU_API_KEY = process.env.EIGENTAU_API_KEY;
const EIGENTAU_AGENT_ID = process.env.EIGENTAU_AGENT_ID;
const API = 'https://router-production-cb1b.up.railway.app';

if (!DISCORD_TOKEN || !EIGENTAU_API_KEY || !EIGENTAU_AGENT_ID) {
  console.error('Missing env vars: DISCORD_TOKEN, EIGENTAU_API_KEY, EIGENTAU_AGENT_ID');
  process.exit(1);
}

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.on('messageCreate', async (msg) => {
  if (msg.author.bot) return;
  if (!msg.mentions.has(client.user) && !msg.content.startsWith('!eigen')) return;

  const text = msg.content.replace(/^!eigen\s*/, '').replace(/<@!?\d+>/g, '').trim();
  if (!text) return msg.reply('Ask me anything — I route queries across 129+ Bittensor subnets.');

  await msg.channel.sendTyping();

  try {
    const res = await fetch(`${API}/v1/agents/${EIGENTAU_AGENT_ID}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${EIGENTAU_API_KEY}` },
      body: JSON.stringify({ message: text }),
    });

    const data = await res.json();
    let reply = data.reply || data.error || 'No response';

    if (data.routed && data.steps) {
      const faculties = data.steps.map(s => s.faculty).join(' → ');
      reply += `\n\n*Routed: ${faculties} (${data.quality}% quality)*`;
    }

    // Discord max 2000 chars
    if (reply.length > 1900) reply = reply.slice(0, 1900) + '...';
    msg.reply(reply);
  } catch (err) {
    console.error(err);
    msg.reply('Something went wrong. Try again.');
  }
});

client.login(DISCORD_TOKEN);
console.log('Eigentau Discord bot starting...');
