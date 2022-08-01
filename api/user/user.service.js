require("dotenv").config();
const jwt = require('jsonwebtoken');
const conn = require("../../config/database")
const moment = require('moment');
const bcrypt = require('bcrypt');
module.exports = {
  addNewUser: (data, callBack) => {
    conn.query(
      `insert into Login(userName,password,createdOn,lastLogin,isFirstTime,isActive) values(?,?,?,NULL,1,1)`,
      [
        data.username,
        data.password,
        moment().format("YYYY-MM-DD HH:mm:SSA")
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  createUser: (data, callBack) => {
    conn.query(
      `insert into Test(Name) values(?)`,
      [
        data.name
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getAllUsers: callBack => {
    conn.query(
      `select * from Test`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getUser: (data, callBack) => {

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    const token = data.headers.Authorization;
    const verified = jwt.verify(token, jwtSecretKey);
    let userId;
    if (verified) {
      const decoded = jwt.decode(token, { complete: true });
      if (decoded) {
        userId = decoded.payload.userId;
        conn.query(
          `SELECT e.id, e.userName, e.firstName, e.email, e.employeeCode, r.role  FROM employee as e INNER JOIN 
          employee_role as er ON e.id = er.employeeId INNER JOIN 
          role as r ON r.id = er.roleId
          WHERE e.id = ? 
          AND e.isActive = 1 
          AND er.isActive = 1 
          AND r.isActive = 1`,
          [
            userId
          ],
          (error, results, fields) => {
            var string = JSON.stringify(results);
            var json = JSON.parse(string);
            if (error) {
              console.log('error', error)
              callBack(error);
            }
            if (json[0]) {
              return callBack(null, json[0]);
            }
            callBack(null, 0);
          }
        );
      }
    }
  },
  login: (data, callBack) => {
    conn.query(
      `SELECT id, password from employee WHERE userName = ? 
      AND isActive = 1`,
      [
        data.userName
      ],
      (error, results, fields) => {

        var string = JSON.stringify(results);
        var json = JSON.parse(string);
        if (error) {
          console.log('error', error)
          callBack(error);
        }
        if (json[0]) {
          if (bcrypt.compareSync(data.password, json[0].password)) {

            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let id = json[0].id;
            let Data = {
              time: Date(),
              userId: id,
              expiresIn: process.env.JWT_EXPIRES_IN // expires in 24 hours
            }

            const token = jwt.sign(Data, jwtSecretKey);

            return callBack(null, token);
          }
          else {
            return callBack(null, 0);
          }
        }
        callBack(null, 0);
      }
    );
  },

  generateToken: (data) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let id = data.id;
    let Data = {
      time: Date(),
      userId: id,
      expiresIn: process.env.JWT_EXPIRES_IN // expires in 24 hours
    }
    return jwt.sign(Data, jwtSecretKey);

  },
  validateToken: (data, callBack) => {

    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {




      const token = req.header('accessToken');
      //const token = data.token; // get from req header
      const verified = jwt.verify(token, jwtSecretKey);

      console.log('verified', verified)

      if (verified) {
        return callBack(1);
      } else {
        // Access Denied
        return callBack(0);
      }
    } catch (error) {
      // Access Denied
      return callBack(null, error);
    }
  },
}