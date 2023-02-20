module.exports = app => {

    const router = require("express").Router();
    const userController = require('../controller/user.controller');


    router.post('/login', userController.login);
    router.post('/otherLogin', userController.otherLogin);
    router.post('/verifyToken', userController.verifyToken);
    router.post('/getUser', userController.getUser);
    router.post('/getUserById', userController.getUserById);
    router.post('/addUser', userController.addUser);
    router.post('/updateUser', userController.updateUser);
    router.post('/deleteUser', userController.deleteUser);
    router.get('/allUsers', userController.getAllUsers);
    router.get('/getAllUsersBasics', userController.getAllUsersBasics);
    router.post('/getUsersBySearch', userController.getUsersBySearch);
    router.get('/getUserCount', userController.getUserCount);
    router.post('/userProfile', userController.getUserProfile);
    router.get('/getMaxUserName', userController.getMaxUserName);
    router.post('/getRightsByRole', userController.getRightsByRole);
    router.post('/resetPassword', userController.resetPassword);
    router.post('/getRightsByUser', userController.getRightsByUser);
    router.post('/getUsersBySite', userController.getUsersBySite);

    app.use('/api', router);
}