"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = require("mongodb");
const UserRoles = __importDefault(require("../collections/UserRoles"));
const deleteRole = async (role_id) => {
    return await (await (0, UserRoles.default)()).deleteOne({ _id: new mongodb.ObjectId(role_id) });
};
exports.default = deleteRole;
