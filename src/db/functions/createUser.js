"use strict";

const { default: hashPassword } = require("../../util/hashPassword");
const { default: users } = require("../collections/User");

const createUser = async (properties) => {
    let userExists = await (await users()).findOne({ email: properties.email });
    let userExists = UserModel;

    if (userExists) {
        console.log('user already exists: ', response);
        throw new Error('User already exists');
    }

    if (properties.password) {
        properties.password = await hashPassword.default(properties.password);
    }

    const insertedUser = await (await users()).insertMany([properties]);
    const user = await (await users()).findOne({ _id: insertedUser.insertedId });

    return user;
};
exports.default = createUser;
