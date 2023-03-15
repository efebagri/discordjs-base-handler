/*
 * User: efeba
 * Date/Time: 3/15/23, 4:44 PM
 * File: index.js
 *
 * Modified: 3/3/23, 8:34 PM
 *
 * Copyright (c) 2023 BindYourServer (https://bindyourserver.com)
 *    All rights Reserved.
 */

// Importiere die benötigten Module
const { Client, Collection } = require("discord.js");
require('dotenv').config();

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
require("./handler")(client);

// Melde den Client bei Discord an
client.login(process.env.TOKEN);