/** @format */

import { Schema, model } from "mongoose";

const stocksSchemea = new Schema({
	category: String,
	valuation: Number,
});

export default model("Stocks", stocksSchemea);
