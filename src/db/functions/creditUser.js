"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const initiateTransaction_1 = __importDefault(require("./initiateTransaction"));
const credituser = async (user_id, amount_in_naira, recipient_user, narration, currency) => {
    return await (0, initiateTransaction_1.default)(new mongodb_1.ObjectId(recipient_user), new mongodb_1.ObjectId(user_id), amount_in_naira, narration, currency);
};
exports.default = credituser;
