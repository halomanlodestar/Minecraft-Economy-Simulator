/** @format */

import User from "../mongo/Schemas/User";
import { IUser } from "../types";

export const getUser = async (id: number) => {
	if (!(await User.findOne({ id: id }))) {
		return "user not found";
	}
	return (await User.findOne({ id: id })) as IUser;
};
