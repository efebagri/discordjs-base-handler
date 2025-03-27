// Import the required modules
const fs = require("fs");

// Export a function to configure the client
module.exports = async (client) => {
    // ———————————————[Events]———————————————
    // Search for event files and load them
    const eventFiles = fs.readdirSync(`${process.cwd()}/events`).filter(file => file.endsWith('.js'));
    eventFiles.forEach((file) => {
        require(`${process.cwd()}/events/${file}`);
    });

    // ———————————————[Slash Commands]———————————————
    // Search for slash command files and load them
    const slashCommands = fs.readdirSync(`${process.cwd()}/SlashCommands`, {withFileTypes: true})
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

    // Register slash commands when the bot is ready
    client.on("ready", async () => {
        // Ensure the bot has the APPLICATION_COMMANDS permission
        if (!client.application?.owner) await client.application?.fetch();

        const guild = await client.guilds.cache.get(process.env.APP_GUILDID);
        if (!guild) {
            // Register commands globally
            await client.application.commands.set(arrayOfSlashCommands);
            console.log("Unable to find guild. Loading Commands Global");
        } else {
            // Register commands in the specified guild
            await guild.commands.set(client.slashCommands);
            console.log("Loading Commands on guild: " + process.env.APP_GUILDID);
        }
    });
};