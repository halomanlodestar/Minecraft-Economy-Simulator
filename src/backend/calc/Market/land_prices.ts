/** @format */

import RelativeValues from "../../mongo/Schemas/RelativeValues";

interface data {
	maxNumberOfPlayers: number;
	govtFunds: number;
	landLeft: number;
}

export const landPrices = async ({
	maxNumberOfPlayers,
	govtFunds,
	landLeft,
}: data): Promise<number> => {
	const emsValue = await RelativeValues.find().sort({ _id: -1 }).limit(1);
	return (
		Math.floor(
			((maxNumberOfPlayers * (1 / govtFunds) * (1 / landLeft) * 10 ** 8) /
				2 /
				emsValue[0].emerald!) *
				100
		) / 1000
	);
};
