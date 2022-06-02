"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const UserRoles_1 = __importDefault(require("../collections/UserRoles"));
const deleteRole = async (role_id) => {
    return await (await (0, UserRoles_1.default)()).deleteOne({ _id: new mongodb_1.ObjectId(role_id) });
};
exports.default = deleteRole;
