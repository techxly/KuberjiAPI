require("dotenv").config();
const {
    poolPromise
} = require('../connections/mssql-db');
const holidayController = require('../controller/holiday.controller');

const addHoliday = async (req, res) => {

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
            .query(`SELECT [id]
            ,[name]
            ,[date]
            ,[note]
            ,[isActive]
        FROM [holiday] where isActive = 1 order by date desc`);
        if (result) {
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

    try {
        const pool = await poolPromise;


        const result = await pool.request()
            .query(`UPDATE holiday
                SET
                name='${req.holidayName}'
            WHERE id='${parseInt(req.id)}' AND isActive=${1}`
            );

        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500, error.message);
        return error.message;
    }
}
const deleteHoliday = async (req, res) => {

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