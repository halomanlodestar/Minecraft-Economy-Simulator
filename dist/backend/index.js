"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const BN_coin_1 = require("./calc/Market/BN_coin");
const mongoose_1 = require("./mongo/mongoose");
async function run() {
    (0, mongoose_1.connectDatabase)();
    (0, BN_coin_1.Coin)(7);
}
run();
