/*
 * User: efebagri
 * Date/Time: 2/12/24, 2:58 AM
 * File: balance.js
 *
 * Modified: 1/9/24, 2:40 PM
 *
 * Copyright (c) 2024 Exbil (https://www.exbil.net/)
 *    All rights Reserved.
 */

const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const User = require('../../models/users'); // Adjust the path based on your project structure

module.exports = {
    ...new SlashCommandBuilder()
        .setName('balance')
        .setDescription('Check your balance'),

    run: async (client, interaction) => {
        try {
            const userId = interaction.user.id;

            let user = await User.findOne({ userId });

            if (!user) {
                user = new User({
                    userId,
                    money: 0,
                });

                await user.save();
            }

            const embed = new EmbedBuilder()
                .setTitle('💰 Balance')
                .setDescription(`Your balance: $${user.money}`)
                .setTimestamp()
                .setFooter({ text: process.env.APP_NAME + ` ` + process.env.APP_VERSION, iconURL: client.user.avatarURL() });

            interaction.followUp({ embeds: [embed] });
        } catch (e) {
            console.log(String(e.stack))
            return interaction.channel.send({embeds: [new EmbedBuilder()
                .setFooter({ text: process.env.APP_NAME, iconURL: client.user.avatarURL(client.user) })
                .setTimestamp()
                .setTitle(`❌ ERROR | An error occurred`)
                .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
            ]});
        }
    },
};
