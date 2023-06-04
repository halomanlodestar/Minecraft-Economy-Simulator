"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateValuation = void 0;
const Stocks_1 = __importDefault(require("../../../mongo/Schemas/Stocks"));
////////////////////////////////////////////////////////////////
// this function will update the valuation of each category
// chainging valuation will change the price the items in each category
////////////////////////////////////////////////////////////////
const updateValuation = (category, amount) => {
    Stocks_1.default.findOneAndUpdate({ category: category }, { $inc: { valuation: amount } });
};
exports.updateValuation = updateValuation;
// This function is useful for the first run to add dummy data
const addCategory = (category, valuation) => {
    new Stocks_1.default({ category: category, valuation: valuation }).save();
};
