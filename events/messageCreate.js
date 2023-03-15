/*
 * User: efeba
 * Date/Time: 3/15/23, 1:10 PM
 * File: messageCreate.js
 *
 * Modified: 3/15/23, 1:03 PM
 *
 * Copyright (c) 2023 BindYourServer (https://bindyourserver.com)
 *    All rights Reserved.
 */

const client = require("../index");

client.on("messageCreate", async (message) => {
    if (
        message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(process.env.APP_PREFIX)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(process.env.APP_PREFIX.length)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);
});
