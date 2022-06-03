"use strict";

const { default: mongoose } = require("mongoose");
const { default: UserSchema } = require('../Schemas/User');

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});

const dbConnection = __importDefault(require("../dbConnection"));

const UserModel = mongoose.model('users', UserSchema);
exports.UserModel = UserModel;

const users = async () => {
    const {
        db
    } = await dbConnection.default();
    return db.collection('users');
};
exports.default = users;