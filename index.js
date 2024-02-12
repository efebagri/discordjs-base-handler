/*
 * User: efebagri
 * Date/Time: 2/12/24, 2:55 AM
 * File: index.js
 *
 * Modified: 1/9/24, 2:40 PM
 *
 * Copyright (c) 2024 Exbil (https://www.exbil.net/)
 *    All rights Reserved.
 */

// Importiere die benötigten Module
const { Client, Collection } = require("discord.js");
require('dotenv').config();

// Importiere den Updater
require('./events/updater');

// Erstelle einen Discord-Client
const client = new Client({
    intents: 32767,
});

// Exportiere den Client
module.exports = client;

// Erstelle eine Sammlung für die Befehle und die Slash-Befehle
client.commands = new Collection();
client.slashCommands = new Collection();

// Importiere die Befehle und die Slash-Befehle
require("./handler/command_event")(client);
require("./handler/mongoose")(client)

// Melde den Client bei Discord an
client.login(process.env.TOKEN);
