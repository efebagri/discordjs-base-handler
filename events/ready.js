/*
 * User: efebagri
 * Date/Time: 2/12/24, 2:59 AM
 * File: ready.js
 *
 * Modified: 1/9/24, 2:40 PM
 *
 * Copyright (c) 2023-2024 Exbil (https://www.exbil.net/)
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
