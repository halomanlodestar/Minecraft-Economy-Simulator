/** @format */

import Transaction from "../../backend/Transaction";
/** @format */

import {
	ChatInputCommandInteraction,
	CacheType,
	EmbedBuilder,
} from "discord.js";

export const transaction = async (
	interaction: ChatInputCommandInteraction<CacheType>,
	id: string,
	embed: EmbedBuilder
) => {
	const senderID = id;
	const recipientID = interaction.options.get("recipient")?.value?.toString()!;

	const amount = interaction.options.get("amount")?.value as number;

	try {
		const desc = await Transaction(
			amount,
			senderID,
			recipientID,
			interaction.options.get("recipient")?.value
		);

		interaction.reply({
			embeds: [embed.setDescription(`${desc}`)],
		});
	} catch (error) {
		interaction.reply("An error has occurred");
		console.log(error);
		return;
	}
};
