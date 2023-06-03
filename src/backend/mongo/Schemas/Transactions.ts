/** @format */

import { Schema, model } from "mongoose";

const transactionsSchema = new Schema({
	senderId: Number,
	recipientId: Number,
	amount: Number,
	time: Number,
	transactionCategory: String,
});

export default model("Transactions", transactionsSchema);
