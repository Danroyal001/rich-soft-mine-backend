import { ObjectId } from "mongodb";
import transactions from "../collections/Transaction";
import Transaction from "../Schemas/Transaction";

const updateTransactionData = async (transaction_id: string | ObjectId, newTransactionData: Transaction) => {
    const updateData = await (await transactions()).updateOne({ _id: new ObjectId(transaction_id) }, {
        _id: newTransactionData._id ? new ObjectId(newTransactionData._id) : new ObjectId(transaction_id),
        updatedAt: new Date(),
        amount_in_naira: Number(newTransactionData.amount_in_naira) || 0,
        generic_amount: Number(newTransactionData.generic_amount) || 0,
        currency: newTransactionData.currency || 'NGN',
        ...{
            fromUser: new ObjectId(newTransactionData.fromUser!)!,
            touser: new ObjectId(newTransactionData.touser!)!,
            narration: newTransactionData.narration || '-- NO NARRATION PROVIDED --',
        },
    });

    return updateData;
};

export default updateTransactionData;
