const { Client, GatewayIntentBits, MessageEmbed } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, // Required for guild-related events (e.g., ready, guildCreate, guildDelete)
        GatewayIntentBits.GuildMessages, // Required for message-related events and access to message content
    ] 
});

const commandPrefix = '/'; // Change the command prefix to "/"
const itemPrices = {
    "coffee": 3,
    "tea": 2,
    "sandwich": 5,
    "salad": 4,
    // Add more items and their prices as needed
};

// Error handler
client.on('error', (error) => {
    console.error('A Discord error occurred:', error);
});

client.once('ready', () => {
    console.log('Bot is ready!');
});

client.on('messageCreate', (message) => {
    if (!message.content.startsWith(commandPrefix) || message.author.bot) return;

    const args = message.content.slice(commandPrefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'order') {
        const item = args.join(' ').toLowerCase();
        const price = itemPrices[item];

        if (price) {
            const embed = new MessageEmbed()
                .setColor('#00ff00')
                .setTitle('Order Details')
                .addField('Item', item, true)
                .addField('Price', `${price}$`, true)
                .setTimestamp();

            message.channel.send({ embeds: [embed] });
        } else {
            message.channel.send(`Sorry, we don't have "${item}" on the menu.`);
        }
    }

    // Logging message content
    console.log(`Received message: "${message.content}"`);
});

const token = 'MTEzNDIwMjI1MDY4OTAwNzcxNw.GZP61m.DqA4l9OrTCTGhJfrLkuzyIBNphWurUwmsKpRGs'; // Replace with your actual bot token
client.login(token)
    .catch(error => {
        console.error('Login Error:', error);
        process.exit(1); // Exit the process with an error code
    });
