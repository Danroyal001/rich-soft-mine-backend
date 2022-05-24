import { ObjectId } from "mongodb";
import { Currencies } from "../Schemas/Transaction";
import initiateTransaction from "./initiateTransaction";

const debitUser = async (user_id: string | ObjectId, amount_in_naira: number, recipient_user?: string | ObjectId, narration?: string, currency?: Currencies) => {
    return await initiateTransaction(new ObjectId(user_id), new ObjectId(recipient_user), amount_in_naira, narration, currency);
};

export default debitUser;
