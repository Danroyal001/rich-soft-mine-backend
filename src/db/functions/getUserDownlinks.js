"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const { default: User } = require("../collections/User");

const getUserDownlinks = async (user_id) => {
  const downlinks = await (await User())
    .find({ uplinkID: new mongodb.ObjectId(user_id) })
    .exec();

    return downlinks;
};

exports.default = getUserDownlinks;
