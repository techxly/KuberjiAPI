const miscService = require('../services/misc.services');


const sendResetLink = (req, res) => {

    const mailOptions = {
        emailTo: req.body.emailId,
        subject: "Shriji Kuberji- Password Reset Link",
        html: `Click <a href='http://localhost:3000/resetPassword?t=##token##' >here</a> to reset the password: <b>Hello</b>`
    }

    return miscService.sendResetLink(mailOptions)
        .then(resData => {

            console.log('resData______', resData)
            if (resData == "Success") {
                res.status(200).json({
                    'success': true,
                    'code': 200,
                    'data': resData
                })
            }
            else {
                res.status(200).json({
                    'success': false,
                    'code': 500,
                    'data': "Failed"
                })
            }
        })
        .catch(error => {
            res.status(200).json({
                'success': true,
                'code': 500,
                'data': error
            })
        })
}
const sendContactMail = (req, res) => {



    return miscService.sendContactMail(req.body)
        .then(resData => {

            if (resData == "Success") {
                res.status(200).json({
                    'success': true,
                    'code': 200,
                    'data': resData
                })
            }
            else {
                res.status(200).json({
                    'success': false,
                    'code': 500,
                    'data': "Failed"
                })
            }
        })
        .catch(error => {

            console.log('error', error)
            res.status(200).json({
                'success': false,
                'code': 500,
                'data': error
            })
        })
}

const checkNotifications = (req, res) => {

    return miscService.checkNotifications(req.body)
        .then(resData => {

            //console.log('resData______', resData)

            res.status(200).json({
                'success': true,
                'code': 200,
                'notifications': resData
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

const addNotifications = (req, res) => {

    return miscService.addNotifications(req.body)
        .then(resData => {

            //console.log('resData______', resData)

            res.status(200).json({
                'success': true,
                'code': 200,
                'notifications': resData
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

const markAsRead = (req, res) => {

    return miscService.markAsRead(req.body)
        .then(resData => {

            res.status(200).json({
                'success': true,
                'code': 200
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

const getDefaultValues = (req, res) => {

    return miscService.getDefaultValues()
        .then(resData => {

            res.status(200).json({
                'success': true,
                'code': 200,
                'defaultData': resData
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

module.exports = {
    sendResetLink: sendResetLink,
    sendContactMail: sendContactMail,
    checkNotifications: checkNotifications,
    addNotifications: addNotifications,
    markAsRead: markAsRead,
    getDefaultValues: getDefaultValues

}

