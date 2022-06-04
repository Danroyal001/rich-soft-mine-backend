"use strict";

const { default: UserSchema } = require('../Schemas/User');

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", {
    value: true
});

const { default: dbConnection } = require("../dbConnection");

const users = async () => {
    const {
        client
    } = await dbConnection();

    const UserModel = client.model('users', UserSchema);

    return UserModel;
};

exports.default = users;
