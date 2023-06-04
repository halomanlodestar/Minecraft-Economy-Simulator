"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coin = void 0;
const GovernmentReserve_1 = __importDefault(require("../../mongo/Schemas/GovernmentReserve"));
const User_1 = __importDefault(require("../../mongo/Schemas/User"));
const rarityFactory = {
    diamond: 0.2,
    emerald: 1.2,
    gold: 1.0,
    iron: 1.1,
};
const totalAmount = 10000;
const Coin = async (concurrentPlayers) => {
    const [{ emerald, diamond, gold, iron }] = (await GovernmentReserve_1.default.find());
    const { balance } = (await User_1.default.findOne({ id: 100 }));
    const relativeValues = {
        emerald: calcualteRelativeValues(emerald, concurrentPlayers, balance, "emerald"),
        gold: calcualteRelativeValues(gold, concurrentPlayers, balance, "gold"),
        diamond: calcualteRelativeValues(diamond, concurrentPlayers, balance, "diamond"),
        iron: calcualteRelativeValues(iron, concurrentPlayers, balance, "iron"),
    };
    // new RelativeValues({ ...relativeValues }).save();
    console.log(relativeValues);
};
exports.Coin = Coin;
const calcualteRelativeValues = (amount, concurrentPlayers, balance, name) => {
    const value = (amount * concurrentPlayers * rarityFactory[name] * 100) / balance + 1;
    return Math.round(value);
};
