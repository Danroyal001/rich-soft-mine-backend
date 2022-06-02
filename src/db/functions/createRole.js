"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const UserRoles_1 = __importDefault(require("../collections/UserRoles"));
const createRole = async (roleData) => {
    const roleInExistence = (await (0, UserRoles_1.default)()).findOne({ name: roleData.name });
    let response = {
        alreadyExists: false,
        role: null
    };
    if (roleInExistence != null) {
        response.alreadyExists = true;
        response.role = null;
        return response;
    }
    const insert = await (await (0, UserRoles_1.default)()).insertOne(roleData);
    response.alreadyExists = false;
    response.role = await (await (0, UserRoles_1.default)()).findOne({ _id: new mongodb_1.ObjectId(insert.insertedId) });
    return response;
};
exports.default = createRole;
