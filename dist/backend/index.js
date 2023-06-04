"use strict";
/** @format */
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("./mongo/mongoose");
async function run() {
    (0, mongoose_1.connectDatabase)(); // Connecting to Mongo database
}
run();
