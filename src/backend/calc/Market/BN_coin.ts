/** @format */

import GovernmentReserve from "../../mongo/Schemas/GovernmentReserve";
import RelativeValues from "../../mongo/Schemas/RelativeValues";
import User from "../../mongo/Schemas/User";
import { IUser } from "../../types";

interface resources {
	emerald: number;
	gold: number;
	diamond: number;
	iron: number;
}

const rarityFactory = {
	diamond: 5,
	emerald: 15,
	gold: 17,
	iron: 17,
};

const totalAmount = 10000;

export const Coin = async (concurrentPlayers: number) => {
	const [{ emerald, diamond, gold, iron }] =
		(await GovernmentReserve.find()) as resources[];

	const { balance } = (await User.findOne({ id: 100 })) as IUser;
	const relativeValues = {
		emerald: calcualteRelativeValues(
			emerald,
			concurrentPlayers,
			balance as number,
			"emerald"
		),
		gold: calcualteRelativeValues(
			gold,
			concurrentPlayers,
			balance as number,
			"gold"
		),
		diamond: calcualteRelativeValues(
			diamond,
			concurrentPlayers,
			balance as number,
			"diamond"
		),
		iron: calcualteRelativeValues(
			iron,
			concurrentPlayers,
			balance as number,
			"iron"
		),
	};

	new RelativeValues({ ...relativeValues }).save();
};

const calcualteRelativeValues = (
	amount: number,
	concurrentPlayers: number,
	balance: number,
	name: "diamond" | "gold" | "emerald" | "iron"
) => {
	const coinsFactor = balance / totalAmount;
	const playersFactor = concurrentPlayers / 100;
	const secondaryCurrencyFactor = amount / totalAmount;
	const rarityFactor =
		1 + (rarityFactory[name] - 1) * (secondaryCurrencyFactor / coinsFactor);
	const value =
		(coinsFactor + playersFactor - secondaryCurrencyFactor * rarityFactor) *
		100;
	return (
		Math.round(
			(((amount / totalAmount) * concurrentPlayers) / balance) * 10 ** 6
		) + 1
	);
};
