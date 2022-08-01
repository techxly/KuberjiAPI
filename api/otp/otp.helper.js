const bcrypt = require('bcrypt');
const saltRounds = 10;
module.exports = {
    generateOTP: (callBack) => {
        const len = 6;
        var digits = '0123456789';
        let OTP = '';
        let KEY = '';
        for (let i = 0; i < len; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        KEY = bcrypt.hashSync(OTP, saltRounds);
        return callBack({ otp: OTP, hash: KEY });
    }
}
