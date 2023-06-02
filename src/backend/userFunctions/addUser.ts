/** @format */

import User from "../mongo/Schemas/User";
export const addUser = async (
	id: number,
	name: string,
	gamerTag: string,
	valuation = 0,
	balance = 0
) => {
	if (await User.findOne({ id: id, name: name })) {
		return "User already exists";
	}

	const user = new User({ id, name, balance, gamerTag, valuation });
	user.save().then();

	return "User successfully created";
};
