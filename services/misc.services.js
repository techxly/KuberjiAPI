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


    let resData = {};
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


            return transporter.sendMail(mailOptions, function (err, info) {
                mailOptions.err = err;
                mailOptions.info = info;
                mailOptions.status = (info !== null || info !== undefined);

                if (err) {
                    return null
                } else {
                    return mailOptions
                }

            });

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

const addNotifications = async (req) => {

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('sMsg', req.sMsg)
            .input('msg', req.msg)
            .input('type', req.type)
            .input('path', req.path)
            .input('msgFrom', req.msgFrom)
            .input('msgFor', req.msgFor)
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

    //console.log('req', req)

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', req.id)
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
    checkNotifications: checkNotifications,
    addNotifications: addNotifications,
    markAsRead: markAsRead,
    getDefaultValues: getDefaultValues
}