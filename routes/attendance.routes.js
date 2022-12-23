module.exports = app => {

    const router = require("express").Router();
    const attendanceController = require('../controller/attendance.controller');

    router.post('/addAttendance', attendanceController.addAttendance);
    router.post('/attendanceByDate', attendanceController.getAttendanceByDate);
    router.post('/getTodaysAttendance', attendanceController.getTodaysAttendance);
    router.post('/getAttendanceSheetData', attendanceController.getAttendanceSheetData);
    router.post('/uploadUserImage', attendanceController.uploadUserImage);

    app.use('/api', router);
}