import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});
const token = 'https://discord.com/api/webhooks/1156581818796085289/c6tM927BbepgLw1U8LRrM0taqva3WEgL0oUmtSx9wxqWycVJl_U1qWBqLHIM8XK-idCN';

client.once('ready', () => {
  console.log(`Logged in as ${client.user?.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.content === '!createChannel') {
    const guild = message.guild;
    if (!guild) {
      message.reply('Cannot create a channel in a DM!');
      return;
    }
    const channel = await guild.channels.create('NewChannel', {
      type: 'GUILD_TEXT', // 'GUILD_VOICE' for voice channel
    });
    message.channel.send(`Created a new text channel: ${channel}`);
  }
});

client.login(token);
