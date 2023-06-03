/** @format */

// import { User } from "./userFunctions/User";
import User from "./mongo/Schemas/User";
import { IUser } from "./types";
import { getUser } from "./userFunctions";
import Transactions from "./mongo/Schemas/Transactions";
import { updateValuation } from "./calc/Market/Stocks/stocksSimulation";
import { Coin } from "./calc/Market/BN_coin";
import { itemCategories } from "./calc/Market/Stocks/itemCategories";

const Transaction = async (
	amount: number,
	senderId: number,
	recipientId: number,
	transactionCategory: itemCategories
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

	const currentTime = Math.floor(Date.now() / 1000) as Number;

	new Transactions({
		senderId,
		recipientId,
		amount,
		time: currentTime,
		transactionCategory,
	}).save();

	updateValuation(transactionCategory, amount);

	if (senderId === 100 || recipientId === 100) Coin(10);

	return "Transaction successful";
};

export default Transaction;
