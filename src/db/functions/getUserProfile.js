"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = require("mongodb");
const UserProfile = __importDefault(require("../collections/UserProfile"));
const getUserProfile = async (user_id) => {
    return await (await (0, UserProfile.default)()).findOne({ _id: new mongodb.ObjectId(user_id) });
};
exports.default = getUserProfile;
