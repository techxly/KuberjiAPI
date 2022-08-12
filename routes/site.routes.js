module.exports = app => {

    const router = require("express").Router();
    const siteController = require('../controller/site.controller');


    router.get('/getSite', siteController.getSite);
    router.post('/addSite', siteController.addSite);
    router.post('/updateSite', siteController.updateSite);
    router.post('/deleteSite', siteController.deleteSite);

    app.use('/api', router);
}