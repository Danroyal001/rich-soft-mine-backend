"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});

const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;

const referralCodes = require('referral-codes');
const { default: getUsers } = require('./getUsers');
const { default: dateDifferenceInHours } = require('../../util/dateDifferenceInHours');

const generateCouponCode = async (amount = 10_000) => {
    amount = Number(amount);

    /**
     * Generate a unique coupon code
     * @returns {Promise<string>}
     */
    const generate = async () => {
        const [_coupon] = referralCodes.generate({
            length: 6,
            count: 1,
            charset: referralCodes.charset('numbers'),
        });
        let coupon = `${_coupon}-${amount}`
        if (coupon.length < 12) {
            const remainder = 12 - coupon.length;
            coupon = `${'0'.repeat(remainder)}${coupon}`;
        }

        console.log('coupon: ', coupon);

        const [user] = await getUsers({ _id: new ObjectId(coupon) });
        if (user) {
            return await generate();
        }

        return coupon;
    }

    const coupon = await generate();

    return coupon;
};

exports.default = generateCouponCode;
