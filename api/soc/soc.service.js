const conn = require("../../config/database")

module.exports = {
  createSoc: (data, callBack) => {
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
  getAllSoc: callBack => {
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
}