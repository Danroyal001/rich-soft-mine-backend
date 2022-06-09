"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});

const { default: User } = require("../collections/User");

const getUserDownlinks = async (user_id) => {
    return await (await (0, User.default)()).find({
        uplinkID: new mongodb.ObjectId(user_id)
    }).toArray();
};
exports.default = getUserDownlinks;