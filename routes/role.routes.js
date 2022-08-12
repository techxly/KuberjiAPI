module.exports = app => {

    const router = require("express").Router();
    const roleController = require('../controller/role.controller');


    router.get('/getRoles', roleController.getRoles);
    router.post('/addRole', roleController.addRole);
    router.post('/updateRole', roleController.updateRole);
    router.post('/deleteRole', roleController.deleteRole);

    app.use('/api', router);
}