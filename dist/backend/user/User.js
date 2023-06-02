"use strict";
/** @format */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const UserModel_1 = __importDefault(require("../mongo/Schemas/UserModel"));
class User {
    name;
    id;
    balance = 0;
    gamerTag;
    valuation;
    tax;
    constructor(id) {
        this.id = id;
    }
    async getUser() {
        if (!this.verifyUser())
            return Status.USER_NOT_FOUND;
        const data = await UserModel_1.default.findOne({ id: this.id });
        this.name = data?.name;
        this.balance = data?.balance;
        this.gamerTag = data?.gamerTag;
        this.valuation = data?.valuation;
        this.tax = data?.valuation ? (data?.valuation * 2.5) / 100 : 0;
        return this;
    }
    async addUser(name, gamerTag, balance = 0, valuation, tax) {
        await UserModel_1.default.create({
            id: this.id,
            name,
            balance,
            gamerTag,
            valuation,
            tax,
        });
    }
    async updateUser() {
        if (!(await this.verifyUser()))
            return Status.USER_NOT_FOUND;
        const user = await UserModel_1.default.findOneAndUpdate({ id: this.id }, { balance: this.balance, valuation: this.valuation, tax: this.tax }, (err) => {
            if (err)
                return Status.FAILED;
        });
        return Status.SUCCESS;
    }
    async verifyUser() {
        const data = await UserModel_1.default.findOne({ id: this.id });
        if (data?.name === this.name) {
            return Status.SUCCESS;
        }
        return Status.USER_NOT_FOUND;
    }
    getUserJSON() {
        return {
            name: this.name,
            id: this.id,
            balance: this.balance,
            gamerTag: this.gamerTag,
            valuation: this.valuation,
            tax: this.tax,
        };
    }
}
exports.User = User;
