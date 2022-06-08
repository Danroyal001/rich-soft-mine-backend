"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const mongoose = require("mongoose");

const CouponCodeSchema = new mongoose.Schema({
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
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

exports.default = CouponCodeSchema;
