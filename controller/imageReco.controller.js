//const faceRecoServices = require('../services/imageReco.services');
const faceRecoServices = require('../services/imageMatching.services');



exports.faceReco = (req, res) => {
    return faceRecoServices.faceReco(req.body)
        .then(resData => {

            console.log('resData', resData)
            res.status(200).json({
                'success': true,
                'code': resData ? 200 : 500,
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

