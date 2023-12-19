// Purpose: Payment routes

const express = require("express");
const { check, paymentVerification } = require("../controller/paymentController");

const payment = express.Router();

payment.post("/checkout", check);

payment.post("/paymentverification", paymentVerification);

module.exports = payment;
