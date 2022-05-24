import { ObjectId } from "mongodb";
import transactions from "../collections/Transaction";
import { Currencies, currencyConversionRates } from "../Schemas/Transaction";

const initiateTransaction = async (initiating_user_id: string | ObjectId, recipient_user_id: string | ObjectId, amount_in_naira: number, narration?: string, currency?: Currencies) => {
    const transaction = await (await transactions()).insertOne({
        currency: currency! || 'NGN',
        amount_in_naira: amount_in_naira! || 0,
        createdAt: new Date(),
        fromUser: new ObjectId(initiating_user_id),
        generic_amount: currency ? (amount_in_naira! || 0) * currencyConversionRates[currency] : (amount_in_naira! || 0),
        narration: narration! || '-- NO NARRATION PROVIDED --',
        touser: new ObjectId(recipient_user_id),
        updatedAt: new Date()
    });

    return transaction;
};

export default initiateTransaction;
