/** @format */

import { connectDatabase } from "./mongo/mongoose";
// import transaction from "./Transaction";

//
async function run() {
	connectDatabase();
}
run();
