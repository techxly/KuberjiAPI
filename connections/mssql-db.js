const sql = require('mssql')
const dbConfig = require("../config/db.config.js");
const config = {
    user: dbConfig.MSSQL.USER,
    password: dbConfig.MSSQL.PASSWORD,
    server: dbConfig.MSSQL.SERVER,
    database: dbConfig.MSSQL.DB,
    port: dbConfig.MSSQL.PORT,
    options: {
        encrypt: false
    }
}

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log("DB Connected");
        return pool;
    })
    .catch(err => {
        console.log("DB connected failed.", err);
    })

module.exports = {
    poolPromise
}