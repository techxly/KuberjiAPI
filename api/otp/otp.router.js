const { sendOTP } = require("./otp.controller");
const router = require("express").Router();

router.get("/sendOTP", sendOTP);


module.exports = router;