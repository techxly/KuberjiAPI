const jwt = require('jsonwebtoken');
const moment = require('moment');
const bcrypt = require('bcrypt');
require("dotenv").config();
const {
    poolPromise
} = require('../connections/mssql-db');
const leavesController = require('../controller/leaves.controller');

const addLeaveType = async (req, res) => {

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('leaveName', req.name)
            .input('leaveType', req.type)
            .input('leaveAllowed', req.allowedleaves)
            .input('description', req.desc)
            .execute(`addLeaveType`);

        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}
const updateLeaveType = async (req, res) => {

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('typeId', req.id)
            .input('leaveName', req.name)
            .input('leaveType', req.type)
            .input('leaveAllowed', req.allowedleaves)
            .input('description', req.desc)
            .execute(`updateLeaveType`);

        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}
const updateLeaveTypeStatus = async (req, res) => {
    console.log('req', req)
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('typeId', req.typeId)
            .input('status', req.typeStatus == true ? 1 : 0)
            .execute(`updateLeaveTypeStatus`);

        if (result)
            return;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}
const addLeaves = async (req, res) => {

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

const getLeaveTypes = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .execute(`getLeaveTypes`);

        console.log('result.recordset', result.recordset)

        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const getAllLeaves = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .execute(`getAllLeaves`);

        console.log('result.recordset', result.recordset)

        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const getLeaveTypesById = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('typeId', req.id)
            .execute(`getLeaveTypesById`);

        console.log('result.recordset', result.recordset)

        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const getLeaves = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('aMonth', req.month)
            .input('aYear', req.year)
            .execute(`getLeaves`);
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

const getLeavesById = async (req, res) => {

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', req.id)
            .execute(`getLeaveById`);

        console.log('result.recordset', result.recordset)

        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const updateLeaves = async (req, res) => {


    console.log('req---###--->', req)

    try {
        const pool = await poolPromise;


        const result = await pool.request()
            .input('id', req.id)
            .input('leaveFrom', req.leaveFrom)
            .input('leaveTo', req.leaveTo)
            .input('status', req.status)
            .execute(`updateLeaves`);

        console.log('result', result)


        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {

        console.log('res', error)

        res.status(500, error.message);
        console.log(error.message)
        return error.message;
    }
}
const deleteLeaves = async (req, res) => {

    console.log('req----->', req)

    try {
        const pool = await poolPromise;
        const result = await pool.request() //.query(`SELECT * from employee where isActive = 1`);
            .input('ids', req.ids.join(","))
            .execute('deleteLeaves');

        console.log("result deleted ====> ", result);

        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500);
        console.log('error.message', error.message)
        return error.message;
    }
}



module.exports = {
    addLeaveType: addLeaveType,
    addLeaves: addLeaves,
    updateLeaveType: updateLeaveType,
    updateLeaveTypeStatus: updateLeaveTypeStatus,
    getLeaves: getLeaves,
    getLeaveTypes: getLeaveTypes,
    getLeaveTypesById: getLeaveTypesById,
    getLeavesById: getLeavesById,
    getPaySlipDetails: getPaySlipDetails,
    updateLeaves: updateLeaves,
    deleteLeaves: deleteLeaves,
    getAllLeaves: getAllLeaves,
}