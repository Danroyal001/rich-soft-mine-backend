"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb = require("mongodb");
const hashPassword = __importDefault(require("../../util/hashPassword"));
const User = __importDefault(require("../collections/User"));
const updateUser = async (oldUser, newUser) => {
    let user = await (await (0, User.default)()).findOne({ _id: oldUser._id });
    if (newUser.password) {
        const newPassword = await (0, hashPassword.default)(newUser.password);
        user.password = newPassword;
        newUser.password = void 0;
    }
    newUser._id = new mongodb.ObjectId(newUser._id);
    user = { ...user, ...newUser };
    const response = await (await (0, User.default)()).updateOne({ _id: new mongodb.ObjectId(oldUser._id) }, user);
    return response.acknowledged;
};
exports.default = updateUser;
