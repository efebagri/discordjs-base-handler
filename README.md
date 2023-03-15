# 💾 DiscordJS-base-handler

<div align="center">
    <a href="https://discord.js.org"><img src="https://discord.js.org/static/logo.svg" width="546" alt="discord.js" /></a>
</div>

![](https://img.shields.io/badge/Code-JavaScript-informational?style=flat&logo=javascript&logoColor=white&color=6aa6f8)
![](https://img.shields.io/badge/npm-v.18.13.0-informational?style=flat&logo=npm&logoColor=white&color=6aa6f8)
![visitors](https://visitor-badge.laobi.icu/badge?page_id=razetro.discordjs-base-handler)

# 💾 DiscordJS-base-handler
DiscordJS-base-handler is a functional, beginner friendly Discord Modular Bot written in JavaScript. This DiscordJS base handler contains **ONLY** slash commands.

# Getting Started
### Requirements
* [**Node.js 18.13.0+**](https://nodejs.org/en/)

#### Example Slash Commands
```js
const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require('discord.js');

module.exports = {
    ...new SlashCommandBuilder()
        .setName("YOUR_COMMAND_NAME")
        .setDescription("Type here your description"),

    run: async (client, interaction) => {
        try {
            return 'YOUR FUNCTION HERE';
        } catch (e) {
            console.log(String(e.stack))
            return interaction.channel.send({embeds: [new EmbedBuilder()
                .setColor(0xf13737)
                .setFooter({ text: process.env.APP_NAME, iconURL: client.user.avatarURL(client.user) })
                .setTimestamp()
                .setTitle(`❌ ERROR | An error occurred`)
                .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
            ]});
        }
    },
};
```

# 📑 Features
| Features        | Supported |
| ------------- | -----:|
| supports subfolders | ✅ |
| Slash Command handler | ✅ |
| Database Support (Coming soon) | ❌ |
| Command handler (will be removed because of new discord.js version) | ❌ |
| Debug System (Coming soon) | ❌ |

# 🗃️ Commands
| Commands        | Description           | Version |
| ------------- |:-------------:| -----:|
| ``/ping`` | returns websocket ping | 1.1 |
| ``/avatar`` | display a users avatar | 1.0 |
| ``/echo`` | echo your message | 1.0 |
| ``/clearchat`` | delete your messages | 1.0 |

# 🙏 Thanks to:
### 🧑🏻‍🤝‍🧑🏻 Contributors
* Sloscow

### 🚧 Used Open-Source projects
* [discordjs/discord.js](https://github.com/discordjs/discord.js)
* [npmjs/dotenv](https://www.npmjs.com/package/dotenv)
* [npmjs/glob](https://www.npmjs.com/package/glob)
