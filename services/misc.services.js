const jwt = require('jsonwebtoken');
const moment = require('moment');
const bcrypt = require('bcrypt');
let fs = require('fs');
require("dotenv").config();

const {
    poolPromise
} = require('../connections/mssql-db');
const nodemailer = require('nodemailer');
const miscController = require('../controller/site.controller');

const sendResetLink = async (data) => {

    try {

        const pool = await poolPromise;
        const result = await pool.request()
            .input('email', data.emailTo)
            .execute('getUserByEmail')

        //console.log('result', result.recordset[0])

        if (result && result.recordset[0]) {

            let jwtSecretKey = await process.env.JWT_SECRET_KEY_EMAIL;

            let tData = await {
                time: Date(),
                email: data.emailTo,
                expiresIn: parseInt(process.env.JWT_EXPIRES_IN_EMAIL) // expires in 24 hours
            }

            let token = await jwt.sign(tData, jwtSecretKey);

            const transporter = await nodemailer.createTransport({
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
                from: process.env.ADMIN_NAME + `<${process.env.ADMIN_EMAIL}>`,
                to: data.emailTo,
                subject: data.subject,
                html: data.html.replace(/##token##/g, token)
            };

            const mailResult = await transporter.sendMail(mailOptions).then(info => {
                return "Success"
            }).catch(err => {
                return "Failed"
            })

            if (mailResult == "Success") {
                return mailResult
            }
            else {
                return null
            }
        }
        else {
            res.status(500);
            return null
        }


    } catch (error) {
        res.status(500);
        return error.message;
    }
}
const sendContactMail = async (req) => {

    try {

        //console.log('result', result.recordset[0])
        let jwtSecretKey = await process.env.JWT_SECRET_KEY_EMAIL;

        let tData = await {
            time: Date(),
            email: req.emailId,
            expiresIn: parseInt(process.env.JWT_EXPIRES_IN_EMAIL) // expires in 24 hours
        }

        let token = await jwt.sign(tData, jwtSecretKey);

        const transporter = await nodemailer.createTransport({
            service: process.env.SERVICE,
            host: process.env.HOST,
            port: process.env.EMAIL_PORT,
            secure: false,
            auth: {
                user: process.env.ADMIN_EMAIL,
                pass: process.env.ADMIN_PASS
            }
        });

        // to user
        let mailOptions = {
            from: process.env.ADMIN_NAME + `<${process.env.ADMIN_EMAIL}>`,
            to: req.emailId,
            subject: "Shriji Kuberji- Contact",
            html: `Thank you for contacting us. </br> We will connect you shortly.`
        };

        let mailOptionsAdmin = {
            from: process.env.ADMIN_NAME + `<${process.env.ADMIN_EMAIL}>`,
            to: process.env.ADMIN_NAME + `<${process.env.ADMIN_EMAIL}>`,
            subject: "Shriji Kuberji- Contact",
            html: `User ${req.UserName} (${req.emailId}) has sent a message via conact. <br/> Message: ${req.message}`
        };

        const result = await transporter.sendMail(mailOptions).then(async (res) => {
            if (res) {
                const innerResult = await transporter.sendMail(mailOptions).then(res => {
                    if (res) {
                        return "Success"
                    }
                }).catch(err => {
                    return "Failed"
                });
                return innerResult
            }
        }).catch(err => {
            return "Failed"
        });

        if (result == "Success") {
            return result
        }
        else {
            return null
        }

    } catch (error) {
        res.status(500);
        return error.message;
    }
}


const addNotifications = async (req) => {

    console.log('req', req)
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('sMsg', req.sMsg)
            .input('msg', req.msg)
            .input('type', req.type)
            .input('path', req.path)
            .input('msgFrom', req.msgFrom)
            .input('msgFor', req.msgFor)
            .input('levelFor', req.level)
            .execute(`addNotifications`);

        if (result) {
            if (req.type == 1) {
                result.recordset.forEach(element => {
                    if (element.image) {
                        if (element.image != null && element.image != " " && element.image != "" && element.image != undefined) {
                            let ext = element.image.split('.');
                            const image = fs.readFileSync(`public/userImages/${element.image}`, 'base64');

                            element.image = `data:image/${ext[ext.length - 1]};base64,${image}`
                        } else {
                            element.image = defaultImage
                        }
                    }
                });
                return result.recordset || result;
            }
            return result
        }
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }

}

const checkNotifications = async (req) => {

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', req.id)
            .input('level', req.level)
            .execute(`checkNotifications`);

        if (result.recordset.length > 0) {
            result.recordset.forEach(element => {
                if (element.image != null && element.image != " " && element.image != "" && element.image != undefined) {
                    let ext = element.image.split('.');
                    const image = fs.readFileSync(`public/userImages/${element.image}`, 'base64');
                    element.image = `data:image/${ext[ext.length - 1]};base64,${image}`
                } else {
                    element.image = defaultImage
                }
            });

            return result.recordset;
        }
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }

}

const markAsRead = async (req) => {

    //console.log('req', req)

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', req.id)
            .execute(`markAsRead`);

        return result

    } catch (error) {
        res.status(500);
        return error.message;
    }

}

const getDefaultValues = async (req) => {

    //console.log('req', req)

    try {

        const data = {
            lateTime: process.env.LATE_TIME_DURATION,
            halfDay: process.env.HALF_DAY_TIME,
            inTime: process.env.IN_TIME,
            outTime: process.env.OUT_TIME
        }

        return data

    } catch (error) {
        res.status(500);
        return error.message;
    }

}

module.exports = {
    sendResetLink: sendResetLink,
    sendContactMail: sendContactMail,
    checkNotifications: checkNotifications,
    addNotifications: addNotifications,
    markAsRead: markAsRead,
    getDefaultValues: getDefaultValues
}