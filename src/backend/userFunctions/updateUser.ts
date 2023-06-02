/** @format */

import User from "../mongo/Schemas/User";

interface updatables {
	balance?: number;
	gamerTag?: string;
	valuation?: Number;
}

export const updateUser = (
	id: number,
	{ balance, gamerTag, valuation }: updatables
) => {
	console.log(User.findOne({ id }, { balance, gamerTag, valuation }));
};
