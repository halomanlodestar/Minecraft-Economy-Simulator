/** @format */

import User from "../mongo/Schemas/User";
import { IUser } from "../../../types";

////////////////////////////////////////////////////////////////
// fetch the data of a user using the id
// will return all required attributes if the user is found
// otherwise a string value will be returned that can be used
// output for the frontend
////////////////////////////////////////////////////////////////
export const getUser = async (id: string) => {
	if (!(await User.findOne({ id: id }))) {
		return "user not found";
	}
	return (await User.findOne({ id: id })) as IUser;
};
