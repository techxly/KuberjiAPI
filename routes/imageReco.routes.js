module.exports = app => {
    const router = require("express").Router();
    const faceController = require('../controller/imageReco.controller');
    router.post('/matchFace', faceController.faceReco);
    app.use('/api', router);
}
