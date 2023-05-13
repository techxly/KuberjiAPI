require("dotenv").config();
const sql = require('mssql')
const {
    poolPromise
} = require('../connections/mssql-db');
const roleController = require('../controller/site.controller');

const addRole = async (req, res) => {

    try {
        const pool = await poolPromise;

        const result = await pool.request()
            .query(`INSERT INTO role
            (role,level
            ,description,isActive)
        VALUES
            ('${req.name}',
            '${parseInt(req.level)}'
            ,'${req.desc}',
            ${1})`
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
            });


            const result = await pool.request()
                .query(`SELECT * FROM role WHERE isActive=1`);
            if (result) {

                return result.recordset;
            }
            else {
                return null;
            }



        }
        else
            return null;



    } catch (error) {

        res.status(500);
        return error.message;
    }
}

const getRoles = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .query(`SELECT * FROM role WHERE isActive=1 AND level > 0`);
        if (result) {

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

    console.log('req', req)

    try {
        const pool = await poolPromise;

        const table = new sql.Table('role_module');
        table.columns.add('id', sql.Numeric(4, 0), { nullable: true });
        table.columns.add('accessType', sql.Char(4), { nullable: true });

        const rights = req.list;
        rights.forEach(r => {
            table.rows.add(
                r.id,
                r.accessType
            )
        });

        console.log('JSON.stringify(req.list)', JSON.stringify(req.list))
        const result = await pool.request()
            //.input('role_module', sql.TYPES.TVP, table)
            .input('role_module', JSON.stringify(req.list))
            .input('id', parseInt(req.id))
            .input('role', req.name)
            .input('level', req.level)
            .input('description', req.description)
            .execute(`updateRole`);


        console.log('result', result)

        if (result) {
            return result.recordset;
        }
        else {
            return null;
        }

    } catch (error) {
        res.status(500);
        console.log('error.message', error)
        return error.message;
    }
}

const updateRoleStatus = async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('typeId', req.typeId)
            .input('status', req.typeStatus == true ? 1 : 0)
            .execute(`updateRoleStatus`);

        if (result)
            return;
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const getRights = async (req, res) => {


    //console.log('req===?', req)
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', req.id)
            .execute(`getRights`);


        //console.log('result--->', result.recordset)



        if (result) {
            return result.recordset;
        }
        else
            return null;
    } catch (error) {
        res.status(500);
        return error.message;
    }
}

const deleteRole = async (req, res) => {

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
    updateRoleStatus: updateRoleStatus,
    deleteRole: deleteRole,
    getRights: getRights
}