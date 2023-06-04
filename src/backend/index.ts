/** @format */

import { Coin } from "./calc/Market/BN_coin";
import { connectDatabase } from "./mongo/mongoose";
async function run() {
	connectDatabase();
	Coin(7);
}
run();
