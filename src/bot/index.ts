/** @format */

import { config } from "dotenv";
import { Client, IntentsBitField } from "discord.js";
config();

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

client.on("messageCreate", (message) => {
	const [command, amount, channel] = message.content
		.split(" ")
		.filter((c) => c.length != 0);
	if (!message.author.bot && command === "!purge") {
		message.channel.send(
			`purged ${command} messaged from ${channel ? channel : message.channel}`
		);
		console.log(`purge message logged by ${message.author.username}`);
	}
});

client.login(process.env.TOKEN);
