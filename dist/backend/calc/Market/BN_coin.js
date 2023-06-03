"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coin = void 0;
const GovernmentReserve_1 = __importDefault(require("../../mongo/Schemas/GovernmentReserve"));
const User_1 = __importDefault(require("../../mongo/Schemas/User"));
const totalAmount = 10000;
const Coin = async (concurrentPlayers) => {
    const [{ emerald, diamond, gold, iron }] = (await GovernmentReserve_1.default.find());
    const { balance } = (await User_1.default.findOne({ id: 100 }));
    const relativeValues = {
        emerald: calcualteRelativeValues(emerald, concurrentPlayers, balance),
        gold: calcualteRelativeValues(gold, concurrentPlayers, balance),
        diamond: calcualteRelativeValues(diamond, concurrentPlayers, balance),
        iron: calcualteRelativeValues(iron, concurrentPlayers, balance),
    };
    console.log(relativeValues);
};
exports.Coin = Coin;
const calcualteRelativeValues = (amount, concurrentPlayers, balance) => {
    return (Math.round((((amount / totalAmount) * concurrentPlayers) / balance) * 10 ** 6) + 1);
};
