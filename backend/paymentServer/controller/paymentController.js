const crypto = require("crypto");
const Payment = require("../models/paymentModel");
const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: "rzp_test_RLqM2cICJRdl3F",
  key_secret: "OphDkgTIhANnHZuMRAthntM6",
});
const check = async (req, res) => {

    console.log(req.body,"amount")
  var options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
    receipt: "rcptid_11",
  };
  const order = await instance.orders.create(options);
  res.status(200).json({
    success: true,
    order,
  });
};

const paymentVerification = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", "OphDkgTIhANnHZuMRAthntM6")
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here
    await Payment.create({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.status(200).json({
      msg: "Counselling Fee Paid Successfull",
      success: true,
      razorpay_payment_id: razorpay_payment_id,
    });
  } else {
    res.status(400).json({
      success: false,
    });
  }
};

module.exports = { check, paymentVerification };
