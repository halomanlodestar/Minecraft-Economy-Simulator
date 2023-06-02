"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("./mongo/mongoose");
//
async function run() {
    (0, mongoose_1.connectDatabase)();
    // addUser(126, "LoadStar23", "LoadStar2576");
    // getUser(123).then(async (res) => console.log(res));
    // console.log(await Transaction(500, 123, 126));
}
run();
