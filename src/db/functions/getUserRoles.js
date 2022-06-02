"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserRoles_1 = __importDefault(require("../collections/UserRoles"));
const getUserRoles = async () => {
    return (await (0, UserRoles_1.default)()).find().toArray();
};
exports.default = getUserRoles;
