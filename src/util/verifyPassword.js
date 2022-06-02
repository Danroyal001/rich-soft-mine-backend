"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importDefault(require("bcrypt"));
const verifyPassword = async (rawPassword, hashedPassword) => {
    return await bcrypt.default.compare(rawPassword, hashedPassword);
};
exports.default = verifyPassword;
