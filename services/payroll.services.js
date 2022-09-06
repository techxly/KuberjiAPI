const jwt = require('jsonwebtoken');
const moment = require('moment');
const bcrypt = require('bcrypt');
require("dotenv").config();
const {
    poolPromise
} = require('../connections/mssql-db');
const payrollController = require('../controller/payroll.controller');

const addPayroll = async (req, res) => {

    console.log(req.name)

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`INSERT INTO site
            (unit
            ,siteName
            ,radius
            ,city
            ,state
            ,zipCode
            ,address)
        VALUES
            ('${req.unit}'
            ,'${req.name}'
            ,${parseInt(req.radius)}
            ,'${req.city}'
            ,'${req.state}'
            ,${parseInt(req.zipcode)}
            ,'${req.address}')`
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

const getPayroll = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('aMonth', req.month)
            .input('aYear', req.year)
            .execute(`getPayroll`);
        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const getPaySlipDetails = async (req, res) => {

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('PayRollId', req.id)
            .input('aMonth', req.month)
            .input('aYear', req.year)
            .execute(`getPaySlipDetails`);

        console.log(result.recordset[0])


        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const getPayrollById = async (req, res) => {

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('PayRollId', req.id)
            .execute(`getPayrollById`);
        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const updatePayroll = async (req, res) => {


    console.log('req', req)

    try {
        const pool = await poolPromise;


        const result = await pool.request()

            .input('payrollId', req.id)
            .input('aMonth', req.month)
            .input('aYear', req.year)
            .input('salary', req.salary)
            .input('overTime', req.overTime)
            .input('bonus', req.bonus)
            .input('deduction', req.deduction)
            .input('netTotal', req.netTotal)
            .execute(`updatePayroll`);

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
const deletePayroll = async (req, res) => {

    console.log('req', req)

    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .query(`UPDATE site
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
    addPayroll: addPayroll,
    getPayroll: getPayroll,
    getPayrollById: getPayrollById,
    getPaySlipDetails: getPaySlipDetails,
    updatePayroll: updatePayroll,
    deletePayroll: deletePayroll
}