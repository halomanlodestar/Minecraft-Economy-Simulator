"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("./../backend/mongo/mongoose");
const dotenv_1 = require("dotenv");
const discord_js_1 = require("discord.js");
const slashCommands_1 = require("./slashCommands");
const slashCommands_2 = require("./slashCommands");
// Basic Tasks
(0, dotenv_1.config)();
(0, mongoose_1.connectDatabase)();
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
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    const id = interaction.user.id;
    const embed = new discord_js_1.EmbedBuilder().setColor("Green");
    switch (interaction.commandName) {
        case "register":
            await (0, slashCommands_1.register)(interaction, id, embed);
            return;
        case "balance":
            await (0, slashCommands_2.balance)(interaction, id, embed);
    }
});
client.login(process.env.TOKEN);
