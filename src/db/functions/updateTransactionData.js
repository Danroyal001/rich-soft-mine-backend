"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const Transaction_1 = __importDefault(require("../collections/Transaction"));
const updateTransactionData = async (transaction_id, newTransactionData) => {
    const updateData = await (await (0, Transaction_1.default)()).updateOne({ _id: new mongodb_1.ObjectId(transaction_id) }, {
        _id: newTransactionData._id ? new mongodb_1.ObjectId(newTransactionData._id) : new mongodb_1.ObjectId(transaction_id),
        updatedAt: new Date(),
        amount_in_naira: Number(newTransactionData.amount_in_naira) || 0,
        generic_amount: Number(newTransactionData.generic_amount) || 0,
        currency: newTransactionData.currency || 'NGN',
        ...{
            fromUser: new mongodb_1.ObjectId(newTransactionData.fromUser),
            touser: new mongodb_1.ObjectId(newTransactionData.touser),
            narration: newTransactionData.narration || '-- NO NARRATION PROVIDED --',
        },
    });
    return updateData;
};
exports.default = updateTransactionData;
