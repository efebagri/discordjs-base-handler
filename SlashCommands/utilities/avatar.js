/*
 * User: efeba
 * Date/Time: 3/15/23, 3:45 PM
 * File: avatar.js
 *
 * Modified: 3/15/23, 3:44 PM
 *
 * Copyright (c) 2023 BindYourServer (https://bindyourserver.com)
 *    All rights Reserved.
 */

const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");
const getEmoji = require('get-random-emoji');

module.exports = {
    ...new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Display a users avatar.')
        .addUserOption(option =>
            option.setName('target')
                .setDescription('Target a user...')
                .setRequired(false)),

    run: async (client, interaction) => {
        try {
            await interaction.deleteReply();

            let user = interaction.options.getUser('target');

            if (interaction.options.getUser('target') === null) {
                user = interaction.user;
            }

            const avatarViewerEmbed = new EmbedBuilder()
                .setColor(process.env.SUCCESS_COLOR)
                .setTitle(`${user.tag}'s Avatar ` + getEmoji())
                .setImage(user.displayAvatarURL({ dynamic: true, size: 256 }))
                .setTimestamp()
                .setFooter({ text: process.env.APP_NAME, iconURL: client.user.avatarURL(client.user) });
            interaction.channel.send({ embeds: [avatarViewerEmbed] });
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