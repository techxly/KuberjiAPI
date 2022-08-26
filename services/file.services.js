
const multer = require("multer")
const {
    poolPromise
} = require('../connections/mssql-db')
const data = { code: 1 };
const multerConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'public/users')
    },
    filename: async (req, file, callback) => {

        console.log('file', file)

        const pool = await poolPromise;
        const result = await pool.request()
            .execute(`getUserMaxUserName`);

        let num = result.recordset[0].userName.replace(/U/, '');
        let newNum = parseInt(num) + 1;
        let newUserName = newNum <= 9 ? '000' + newNum : newNum <= 99 ? '00' + newNum : newNum <= 999 ? '0' + newNum : newNum;

        console.log('result.recordset', result.recordset)
        const ext = file.mimetype.split('/')[1];
        data.imageName = 'U' + newUserName + '.' + ext;
        callback(null, `U${newUserName}.${ext}`)
    }
})

const isImage = (req, file, callback) => {

    console.log('file', file)


    if (file.mimetype.startsWith('image')) {
        callback(null, true)
    }
    else {
        data.code = 2
        callback(null, 'Only Image is allowed.')
    }
}
const upload = multer({
    storage: multerConfig,
    fileFilter: isImage
})

exports.uploadImage = upload.single('userImage');
exports.data = data;