/** @format */

import { addUser, getUser } from "./userFunctions";
import { connectDatabase } from "./mongo/mongoose";
import Transaction from "./Transaction";

//
async function run() {
	connectDatabase();

	// addUser(126, "LoadStar23", "LoadStar2576");
	// getUser(123).then(async (res) => console.log(res));

	// console.log(await Transaction(500, 123, 126));
}

run();
