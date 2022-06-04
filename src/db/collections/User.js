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

const { default: dbConnection } = require("../dbConnection");

const users = async () => {
    const {
        db,
        client
    } = await dbConnection();

    const UserModel = client.model('users', UserSchema);

    const u = UserModel.findOne({email:'dan@g.c'});
    u.to

    return UserModel;
};

exports.default = users;
