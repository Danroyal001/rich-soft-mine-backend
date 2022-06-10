"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

const {
    default: hashPassword
} = require("../../util/hashPassword");
const {
    default: users
} = require("../collections/User");

const { default: couponCodes } = require("../collections/couponCodes");
const { default: dateDifferenceInHours } = require("../../util/dateDifferenceInHours");

const createUser = async (properties) => {

    const {
        _id,
        uplinkId,
        couponCode,
        email,
        // raw/unhashed
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
    const createdAt = _createdAt ? new Date(_createdAt) : new Date();
    const updatedAt = _updatedAt ? new Date(_updatedAt) : new Date();

    // check it a user with this email already exists
    const alreadyExists = await (await users()).findOne({ email }).exec();
    // check if coupon code is valid of has expired
    const couponFromDatabase = await (await couponCodes()).findOne({ couponCode }).exec();
    // check if coupon code has already been used
    const couponCodeUsed = await (await users()).findOne({ couponCode }).exec();
    // check if the coupon code has expired
    const couponCodeExpired = dateDifferenceInHours(
        (couponFromDatabase && couponFromDatabase.createdAt) ? couponFromDatabase.createdAt : (Date.now() + 1),
        Date.now()
    ) > 24;

    console.log('couponFromDatabase', couponFromDatabase);


    if (couponCodeUsed) {
        throw new Error('This coupon code has already been used');
    } else if (alreadyExists) {
        throw new Error('User already exists');
    } else if (couponCodeExpired) {
        throw new Error('This coupon code has expired! Each code expires after 24 hours');
    } else if (!alreadyExists && !couponCodeUsed && !couponCodeExpired) {
        if (!couponFromDatabase) {
            throw new Error('Invalid coupon code');
        }
    }

    const insertProps = {};

    const validationObject = {
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
    };

    Object.keys(validationObject).forEach(key => {
        if (validationObject[key]) {
            insertProps[key] = validationObject[key];
        }
    });

    if (insertProps.password) {
        insertProps.password = await hashPassword(insertProps.password);
    }

    (async () => {
        // credit referrer and referred
    })();

    await (await users()).insertMany([insertProps]);

    return insertProps;
};
exports.default = createUser;
