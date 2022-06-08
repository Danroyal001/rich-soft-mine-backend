"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true,
});

const { default: verifyPassword } = require("../../util/verifyPassword");
const { default: getUsers } = require("./getUsers");

const authenticate = async (email, password) => {
    const [user] = await getUsers({
        email,
    });

    if (!user) {
        throw new Error("user does not exist");
    }

    const verified = await verifyPassword(password, user.password);

    if (!verified) {
        throw new Error("Incorrect password");
    }

    return user;
};

exports.default = authenticate;
