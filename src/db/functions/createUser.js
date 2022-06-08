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
        _id,
        uplinkId,
        couponCode,
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
        couponCode,
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