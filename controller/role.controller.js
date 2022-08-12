const roleService = require('../services/role.services');


const getRoles = (req, res) => {

    return roleService.getRoles()
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'siteData': resData
            })
        })
        .catch(error => {
            res.status(200).json({
                'success': true,
                'code': 500,
                'data': error
            })
        })
}


const addRole = (req, res) => {

    return roleService.addRole(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'data': resData
            })
        })
        .catch(error => {
            res.status(200).json({
                'success': true,
                'code': 500,
                'data': error
            })
        })
}


const updateRole = (req, res) => {

    return roleService.updateRole(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'data': resData
            })
        })
        .catch(error => {
            res.status(200).json({
                'success': true,
                'code': 500,
                'data': error
            })
        })
}

const deleteRole = (req, res) => {

    return roleService.deleteRole(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'data': resData
            })
        })
        .catch(error => {
            res.status(200).json({
                'success': true,
                'code': 500,
                'data': error
            })
        })
}



module.exports = {
    addRole: addRole,
    getRoles: getRoles,
    updateRole: updateRole,
    deleteRole: deleteRole
}