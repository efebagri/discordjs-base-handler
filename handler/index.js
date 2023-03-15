/*
 * User: efeba
 * Date/Time: 3/15/23, 4:44 PM
 * File: index.js
 *
 * Modified: 3/3/23, 8:44 PM
 *
 * Copyright (c) 2023 BindYourServer (https://bindyourserver.com)
 *    All rights Reserved.
 */

// Importiere die benötigten Module
const { glob } = require("glob");
const { promisify } = require("util");

// Promisify die glob-Methode
const globPromise = promisify(glob);

// Exportiere eine Funktion, die den Client konfiguriert
module.exports = async (client) => {
    // ———————————————[Events]———————————————
    // Suche nach Event-Dateien und lade sie
    //const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
    const eventFiles = await globPromise(`E:/Customer/KN10002/discordjs-base-handler/events/*.js`);
    eventFiles.map((value) => require(value));

    // ———————————————[Slash Commands]———————————————
    // Suche nach Slash-Command-Dateien und lade sie
    const slashCommands = await globPromise(
        `${process.cwd()}/SlashCommands/*/*.js`
    );

    const arrayOfSlashCommands = [];
    slashCommands.map((value) => {
        const file = require(value);
        if (!file?.name) return;
        client.slashCommands.set(file.name, file);

        if (["MESSAGE", "USER"].includes(file.type)) delete file.description;
        arrayOfSlashCommands.push(file);
    });

    // Registriere Slash-Befehle, wenn der Bot bereit ist
    client.on("ready", async () => {
        // Stelle sicher, dass der Bot die APPLICATION_COMMANDS Berechtigung hat
        if (!client.application?.owner) await client.application?.fetch();

        const guild = await client.guilds.cache.get(process.env.APP_GUILDID);
        if (!guild) return console.log("Unable to find guild.");

        // Registriere Befehle in der angegebenen Gilde
        await guild.commands.set(arrayOfSlashCommands);

        // Alternativ: Registriere Befehle global
        // await client.application.commands.set(arrayOfSlashCommands);
    });
};