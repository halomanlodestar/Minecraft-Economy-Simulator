/** @format */

import {
	ChatInputCommandInteraction,
	CacheType,
	EmbedBuilder,
} from "discord.js";
import Transactions from "../../backend/Transaction";
export const revertTransaction = async (
	interaction: ChatInputCommandInteraction<CacheType>,
	id: string,
	embed: EmbedBuilder
) => {
	const output = await Transactions(
		interaction.options.get("amount")?.value as number,
		id,
		"100"
	);

	interaction.reply({ embeds: [embed.setDescription(output)] });
};
