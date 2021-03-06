"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});
const mongodb = require("mongodb");
const User = __importDefault(require("../collections/User"));
const deleteUser = async (user_id) => {
    const response = await (await (0, User.default)()).deleteOne({
        _id: user_id
    });
    return response.acknowledged;
};
exports.default = deleteUser;