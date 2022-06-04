const User = require("../collections/User");
async function creditUser() {
  //get user by id
  const user = await User.findOne({ id });
  //user user balance
  const currentBal = user.balance;
  // get user coupon
  const userCoupon = user.userCoupon;
  // exract user registration amount from coupon
  const amountPaid = userCoupon.split("-")[1];

  // check the amout paid
  switch (amountPaid) {
    case 3000:
      // credit user and set coupon to null since it has been used
      currentBal += 1500;
      userCoupon = null;
      break;

    case 5000:
      // credit user and set coupon to null
      currentBal += 2500;
      userCoupon = null;
      break;

    case 10000:
      //credit user and set coupon to null
      currentBal += 6000;
      userCoupon = null;
      break;

    default:
      return "Coupon Code is invalid or expired";
  }

  // save the user
  user.save();
}
module.exports = creditUser;
