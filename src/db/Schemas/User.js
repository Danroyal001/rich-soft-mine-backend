"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const mongoose = require('mongoose')

exports.UserTierCommisions = void 0;
exports.UserTierCommisions = {
    3000: {
        referred: 1500,
        referrer: 2000,
    },
    5000: {
        referred: 2500,
        referrer: 3000,
    },
    10000: {
        referred: 6000,
        referrer: 6000,
    },
};

const UserSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    email: String,
    password: String,
    firstName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        default: '',
        required: false,
    },
    lastName: {
        type: String,
        required: true,
    },
    roleID: {
        type: String,
        match: /(admin|user)/,
    },
    RSMPoints: {
        type: Number,
        min: 0,
        default: 0,
    },
    referralEarnings: {
        type: Number,
        min: 0,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    }
});

exports.default = UserSchema;
