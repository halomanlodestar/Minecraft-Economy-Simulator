/** @format */

import {
	ChatInputCommandInteraction,
	CacheType,
	EmbedBuilder,
} from "discord.js";
import { getHistory } from "../../backend/getHistory";

export const history = async (
	interaction: ChatInputCommandInteraction<CacheType>,
	id: string,
	embed: EmbedBuilder
) => {
	const data = (await getHistory(10)) as {
		senderId?: string | undefined;
		recipientId?: string | undefined;
		amount?: number | undefined;
		time?: number | undefined;
		transactionCategory?: string | undefined;
	}[];

	const formattedData = data.map((item) => {
		const senderMention =
			item.senderId !== "100" ? `<@${item.senderId}>` : "Government";
		const recipientMention = `<@${item.recipientId}>`;

		return `${item.amount} BN Coins\nfrom: ${senderMention}\nto: ${recipientMention}\nat: <t:${item.time}>`;
	});

	interaction.reply({
		embeds: [embed.setDescription(formattedData.join("\n\n"))],
	});
	return;
	// console.log(formattedData.join("\n"));
};
