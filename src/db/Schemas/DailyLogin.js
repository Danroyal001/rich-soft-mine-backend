"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

const mongoose = require("mongoose");

const DailyLoginSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        index: true,
    },
    userID: {
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

exports.default = DailyLoginSchema;
