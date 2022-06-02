"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});

const dbConnection = __importDefault(require("../dbConnection"));

const users = async () => {
    const {
        db
    } = await (0, dbConnection.default)();
    return db.collection('users');
};
exports.default = users;