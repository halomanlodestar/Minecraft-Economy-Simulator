"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { User } from "./userFunctions/User";
const User_1 = __importDefault(require("./mongo/Schemas/User"));
const userFunctions_1 = require("./userFunctions");
const Transactions_1 = __importDefault(require("./mongo/Schemas/Transactions"));
const stocksSimulation_1 = require("./calc/Market/Stocks/stocksSimulation");
const BN_coin_1 = require("./calc/Market/BN_coin");
const Transaction = async (amount, senderId, recipientId, transactionCategory) => {
    const sender = (await (0, userFunctions_1.getUser)(senderId));
    const recipient = await (0, userFunctions_1.getUser)(recipientId);
    if (!sender || !recipient)
        return "user not found";
    if (!sender.balance || sender.balance <= amount)
        return "not enough balance";
    await User_1.default.findOneAndUpdate({ id: sender.id }, { $inc: { balance: -amount } });
    await User_1.default.findOneAndUpdate({ id: recipientId }, { $inc: { balance: amount } });
    const currentTime = Math.floor(Date.now() / 1000);
    new Transactions_1.default({
        senderId,
        recipientId,
        amount,
        time: currentTime,
        transactionCategory,
    }).save();
    (0, stocksSimulation_1.updateValuation)(transactionCategory, amount);
    if (senderId === 100 || recipientId === 100)
        (0, BN_coin_1.Coin)(10);
    return "Transaction successful";
};
exports.default = Transaction;
