# 💾 DiscordJS-base-handler

<div align="center">
    <a href="https://discord.js.org"><img src="https://discord.js.org/static/logo.svg" width="546" alt="discord.js" /></a>
</div>

![](https://img.shields.io/badge/Code-JavaScript-informational?style=flat&logo=javascript&logoColor=white&color=6aa6f8)
![](https://img.shields.io/badge/npm-v.18.15.0-informational?style=flat&logo=npm&logoColor=white&color=6aa6f8)
![visitors](https://visitor-badge.laobi.icu/badge?page_id=razetro.discordjs-base-handler)

# 💾 DiscordJS-base-handler
discordjs-base-handler is a functional, beginner friendly Discord Modular Bot written in JavaScript. The goal is to help beginners gain experience in JavaScript with this Discord Modular Bot.

# Getting Started
### Requirements
* [**Node.js 18.15.0+**](https://nodejs.org/en/)

#### Example Commands
```js
const { Message, Client } = require("discord.js");

module.exports = {
    name: "test",
    aliases: ['testing', 't'],

    run: async (client, message, args) => {
        message.channel.send(`This is a Test Command`);
    },
};
```

#### Example Slash Commands
```js
const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "test",
    description: "returns test",
    type: 'CHAT_INPUT',

    run: async (client, interaction, args) => {
        interaction.followUp({ content: `This is a Test Slash Command` });
    },
};
```

# 📑 Features
| Features        | Supported |
| ------------- | -----:|
| supports subfolders | ✅ |
| Slash Command handler | ✅ |
| Database Support | ✅ |
| Command handler | ✅ |
| Debug System | ❌ |

# 🙏 Thanks to:
### 🧑🏻‍🤝‍🧑🏻 Contributors
* Sloscow

### 🚧 Used Open-Source projects
* [discordjs/discord.js](https://github.com/discordjs/discord.js)
* [npmjs/dotenv](https://www.npmjs.com/package/dotenv)
* [npmjs/glob](https://www.npmjs.com/package/glob)
