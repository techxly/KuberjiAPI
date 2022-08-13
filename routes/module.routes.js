module.exports = app => {

    const router = require("express").Router();
    const moduleController = require('../controller/module.controller');


    router.get('/getModules', moduleController.getModules);
    router.post('/addModule', moduleController.addModule);
    router.post('/updateModule', moduleController.updateModule);
    router.post('/deleteModule', moduleController.deleteModule);

    app.use('/api', router);
}