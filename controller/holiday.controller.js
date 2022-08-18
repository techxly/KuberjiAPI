const holidayService = require('../services/holiday.services');


const getHoliday = (req, res) => {

    return holidayService.getHoliday()
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'holidayData': resData
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


const addHoliday = (req, res) => {

    return holidayService.addHoliday(req.body)
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


const updateHoliday = (req, res) => {

    return holidayService.updateHoliday(req.body)
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

const deleteHoliday = (req, res) => {

    return holidayService.deleteHoliday(req.body)
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
    addHoliday: addHoliday,
    getHoliday: getHoliday,
    updateHoliday: updateHoliday,
    deleteHoliday: deleteHoliday
}