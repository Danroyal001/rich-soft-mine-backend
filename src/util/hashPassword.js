"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = __importDefault(require("bcrypt"));
const hashPassword = async (rawPassword) => {
    const salt = await bcrypt.default.genSalt(10);
    return await bcrypt.default.hash(rawPassword, salt);
};
exports.default = hashPassword;
