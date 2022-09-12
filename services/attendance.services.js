const jwt = require('jsonwebtoken');
const moment = require('moment');
const bcrypt = require('bcrypt');
require("dotenv").config();
const {
    poolPromise
} = require('../connections/mssql-db');
const attendanceController = require('../controller/attendance.controller');

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
module.exports = {
    getAttendanceByDate: getAttendanceByDate,
}