"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const User_1 = __importDefault(require("../collections/User"));
const setUserRole = async (user_id, role_id) => {
    const user = await (await (0, User_1.default)()).findOne({ _id: new mongodb_1.ObjectId(user_id) });
    user.roleID = new mongodb_1.ObjectId(role_id);
    return (await (await (0, User_1.default)()).updateOne({ _id: new mongodb_1.ObjectId(user_id) }, user)).acknowledged;
};
exports.default = setUserRole;
