"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("./mongo/mongoose");
// import transaction from "./Transaction";
//
async function run() {
    (0, mongoose_1.connectDatabase)();
}
run();
//
