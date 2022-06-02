"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const getUserTransactions_1 = __importDefault(require("./getUserTransactions"));
const getUserBalance = async (user_id) => {
    const { outgoingTransactions, incomingTransactions } = await (0, getUserTransactions_1.default)(new mongodb_1.ObjectId(user_id));
    const outgoingBalance = (await outgoingTransactions)
        .map((transaction) => transaction.amount_in_naira)
        .reduce((a, b) => a + b);
    const incomingBalance = (await incomingTransactions)
        .map((transaction) => transaction.amount_in_naira)
        .reduce((a, b) => a + b);
    const totalBalance = incomingBalance - outgoingBalance;
    return totalBalance;
};
exports.default = getUserBalance;
