/*
 * User: efeba
 * Date/Time: 3/15/23, 3:20 PM
 * File: ping.js
 *
 * Modified: 3/15/23, 3:15 PM
 *
 * Copyright (c) 2023 BindYourServer (https://bindyourserver.com)
 *    All rights Reserved.
 */

const { Client, CommandInteraction, MessageEmbed} = require("discord.js");

module.exports = {
    name: "ping",
    description: "returns websocket ping",
    type: 'CHAT_INPUT',

    run: async (client, interaction, message, args) => {
        interaction.editReply("🏓 Pinging....");
        const exampleEmbed = new MessageEmbed()
            .setColor(process.env.WARNING_COLOR)
            .setTitle('🏓 Pong!')
            .setDescription(
                `Latency: ${Math.floor(
                    message.createdTimestamp - message.createdTimestamp,
                )}ms\nAPI Latency: ${client.ws.ping}ms`,
            )
            .setTimestamp()
            .setFooter({ text: process.env.APP_NAME, iconURL: client.user.avatarURL(client.user) });

        interaction.channel.send({ embeds: [exampleEmbed] });
    },
};