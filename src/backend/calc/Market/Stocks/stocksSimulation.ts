/** @format */

import Stocks from "../../../mongo/Schemas/Stocks";
import { itemCategories } from "./itemCategories";

////////////////////////////////////////////////////////////////
// this function will update the valuation of each category
// chainging valuation will change the price the items in each category
////////////////////////////////////////////////////////////////
export const updateValuation = (category: itemCategories, amount: number) => {
	Stocks.findOneAndUpdate(
		{ category: category },
		{ $inc: { valuation: amount } }
	);
};

// This function is useful for the first run to add dummy data
const addCategory = (category: string, valuation: number) => {
	new Stocks({ category: category, valuation: valuation }).save();
};
