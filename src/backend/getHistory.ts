/** @format */

import Transactions from "./mongo/Schemas/Transactions";

export const getHistory = async (count: number) => {
	return await Transactions.find().sort({ _id: -1 }).limit(count);
};
