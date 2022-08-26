const { uploadImage, data } = require('../services/file.services');

exports.uploadImage = uploadImage;
exports.upload = (req, res) => {

    console.log('data', data)

    res.status(200).json({
        fileData: data
    })
} 