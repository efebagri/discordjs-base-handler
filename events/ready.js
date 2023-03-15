/*
 * User: efeba
 * Date/Time: 3/15/23, 4:44 PM
 * File: ready.js
 *
 * Modified: 3/3/23, 8:44 PM
 *
 * Copyright (c) 2023 BindYourServer (https://bindyourserver.com)
 *    All rights Reserved.
 */

// Importiere den Client
const client = require("../index");

// Definiere die verfügbaren Aktivitäten
const activities = [
    'with WebStorm',
    'with the Code',
    'with the GitHub Repo',
    'with the Support Tickets',
];

// Wenn der Bot bereit ist, aktualisiere die Aktivität in regelmäßigen Abständen
client.on("ready", () => {
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * activities.length);
        const newActivity = activities[randomIndex];
        client.user.setActivity(newActivity);
    }, 10000); // Aktualisiere die Aktivität alle 10 Sekunden

    console.log(`Logged in as ${client.user.tag}! v${process.env.APP_VERSION}`);
    console.log('—————————————————[ RUBICON ]—————————————————');
});