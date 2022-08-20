const { uploadImage, code } = require('../services/file.services');

exports.uploadImage = uploadImage;
exports.upload = (req, res) => {

    console.log('req.body', req['userImages'])

    res.status(200).json({
        code: code
    })
} 