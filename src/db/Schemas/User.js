"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const mongoose = require("mongoose");

exports.UserTierCommisions = void 0;
exports.UserTierCommisions = {
    3_000: {
        referred: 3_000,
        referrer: 2_000,
    },
    5_000: {
        referred: 5_000,
        referrer: 3_000,
    },
    1_0000: {
        referred: 10_000,
        referrer: 6_000,
    },
};

const UserSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        index: true,
    },
    couponCode: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    uplinkId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: false,
    },
    otherNames: {
        type: String,
        default: '',
        required: false,
    },
    lastName: {
        type: String,
        required: false,
    },
    roleID: {
        type: String,
        match: /(admin|user)/,
        default: 'user',
        required: false,
    },
    RSMPoints: {
        type: Number,
        min: 0,
        default: 0,
        required: false
    },
    referralEarnings: {
        type: Number,
        min: 0,
        default: 0,
        required: false
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: false,
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
        required: false,
    }
});

exports.default = UserSchema;
