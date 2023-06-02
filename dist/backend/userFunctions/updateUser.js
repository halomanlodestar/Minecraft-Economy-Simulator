"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const User_1 = __importDefault(require("../mongo/Schemas/User"));
const updateUser = (id, { balance, gamerTag, valuation }) => {
    console.log(User_1.default.findOne({ id }, { balance, gamerTag, valuation }));
};
exports.updateUser = updateUser;
