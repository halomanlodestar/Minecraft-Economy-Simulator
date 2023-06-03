/** @format */

import Stocks from "../../../mongo/Schemas/Stocks";
import { itemCategories } from "./itemCategories";

export const updateValuation = (category: itemCategories, amount: number) => {
	Stocks.findOneAndUpdate(
		{ category: category },
		{ $inc: { valuation: amount } }
	);
};

export const addCategory = (category: string, valuation: number) => {
	new Stocks({ category: category, valuation: valuation }).save();
};
