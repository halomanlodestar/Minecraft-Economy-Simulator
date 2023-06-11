/** @format */

import { EmbedBuilder } from "@discordjs/builders";
import { ChatInputCommandInteraction, CacheType } from "discord.js";
import User from "../../backend/mongo/Schemas/User";
import { IUser } from "../../../types";

export const leaderboard = async (
	interaction: ChatInputCommandInteraction<CacheType>,
	id: string,
	embed: EmbedBuilder
) => {
	const data = (await User.find().sort({ balance: -1 }).limit(10)) as IUser[];
	const formattedData = data
		.filter(({ id }) => id !== "100")
		.map(({ name, balance }, key) => `#${key + 1} • ${name} : ${balance}`)
		.join("\n");

	interaction.reply({
		embeds: [
			embed.setDescription(
				`Top 10 valued users in ${interaction.guild?.name}\n\n${formattedData}`
			),
		],
	});
};
