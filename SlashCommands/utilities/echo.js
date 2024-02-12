/*
<<<<<<< HEAD
 * User: efeba
 * Date/Time: 3/15/23, 4:44 PM
 * File: echo.js
 *
 * Modified: 3/3/23, 8:11 PM
 *
 * Copyright (c) 2023 BindYourServer (https://bindyourserver.com)
=======
 * User: efebagri
 * Date/Time: 2/12/24, 2:58 AM
 * File: echo.js
 *
 * Modified: 1/9/24, 2:40 PM
 *
 * Copyright (c) 2023-2024 Exbil (https://www.exbil.net/)
>>>>>>> eebbd9c (commit initial set of communities)
 *    All rights Reserved.
 */

const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require("discord.js");

module.exports = {
    ...new SlashCommandBuilder()
        .setName("echo")
        .setDescription("echo your message")
        .addStringOption((option) =>
            option
                .setName("message")
                .setDescription("message that you want to echo")
                .setRequired(true)
        )
        .addUserOption((option) =>
            option
                .setName("target")
                .setDescription("message to be sent to")
                .setRequired(false)
        ),

    run: async (client, interaction) => {
        try {
            const messageToSend = interaction.options.getString("message");
            const user = interaction.options.getUser("target");
            if (user) {
                if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.editReply('⛔ You have no permissions to do this!');
                user.send({content: messageToSend});
                interaction.followUp({
                    content: `I sent the message to ${user.tag}`,
                });
            } else {
                interaction.followUp({content: messageToSend});
            }
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
<<<<<<< HEAD
};
=======
};
>>>>>>> eebbd9c (commit initial set of communities)
