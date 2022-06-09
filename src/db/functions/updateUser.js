"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

const { default: hashPassword } = require("../../util/hashPassword");
const { default: User } = require("../collections/User");

const updateUser = async (oldUser, newUser) => {
    let user = await (await (0, User.default)()).findOne({
        _id: oldUser._id
    });

    if (newUser.password) {
        const newPassword = await (0, hashPassword.default)(newUser.password);
        user.password = newPassword;
        newUser.password = void 0;
    }

    newUser._id = newUser._id;

    user = {
        ...user,
        ...newUser
    };

    const response = await (await (0, User.default)()).updateOne({
        _id: oldUser._id
    }, user);

    return response.acknowledged;
};


exports.default = updateUser;