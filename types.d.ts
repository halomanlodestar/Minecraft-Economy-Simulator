/** @format */

interface resource {
	name: string;
	quantity: number;
	valueWRTDiamond: number;
	changeInVal?: number;
}

interface IUser {
	name: String;
	id: string;
	balance: number;
	gamerTag: String;
	valuation: number;
}

export enum Status {
	SUCCESS = true,
	FAILED = false,
	USER_NOT_FOUND = false,
	NOT_ENOUGH_BALANCE = false,
}
