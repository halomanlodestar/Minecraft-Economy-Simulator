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
// Lowers = rarer
const rarityFactory = {
    diamond: 0.2,
    emerald: 1.2,
    gold: 1.0,
    iron: 1.1,
};
const totalAmount = 10000; // total amount of coins in circulation
////////////////////////////////////////////////////////////////
// Everytime the function is called it will calculate new
// relative values based on the current of the Gov. Reserves
// and the max concurent players in the server
// and will return VOID
////////////////////////////////////////////////////////////////
const Coin = async (concurrentPlayers) => {
    const [{ emerald, diamond, gold, iron }] = (await GovernmentReserve_1.default.find());
    const { balance } = (await User_1.default.findOne({ id: 100 })); // Check current balance of Gov. also refered as user 100
    // Relative values formed into an Object
    const relativeValues = {
        emerald: calcualteRelativeValues(emerald, concurrentPlayers, balance, "emerald"),
        gold: calcualteRelativeValues(gold, concurrentPlayers, balance, "gold"),
        diamond: calcualteRelativeValues(diamond, concurrentPlayers, balance, "diamond"),
        iron: calcualteRelativeValues(iron, concurrentPlayers, balance, "iron"),
    };
    new RelativeValues_1.default({ ...relativeValues }).save(); // Add the new values to the database
    ////////////////////////////////////////////////////////////////
    // The latest values can be accessed by getting the last added
    // record to the database
    // it can be done by the code written below
    // RelativeValues.find().sort({_id: -1}).limit(1)
    ////////////////////////////////////////////////////////////////
};
exports.Coin = Coin;
////////////////////////////////////////////////////////////////
// This function will calculate the relative values based on input parameters
// and will return it for individual resource
//////////////////////////////////////////////////////////////////
const calcualteRelativeValues = (amount, concurrentPlayers, balance, name) => {
    const value = ((amount * concurrentPlayers * rarityFactory[name]) / 100) *
        (balance / totalAmount) +
        1;
    // adding +1 incase the value is 0, these coins will be for free.
    // in some cases the value will remain as low as 1. such as in case of diamond
    return Math.round(value);
};
