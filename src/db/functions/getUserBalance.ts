import { ObjectId } from "mongodb";
import getUserTransactions from "./getUserTransactions";

const getUserBalance = async (user_id: string | ObjectId) => {
    const { outgoingTransactions, incomingTransactions } =
        await getUserTransactions(new ObjectId(user_id));

    const outgoingBalance = (await outgoingTransactions)
        .map((transaction) => transaction.amount_in_naira)!
        .reduce((a, b) => a! + b!)!;
    const incomingBalance = (await incomingTransactions)
        .map((transaction) => transaction.amount_in_naira)!
        .reduce((a, b) => a! + b!)!;

    const totalBalance = incomingBalance - outgoingBalance;

    return totalBalance;
};

export default getUserBalance;
