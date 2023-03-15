/*
 * User: efeba
 * Date/Time: 3/15/23, 3:20 PM
 * File: help.js
 *
 * Modified: 3/15/23, 3:15 PM
 *
 * Copyright (c) 2023 BindYourServer (https://bindyourserver.com)
 *    All rights Reserved.
 */

const { Message, Client, MessageEmbed  } = require("discord.js");
const { client } = require("../../index");

module.exports = {
    name: "help",
    description: "Need some help with commands because they are too complicated? Look no further! I am here to your aid!",
    category: "Info",
    usage: "[command]",
    aliases: ['info', 'command', 'help me', 'h'],

    run: async (client, message, args) => {
        var allcmds = "";

        client.commands.forEach(cmd => {
            allcmds+="`"+process.env.APP_PREFIX+" "+process.env.APP_NAME+"` ~ "+process.env.APP_VERSION+"\n"
        })
        const exampleEmbed = new MessageEmbed()
            .setAuthor({ name: 'Commands of ' + process.env.APP_NAME, iconURL: 'https://i.imgur.com/nBcXQTw.gif' })
            .setColor(process.env.SUCCESS_COLOR)
            .setDescription(allcmds)
            .setImage("https://i.giphy.com/media/ZO9b1ntYVJmjZlsWlm/giphy.webp")
            .setFooter({ text: `To get info of each command you can do `+ process.env.APP_PREFIX + `help [command]`, iconURL: client.user.avatarURL(client.user) })

        message.channel.send({ embeds: [exampleEmbed] });
    },
};