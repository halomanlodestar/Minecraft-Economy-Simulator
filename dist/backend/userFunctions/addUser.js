"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = void 0;
const _1 = require(".");
const User_1 = __importDefault(require("../mongo/Schemas/User"));
////////////////////////////////////////////////////////////////
// function is used to add a new user to the database
// adding a new user will automatically add all the required
// attributes such as: id, name, balance, gamerTag and valuation
// this function will return a string value that can be used as
// output to the front end. In this case a discord bot
////////////////////////////////////////////////////////////////
const addUser = async (id, name, gamerTag, valuation = 0, balance = 0) => {
    if ((await (0, _1.getUser)(id)).id === id) {
        return "User has alread registered";
    }
    const user = new User_1.default({ id, name, balance, gamerTag, valuation });
    await user.save();
    return `Successfully registered <@${id}>`;
};
exports.addUser = addUser;
