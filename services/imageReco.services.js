


// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
const canvas = require('canvas');
const faceapi = require('face-api.js');


// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement
const { Canvas, Image, ImageData } = canvas

faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

let userId;
const userIncomingImage = new Image();

const faceReco = async (req, res) => {

    userId = req.id;

    try {

        detectFaces(req.image64)

    } catch (error) {
        res.status(500);
        return error.message;
    }

}

const detectFaces = async (image) => {
    const MODEL_URL = './public/models'; // set .env path in future
    let uploaded = true;
    require("fs").writeFile(`./public/temp/temp_${userId}.png`, image, 'base64', function (err) {
        if (err)
            uploaded = false
        else if (!require("fs").existsSync(`./public/temp/temp_${userId}.png`))
            uploaded = false
    });
    if (uploaded) {

        Promise.all([
            await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL),
            await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL),
            await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL),
        ]).then(() => {
            matchFaces(image)
        });
    }
}

const matchFaces = async (img) => {

    await bindLabels('./public/userImages/', async (v) => {

        userIncomingImage.src = `./public/temp/temp_${userId}.png`

        const labeledFaceDescriptors = await loadLabeledImages(v)

        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)

        const detections = await faceapi.detectSingleFace(userIncomingImage).withFaceLandmarks().withFaceDescriptor();

        const result = faceMatcher.findBestMatch(detections.descriptor)
        //console.log('results', result.toString())
    })

};


function bindLabels(path, fileList) {

    const fs = require('fs');
    fs.readdir(path, (err, files) => {
        fileList(files)
    });
}



function loadLabeledImages(labels) {

    return Promise.all(

        labels.map(async label => {
            const descriptions = []
            const userStoredImage = new Image();
            userStoredImage.src = `./public/userImages/${label}`

            const detections = await faceapi.detectSingleFace(userStoredImage).withFaceDescriptor();

            descriptions.push(detections.descriptor)

            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
}




module.exports = {
    faceReco: faceReco
}
