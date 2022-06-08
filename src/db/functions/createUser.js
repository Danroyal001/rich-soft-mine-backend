"use strict";

const {
    default: hashPassword
} = require("../../util/hashPassword");
const {
    default: users
} = require("../collections/User");
const mongoose = require('mongoose');

const createUser = async (properties) => {

    const {
        __id,
        _uplinkId,
        email,
        password,
        firstName,
        otherNames,
        lastName,
        roleID,
        _RSMPoints,
        _referralEarnings,
        _createdAt,
        _updatedAt,
    } = properties;

    const _id = new mongoose.Schema.Types.ObjectId(__id);
    const uplinkId = _uplinkId ? new mongoose.Schema.Types.ObjectId(_uplinkId) : new mongoose.Schema.Types.ObjectId('629759aa3d8465f85763486e');
    const RSMPoints = Number(_RSMPoints);
    const referralEarnings = Number(_referralEarnings);
    const createdAt = new Date(_createdAt) || new Date();
    const updatedAt = new Date(_updatedAt) || new Date();

    const alreadyExists = await (await users()).findOne({ email }).exec();

    console.log('alreadyExists: ', alreadyExists);

    if (alreadyExists) {
        console.log('user already exists: ', response);
        throw new Error('User already exists');
    }

    if (properties.password) {
        properties.password = await hashPassword(properties.password);
    }

    await (await users()).insertMany([{
        _id,
        uplinkId,
        email,
        password,
        firstName,
        otherNames,
        lastName,
        roleID,
        RSMPoints,
        referralEarnings,
        createdAt,
        updatedAt,
    }]);

    return true;
};
exports.default = createUser;