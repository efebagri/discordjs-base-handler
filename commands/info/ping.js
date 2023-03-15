const { Message, Client, MessageEmbed  } = require("discord.js");

module.exports = {
    name: "ping",
    description: "returns websocket ping",
    category: "Info",
    usage: "",
    aliases: ['p', 'latency'],

    run: async (client, message, args) => {
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

        message.channel.send({ embeds: [exampleEmbed] });
    },
};