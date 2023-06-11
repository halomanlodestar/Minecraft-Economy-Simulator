/** @format */

import {
	ChatInputCommandInteraction,
	CacheType,
	EmbedBuilder,
} from "discord.js";
import { getReltiveValues } from "../../backend/calc/Market/BN_coin";

export const values = async (
	interaction: ChatInputCommandInteraction<CacheType>,
	id: string,
	embed: EmbedBuilder
) => {
	const multiplier = interaction.options.get("quantity")?.value
		? interaction.options.get("quantity")?.value
		: 1;

	const value = (await getReltiveValues()) as {
		emerald: Number;
		gold: Number;
		diamond: Number;
		iron: Number;
	};

	interaction.reply({
		embeds: [
			embed.setDescription(
				`These values are the amount for 1 BNC \nEmeralds: ${value.emerald} \nDiamonds: ${value.diamond} \nGold: ${value.gold} \nIron: ${value.iron}`
			),
		],
	});
};
