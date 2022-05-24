import { ObjectId } from "mongodb";
import transactions from "../collections/Transaction";

const getUserTransactions = async (user_id: string | ObjectId) => {
    const outgoingTransactions = await (await transactions()).find({ fromUser: new ObjectId(user_id) }).toArray();
    const incomingTransactions = await (await transactions()).find({ toUser: new ObjectId(user_id) }).toArray();
    const allTransactions = [...incomingTransactions, ...outgoingTransactions];

    return {
        incomingTransactions,
        outgoingTransactions,
        allTransactions
    }
};

export default getUserTransactions;
