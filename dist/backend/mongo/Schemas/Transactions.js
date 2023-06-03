"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const transactionsSchema = new mongoose_1.Schema({
    senderId: Number,
    recipientId: Number,
    amount: Number,
    time: Number,
    transactionCategory: String,
});
exports.default = (0, mongoose_1.model)("Transactions", transactionsSchema);
