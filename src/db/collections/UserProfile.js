"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = __importDefault(require("../dbConnection"));
const userProfiles = async () => {
    const { db } = await (0, dbConnection_1.default)();
    return db.collection('users');
};
exports.default = userProfiles;
