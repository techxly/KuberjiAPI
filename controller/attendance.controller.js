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
const getAttendanceSheetData = (req, res) => {

    return attendanceService.getAttendanceSheetData(req.body)
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
const uploadUserImage = (req, res) => {

    return attendanceService.uploadUserImage(req.body)
        .then(resData => {

            console.log('resData', resData)

            res.status(200).json({
                'success': true,
                'code': 200,
                'imageUploaded': resData
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
const addAttendance = (req, res) => {

    console.log('req', req)

    return attendanceService.addAttendance(req.body)
        .then(resData => {

            console.log('resData', resData)

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
    addAttendance: addAttendance,
    getAttendanceByDate: getAttendanceByDate,
    getTodaysAttendance: getTodaysAttendance,
    getAttendanceSheetData: getAttendanceSheetData,
    uploadUserImage: uploadUserImage,
}