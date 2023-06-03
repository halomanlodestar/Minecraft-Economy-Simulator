"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCategory = exports.updateValuation = void 0;
const Stocks_1 = __importDefault(require("../../../mongo/Schemas/Stocks"));
const updateValuation = (category, amount) => {
    Stocks_1.default.findOneAndUpdate({ category: category }, { $inc: { valuation: amount } });
};
exports.updateValuation = updateValuation;
const addCategory = (category, valuation) => {
    new Stocks_1.default({ category: category, valuation: valuation }).save();
};
exports.addCategory = addCategory;
