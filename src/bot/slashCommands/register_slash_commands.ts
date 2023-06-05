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
