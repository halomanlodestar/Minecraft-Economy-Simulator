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
	diamond: 0.2,
	emerald: 1.2,
	gold: 1.0,
	iron: 1.1,
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

	// new RelativeValues({ ...relativeValues }).save();
	console.log(relativeValues);
};

const calcualteRelativeValues = (
	amount: number,
	concurrentPlayers: number,
	balance: number,
	name: "diamond" | "gold" | "emerald" | "iron"
) => {
	const value =
		(amount * concurrentPlayers * rarityFactory[name] * 100) / balance + 1;
	return Math.round(value);
};
