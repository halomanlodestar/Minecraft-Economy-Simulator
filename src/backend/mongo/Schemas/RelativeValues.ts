/** @format */

import { Schema, model } from "mongoose";

const relativeValue = new Schema({
	emerald: Number,
	gold: Number,
	diamond: Number,
	iron: Number,
});

export default model("RelativeValues", relativeValue);
