import { ObjectId } from "mongodb";
import Chronological from "./Chronological";

export type Currencies = 'NGN' | 'USD' | 'GBP' | 'BTC' | 'ETH' | 'BNB';

export const currencyConversionRates = {
    'NGN': 1,
    'USD': 500,
    'GBP': 600,
    'BNB': 1,
    'ETH': 1,
    'BTC': 1,
} as Record<Currencies, number>;

interface Transaction extends Chronological {
    _id?: ObjectId;
    fromUser?: ObjectId;
    touser?: ObjectId;
    narration?: string;
    currency: Currencies,
    amount_in_naira?: number;
    generic_amount?: number;
}


export default Transaction;
