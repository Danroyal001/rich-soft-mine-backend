"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

const referralCodes = require('referral-codes');
const { default: getUsers } = require('./getUsers');
const { default: couponCodes } = require('../dailyLogin/couponCodes');

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

        const [user] = await getUsers({ _id: coupon });
        if (user) {
            return await generate();
        }

        const existingCode = await (await couponCodes()).findOne({ couponCode: coupon }).exec();
        if (existingCode) {
            return await generate();
        }

        return coupon;
    }

    const coupon = await generate();

    // save coupon code to database
    await (await couponCodes()).insertMany({
        couponCode: coupon
    })

    return coupon;
};

exports.default = generateCouponCode;
