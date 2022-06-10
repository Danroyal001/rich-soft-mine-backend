"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const bcrypt = require("bcrypt");

const verifyPassword = async (rawPassword, hashedPassword) => {
    return await bcrypt.compare(rawPassword, hashedPassword);
};

exports.default = verifyPassword;
