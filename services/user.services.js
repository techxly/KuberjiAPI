const jwt = require('jsonwebtoken');
const moment = require('moment');
const bcrypt = require('bcrypt');
let fs = require('fs');
require("dotenv").config();

const defaultImage = "data:image/jpeg;base64,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";


const {
    poolPromise
} = require('../connections/mssql-db')

const getAllUsers = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`SELECT e.id, e.userName, e.image, e.employeeCode, e.firstName +' '+ e.lastName as name, e.email, e.mobile, e.doj,s.siteName, r.role, s.id AS siteId, r.id AS roleId FROM 
            employee as e INNER JOIN 
            employee_role as er ON e.id = er.employeeId INNER JOIN
			role as r ON r.id = er.roleId INNER JOIN
            employee_site as es ON e.id = es.employeeId INNER JOIN 
            [site] as s ON s.id = es.siteId
            AND e.id != -1
            AND e.isActive = 1`);




        if (result) {

            result.recordset.forEach(element => {

                try {
                    console.log('element.image', element.image)
                } catch (error) {
                    console.log('error', error)
                }



                if (element.image != null && element.image != " " && element.image != "" && element.image != undefined) {
                    let ext = element.image.split('.');
                    const image = fs.readFileSync(`public/userImages/${element.image}`, 'base64');
                    element.img = `data:image/${ext[ext.length - 1]};base64,${image}`
                }
                else {
                    element.image = '';
                    element.img = defaultImage;
                }
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

const getUsersBySearch = async (req, res) => {
    try {

        console.log('req', req)

        const pool = await poolPromise;
        const result = await pool.request()
            .query(`SELECT e.id, e.userName, e.image, e.employeeCode, e.firstName +' '+ e.lastName as name, e.email, e.mobile, e.doj,s.siteName, r.role, s.id AS siteId, r.id AS roleId FROM 
            employee as e INNER JOIN 
            employee_role as er ON e.id = er.employeeId INNER JOIN
			role as r ON r.id = er.roleId INNER JOIN
            employee_site as es ON e.id = es.employeeId INNER JOIN 
            [site] as s ON s.id = es.siteId
            AND e.isActive = 1
            WHERE 
			e.firstName like '%${req.searchQry}%' OR 			
			e.lastName like '%${req.searchQry}%' OR
			e.employeeCode like '%${req.searchQry}%' 
            `);

        if (result) {

            result.recordset.forEach(element => {

                if (element.image != null && element.image != " " && element.image != "" && element.image != undefined) {
                    let ext = element.image.split('.');
                    const image = fs.readFileSync(`public/userImages/${element.image}`, 'base64');
                    element.img = `data:image/${ext[ext.length - 1]};base64,${image}`
                }
                else {
                    element.img = defaultImage
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

const getUserCount = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`SELECT COUNT(id) as userCount from employee where isActive = 1`);

        if (result) {
            return result.recordset[0].userCount;
        }
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const getMaxUserName = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .execute(`getMaxUserName`);


        console.log(' result.recordset[0]', result.recordset[0].userName)

        if (result) {
            return result.recordset[0].userName;
        }
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

                const pool = await poolPromise;
                const result = await pool.request()
                    .query(`SELECT e.id,e.image,e.userName, e.email, e.isUserImageAdded, e.firstName+' '+e.lastName as fullName, r.role  from employee as e
                INNER JOIN employee_role as er on er.employeeId = e.id
                INNER JOIN role as r on r.Id = er.roleId
                WHERE e.id = '${id}' 
                AND e.isActive = 1
                AND er.isActive = 1
                AND r.isActive = 1
                `)


                console.log('result.recordset', result.recordset)


                if (result) {


                    result.recordset.forEach(element => {
                        console.log('element', element)
                        if (element.image != null && element.image != " " && element.image != "" && element.image != undefined) {
                            let ext = element.image.split('.');
                            const image = fs.readFileSync(`public/userImages/${element.image}`, 'base64');
                            element.image = `data:image/${ext[ext.length - 1]};base64,${image}`
                        }
                        else {
                            element.image = defaultImage
                        }

                    });


                    console.log('result.recordset[0]', result.recordset[0])
                    console.log('token', token)


                    result.recordset[0].token = token
                    return result.recordset[0];
                }
                else
                    return null;
            }

            res.status(500);
            return null;

        }
        else {
            return null;
        }
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const otherLogin = async (req, res) => {

    console.log('req...', req.accessToken)

    try {

        let jwtSecretKey = process.env.JWT_SECRET_KEY;

        const token = req.accessToken;
        const verified = jwt.verify(token, jwtSecretKey);


        console.log('verified', verified)


        if (verified) {

            const pool = await poolPromise;
            const result = await pool.request()
                .query(`SELECT e.id,e.userName, e.email,  e.image, e.isUserImageAdded, e.firstName+' '+e.lastName as fullName, r.role  from employee as e
                INNER JOIN employee_role as er on er.employeeId = e.id
                INNER JOIN role as r on r.Id = er.roleId
                WHERE e.userName = '${req.userName}' 
                AND e.isActive = 1
                AND er.isActive = 1
                AND r.isActive = 1
                `)

            if (result) {

                result.recordset.forEach(element => {
                    console.log('element', element)
                    if (element.image != null && element.image != " " && element.image != "" && element.image != undefined) {
                        let ext = element.image.split('.');
                        const image = fs.readFileSync(`public/userImages/${element.image}`, 'base64');
                        element.image = `data:image/${ext[ext.length - 1]};base64,${image}`
                    }
                    else {
                        element.image = defaultImage
                    }

                });
                return result.recordset[0];
            }
            else
                return null;
        }
        else {
            console.log("Invalid Token")

            return null;
        }

    } catch (error) {

        console.log('error', error)

        res.status(500);
        return error.message;
    }
}

const verifyToken = async (req, res) => {


    try {


        let jwtSecretKey = process.env.JWT_SECRET_KEY;

        const token = req.headers.Authorization;
        const verified = jwt.verify(token, jwtSecretKey);

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
        return error.message;
    }
}

const addUser = async (req, res) => {


    console.log('req', req)

    try {
        const pool = await poolPromise;
        const result = await pool.request()
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
            .input('designation', req.designation)
            .input('address', req.address)
            .input('city', req.city)
            .input('state', req.state)
            .input('zipCode', req.zipcode)
            .input('emergencyNumber', req.altMobile)
            .input('isActive', (req.isActive == '0' ? false : true))
            .input('role', req.role)
            .input('site', req.site)
            .input('casualLeave', parseInt(req.casualLeave))
            .input('sickLeave', parseInt(req.sickLeave))
            .input('nonPaidLeave', parseInt(req.nonPaidLeave))
            .execute(`addUser`);

        console.log('result', result)

        if (result) {

            console.log('result.recordset', result.recordset)

            result.recordset.forEach(element => {
                if (element.image != null && element.image != " " && element.image != "" && element.image != undefined) {
                    let ext = element.image.split('.');
                    const image = fs.readFileSync(`public/userImages/${element.image}`, 'base64');
                    element.img = `data:image/${ext[ext.length - 1]};base64,${image}`
                } else {
                    element.img = defaultImage
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

const updateUser = async (req, res) => {


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
            .input('designation', req.designation)
            .input('salary', req.salary)
            .input('address', req.address)
            .input('city', req.city)
            .input('state', req.state)
            .input('zipcode', req.zipcode)
            .input('altMobile', req.altMobile)
            .input('userId', req.userId)
            .input('site', req.site)
            .input('role', req.role)
            .input('isActive', (req.isActive == '0' ? false : true))
            .execute('editUser');

        console.log('result.recordset', result.recordset)

        if (result.recordset.length > 0) {


            result.recordset.forEach(element => {

                if (element.image != null && element.image != " " && element.image != "" && element.image != undefined) {
                    let ext = element.image.split('.');
                    const image = fs.readFileSync(`public/userImages/${element.image}`, 'base64');
                    element.img = `data:image/${ext[ext.length - 1]};base64,${image}`
                } else {
                    element.img = defaultImage
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

const deleteUser = async (req, res) => {

    try {
        const pool = await poolPromise;
        const result = await pool.request() //.query(`SELECT * from employee where isActive = 1`);
            .input('ids', req.ids.join(","))
            .execute('deleteUser');

        if (result) {
            result.recordset.forEach(element => {

                if (element.image != null && element.image != " " && element.image != "" && element.image != undefined) {

                    let ext = element.image.split('.');
                    const image = fs.readFileSync(`public/userImages/${element.image}`, 'base64');
                    element.img = `data:image/${ext[ext.length - 1]};base64,${image}`
                } else {
                    element.img = defaultImage
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

const getUser = async (req, res) => {
    try {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;

        const token = req.headers.Authorization;
        const verified = jwt.verify(token, jwtSecretKey);
        let userId;
        if (verified) {
            const decoded = jwt.decode(token, { complete: true });

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
const getUserById = async (req, res) => {


    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`SELECT employee.[id]
            ,employee.[userName]
            ,employee.[lastLogin]
            ,employee.[firstName]
            ,employee.[lastName]
            ,employee.[gender]
            ,employee.[mobile]
            ,employee.[doj]
            ,employee.[dob]
            ,employee.[email]
            ,employee.[bloodGroup]
            ,employee.[salary]
            ,employee.[address]
            ,employee.[city]
            ,employee.[state]
            ,employee.[zipCode]
            ,employee.[employeeCode]
            ,employee.[emergencyNumber]
            ,employee.[isActive],site.id as siteId, role.id as roleId 
            ,payroll.CasualLeavesBalance
            ,payroll.SickLeaveBalance
            ,payroll.NonPaidLeaveBalance

            FROM 
            employee INNER JOIN
            employee_role ON employee.id = employee_role.employeeId INNER JOIN
            employee_site ON employee.id = employee_site.employeeId INNER JOIN
            role ON employee_role.roleId = role.id INNER JOIN
            site ON employee_site.siteId = site.id INNER JOIN
            payroll ON employee.id = payroll.employeeId
            AND employee.id != -1 
                  AND employee.id=${req.id}`);
        if (result) {
            return result.recordset[0];
        }
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}
const getRightsByRole = async (req, res) => {


    console.log('req.role', req.role)
    console.log('req.module', req.module)

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input(`role`, req.role)
            .input(`moduleName`, req.module)
            .execute(`getRightsByRole`)

        console.log('result', result.recordset)


        if (result) {
            return result.recordset[0];
        }
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}
const getUserProfile = async (req, res) => {


    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`SELECT e.[id]
            ,e.[userName]
            ,e.[firstName]
            ,e.[lastName]
            ,r.role
            ,e.[image]
            ,e.[employeeCode]
             FROM 
                  employee as e INNER JOIN 
                  employee_role as er ON e.id = er.employeeId INNER JOIN
                  role as r ON r.id = er.roleId  
                  WHERE e.isActive = 1
                  AND e.id=${req.id}`);



        if (result.recordset.length > 0) {

            let orgImage = result.recordset[0].image;

            result.recordset[0].imageName = orgImage

            let ext = orgImage.split('.');

            const image = fs.readFileSync(`public/userImages/${result.recordset[0].image}`, 'base64');

            result.recordset[0].img = `data:image/${ext[ext.length - 1]};base64,${image}`

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
    otherLogin: otherLogin,
    addUser: addUser,
    getUser: getUser,
    getMaxUserName: getMaxUserName,
    getUserProfile: getUserProfile,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getUserById: getUserById,
    getAllUsers: getAllUsers,
    getUsersBySearch: getUsersBySearch,
    getUserCount: getUserCount,
    getRightsByRole: getRightsByRole
}