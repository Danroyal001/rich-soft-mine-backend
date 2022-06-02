"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyPassword_1 = __importDefault(require("../../util/verifyPassword"));
const getUsers_1 = __importDefault(require("./getUsers"));
const authenticate = async (email, password) => {
    const [user] = await (0, getUsers_1.default)({ email });
    if (!user) {
        throw new Error('user does not exist');
    }
    console.log(password, user.password);
    const verified = await (0, verifyPassword_1.default)(password, user.password);
    if (!verified) {
        throw new Error('Incorrect password');
    }
    return user;
};
exports.default = authenticate;
