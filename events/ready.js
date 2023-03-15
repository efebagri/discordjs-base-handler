/*
 * User: efeba
 * Date/Time: 3/15/23, 1:10 PM
 * File: ready.js
 *
 * Modified: 3/15/23, 1:03 PM
 *
 * Copyright (c) 2023 BindYourServer (https://bindyourserver.com)
 *    All rights Reserved.
 */

const client = require("../index");

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}! v` + process.env.APP_VERSION);
    client.user.setActivity(process.env.APP_NAME + ` v` + process.env.APP_VERSION, { type: "STREAMING" });
})