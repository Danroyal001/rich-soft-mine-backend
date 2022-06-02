"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User = __importDefault(require("../collections/User"));
const getUsers = async (query = {}) => {
    const _users = (await (0, User.default)()).find(query).toArray();
    return _users;
};
exports.default = getUsers;
