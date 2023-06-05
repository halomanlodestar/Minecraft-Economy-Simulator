/** @format */

import { getUser } from ".";
import { IUser } from "../types";

export const userExists = async (id: number) => {
	if (((await getUser(id)) as IUser).id == id) {
		return true;
	}
	return false;
};
