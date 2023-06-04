"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const relativeValue = new mongoose_1.Schema({
    emerald: Number,
    gold: Number,
    diamond: Number,
    iron: Number,
});
exports.default = (0, mongoose_1.model)("RelativeValues", relativeValue);
