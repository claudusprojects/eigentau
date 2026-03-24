/**
 * Eigentau Telegram Bot
 *
 * Connect any Eigentau agent to Telegram in under 5 minutes.
 *
 * Setup:
 *   1. Get a Telegram bot token from @BotFather
 *   2. Get an Eigentau API key: POST https://router-production-cb1b.up.railway.app/v1/keys
 *   3. Create an agent: POST https://router-production-cb1b.up.railway.app/v1/agents
 *   4. Set the env vars below and run: node telegram-bot.js
 *
 * Install: npm install node-telegram-bot-api
 */

import TelegramBot from 'node-telegram-bot-api';

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const EIGENTAU_API_KEY = process.env.EIGENTAU_API_KEY;
const EIGENTAU_AGENT_ID = process.env.EIGENTAU_AGENT_ID;
const API = 'https://router-production-cb1b.up.railway.app';

if (!TELEGRAM_TOKEN || !EIGENTAU_API_KEY || !EIGENTAU_AGENT_ID) {
  console.error('Missing env vars: TELEGRAM_TOKEN, EIGENTAU_API_KEY, EIGENTAU_AGENT_ID');
  process.exit(1);
}

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;
  if (!text || text.startsWith('/start')) {
    bot.sendMessage(chatId, '🧠 I\'m an Eigentau agent — powered by cognitive routing across 129+ Bittensor subnets. Ask me anything!');
    return;
  }

  // Show typing indicator
  bot.sendChatAction(chatId, 'typing');

  try {
    const res = await fetch(`${API}/v1/agents/${EIGENTAU_AGENT_ID}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${EIGENTAU_API_KEY}`,
      },
      body: JSON.stringify({ message: text }),
    });

    if (!res.ok) {
      const err = await res.json();
      bot.sendMessage(chatId, `Error: ${err.error || 'Something went wrong'}`);
      return;
    }

    const data = await res.json();

    // Send the reply
    let reply = data.reply;

    // Add routing info if it was routed through the cognitive network
    if (data.routed && data.steps) {
      const faculties = data.steps.map(s => s.faculty).join(' → ');
      reply += `\n\n⚡ _Routed: ${faculties} (${data.quality}% quality, ${(data.latencyMs/1000).toFixed(1)}s)_`;
    }

    bot.sendMessage(chatId, reply, { parse_mode: 'Markdown' });
  } catch (err) {
    console.error('Error:', err);
    bot.sendMessage(chatId, 'Sorry, something went wrong. Please try again.');
  }
});

console.log('Eigentau Telegram bot is running...');
