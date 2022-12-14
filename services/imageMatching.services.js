


// implements nodejs wrappers for HTMLCanvasElement, HTMLImageElement, ImageData
const canvas = require('canvas');
const faceapi = require('face-api.js');

const { promises: fs } = require("fs");
// patch nodejs environment, we need to provide an implementation of
// HTMLCanvasElement and HTMLImageElement
const { Canvas, Image, ImageData } = canvas

faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

let userId;
const userIncomingImage = new Image();

const faceReco = async (req, res) => {

    userId = req.id;
    console.log('userId', userId)
    try {

        const MODEL_URL = './public/models'; // set .env path in future
        let uploaded = true;
        userIncomingImage.src = `./public/temp/temp_${userId}.png`;

        await require("fs").writeFile(`./public/temp/temp_${userId}.png`, req.image64, 'base64', function (err) {
            if (err)
                uploaded = false
            else if (!require("fs").existsSync(`./public/temp/temp_${userId}.png`))
                uploaded = false
        });
        await faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_URL);
        await faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_URL);
        await faceapi.nets.ssdMobilenetv1.loadFromDisk(MODEL_URL);


        let files = await fs.readdir("./public/userImages/");
        console.log('files', files)
        //Promise.all([
        const labeledFaceDescriptors = await loadLabeledImages(files);
        const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
        const detections = await faceapi.detectSingleFace(userIncomingImage).withFaceLandmarks().withFaceDescriptor();
        if(detections){
            const result = await faceMatcher.findBestMatch(detections.descriptor);
        //]).then(() => {
        console.log('result', result);
        return (result._label);
        }
        else{
            //res.status(200);
            return null
        }
        
        //});

    } catch (error) {
        console.log('error', error)
        res.status(500);
        return error.message;
    }

}


// async function bindLabels(path, fileList) {

//     const fs = require('fs');
//     fs.readdir(path, (err, files) => {
//         fileList(files)
//     });
// }



async function loadLabeledImages(labels) {

    return Promise.all(

        labels.map(async label => {
            const descriptions = []
            const userStoredImage = new Image();
            userStoredImage.src = `./public/userImages/${label}`

            const detections = await faceapi.detectSingleFace(userStoredImage).withFaceLandmarks().withFaceDescriptor();

            descriptions.push(detections.descriptor)

            return new faceapi.LabeledFaceDescriptors(label.split('.')[0], descriptions)
        })
    )
}




module.exports = {
    faceReco: faceReco
}
