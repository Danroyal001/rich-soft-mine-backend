"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const User_1 = __importDefault(require("../collections/User"));
const deleteUser = async (user_id) => {
    const response = await (await (0, User_1.default)()).deleteOne({ _id: new mongodb_1.ObjectId(user_id) });
    return response.acknowledged;
};
exports.default = deleteUser;
