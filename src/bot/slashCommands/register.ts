/** @format */

import { EmbedBuilder } from "@discordjs/builders";
import { CacheType, ChatInputCommandInteraction } from "discord.js";
import { addUser } from "../../backend/userFunctions";

export const register = async (
	interaction: ChatInputCommandInteraction<CacheType>,
	id: string,
	embed: EmbedBuilder
) => {
	const gamerTag = interaction.options.get("gamer_tag")?.value as string;
	const name = interaction.user.username;

	try {
		interaction.reply({
			embeds: [
				embed.setDescription(
					await addUser(Number.parseInt(id), name, gamerTag)
				),
			],
		});
		return;
	} catch (error) {
		interaction.reply("An error has occurred");
		console.log(error);
		return;
	}
};
