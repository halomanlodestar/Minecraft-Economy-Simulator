"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coin = void 0;
const GovernmentReserve_1 = __importDefault(require("../../mongo/Schemas/GovernmentReserve"));
const RelativeValues_1 = __importDefault(require("../../mongo/Schemas/RelativeValues"));
const User_1 = __importDefault(require("../../mongo/Schemas/User"));
const rarityFactory = {
    diamond: 5,
    emerald: 15,
    gold: 17,
    iron: 17,
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
    new RelativeValues_1.default({ ...relativeValues }).save();
};
exports.Coin = Coin;
const calcualteRelativeValues = (amount, concurrentPlayers, balance, name) => {
    const coinsFactor = balance / totalAmount;
    const playersFactor = concurrentPlayers / 100;
    const secondaryCurrencyFactor = amount / totalAmount;
    const rarityFactor = 1 + (rarityFactory[name] - 1) * (secondaryCurrencyFactor / coinsFactor);
    const value = (coinsFactor + playersFactor - secondaryCurrencyFactor * rarityFactor) *
        100;
    return (Math.round((((amount / totalAmount) * concurrentPlayers) / balance) * 10 ** 6) + 1);
};
