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
////////////////////////////////////////////////////////////////
// This function when called will create a new Transaction
// It checkes quite some things that can go wrong during a transaction
// It will update the balanced of both users
// The time of transaction is recorded in the form of discord timestamps
// and the transaction data is added to the database for future needs
// This function directly affects the stock Market system
// a Transaction will change the investments in a particular category
// the further information about stock market will soon be added to
// Stock Market part of the code.
// returns a string representing the status of the transaction
////////////////////////////////////////////////////////////////
const Transaction = async (amount, senderId, recipientId, transactionCategory) => {
    // The senderId and recipientId are the Discord Ids of respective users
    const sender = (await (0, userFunctions_1.getUser)(senderId));
    const recipient = await (0, userFunctions_1.getUser)(recipientId);
    if (!sender || !recipient)
        return "user not found"; // if one of the user doesn't exist
    if (!sender.balance || sender.balance <= amount)
        // if the sender's doesn't have enough balance
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
