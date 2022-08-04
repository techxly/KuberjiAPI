require("dotenv").config();
var connStr = {
    MSSQL: {
        SERVER: process.env.DB_SERVER,
        USER: process.env.DB_USER,
        PASSWORD: process.env.DB_PASSWORD,
        DB: process.env.DB_DATABASE,
        PORT: parseInt(process.env.DB_PORT)
    }
}

module.exports = connStr;