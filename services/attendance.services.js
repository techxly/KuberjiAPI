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

    //console.log('req-----###', req)
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', req.userId)
            .input('month', req.month)
            .input('year', req.year)
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


    console.log('req', req)

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('attDate', req.date)
            .input('siteId', req.siteId)
            .execute('getAttendanceSheetData');
        //.execute(`getAttendanceSheetData`);

        console.log('result', result.recordset)
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

        //console.log('req', req)
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
            .execute(`addAttendance`);

        if (result)
            return result.recordset[0];
        else
            return null;

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
}