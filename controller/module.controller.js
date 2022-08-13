const moduleService = require('../services/module.services');


const getModules = (req, res) => {

    return moduleService.getModules()
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


const addModule = (req, res) => {

    return moduleService.addModule(req.body)
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


const updateModule = (req, res) => {

    return moduleService.updateModule(req.body)
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

const deleteModule = (req, res) => {

    return moduleService.deleteModule(req.body)
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
    addModule: addModule,
    getModules: getModules,
    updateModule: updateModule,
    deleteModule: deleteModule
}