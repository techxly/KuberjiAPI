module.exports = app => {

    const router = require("express").Router();
    const miscController = require('../controller/misc.controller');


    router.post("/sendResetLink", miscController.sendResetLink);
    router.post("/checkNotifications", miscController.checkNotifications);
    router.post("/addNotifications", miscController.addNotifications);
    router.post("/markAsRead", miscController.markAsRead);
    router.get("/getDefaultValues", miscController.getDefaultValues);

    app.use('/api', router);
}







