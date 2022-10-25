const jwt = require('jsonwebtoken');
const moment = require('moment');
const bcrypt = require('bcrypt');
let fs = require('fs');
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
        //.execute(`getLeaveBalance_1`);

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

        if (result.recordset.length > 0) {


            result.recordset.forEach(element => {



                let ext = element.image.split('.');

                const image = fs.readFileSync(`public/users/${element.image}`, 'base64');

                console.log('image', image)

                element.img = `data:image/${ext[ext.length - 1]};base64,${image}`
            });


            console.log('result.recordset', result.recordset)

            return result.recordset;
        }
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const getLeaveBalance = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .execute(`getLeaveBalanceWithMinus`);

        if (result)
            return result.recordsets;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const getLeaveBalanceAction = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .execute(`getLeaveBalanceAction`);
            console.log('result.recordsets',result.recordsets)
        if (result)
            return result.recordsets;
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
        if (result.recordset.length > 0) {


            result.recordset.forEach(element => {



                let ext = element.image.split('.');
                console.log('element', element.image)
                const image = fs.readFileSync(`public/users/${element.image}`, 'base64');

                console.log('image', image)

                element.img = `data:image/${ext[ext.length - 1]};base64,${image}`
            });


            console.log('result.recordset', result.recordset)

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

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('PayRollId', req.id)
            .input('aMonth', req.month)
            .input('aYear', req.year)
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

const getLeavesById = async (req, res) => {

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', req.id)
            .execute(`getLeaveById`);

        if (result.recordset.length > 0) {

            result.recordset.forEach(element => {

                let ext = element.image.split('.');

                const image = fs.readFileSync(`public/users/${element.image}`, 'base64');

                element.img = `data:image/${ext[ext.length - 1]};base64,${image}`
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

const updateLeaves = async (req, res) => {


    try {
        const pool = await poolPromise;


        const result = await pool.request()
            .input('id', req.id)
            .input('leaveFrom', req.leaveFrom)
            .input('leaveTo', req.leaveTo)
            .input('status', req.status)
            .execute(`updateLeaves`);

        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {

        res.status(500, error.message);
        return error.message;
    }
}
const deleteLeaves = async (req, res) => {

    try {
        const pool = await poolPromise;
        const result = await pool.request() //.query(`SELECT * from employee where isActive = 1`);
            .input('ids', req.ids.join(","))
            .execute('deleteLeaves');

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
    getLeaveBalance: getLeaveBalance,
    getLeaveBalanceAction: getLeaveBalanceAction,
}