/** @format */

import { EmbedBuilder } from "@discordjs/builders";
import { IUser } from "../../backend/types";
import { userExists, getUser } from "../../backend/userFunctions";
import { CacheType, ChatInputCommandInteraction } from "discord.js";

export const balance = async (
	interaction: ChatInputCommandInteraction<CacheType>,
	id: string,
	embed: EmbedBuilder
) => {
	try {
		const intOptionalID = interaction.options.get("user")?.value
			? (interaction.options.get("user")?.value as number)
			: Number.parseInt(id);

		if (!(await userExists(intOptionalID))) {
			interaction.reply({
				embeds: [embed.setDescription("User is not registered")],
			});
			return;
		}

		const user = (await getUser(intOptionalID)) as IUser;

		interaction.reply({
			embeds: [
				embed.setDescription(
					`Balance of <@${
						interaction.options.get("user")?.value
							? interaction.options.get("user")?.value
							: id
					}> is ${user.balance}`
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
