"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = require("mongodb");
const User = __importDefault(require("../collections/User"));
const UserRoles = __importDefault(require("../collections/UserRoles"));
const getRoleForUser = async (user_id) => {
    const user = await (await (0, User.default)()).findOne({ _id: new mongodb.ObjectId(user_id) });
    const roleID = user.roleID;
    const role = await (await (0, UserRoles.default)()).findOne({ _id: new mongodb.ObjectId(roleID) });
    return role;
};
exports.default = getRoleForUser;
