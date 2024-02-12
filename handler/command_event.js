/*
 * User: efebagri
 * Date/Time: 2/12/24, 2:58 AM
 * File: command_event.js
 *
 * Modified: 1/9/24, 2:40 PM
 *
 * Copyright (c) 2023-2024 Exbil (https://www.exbil.net/)
 *    All rights Reserved.
 */

// Importiere die benötigten Module
const fs = require("fs");

// Exportiere eine Funktion, die den Client konfiguriert
module.exports = async (client) => {
    // ———————————————[Events]———————————————
    // Suche nach Event-Dateien und lade sie
    const eventFiles = fs.readdirSync(`${process.cwd()}/events`).filter(file => file.endsWith('.js'));
    eventFiles.forEach((file) => {
        require(`${process.cwd()}/events/${file}`);
    });

    // ———————————————[Slash Commands]———————————————
    // Suche nach Slash-Command-Dateien und lade sie
    const slashCommands = fs.readdirSync(`${process.cwd()}/SlashCommands`, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .flatMap(dirent => fs.readdirSync(`${process.cwd()}/SlashCommands/${dirent.name}`).map(file => ({
            dir: dirent.name,
            file
        })));

    const arrayOfSlashCommands = [];
    slashCommands.forEach((command) => {
        const file = require(`${process.cwd()}/SlashCommands/${command.dir}/${command.file}`);
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
        if(!guild) {
            // Registriere Befehle global
            await client.application.commands.set(arrayOfSlashCommands);
            console.log("Unable to find guild. Loading Commands Global");
        } else {
            // Registriere Befehle in der angegebenen Gilde
            await guild.commands.set(client.slashCommands);
            console.log("Loading Commands on guild: " + process.env.APP_GUILDID);
        }
    });
};
