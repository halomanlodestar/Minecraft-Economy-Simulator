"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const discord_js_1 = require("discord.js");
(0, dotenv_1.config)();
const intents = new discord_js_1.IntentsBitField([
    discord_js_1.IntentsBitField.Flags.Guilds,
    discord_js_1.IntentsBitField.Flags.MessageContent,
    discord_js_1.IntentsBitField.Flags.GuildMembers,
    discord_js_1.IntentsBitField.Flags.GuildMessages,
]);
const client = new discord_js_1.Client({
    intents: intents,
});
client.once("ready", (c) => console.log(`${c.user.tag} is Online ✅`));
client.on("messageCreate", (message) => {
    const [command, amount, channel] = message.content
        .split(" ")
        .filter((c) => c.length != 0);
    if (!message.author.bot && command === "!purge") {
        message.channel.send(`purged ${command} messaged from ${channel ? channel : message.channel}`);
        console.log(`purge message logged by ${message.author.username}`);
    }
});
client.login(process.env.TOKEN);
