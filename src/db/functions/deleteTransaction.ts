import { ObjectId } from "mongodb";
import transactions from "../collections/Transaction";

const deleteTransaction = async (transaction_id: string | ObjectId) => {
    return await (await transactions()).deleteOne({ _id: new ObjectId(transaction_id) });
};

export default deleteTransaction
