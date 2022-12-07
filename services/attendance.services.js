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


    console.log('req', req.date)

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('attDate', req.date)
            .execute(`getTodaysAttendance`);

        console.log('result', result)
        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}
const getAttendanceSheetData = async (req, res) => {


    console.log('req', req.date)

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('attDate', req.date)
            .execute(`getAttendanceSheetData`);

        console.log('result', result)
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
                .input('image', req.userName + ".jpg")
                .execute(`updateUserImage`);
        }

        return uploaded


    } catch (error) {
        res.status(500);
        return error.message;
    }
}
module.exports = {
    getAttendanceByDate: getAttendanceByDate,
    getTodaysAttendance: getTodaysAttendance,
    getAttendanceSheetData: getAttendanceSheetData,
    uploadUserImage: uploadUserImage,
}