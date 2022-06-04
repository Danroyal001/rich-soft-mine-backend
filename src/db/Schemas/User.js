"use strict";

Object.defineProperty(exports, "__esModule", { value: true });

<<<<<<< HEAD
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
=======
const mongoose = require('mongoose')
>>>>>>> da6c78cdf2b92f7713307c5bb7404348f8fe15ab

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
<<<<<<< HEAD
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
=======
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
>>>>>>> da6c78cdf2b92f7713307c5bb7404348f8fe15ab
});

exports.default = UserSchema;
