"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = void 0;
const User_1 = __importDefault(require("../mongo/Schemas/User"));
const addUser = async (id, name, gamerTag, valuation = 0, balance = 0) => {
    if (await User_1.default.findOne({ id: id, name: name })) {
        return "User already exists";
    }
    const user = new User_1.default({ id, name, balance, gamerTag, valuation });
    user.save().then();
    return "User successfully created";
};
exports.addUser = addUser;
