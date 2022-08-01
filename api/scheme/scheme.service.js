const conn = require("../../config/database")

module.exports = {
  createScheme: (data, callBack) => {
    conn.query(
      `INSERT INTO SchemeDetails (name,address,landmark,registrationNumber,registeredOn, city, state) VALUES (?,?,?,?,?,?,?)`,
      [
        data.name,
        data.address,
        data.landmark,
        data.registrationNumber,
        data.registeredOn,
        data.city,
        data.state
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getAllScheme: callBack => {
    conn.query(
      `select * from SchemeDetails`,
      [],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
}