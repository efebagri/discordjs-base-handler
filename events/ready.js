/*
 * User: efeba
s * Date/Time: 3/15/23, 3:20 PM
 * File: ready.js
 *
 * Modified: 3/15/23, 3:15 PM
 *
 * Copyright (c) 2023 BindYourServer (https://bindyourserver.com)
 *    All rights Reserved.
 */

const client = require("../index");

    let statuses = [
        `BindYourServer`,
        `x86-64`,
        `Coding`,
        `System`
    ]

    setInterval(function(){
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        client.user.setActivity(status, {type: 'STREAMING', url: "https://www.twitch.tv/razetro"});
    }, 5000)

client.on("ready", () => {
    console.log(`Bot => ${client.user.username} startet! v` + process.env.APP_VERSION);
    client.user.setActivity(process.env.APP_NAME + ` v` + process.env.APP_VERSION, { type: "STREAMING" });
})