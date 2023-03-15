/*
 * User: efeba
 * Date/Time: 3/15/23, 3:23 PM
 * File: index.js
 *
 * Modified: 3/15/23, 3:15 PM
 *
 * Copyright (c) 2023 BindYourServer (https://bindyourserver.com)
 *    All rights Reserved.
 */

const { Client, Collection } = require("discord.js");
require('dotenv').config()

const client = new Client({
    intents: 32767,
});
module.exports = client;

client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

require("./handler")(client);

client.login(process.env.TOKEN);
