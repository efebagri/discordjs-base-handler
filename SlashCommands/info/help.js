/*
<<<<<<< HEAD
 * User: efeba
 * Date/Time: 3/15/23, 10:40 PM
 * File: help.js
 *
 * Modified: 3/15/23, 10:40 PM
 *
 * Copyright (c) 2023 BindYourServer (https://bindyourserver.com)
=======
 * User: efebagri
 * Date/Time: 2/12/24, 2:58 AM
 * File: help.js
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
        .setName("help")
        .setDescription("View available slash commands or detailed information about a specific command.")
        .addStringOption((option) =>
            option
                .setName("command")
                .setDescription("The name of the command to view detailed information about.")
                .setRequired(false)
        ),

    run: async (client, interaction) => {
        try {
            const commandName = interaction.options.getString("command");
            if (commandName) {
                // Show details for a specific command
                const command = client.slashCommands.get(commandName.toLowerCase());
                if (!command) return interaction.followUp({
                    content: `❌ There is no slash command with the name \`${commandName}\`.`,
                    ephemeral: true
                });

                const embed = new EmbedBuilder()
                    .setColor(process.env.SUCCESS_COLOR)
                    .setTitle(`Commands: /${command.name}`)
                    .setDescription(command.description || "No description provided.")
                    .addFields({ name: 'Usage', value: `\`/${command.name}${command?.options?.length ? " " : ""}${command.options?.map((option) => `<${option.name}>`).join(" ")}\``, inline: true })
                    .setFooter({ text: `Guild Only: ${command.guildOnly ? "Yes" : "No"} | ${process.env.APP_NAME + ` ` + process.env.APP_VERSION}`, iconURL: client.user.avatarURL() ? client.user.avatarURL() : "" });

                interaction.followUp({ embeds: [embed] });
            } else {
                // Show a list of available commands
                const arrayOfSlashCommands = Array.from(client.slashCommands.values());

                const embed = new EmbedBuilder()
                    .setColor(process.env.SUCCESS_COLOR)
                    .setTitle(`${process.env.APP_NAME} Commands`)
                    .setDescription(`Use \`/help <command>\` for detailed information about a specific command.`)
                    .addFields(arrayOfSlashCommands.map((command) => ({
                        name: `\`\`\`/${command.name}\`\`\``, value: command.description || "No description provided.", inline: true
                    })))
                    .setFooter({ text: process.env.APP_NAME + ` ` + process.env.APP_VERSION, iconURL: client.user.avatarURL() });

                interaction.followUp({ embeds: [embed] });
            }
        } catch (e) {
            console.log(String(e.stack))
            return interaction.editReply({embeds: [new EmbedBuilder()
                    .setColor(process.env.ERROR_COLOR)
                    .setFooter({ text: process.env.APP_NAME, iconURL: client.user.avatarURL(client.user) })
                    .setTimestamp()
                    .setTitle(`❌ ERROR | An error occurred`)
                    .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
                ]});
        }
    },
<<<<<<< HEAD
}
=======
}
>>>>>>> eebbd9c (commit initial set of communities)
