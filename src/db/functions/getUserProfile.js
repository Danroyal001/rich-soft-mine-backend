"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const UserProfile_1 = __importDefault(require("../collections/UserProfile"));
const getUserProfile = async (user_id) => {
    return await (await (0, UserProfile_1.default)()).findOne({ _id: new mongodb_1.ObjectId(user_id) });
};
exports.default = getUserProfile;
