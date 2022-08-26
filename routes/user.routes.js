module.exports = app => {

    const router = require("express").Router();
    const userController = require('../controller/user.controller');


    router.post('/login', userController.login);
    router.post('/getUser', userController.getUser);
    router.post('/getUserById', userController.getUserById);
    router.post('/addUser', userController.addUser);
    router.post('/updateUser', userController.updateUser);
    router.post('/deleteUser', userController.deleteUser);
    router.get('/allUsers', userController.getAllUsers);

    app.use('/api', router);
}