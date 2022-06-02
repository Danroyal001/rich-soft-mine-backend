"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const Transaction_1 = __importDefault(require("../collections/Transaction"));
const getUserTransactions = async (user_id) => {
    const outgoingTransactions = await (await (0, Transaction_1.default)()).find({ fromUser: new mongodb_1.ObjectId(user_id) }).toArray();
    const incomingTransactions = await (await (0, Transaction_1.default)()).find({ toUser: new mongodb_1.ObjectId(user_id) }).toArray();
    const allTransactions = [...incomingTransactions, ...outgoingTransactions];
    return {
        incomingTransactions,
        outgoingTransactions,
        allTransactions
    };
};
exports.default = getUserTransactions;
