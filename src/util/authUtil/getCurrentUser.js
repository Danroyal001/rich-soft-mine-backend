"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getUsers = __importDefault(require("../../db/functions/getUsers"));
const verifyPassword = __importDefault(require("../verifyPassword"));
const extractEmailAndPassword = __importDefault(require("./extractEmailAndPassword"));
const getCurrentUser = async (req) => {
    const { email, password } = (0, extractEmailAndPassword.default)(req);
    const [user] = await (0, getUsers.default)({
        email,
    });
    const verified = await (0, verifyPassword.default)(password, user.password);
    if (!verified) {
        throw new Error("Invalid password");
    }
    return user;
};
exports.default = getCurrentUser;
