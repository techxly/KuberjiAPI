module.exports = app => {

    const router = require("express").Router();
    const holidayController = require('../controller/holiday.controller');


    router.get('/getHoliday', holidayController.getHoliday);
    router.post('/addHoliday', holidayController.addHoliday);
    router.post('/updateHoliday', holidayController.updateHoliday);
    router.post('/deleteHoliday', holidayController.deleteHoliday);

    app.use('/api', router);
}