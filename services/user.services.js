const jwt = require('jsonwebtoken');
const moment = require('moment');
const bcrypt = require('bcrypt');
let fs = require('fs');
require("dotenv").config();
const {
    poolPromise
} = require('../connections/mssql-db')

const getAllUsers = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`SELECT e.id, e.userName, e.employeeCode, e.firstName +' '+ e.lastName as name, e.email, e.mobile, e.doj,s.siteName, r.role, s.id AS siteId, r.id AS roleId FROM 
            employee as e INNER JOIN 
            employee_role as er ON e.id = er.employeeId INNER JOIN
			role as r ON r.id = er.roleId INNER JOIN
            employee_site as es ON e.id = es.employeeId INNER JOIN 
            [site] as s ON s.id = es.siteId
            AND e.isActive = 1`);


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

const login = async (req, res) => {

    console.log('req', req)

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
        console.log('error', error)
        return error.message;
    }
}

const verifyToken = async (req, res) => {


    try {


        let jwtSecretKey = process.env.JWT_SECRET_KEY;

        console.log(req.headers.Authorization, req)
        const token = req.headers.Authorization;
        const verified = jwt.verify(token, jwtSecretKey);

        console.log('verified', verified)


        if (verified) {
            const pool = await poolPromise;
            const result = await pool.request()
                .query(`SELECT e.id,e.userName, e.email, e.firstName+' '+e.lastName as fullName, r.role  from employee as e
            INNER JOIN employee_role as er on er.employeeId = e.id
            INNER JOIN role as r on r.Id = er.roleId
            WHERE e.id = '${verified.userId}' 
            AND e.isActive = 1
            AND er.isActive = 1
            AND r.isActive = 1
            `)

            if (result)
                return result.recordset;
            else
                return null;
        }
        else {
            return null;
        }
    } catch (error) {
        res.status(500);
        console.log('error', error)
        return error.message;
    }
}


const addUser = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userName', req.userName)
            .input('password', req.password)
            .input('lastLogin', '')
            .input('firstName', req.fName)
            .input('lastName', req.lName)
            .input('gender', req.gender)
            .input('mobile', req.mobile)
            .input('doj', req.joiningDate)
            .input('dob', req.birthDate)
            .input('email', req.email)
            .input('bloodGroup', req.bloodGroup)
            .input('salary', req.salary)
            .input('address', req.address)
            .input('city', req.city)
            .input('state', req.state)
            .input('zipCode', req.zipcode)
            .input('image', req.image)
            .input('employeeCode', req.userName)
            .input('emergencyNumber', req.altMobile)
            .input('isActive', 1)
            .input('role', req.role)
            .input('site', req.site)
            .execute(`addUser`);
        console.log(result);

        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const updateUser = async (req, res) => {


    console.log('req----->', req)


    try {
        const pool = await poolPromise;
        const result = await pool.request() //.query(`SELECT * from employee where isActive = 1`);
            .input('password', req.password)
            .input('firstName', req.fName)
            .input('lastName', req.lName)
            .input('gender', req.gender)
            .input('mobile', req.mobile)
            .input('doj', req.joiningDate)
            .input('dob', req.birthDate)
            .input('email', req.email)
            .input('bloodGroup', req.bloodGroup)
            .input('salary', req.salary)
            .input('address', req.address)
            .input('city', req.city)
            .input('state', req.state)
            .input('zipcode', req.zipcode)
            .input('altMobile', req.altMobile)
            .input('image', req.image)
            .input('userId', req.userId)
            .input('site', req.site)
            .input('role', req.role)
            .execute('editUser');

        console.log("result ====> ", result.recordset);

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

const deleteUser = async (req, res) => {


    console.log('req----->', req)


    try {
        const pool = await poolPromise;
        const result = await pool.request() //.query(`SELECT * from employee where isActive = 1`);
            .input('ids', req.ids.join(","))
            .execute('deleteUser');

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
                    .execute(`SELECT e.id, e.userName, e.firstName, e.email, e.employeeCode, r.role  FROM employee as e INNER JOIN 
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
const getUserById = async (req, res) => {

    console.log('req', req)

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`SELECT e.[id]
            ,e.[userName]
            ,e.[lastLogin]
            ,e.[firstName]
            ,e.[lastName]
            ,e.[gender]
            ,e.[mobile]
            ,e.[doj]
            ,e.[dob]
            ,e.[email]
            ,e.[bloodGroup]
            ,e.[salary]
            ,e.[address]
            ,e.[city]
            ,e.[state]
            ,e.[zipCode]
            ,e.[image]
            ,e.[employeeCode]
            ,e.[emergencyNumber]
            ,e.[isActive],s.id as siteId, r.id as roleId  FROM 
                  employee as e INNER JOIN 
                  employee_role as er ON e.id = er.employeeId INNER JOIN
                  role as r ON r.id = er.roleId INNER JOIN
                  employee_site as es ON e.id = es.employeeId INNER JOIN 
                  [site] as s ON s.id = es.siteId
                  WHERE e.isActive = 1
                  AND e.id=${req.id}`);
        if (result) {



            let orgImage = result.recordset[0].image;

            console.log('orgImage', orgImage)


            result.recordset[0].imageName = orgImage


            const image = fs.readFileSync(`public/users/${orgImage}`, 'base64');

            result.recordset[0].image = image
            return result.recordset[0];
        }
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

module.exports = {
    verifyToken: verifyToken,
    login: login,
    addUser: addUser,
    getUser: getUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getUserById: getUserById,
    getAllUsers: getAllUsers
}