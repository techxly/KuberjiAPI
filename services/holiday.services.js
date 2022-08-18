require("dotenv").config();
const {
    poolPromise
} = require('../connections/mssql-db');
const holidayController = require('../controller/holiday.controller');

const addHoliday = async (req, res) => {

    console.log(req)

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`INSERT INTO holiday
            (name
            ,date
            ,note
            ,isActive)
        VALUES
            ('${req.holidayName}'
            ,'${req.holidayDate}'
            ,''
            ,'${true}')`
            );
        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const getHoliday = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`SELECT * FROM holiday WHERE isActive=1`);
        if (result) {
            console.log(result.recordset)
            return result.recordset;
        }
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const updateHoliday = async (req, res) => {

    console.log(req)

    try {
        const pool = await poolPromise;


        const result = await pool.request()
            .query(`UPDATE holiday
                SET
                name='${req.holidayName}'
            WHERE id='${parseInt(req.id)}' AND isActive=${1}`
            );

        console.log('result', result)


        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500, error.message);
        console.log(error.message)
        return error.message;
    }
}
const deleteHoliday = async (req, res) => {

    console.log('req', req)

    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .query(`UPDATE holiday
                SET isActive=0
                WHERE id=${req.id}`
            );

        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

module.exports = {
    addHoliday: addHoliday,
    getHoliday: getHoliday,
    updateHoliday: updateHoliday,
    deleteHoliday: deleteHoliday
}