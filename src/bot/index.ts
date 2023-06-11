/** @format */

import { connectDatabase } from "./../backend/mongo/mongoose";
import { config } from "dotenv";
import {
	Client,
	IntentsBitField,
	EmbedBuilder,
	ActivityType,
} from "discord.js";
import {
	history,
	landprices,
	register,
	revertTransaction,
	transactionGov,
} from "./commands";
import { balance } from "./commands";
import { transaction } from "./commands";
import { values } from "./commands/values";
import { leaderboard } from "./commands/leaderboard";
// Basic Tasks
config();
connectDatabase();

const intents = new IntentsBitField([
	IntentsBitField.Flags.Guilds,
	IntentsBitField.Flags.MessageContent,
	IntentsBitField.Flags.GuildMembers,
	IntentsBitField.Flags.GuildMessages,
]);

const client = new Client({
	intents: intents,
});

client.once("ready", (c) => {
	console.log(`${c.user.tag} is Online ✅`);
	client.user?.setActivity({
		name: "Under Development :D",
		type: ActivityType.Playing,
	});
});

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const id = interaction.user.id;
	const embed = new EmbedBuilder().setColor("Green");

	switch (interaction.commandName) {
		case "register":
			await register(interaction, id, embed);
			return;
		case "balance":
			await balance(interaction, id, embed);
			return;
		case "transaction":
			await transaction(interaction, id, embed);
			return;
		case "transaction_gov":
			await transactionGov(interaction, id, embed);
			return;
		case "history":
			await history(interaction, id, embed);
			return;
		case "landprices":
			await landprices(interaction, id, embed);
			return;
		case "values":
			await values(interaction, id, embed);
			return;
		case "leaderboard":
			await leaderboard(interaction, id, embed);
			return;
		case "reverttransaction":
			await revertTransaction(interaction, id, embed);
			return;
	}
});

client.login(process.env.TOKEN);
