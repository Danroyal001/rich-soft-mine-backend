"use strict";

const { default: hashPassword } = require("../../util/hashPassword");
const { default: users } = require("../collections/User");

const createUser = async (properties) => {
    if (await (await users()).findOne({ email: properties.email }).exec()) {
        console.log('user already exists: ', response);
        throw new Error('User already exists');
    }

    if (properties.password) {
        properties.password = await hashPassword(properties.password);
    }

    const insertionResponse = await (await users()).insertMany([properties]);

    return insertionResponse;
};
exports.default = createUser;
