"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("./../backend/mongo/mongoose");
const dotenv_1 = require("dotenv");
const discord_js_1 = require("discord.js");
const commands_1 = require("./commands");
const commands_2 = require("./commands");
const commands_3 = require("./commands");
const values_1 = require("./commands/values");
const leaderboard_1 = require("./commands/leaderboard");
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
client.once("ready", (c) => {
    console.log(`${c.user.tag} is Online ✅`);
    client.user?.setActivity({
        name: "Under Development :D",
        type: discord_js_1.ActivityType.Playing,
    });
});
client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand())
        return;
    const id = interaction.user.id;
    const embed = new discord_js_1.EmbedBuilder().setColor("Green");
    switch (interaction.commandName) {
        case "register":
            await (0, commands_1.register)(interaction, id, embed);
            return;
        case "balance":
            await (0, commands_2.balance)(interaction, id, embed);
            return;
        case "transaction":
            await (0, commands_3.transaction)(interaction, id, embed);
            return;
        case "transaction_gov":
            await (0, commands_1.transactionGov)(interaction, id, embed);
            return;
        case "history":
            await (0, commands_1.history)(interaction, id, embed);
            return;
        case "landprices":
            await (0, commands_1.landprices)(interaction, id, embed);
            return;
        case "values":
            await (0, values_1.values)(interaction, id, embed);
            return;
        case "leaderboard":
            await (0, leaderboard_1.leaderboard)(interaction, id, embed);
            return;
        case "reverttransaction":
            await (0, commands_1.revertTransaction)(interaction, id, embed);
            return;
    }
});
client.login(process.env.TOKEN);
