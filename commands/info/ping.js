/*
 * User: efeba
 * Date/Time: 3/15/23, 1:10 PM
 * File: ping.js
 *
 * Modified: 3/15/23, 1:03 PM
 *
 * Copyright (c) 2023 BindYourServer (https://bindyourserver.com)
 *    All rights Reserved.
 */

const { Message, Client } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ['p'],

    run: async (client, message, args) => {
        message.channel.send(`${client.ws.ping} ws ping`);
    },
};