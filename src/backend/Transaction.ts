/** @format */

// import { User } from "./userFunctions/User";
import User from "./mongo/Schemas/User";
import { IUser } from "./types";
import { getUser } from "./userFunctions";
import Transactions from "./mongo/Schemas/Transactions";
import { updateValuation } from "./calc/Market/Stocks/stocksSimulation";
import { Coin } from "./calc/Market/BN_coin";
import { itemCategories } from "./calc/Market/Stocks/itemCategories";

////////////////////////////////////////////////////////////////
// This function when called will create a new Transaction
// It checkes quite some things that can go wrong during a transaction
// It will update the balanced of both users
// The time of transaction is recorded in the form of discord timestamps
// and the transaction data is added to the database for future needs
// This function directly affects the stock Market system
// a Transaction will change the investments in a particular category
// the further information about stock market will soon be added to
// Stock Market part of the code.
// returns a string representing the status of the transaction
////////////////////////////////////////////////////////////////

const Transaction = async (
	amount: number,
	senderId: number,
	recipientId: number,
	transactionCategory: itemCategories
) => {
	// The senderId and recipientId are the Discord Ids of respective users
	const sender = (await getUser(senderId)) as IUser;
	const recipient = await getUser(recipientId);

	if (!sender || !recipient) return "user not found"; // if one of the user doesn't exist
	if (!sender.balance || (sender.balance as number) <= amount)
		// if the sender's doesn't have enough balance
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
