"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { User } from "./userFunctions/User";
const User_1 = __importDefault(require("./mongo/Schemas/User"));
const userFunctions_1 = require("./userFunctions");
const Transaction = async (amount, senderId, recipientId) => {
    const sender = (await (0, userFunctions_1.getUser)(senderId));
    const recipient = await (0, userFunctions_1.getUser)(recipientId);
    if (!sender || !recipient)
        return "user not found";
    if (!sender.balance || sender.balance <= amount)
        return "not enough balance";
    await User_1.default.findOneAndUpdate({ id: sender.id }, { $inc: { balance: -amount } });
    await User_1.default.findOneAndUpdate({ id: recipientId }, { $inc: { balance: amount } });
    return "Transaction successful";
};
exports.default = Transaction;
