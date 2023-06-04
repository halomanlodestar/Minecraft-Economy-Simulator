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

// Lowers = rarer
const rarityFactory = {
	diamond: 0.2,
	emerald: 1.2,
	gold: 1.0,
	iron: 1.1,
};

const totalAmount = 10000; // total amount of coins in circulation

////////////////////////////////////////////////////////////////
// Everytime the function is called it will calculate new
// relative values based on the current of the Gov. Reserves
// and the max concurent players in the server
// and will return VOID
////////////////////////////////////////////////////////////////
export const Coin = async (concurrentPlayers: number) => {
	const [{ emerald, diamond, gold, iron }] =
		(await GovernmentReserve.find()) as resources[];

	const { balance } = (await User.findOne({ id: 100 })) as IUser; // Check current balance of Gov. also refered as user 100

	// Relative values formed into an Object
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

	new RelativeValues({ ...relativeValues }).save(); // Add the new values to the database

	////////////////////////////////////////////////////////////////
	// The latest values can be accessed by getting the last added
	// record to the database
	// it can be done by the code written below
	// RelativeValues.find().sort({_id: -1}).limit(1)
	////////////////////////////////////////////////////////////////
};

////////////////////////////////////////////////////////////////
// This function will calculate the relative values based on input parameters
// and will return it for individual resource
//////////////////////////////////////////////////////////////////
const calcualteRelativeValues = (
	amount: number,
	concurrentPlayers: number,
	balance: number,
	name: "diamond" | "gold" | "emerald" | "iron"
): number => {
	const value =
		((amount * concurrentPlayers * rarityFactory[name]) / 100) *
			(balance / totalAmount) +
		1;
	// adding +1 incase the value is 0, these coins will be for free.
	// in some cases the value will remain as low as 1. such as in case of diamond
	return Math.round(value);
};
