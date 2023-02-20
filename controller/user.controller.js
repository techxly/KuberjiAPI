const userService = require('../services/user.services');


const getUser = (req, res) => {

    return userService.getUser(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'userData': resData
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



const addUser = (req, res) => {

    return userService.addUser(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'userData': resData
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

const updateUser = (req, res) => {

    return userService.updateUser(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'userData': resData
            })
        })
        .catch(error => {
            res.status(500).json({
                'success': true,
                'code': 500,
                'data': error
            })
        })
}

const deleteUser = (req, res) => {

    return userService.deleteUser(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'userData': resData
            })
        })
        .catch(error => {
            res.status(500).json({
                'success': true,
                'code': 500,
                'data': error
            })
        })
}

const getRightsByUser = (req, res) => {

    return userService.getRightsByUser(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'rightsData': resData
            })
        })
        .catch(error => {
            res.status(500).json({
                'success': true,
                'code': 500,
                'data': error
            })
        })
}

const getUserById = (req, res) => {

    return userService.getUserById(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'userData': resData
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
const getUserProfile = (req, res) => {

    return userService.getUserProfile(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'userData': resData
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

const getAllUsers = (req, res) => {
    return userService.getAllUsers()
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'userData': resData
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

const getAllUsersBasics = (req, res) => {
    return userService.getAllUsersBasics()
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'userData': resData
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

const getUsersBySearch = (req, res) => {

    //console.log('req.body', req.body)
    return userService.getUsersBySearch(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'userData': resData
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

const getMaxUserName = (req, res) => {
    return userService.getMaxUserName()
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'maxUser': resData
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

const getUserCount = (req, res) => {
    return userService.getUserCount()
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'userCount': resData
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

const login = (req, res) => {
    return userService.login(req.body)
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

const otherLogin = (req, res) => {
    return userService.otherLogin(req.body)
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
const verifyToken = (req, res) => {
    return userService.verifyToken(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'userData': resData
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
const getRightsByRole = (req, res) => {
    return userService.getRightsByRole(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'rights': resData
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
const resetPassword = (req, res) => {
    return userService.resetPassword(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'updated': resData
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
const getUsersBySite = (req, res) => {
    return userService.getUsersBySite(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'userData': resData
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
    login: login,
    otherLogin: otherLogin,
    verifyToken: verifyToken,
    addUser: addUser,
    getUserCount: getUserCount,
    getUser: getUser,
    getUserProfile: getUserProfile,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getUserById: getUserById,
    getAllUsers: getAllUsers,
    getAllUsersBasics: getAllUsersBasics,
    getUsersBySearch: getUsersBySearch,
    getMaxUserName: getMaxUserName,
    getRightsByRole: getRightsByRole,
    resetPassword: resetPassword,
    getRightsByUser: getRightsByUser,
    getUsersBySite: getUsersBySite
}