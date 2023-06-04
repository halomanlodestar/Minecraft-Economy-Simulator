"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const User_1 = __importDefault(require("../mongo/Schemas/User"));
////////////////////////////////////////////////////////////////
// fetch the data of a user using the id
// will return all required attributes if the user is found
// otherwise a string value will be returned that can be used
// output for the frontend
////////////////////////////////////////////////////////////////
const getUser = async (id) => {
    if (!(await User_1.default.findOne({ id: id }))) {
        return "user not found";
    }
    return (await User_1.default.findOne({ id: id }));
};
exports.getUser = getUser;
