/** @format */

import { config } from "dotenv";
import {
	ChatInputCommandInteraction,
	CacheType,
	EmbedBuilder,
} from "discord.js";
import { transaction } from "./transaction";
config();

export const transactionGov = async (
	interaction: ChatInputCommandInteraction<CacheType>,
	id: string,
	embed: EmbedBuilder
) => {
	if (id != process.env.ADMIN_ID!) {
		interaction.reply({
			embeds: [
				embed.setDescription(
					"This command is only allowed to be used by Gov Owner"
				),
			],
		});
		return;
	}

	await transaction(interaction, "100", embed);
};
