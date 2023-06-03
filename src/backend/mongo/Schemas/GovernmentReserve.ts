/** @format */

import { Schema, model } from "mongoose";

const governmentReserveScheman = new Schema({
	emerald: Number,
	gold: Number,
	diamond: Number,
	iron: Number,
});

export default model("GovernmentReserve", governmentReserveScheman);
