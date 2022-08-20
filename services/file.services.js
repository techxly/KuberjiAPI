
const multer = require("multer")
const code = 1;
const multerConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/users')
    },
    filename: (req, file, callback) => {
        const ext = file.mimetype.split('/')[1];
        callback(null, `image-${Date.now()}.${ext}`)
    }
})

const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true)
    }
    else {
        code = 2
        callback(null, 'Only Image is allowed.')
    }
}
const upload = multer({
    storage: multerConfig,
    fileFilter: isImage
})

exports.uploadImage = upload.single('userImage');
exports.code = code;