const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const Cooldown = require('../../models/workCooldown');
const User = require('../../models/users');

module.exports = {
    ...new SlashCommandBuilder()
        .setName('work')
        .setDescription('Do some work to earn money'),

    run: async (client, interaction) => {
        try {
            const userId = interaction.user.id;

            const cooldown = await Cooldown.findOne({ userId });

            if (cooldown && cooldown.cooldownExpiration > new Date()) {
                const remainingTimeInSeconds = Math.ceil((cooldown.cooldownExpiration - new Date()) / 1000);
                const remainingMinutes = Math.floor(remainingTimeInSeconds / 60);
                const remainingSeconds = remainingTimeInSeconds % 60;

                return interaction.followUp(`You're on cooldown! Please wait ${remainingMinutes} minutes and ${remainingSeconds} seconds before working again.`);
            }

            const earnings = 50;

            await Cooldown.findOneAndUpdate(
                { userId },
                { userId, cooldownExpiration: new Date(Date.now() + 15 * 60 * 1000) },
                { upsert: true }
            );

            const user = await User.findOneAndUpdate(
                { userId },
                { $inc: { money: earnings } }, // Increment the money field by earnings
                { new: true } // Return the updated document
            );

            const balanceEmbed = new EmbedBuilder()
                .setTitle('💼 Work')
                .setDescription(`You earned $${earnings} from your work! Your new balance: $${user.money}`)
                .setTimestamp()
                .setFooter({ text: process.env.APP_NAME + ` ` + process.env.APP_VERSION, iconURL: client.user.avatarURL() });

            interaction.followUp({ embeds: [balanceEmbed] });
        } catch (e) {
            console.log(String(e.stack))
            return interaction.channel.send({
                embeds: [new EmbedBuilder()
                    .setFooter({ text: process.env.APP_NAME, iconURL: client.user.avatarURL(client.user) })
                    .setTimestamp()
                    .setTitle(`❌ ERROR | An error occurred`)
                    .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
                ]
            });
        }
    },
};
