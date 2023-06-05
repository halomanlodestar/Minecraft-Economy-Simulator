/** @format */

import { Schema, model } from "mongoose";

const transactionsSchema = new Schema({
	senderId: String,
	recipientId: String,
	amount: Number,
	time: Number,
	transactionCategory: String,
});

export default model("Transactions", transactionsSchema);
