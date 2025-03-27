// Import the required modules
const { Client, Collection } = require("discord.js");
require('dotenv').config();

// Import the updater
require('./events/updater');

// Create a Discord client
const client = new Client({
    intents: 32767,
});

// Export the client
module.exports = client;

// Create a collection for commands and slash commands
client.commands = new Collection();
client.slashCommands = new Collection();

// Import commands and slash commands
require("./handler/command_event")(client);
require("./handler/mongoose")(client);

// Log the client into Discord
client.login(process.env.TOKEN);
