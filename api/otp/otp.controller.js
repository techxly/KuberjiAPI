const { sendOTPMail } = require("./otp.service");
const { generateOTP } = require("../otp/otp.helper");

module.exports = {
    sendOTP: (req, res) => {
        const body = req.body;
        const otpData = generateOTP((result) => {
            return result;
        })

        console.log(otpData)

        const mailOptions = {
            subject: "SOC Manager- Admin Access",
            html: `OTP for admin login access is: <b>${otpData.otp}</b>`
        }

        sendOTPMail(mailOptions, (err, results) => {
            if (err) {
                console.log(err);
                return
            }
            if (!results) {
                return res.json({
                    code: 0,
                    message: "Data not inserted"
                });
            }
            return res.json({
                success: 1,
                info: results,
                key: otpData.hash
            });
        });
    }
}
