"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const User_1 = __importDefault(require("../db/collections/User"));
const UserRoles_1 = __importDefault(require("../db/collections/UserRoles"));
const getAdmin = async () => {
    return await (await (0, User_1.default)()).findOne({
        roleID: new mongodb_1.ObjectId((await (await (0, UserRoles_1.default)()).findOne({
            name: "Admin",
        }))?._id),
    });
};
exports.default = getAdmin;
