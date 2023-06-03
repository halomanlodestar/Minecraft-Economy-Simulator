/** @format */

import { connectDatabase } from "./mongo/mongoose";
async function run() {
	connectDatabase();
}
run();
