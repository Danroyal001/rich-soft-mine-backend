import { ObjectId } from "mongodb";
import { Currencies } from "../Schemas/Transaction";
import initiateTransaction from "./initiateTransaction";

const credituser = async (user_id: string | ObjectId, amount_in_naira: number, recipient_user?: string | ObjectId, narration?: string, currency?: Currencies) => {
    return await initiateTransaction(new ObjectId(recipient_user), new ObjectId(user_id), amount_in_naira, narration, currency);
};

export default credituser;
