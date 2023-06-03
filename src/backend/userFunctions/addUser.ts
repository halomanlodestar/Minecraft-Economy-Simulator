/** @format */

import { getUser } from ".";
import User from "../mongo/Schemas/User";
import { IUser } from "../types";
export const addUser = async (
	id: number,
	name: string,
	gamerTag: string,
	valuation = 0,
	balance = 0
) => {
	if (((await getUser(id)) as IUser).id === id) {
		return "User already exists";
	}

	const user = new User({ id, name, balance, gamerTag, valuation });
	await user.save();

	return "User successfully created";
};
