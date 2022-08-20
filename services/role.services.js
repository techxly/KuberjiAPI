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

        const result = await pool.request()
            .query(`INSERT INTO role
            (role
            ,description,isActive)
        VALUES
            ('${req.name}'
            ,'${req.desc}',
            ${1});`
            );

        const maxId = await pool.request()
            .query(`SELECT MAX(id) as maxId FROM role;`
            );
            
        if (maxId && result) {
            await pool.connect();
            const table = new sql.Table('role_module');
            table.columns.add('moduleId', sql.Numeric(4, 0), { nullable: true });
            table.columns.add('roleId', sql.Numeric(4, 0), { nullable: true });
            table.columns.add('accessType', sql.Char(4), { nullable: true });
            table.columns.add('isActive', sql.Bit, { nullable: true });

            const rights = req.list;
            rights.forEach(r => {
                table.rows.add(
                    r.id,
                    maxId.recordset[0].maxId,
                    r.accessType,
                    1
                )
            });

            const request = pool.request();
            request.bulk(table, (err, result) => {
                console.log('err', err)
            });




            // const table = await pool.table('role');
            // table.columns.add('Id', sql.numeric(4, 0), { nullable: false });
            // table.columns.add('moduleId', sql.numeric(4, 0), { nullable: false });
            // table.columns.add('roleId', sql.numeric(4, 0), { nullable: false });
            // table.columns.add('accessType', sql.char(4), { nullable: false });
            // table.columns.add('isActive', sql.bit, { nullable: false });

            // req.list.forEach(arr => table.rows.add.apply(null, arr));

            // const request = await pool.request();

            // request.bulk(table, (err, result) => {
            //     if (result)
            //         return result.recordset;
            //     else
            //         return null;
            // });
        }
        else
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
        if (result) {

            console.log('result.recordset', result.recordset)

            return result.recordset;
        }
        else {
            return null;
        }
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
            .query(`UPDATE role
                SET
                role='${req.name}'
                ,description='${req.description}'
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
            .query(`UPDATE role SET isActive='false'
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