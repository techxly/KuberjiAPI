const jwt = require('jsonwebtoken');
const moment = require('moment');
const bcrypt = require('bcrypt');
require("dotenv").config();
const {
    poolPromise
} = require('../connections/mssql-db');

const getAttendanceByDate = async (req, res) => {

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('inDate', req.inDate)
            .execute(`getAttendanceByDate`);
        if (result)

            return result.recordset[0];
        else

            return null;
    } catch (error) {
        res.status(500);

        return error.message;
    }
}
const getTodaysAttendance = async (req, res) => {


    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('attDate', moment().format('YYYY/MM/DD'))
            .input('siteId', req.siteId)
            .execute(`getTodaysAttendance`);

        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const getAttendanceByUser = async (req, res) => {

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', req.userId)
            .input('month', req.month)
            .input('year', req.year)
            .input('siteId', req.siteId)
            .execute(`getAttendanceByUser`);


        //console.log('result', result)

        if (result)
            return result.recordset;
        else
            return [];
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const getAttendanceSheetData = async (req, res) => {

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('Month', req.month)
            .input('Year', req.year)
            .input('siteId', req.siteId)
            .execute('getAttendanceSheetData');
        //.execute(`getAttendanceSheetData`);

        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const uploadUserImage = async (req, res) => {

    try {
        //upload logic

        var base64Data = req.image64.replace(/^data:image\/png;base64,/, "");

        let uploaded = true;

        require("fs").writeFile(`public/userImages/${req.userName}.png`, base64Data, 'base64', function (err) {
            if (err)
                uploaded = false
            else if (!require("fs").existsSync(`public/userImages/${req.userName}.png`))
                uploaded = false

        });



        if (uploaded == true) {
            const pool = await poolPromise;
            const result = await pool.request()
                .input('id', req.id)
                .input('image', req.userName + ".png")
                .execute(`updateUserImage`);
        }

        return uploaded


    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const addAttendance = async (req, res) => {

    try {
        //upload logic

        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', req.employeeId)
            .input('inDate', req.inDate)
            .input('outDate', req.outDate)
            .input('aMonth', req.aMonth)
            .input('aYear', req.aYear)
            .input('inTime', req.inTime)
            .input('outTime', req.outTime)
            .input('filledBy', req.filledBy)
            .input('reason', req.reason)
            .execute(`addAttendance`);
        //.execute(req.inTime == null ? `updateAttendance`:`addAttendance`);

        if (result)
            return result.recordset[0];
        else
            return null;

    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const checkPunchInStatus = async (req, res) => {


    try {
        //upload logic

        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', req.employeeId)
            .input('aDate', `${String(moment().format("YYYY/MM/DD"))}`)
            .input('aMonth', parseInt(moment().format("M")))
            .input('aYear', parseInt(moment().format("YYYY")))
            .execute(`checkPunchInStatus`);
        let r = -1

        if (result.recordset[0]) {

            if (!result.recordset[0].outTime || result.recordset[0].outTime == undefined || result.recordset[0].outTime == "" || result.recordset[0].outTime == null) {
                if (moment(result.recordset[0].inDate).format("DD/MM/YYYY") == moment().format("DD/MM/YYYY")) {
                    r = 1
                }

            }
            else if (moment(result.recordset[0].outDate).format("DD/MM/YYYY") == moment().format("DD/MM/YYYY")) {
                r = 0
            }

        }

        return r;

    } catch (error) {
        res.status(500);
        return error.message;
    }
}

module.exports = {
    addAttendance: addAttendance,
    getAttendanceByDate: getAttendanceByDate,
    getTodaysAttendance: getTodaysAttendance,
    getAttendanceByUser: getAttendanceByUser,
    getAttendanceSheetData: getAttendanceSheetData,
    uploadUserImage: uploadUserImage,
    checkPunchInStatus: checkPunchInStatus,
}