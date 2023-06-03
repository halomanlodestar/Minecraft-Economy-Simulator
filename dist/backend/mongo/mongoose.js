"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = require("mongoose");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const connectDatabase = () => {
    const password = encodeURIComponent("vLo5Y8t7B8e86Ags");
    try {
        (0, mongoose_1.connect)(`mongodb+srv://Kunal_Rana:${password}@economycluster.krtgexu.mongodb.net/users?retryWrites=true&w=majority`, {}).then(() => {
            console.log("connection established");
        });
    }
    catch (error) {
        console.log(error);
    }
};
exports.connectDatabase = connectDatabase;
