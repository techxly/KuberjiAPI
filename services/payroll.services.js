const jwt = require('jsonwebtoken');
const moment = require('moment');
const bcrypt = require('bcrypt');
let fs = require('fs');
require("dotenv").config();
const {
    poolPromise
} = require('../connections/mssql-db');
const payrollController = require('../controller/payroll.controller');

const defaultImage = "data:image/jpeg;base64,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";


const addPayroll = async (req, res) => {

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

        if (result.recordset.length > 0) {

            result.recordset.forEach(element => {

                if (element.image != null && element.image != " " && element.image != "" && element.image != undefined) {
                    let ext = element.image.split('.');
                    //console.log('element', element.image)
                    const image = fs.readFileSync(`public/userImages/${element.image}`, 'base64');
                    element.image = `data:image/${ext[ext.length - 1]};base64,${image}`
                }
                else {
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

const getPaySlipDetails = async (req, res) => {
    console.log('req', req)
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('payrollId', parseInt(req.id))
            .input('pMonth', req.month)
            .input('pYear', req.year)
            .execute(`getPaySlipDetails`);
        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const getPaySlipByEmpMonthYear = async (req, res) => {
    console.log('req',req)
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('employeeId', parseInt(req.id))
            .input('aMonth', parseInt(req.month))
            .input('aYear', parseInt(req.year))
            .execute(`getPaySlipByEmpMonthYear`);
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

const getPayrollById = async (req, res) => {

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('payrollId', req.id)
            .input('pMonth', req.month)
            .input('pYear', req.year)
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

    //console.log('req', req)

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

        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500, error.message);
        return error.message;
    }
}

const deletePayroll = async (req, res) => {

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
    deletePayroll: deletePayroll,
    getPaySlipByEmpMonthYear: getPaySlipByEmpMonthYear
}