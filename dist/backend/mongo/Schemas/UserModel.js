"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: String,
    id: Number,
    balance: Number,
    gamerTag: String,
    valuation: Number,
});
exports.default = (0, mongoose_1.model)("UserModel", userSchema);
