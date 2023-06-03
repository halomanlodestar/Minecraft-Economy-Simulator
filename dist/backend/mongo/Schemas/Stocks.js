"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const stocksSchemea = new mongoose_1.Schema({
    category: String,
    valuation: Number,
});
exports.default = (0, mongoose_1.model)("Stocks", stocksSchemea);
