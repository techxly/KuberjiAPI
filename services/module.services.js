require("dotenv").config();
const {
    poolPromise
} = require('../connections/mssql-db');
const moduleController = require('../controller/module.controller');

const addModule = async (req, res) => {

    console.log(req.name)

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`INSERT INTO role
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

const getModules = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`SELECT id,name FROM modules WHERE isActive=1`);
        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const updateModule = async (req, res) => {

    console.log(req)

    try {
        const pool = await poolPromise;


        const result = await pool.request()
            .query(`UPDATE site
                SET
                 unit='${req.unit}'
                ,siteName='${req.name}'
                ,radius='${req.radius}'
                ,city='${req.city}'
                ,state='${req.state}'
                ,zipCode='${req.zipcode}'
                ,address='${req.address}' 
            WHERE id=${req.id} AND isActive=1`
            );

        console.log('result', result)


        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}
const deleteModule = async (req, res) => {

    console.log('req', req)

    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .query(`UPDATE site
                SET isActive=0
                WHERE id=${req.id}`
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

module.exports = {
    addModule: addModule,
    getModules: getModules,
    updateModule: updateModule,
    deleteModule: deleteModule
}