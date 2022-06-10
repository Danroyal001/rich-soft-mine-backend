"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const { default: User } = require("../collections/User");

const getUsers = async (query = {}) => {
    const _users = await (await User()).find(query).exec();
    return _users;
};

exports.default = getUsers;
