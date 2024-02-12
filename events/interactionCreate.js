/*
 * User: efebagri
 * Date/Time: 2/12/24, 2:59 AM
 * File: interactionCreate.js
 *
 * Modified: 1/9/24, 2:40 PM
 *
 * Copyright (c) 2023-2024 Exbil (https://www.exbil.net/)
 *    All rights Reserved.
 */

const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const client = require("../index");

client.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        try {
            await interaction.deferReply({ ephemeral: false });
        } catch (error) {
            return interaction.followUp({ content: "Sorry, an error occurred while processing your command." });
        }

        const cmd = client.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.followUp({ content: "Sorry, an error occurred while processing your command." });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options?.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        await interaction.guild.members.fetch(interaction.user.id);
        interaction.member = interaction.guild.members.cache.get(interaction.user.id);

        cmd.run(client, interaction, args);
    }

    // Context Menu Handling
    if (interaction.isContextMenuCommand()) {
        try {
            await interaction.deferReply({ ephemeral: false });
        } catch (error) {
            return interaction.followUp({ content: "Sorry, an error occurred while processing your command." });
        }

        const command = client.slashCommands.get(interaction.commandName);
        if (command) command.run(client, interaction);
    }
});
