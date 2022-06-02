"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const User_1 = __importDefault(require("../collections/User"));
const UserRoles_1 = __importDefault(require("../collections/UserRoles"));
const getRoleForUser = async (user_id) => {
    const user = await (await (0, User_1.default)()).findOne({ _id: new mongodb_1.ObjectId(user_id) });
    const roleID = user.roleID;
    const role = await (await (0, UserRoles_1.default)()).findOne({ _id: new mongodb_1.ObjectId(roleID) });
    return role;
};
exports.default = getRoleForUser;
