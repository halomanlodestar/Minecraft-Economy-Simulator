/** @format */

interface data {
	maxNumberOfPlayers: number;
	govtFunds: number;
	landLeft: number;
}

export const landPrices = ({
	maxNumberOfPlayers,
	govtFunds,
	landLeft,
}: data): number => {
	return maxNumberOfPlayers * (1 / govtFunds) * (1 / landLeft) * 100000;
};
