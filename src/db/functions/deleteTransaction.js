"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const Transaction_1 = __importDefault(require("../collections/Transaction"));
const deleteTransaction = async (transaction_id) => {
    return await (await (0, Transaction_1.default)()).deleteOne({ _id: new mongodb_1.ObjectId(transaction_id) });
};
exports.default = deleteTransaction;
