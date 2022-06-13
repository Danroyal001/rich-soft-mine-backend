"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const { default: User } = require("../dailyLogin/User");

const getUserDownlinks = async (user_id) => {
    const downlinks = await (await User())
        .find({ uplinkID: user_id })
        .exec();

    return downlinks;
};

exports.default = getUserDownlinks;
