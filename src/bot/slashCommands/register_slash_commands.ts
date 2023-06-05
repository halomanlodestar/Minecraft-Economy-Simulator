/** @format */

import { config } from "dotenv";
import { Routes, REST, ApplicationCommandOptionType } from "discord.js";
config();

const commands = [
	{
		name: "register",
		description: "Register your Account",
		options: [
			{
				name: "gamer_tag",
				description: "You Xbox Gamer Tag",
				type: ApplicationCommandOptionType.String,
				required: true,
			},
		],
	},
	{
		name: "balance",
		description: "Check your account balance",
		options: [
			{
				name: "user",
				description: "Mention of the user you want to check balance of",
				type: ApplicationCommandOptionType.User,
			},
		],
	},
	{
		name: "transaction",
		description: "Send money to another user",
		options: [
			{
				name: "recipient",
				description: "Mention of the recipient",
				type: ApplicationCommandOptionType.User,
				required: true,
			},
			{
				name: "amount",
				description: "Amount to send",
				type: ApplicationCommandOptionType.Number,
				required: true,
			},
		],
	},
	{
		name: "transaction_gov",
		description: "Make transaction from Government Account",
		options: [
			{
				name: "recipient",
				description: "Mention of the recipient",
				type: ApplicationCommandOptionType.User,
				required: true,
			},
			{
				name: "amount",
				description: "Amount to send",
				type: ApplicationCommandOptionType.Number,
				required: true,
			},
		],
	},
	{
		name: "history",
		description: "History of last 10 transactions",
	},
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);

(async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(
				process.env.CLIENT_ID!,
				process.env.GUILD_ID!
			),
			{ body: commands }
		);
		console.log("Slash command registered");
	} catch (error) {
		console.log(error);
	}
})();
