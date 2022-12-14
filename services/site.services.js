const jwt = require('jsonwebtoken');
const moment = require('moment');
const bcrypt = require('bcrypt');
require("dotenv").config();
const {
    poolPromise
} = require('../connections/mssql-db');
const siteController = require('../controller/site.controller');

const addSite = async (req, res) => {

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
            ,lat
            ,lon
            ,address)
        VALUES
            ('${req.unit}'
            ,'${req.name}'
            ,${parseInt(req.radius)}
            ,'${req.city}'
            ,'${req.state}'
            ,${parseInt(req.zipcode)}
            ,${req.lat}
            ,${req.lon}
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

const getSite = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`SELECT * FROM site WHERE isActive=1`);
        if (result) {
            let newData = [];

            result.recordset.map((item, index) => {

                newData.push({ srno: index + 1, ...item })

            })


            return newData;
        }

        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const updateSite = async (req, res) => {

    try {
        const pool = await poolPromise;


        const result = await pool.request()
            .query(`UPDATE site
                SET
                 unit='${req.unit}'
                ,siteName='${req.name}'
                ,radius=${parseInt(req.radius)}
                ,city='${req.city}'
                ,state='${req.state}'
                ,lat='${req.lat}'
                ,lon='${req.lon}'
                ,zipCode=${parseInt(req.zipcode)}
                ,address='${req.address}' 
            WHERE id=${parseInt(req.id)} AND isActive=1`
            );

        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500, error.message);
        return error.message;
    }
}
const deleteSite = async (req, res) => {

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
    addSite: addSite,
    getSite: getSite,
    updateSite: updateSite,
    deleteSite: deleteSite
}