/** @format */

import { connectDatabase } from "./../backend/mongo/mongoose";
import { config } from "dotenv";
import { Client, IntentsBitField, EmbedBuilder } from "discord.js";
import { history, register, transactionGov } from "./slashCommands";
import { balance } from "./slashCommands";
import { transaction } from "./slashCommands";
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

client.once("ready", (c) => console.log(`${c.user.tag} is Online ✅`));

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
	}
});

client.login(process.env.TOKEN);
