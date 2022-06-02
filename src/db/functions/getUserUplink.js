"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const getUserByID_1 = __importDefault(require("./getUserByID"));
const getUserUplink = async (user_id) => {
    const user = await (0, getUserByID_1.default)(new mongodb_1.ObjectId(user_id));
    const uplink = await (0, getUserByID_1.default)(user?.uplinkID);
    return uplink;
};
exports.default = getUserUplink;
