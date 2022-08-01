require("dotenv").config();
const nodemailer = require('nodemailer');
module.exports = {
    sendOTPMail: (data, callBack) => {
        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            host: process.env.HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_PASS
            }
        });
        let mailOptions = {
            from: process.env.ADMIN_EMAIL || 'default email',
            to: process.env.ADMIN_EMAIL,
            subject: data.subject,
            html: data.html
        };
        transporter.sendMail(mailOptions, function (err, info) {
            mailOptions.err = err;
            mailOptions.info = info;
            mailOptions.status = (info !== null || info !== undefined);
            let data = {};
            if (err) {
                data = { code: 0, Message: "Sending email failed.", er: err }
            } else {
                data = { code: 1, Message: "Mail sent successfully" }
            }
            return callBack(null, data);
        });
    }
}