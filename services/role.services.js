require("dotenv").config();
const sql = require('mssql')
const {
    poolPromise
} = require('../connections/mssql-db');
const roleController = require('../controller/site.controller');

const addRole = async (req, res) => {

    console.log(req.name)

    try {
        const pool = await poolPromise;

        const loginResult = await pool.request()
            .query(`INSERT INTO role
            (role
            ,description,isActive)
        VALUES
            ('${req.name}'
            ,'${req.desc}',
            ${1})`
            );




        if (loginResult) {


            /*
            
            const table = new sql.Table('CLASS_TABLE');
            table.columns.add('moduleId', sql.numeric(4,0), {nullable: false});
            table.columns.add('roleId', sql.numeric(4,0), {nullable: false});
            table.columns.add('accessType', sql.char(4), {nullable: false});
            table.columns.add('isActive', sql.Bit, {nullable: false});

            values.forEach(arr => table.rows.add.apply(null, arr));

            const request = new sql.Request();
            request.bulk(table, (err, result) => {
              // ... error checks
            });

            
            */

            const table = await pool.table('role');
            table.columns.add('Id', sql.numeric(4, 0), { nullable: false });
            table.columns.add('moduleId', sql.numeric(4, 0), { nullable: false });
            table.columns.add('roleId', sql.numeric(4, 0), { nullable: false });
            table.columns.add('accessType', sql.char(4), { nullable: false });
            table.columns.add('isActive', sql.bit, { nullable: false });

            req.list.forEach(arr => table.rows.add.apply(null, arr));

            const request = await pool.request();

            request.bulk(table, (err, result) => {
                if (result)
                    return result.recordset;
                else
                    return null;
            });

        } else
            return null;
    } catch (error) {

        console.log('error', error)

        res.status(500);
        return error.message;
    }
}

const getRoles = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`SELECT * FROM role WHERE isActive=1`);
        if (result)
            return result.recordset;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const updateRole = async (req, res) => {

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
const deleteRole = async (req, res) => {

    console.log('req', req)

    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .query(`DELETE from role
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
    addRole: addRole,
    getRoles: getRoles,
    updateRole: updateRole,
    deleteRole: deleteRole
}