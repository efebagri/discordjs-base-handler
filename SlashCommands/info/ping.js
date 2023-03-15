/*
 * User: efeba
 * Date/Time: 3/15/23, 4:44 PM
 * File: ping.js
 *
 * Modified: 3/3/23, 8:33 PM
 *
 * Copyright (c) 2023 BindYourServer (https://bindyourserver.com)
 *    All rights Reserved.
 */

const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    ...new SlashCommandBuilder()
        .setName("ping")
        .setDescription("returns websocket ping"),

    run: async (client, interaction) => {
        try {
            await interaction.deleteReply();
            const pingEmbed = new EmbedBuilder()
                .setColor(process.env.SUCCESS_COLOR)
                .setTitle('🏓 Pong')
                .setThumbnail('https://media.tenor.com/YFxxWTSfT-AAAAAM/ping.gif')
                .addFields(
                    { name: 'Latency', value: `${Math.round(client.ws.ping)}ms`, inline: true },
                    { name: 'API Latency', value: `${Math.round(interaction.client.ws.ping)} ms`, inline: true },
                )
                .setTimestamp()
                .setFooter({ text: process.env.APP_NAME, iconURL: client.user.avatarURL(client.user) });

            interaction.channel.send({ embeds: [pingEmbed] });
        } catch (e) {
            console.log(String(e.stack))
            return interaction.channel.send({embeds: [new EmbedBuilder()
                .setColor(process.env.ERROR_COLOR)
                .setFooter({ text: process.env.APP_NAME, iconURL: client.user.avatarURL(client.user) })
                .setTimestamp()
                .setTitle(`❌ ERROR | An error occurred`)
                .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
            ]});
        }
    },
};