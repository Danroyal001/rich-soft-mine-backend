"use strict";

const { default: DailyLoginSchema } = require('../Schemas/DailyLogin');

Object.defineProperty(exports, "__esModule", {
    value: true
});

const { default: dbConnection } = require("../dbConnection");

const dailyLogin = async () => {
    const {
        client
    } = await dbConnection();

    const DailyLoginModel = client.model('dailyLogin', CouponCodeSchema, 'dailyLogin');

    return DailyLoginModel;
};

exports.default = dailyLogin;
