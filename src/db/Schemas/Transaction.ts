import { ObjectId } from "mongodb";

interface Transaction {
    _id?: ObjectId;
    fromUser?: ObjectId;
    touser?: ObjectId;
    type?: 'credit' | 'debit' | 'generic';
    narration?: string;
    amount_in_naira?: number;
    generic_amount?: number;

    createdAt?: Date;
    updatedAt?: Date;
}


export default Transaction;
