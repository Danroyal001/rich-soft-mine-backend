"use strict";

const { default: CouponCodeSchema } = require('../Schemas/CouponCode');

Object.defineProperty(exports, "__esModule", {
    value: true
});

const { default: dbConnection } = require("../dbConnection");

const couponCodes = async () => {
    const {
        client
    } = await dbConnection();

    const CouponCodeModel = client.model('couponCodes', CouponCodeSchema, 'couponCodes');

    return CouponCodeModel;
};

exports.default = couponCodes;
