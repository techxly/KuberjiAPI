module.exports = app => {

    const router = require("express").Router();
    const attendanceController = require('../controller/attendance.controller');

    router.get('/attendanceByDate', attendanceController.getAttendanceByDate);
    router.post('/getTodaysAttendance', attendanceController.getTodaysAttendance);

    app.use('/api', router);
}