/** @format */

// import { User } from "./userFunctions/User";
import User from "./mongo/Schemas/User";
import { IUser } from "./types";
import { getUser } from "./userFunctions";

const Transaction = async (
	amount: number,
	senderId: number,
	recipientId: number
) => {
	const sender = (await getUser(senderId)) as IUser;
	const recipient = await getUser(recipientId);

	if (!sender || !recipient) return "user not found";
	if (!sender.balance || (sender.balance as number) <= amount)
		return "not enough balance";

	await User.findOneAndUpdate(
		{ id: sender.id },
		{ $inc: { balance: -amount } }
	);
	await User.findOneAndUpdate(
		{ id: recipientId },
		{ $inc: { balance: amount } }
	);

	return "Transaction successful";
};

export default Transaction;
