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

const login = (req, res) => {
    return userService.login(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'accessToken': resData
            })
        })
        .catch(error => {
            console.log(error)
            res.status(200).json({
                'success': true,
                'code': 500,
                'data': error
            })
        })
}

module.exports = {
    login: login,
    addUser: addUser,
    getUser: getUser,
    getAllUsers: getAllUsers

}