"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const User_1 = __importDefault(require("../collections/User"));
const getUserByID = async (user_id) => {
    const id = new mongodb_1.ObjectId(user_id);
    const user = await (await (0, User_1.default)()).findOne({ _id: id });
    return user;
};
exports.default = getUserByID;
