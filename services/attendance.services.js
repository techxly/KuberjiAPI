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


    console.log('req', moment(req.date).format("yyyy-MM-DD"))

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('attDate', req.date)
            .execute(`getTodaysAttendance`);

        console.log('result', result)
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
    getAttendanceByDate: getAttendanceByDate,
    getTodaysAttendance: getTodaysAttendance,
}