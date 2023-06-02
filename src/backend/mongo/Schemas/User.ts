/** @format */

import { Schema, model } from "mongoose";

const userSchema = new Schema({
	name: String,
	id: Number,
	balance: Number,
	gamerTag: String,
	valuation: Number,
	tax: Number,
});

export default model("User", userSchema);
