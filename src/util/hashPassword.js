"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const bcrypt = require("bcrypt");

const hashPassword = async (rawPassword) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(rawPassword, salt);
};

exports.default = hashPassword;
// completed
