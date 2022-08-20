module.exports = app => {
    const router = require("express").Router();
    const { uploadImage, upload } = require('../controller/file.controller');
    router.post('/postImages', uploadImage, upload);
    app.use('/api', router);
}