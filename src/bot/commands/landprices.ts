/** @format */
import {
	ChatInputCommandInteraction,
	CacheType,
	EmbedBuilder,
} from "discord.js";
import { landPrices } from "../../backend/calc/Market/land_prices";
import { getUser } from "../../backend/userFunctions";
import { IUser } from "../../../types";

export const landprices = async (
	interaction: ChatInputCommandInteraction<CacheType>,
	id: string,
	embed: EmbedBuilder
) => {
	const maxPlayers = interaction.options.get("max_players")?.value as number;
	const govtFunds = ((await getUser("100")) as IUser).balance as number;
	try {
		const landLeft = eval(
			interaction.options.get("land")?.value?.toString()!
		) as number;
		if (landLeft > 10000 || landLeft < 0) {
			interaction.reply(`That's not a valid Quantity`);
			return;
		}

		const prices = await landPrices({
			maxNumberOfPlayers: maxPlayers,
			govtFunds,
			landLeft,
		});

		// console.log(maxPlayers, govtFunds, landLeft);

		interaction.reply(`Prices per block is \`${prices}\` BN Coins`);
	} catch (error) {
		interaction.reply({
			embeds: [embed.setDescription("Please input a valid expression/amount")],
		});
		return;
	}
};
