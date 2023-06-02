"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const User_1 = require("../user/User");
const UserModel_1 = __importDefault(require("./Schemas/UserModel"));
const getUser = (id) => {
    UserModel_1.default.findById(id);
    return new User_1.User("user", id, "LoadStar2476");
};
exports.getUser = getUser;
