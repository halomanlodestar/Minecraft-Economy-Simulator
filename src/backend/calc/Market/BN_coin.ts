/** @format */

import GovernmentReserve from "../../mongo/Schemas/GovernmentReserve";
import User from "../../mongo/Schemas/User";
import { IUser } from "../../types";

interface resources {
	emerald: number;
	gold: number;
	diamond: number;
	iron: number;
}
const totalAmount = 10000;

export const Coin = async (concurrentPlayers: number) => {
	const [{ emerald, diamond, gold, iron }] =
		(await GovernmentReserve.find()) as resources[];

	const { balance } = (await User.findOne({ id: 100 })) as IUser;
	const relativeValues = {
		emerald: calcualteRelativeValues(
			emerald,
			concurrentPlayers,
			balance as number
		),
		gold: calcualteRelativeValues(gold, concurrentPlayers, balance as number),
		diamond: calcualteRelativeValues(
			diamond,
			concurrentPlayers,
			balance as number
		),
		iron: calcualteRelativeValues(iron, concurrentPlayers, balance as number),
	};

	console.log(relativeValues);
};

const calcualteRelativeValues = (
	amount: number,
	concurrentPlayers: number,
	balance: number
) => {
	return (
		Math.round(
			(((amount / totalAmount) * concurrentPlayers) / balance) * 10 ** 6
		) + 1
	);
};
