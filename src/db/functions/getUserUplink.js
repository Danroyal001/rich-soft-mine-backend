"use strict";

const mongodb = require("mongodb");
const { default: getUsers } = require("./getUsers");

const getUserUplink = async (user_id) => {
    const [user] = await getUsers(new mongodb.ObjectId(user_id));
    const [uplink] = await getUsers(user?.uplinkID);
    return uplink;
};

exports.default = getUserUplink;
