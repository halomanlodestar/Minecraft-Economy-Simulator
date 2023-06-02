/** @format */

import { connect } from "mongoose";
import { config } from "dotenv";
config();

export const connectDatabase = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnitFieldTopology: true,
	};

	const password = encodeURIComponent("vLo5Y8t7B8e86Ags");

	try {
		connect(
			`mongodb+srv://Kunal_Rana:${password}@economycluster.krtgexu.mongodb.net/?retryWrites=true&w=majority`,
			{}
		).then(() => {
			console.log("connection established");
		});
	} catch (error) {
		console.log(error);
	}
};
