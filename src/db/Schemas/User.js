"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

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
  _id: ObjectId,
  email: String,
  password: String,
  roleID: String,
  createdAt: Date,
  currentBal: {
    type: Number,
    default: 0,
  },
  userCoupon: {
    type: String,
    required: true,
  },
});

exports.default = UserSchema;
