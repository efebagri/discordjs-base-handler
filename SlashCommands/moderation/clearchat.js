const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    ...new SlashCommandBuilder()
        .setName("clearchat")
        .setDescription("delete your messages")
        .addNumberOption((option) =>
            option
                .setName("number")
                .setDescription("Number of messages to be deleted")
                .setRequired(true)
        ),

    run: async (client, interaction) => {
        try {
            const messageToDelete = interaction.options.getNumber("number");

            if (!interaction.member.permissions.has("MANAGE_MESSAGES"))
                return interaction.editReply({ content: 'You have no permissions to do this!', ephemeral: true });

            if (messageToDelete < 1 || messageToDelete > 100) {
                return interaction.editReply({ content: 'You need to enter a positive number!', ephemeral: true });
            }

            interaction.channel.bulkDelete(messageToDelete, true)
            interaction.editReply({ content: `**Successfully** ***${messageToDelete}*** Messages deleted.`, ephemeral: true })
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