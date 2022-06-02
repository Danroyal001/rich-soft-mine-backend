"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const Transaction_1 = __importDefault(require("../collections/Transaction"));
const Transaction_2 = require("../Schemas/Transaction");
const initiateTransaction = async (initiating_user_id, recipient_user_id, amount_in_naira, narration, currency) => {
    const transaction = await (await (0, Transaction_1.default)()).insertOne({
        currency: currency || 'NGN',
        amount_in_naira: amount_in_naira || 0,
        createdAt: new Date(),
        fromUser: new mongodb_1.ObjectId(initiating_user_id),
        generic_amount: currency ? (amount_in_naira || 0) * Transaction_2.currencyConversionRates[currency] : (amount_in_naira || 0),
        narration: narration || '-- NO NARRATION PROVIDED --',
        touser: new mongodb_1.ObjectId(recipient_user_id),
        updatedAt: new Date()
    });
    return transaction;
};
exports.default = initiateTransaction;
