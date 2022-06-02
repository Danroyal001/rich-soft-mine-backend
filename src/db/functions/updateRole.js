"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const UserRoles_1 = __importDefault(require("../collections/UserRoles"));
const updateRole = async (role_id, newRoleData) => {
    let role = await (await (0, UserRoles_1.default)()).findOne({ _id: new mongodb_1.ObjectId(role_id) });
    role = {
        ...role,
        ...newRoleData
    };
    return await (await (0, UserRoles_1.default)()).updateOne({ _id: new mongodb_1.ObjectId(role_id) }, role);
};
exports.default = updateRole;
