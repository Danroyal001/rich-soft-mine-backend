import { ObjectId } from "mongodb";
import Chronological from "./Chronological";

export type TransactionType = 'credit' | 'debit' | 'generic' | 'loan-credit';

interface Transaction extends Chronological {
    _id?: ObjectId;
    fromUser?: ObjectId;
    touser?: ObjectId;
    type?: TransactionType;
    narration?: string;
    amount_in_naira?: number;
    generic_amount?: number;
}


export default Transaction;
