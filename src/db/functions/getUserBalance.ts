import { ObjectId } from "mongodb";
import transactions from "../collections/Transaction";

const getUserBalance = async (user_id: string | ObjectId) => {
    const outgoingTransactions = await (await transactions()).find({ fromUser: new ObjectId(user_id) }).toArray();
    const incomingTransactions = await (await transactions()).find({ touser: new ObjectId(user_id) }).toArray();

    const totalIncomingDebit = 0;
    const totalIncomingCredit = 0;
    const totalIncoming = totalIncomingCredit - totalIncomingDebit;

    const totalOutgoingDebit = 0;
    const totalOutgoingCredit = 0;
    const totalOutgoing = totalOutgoingCredit - totalOutgoingDebit;

    const total = totalIncoming + totalOutgoing;

    return total;
};

export default getUserBalance;
