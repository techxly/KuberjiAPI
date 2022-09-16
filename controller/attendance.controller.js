const attendanceService = require('../services/attendance.services');


const getAttendanceByDate = (req, res) => {

    return attendanceService.getAttendanceByDate(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'attendanceCount': resData
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
const getTodaysAttendance = (req, res) => {

    return attendanceService.getTodaysAttendance(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'todaysAttendance': resData
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
    getAttendanceByDate: getAttendanceByDate,
    getTodaysAttendance: getTodaysAttendance,
}