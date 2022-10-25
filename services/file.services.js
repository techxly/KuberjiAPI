
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

        const pool = await poolPromise;

        console.log('req.headers.isUpdate', req.headers.isupdate)
        if (req.headers.isupdate == 'true') {

            console.log('1', 1)
            let imageName = req.headers.image.split('.')
            console.log('imageName', imageName)
            const ext = imageName[1];
            data.imageName = imageName[0] + '.' + ext;
            callback(null, `${imageName[0]}.${ext}`)

        }
        else {

            console.log('2', 2)


            const result = await pool.request()
                .execute(`getUserMaxUserName`);

            let num = result.recordset[0].userName.replace(/U/g, '');
            let newNum = parseInt(num) + 1;
            let newUserName = 'U' + (newNum <= 9 ? '000' + newNum : newNum <= 99 ? '00' + newNum : newNum <= 999 ? '0' + newNum : newNum);
            const ext = file.mimetype.split('/')[1];
            data.imageName = 'U' + newUserName + '.' + ext;
            callback(null, `U${newUserName}.${ext}`)
        }

        console.log('data', data)
    }
})

const isImage = (req, file, callback) => {

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