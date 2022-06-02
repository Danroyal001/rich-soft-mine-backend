"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getUsers = __importDefault(require("./getUsers"));
const generateBearerToken = async (email, password) => {
    const userExists = await (0, getUsers.default)({ email });
    if (!userExists) {
        throw new Error('This user does not exist');
    }
    const rawToken = `${email}:${password}`;
    const token = Buffer.from(rawToken).toString("base64");
    return token;
};
exports.default = generateBearerToken;
