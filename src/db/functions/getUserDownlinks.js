"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const User_1 = __importDefault(require("../collections/User"));
const getUserDownlinks = async (user_id) => {
    return await (await (0, User_1.default)()).find({ uplinkID: new mongodb_1.ObjectId(user_id) }).toArray();
};
exports.default = getUserDownlinks;
