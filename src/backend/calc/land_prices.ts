/** @format */

interface data {
	numberOfPlayers: number;
	govtFunds: number;
	landLeft: number;
}

export const landPrices = ({
	numberOfPlayers,
	govtFunds,
	landLeft,
}: data): number => {
	return numberOfPlayers * (1 / govtFunds) * (1 / landLeft) * 100000;
};
