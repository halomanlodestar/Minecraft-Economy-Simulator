/** @format */

import { getUser } from ".";
import User from "../mongo/Schemas/User";
import { IUser } from "../types";

////////////////////////////////////////////////////////////////
// function is used to add a new user to the database
// adding a new user will automatically add all the required
// attributes such as: id, name, balance, gamerTag and valuation
// this function will return a string value that can be used as
// output to the front end. In this case a discord bot
////////////////////////////////////////////////////////////////
export const addUser = async (
	id: number,
	name: string,
	gamerTag: string,
	valuation = 0,
	balance = 0
) => {
	if (((await getUser(id)) as IUser).id === id) {
		return "User has alread registered";
	}

	const user = new User({ id, name, balance, gamerTag, valuation });
	await user.save();

	return `Successfully registered <@${id}>`;
};
