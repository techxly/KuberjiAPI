const faceRecoServices = require('../services/imageReco.services');

exports.faceReco = (req, res) => {
    return faceRecoServices.faceReco(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'faceData': resData
            })
        })
        .catch(error => {
            res.status(200).json({
                'success': true,
                'code': 500,
                'data': error
            })
        })
}

