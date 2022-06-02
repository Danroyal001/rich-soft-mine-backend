"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getUsers_1 = __importDefault(require("../../db/functions/getUsers"));
const verifyPassword_1 = __importDefault(require("../verifyPassword"));
const extractEmailAndPassword_1 = __importDefault(require("./extractEmailAndPassword"));
const getCurrentUser = async (req) => {
    const { email, password } = (0, extractEmailAndPassword_1.default)(req);
    const [user] = await (0, getUsers_1.default)({
        email,
    });
    const verified = await (0, verifyPassword_1.default)(password, user.password);
    if (!verified) {
        throw new Error("Invalid password");
    }
    return user;
};
exports.default = getCurrentUser;
