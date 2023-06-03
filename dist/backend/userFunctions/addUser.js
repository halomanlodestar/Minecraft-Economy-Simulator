"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = void 0;
const _1 = require(".");
const User_1 = __importDefault(require("../mongo/Schemas/User"));
const addUser = async (id, name, gamerTag, valuation = 0, balance = 0) => {
    if ((await (0, _1.getUser)(id)).id === id) {
        return "User already exists";
    }
    const user = new User_1.default({ id, name, balance, gamerTag, valuation });
    await user.save();
    return "User successfully created";
};
exports.addUser = addUser;
