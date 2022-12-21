const express = require("express");
const { Payment, sendStripeApiKey } = require("../components/payment/controller");
const router = express.Router();


router.route("/process").post(Payment);

router.route("/stripeapikey").get(sendStripeApiKey);


module.exports = router;