const jwt = require('jsonwebtoken');
const moment = require('moment');
const bcrypt = require('bcrypt');
require("dotenv").config();
const {
    poolPromise
} = require('../connections/mssql-db')

const getAllUsers = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`SELECT * FROM employee`);
        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const login = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`SELECT id, password from employee WHERE userName = '${req.userName}' AND isActive = 1`);
        if (result) {
            let id = result.recordset[0].id
            let h_password = result.recordset[0].password
            let token = "";
            // jwt token logic
            if (bcrypt.compareSync(req.password, h_password)) {
                let jwtSecretKey = process.env.JWT_SECRET_KEY;
                let Data = {
                    time: Date(),
                    userId: id,
                    expiresIn: parseInt(process.env.JWT_EXPIRES_IN) // expires in 24 hours
                }

                token = jwt.sign(Data, jwtSecretKey);
            }
            return token;
        }
        else {
            console.log(2)
            return null;
        }
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const addUser = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`SELECT * FROM employee`);
        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const getUser = async (req, res) => {
    try {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;

        console.log(req.headers.Authorization, req)
        const token = req.headers.Authorization;
        const verified = jwt.verify(token, jwtSecretKey);
        let userId;
        if (verified) {
            const decoded = jwt.decode(token, { complete: true });

            console.log(decoded)

            if (decoded) {
                userId = decoded.payload.userId;
                const pool = await poolPromise;
                const result = await pool.request()
                    .query(`SELECT e.id, e.userName, e.firstName, e.email, e.employeeCode, r.role  FROM employee as e INNER JOIN 
            employee_role as er ON e.id = er.employeeId INNER JOIN 
            role as r ON r.id = er.roleId
            WHERE e.id = ${userId} 
            AND e.isActive = 1 
            AND er.isActive = 1 
            AND r.isActive = 1`);
                if (result)
                    return result.recordset[0];
                else
                    return null;
            }
        }
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

module.exports = {
    login: login,
    addUser: addUser,
    getUser: getUser,
    getAllUsers: getAllUsers
}