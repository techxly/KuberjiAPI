const siteService = require('../services/site.services');


const getSite = (req, res) => {

    return siteService.getSite()
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


const addSite = (req, res) => {

    return siteService.addSite(req.body)
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


const updateSite = (req, res) => {

    return siteService.updateSite(req.body)
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

const deleteSite = (req, res) => {

    return siteService.deleteSite(req.body)
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
    addSite: addSite,
    getSite: getSite,
    updateSite: updateSite,
    deleteSite: deleteSite
}