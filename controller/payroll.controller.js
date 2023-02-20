const payrollService = require('../services/payroll.services');


const getPayroll = (req, res) => {

    return payrollService.getPayroll(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'payrollData': resData
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

const getPaySlipDetails = (req, res) => {

    //console.log("getPaySlipDetails")

    return payrollService.getPaySlipDetails(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'paySlipData': resData
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
const getPaySlipByEmpMonthYear = (req, res) => {

    //console.log("getPaySlipByEmpMonthYear")

    return payrollService.getPaySlipByEmpMonthYear(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'paySlipData': resData
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
const getPayrollById = (req, res) => {

    return payrollService.getPayrollById(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'payrollData': resData
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


const addPayroll = (req, res) => {

    return payrollService.addPayroll(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'data': resData
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


const updatePayroll = (req, res) => {

    return payrollService.updatePayroll(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'payrollData': resData
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

const deletePayroll = (req, res) => {

    return payrollService.deletePayroll(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'data': resData
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
    addPayroll: addPayroll,
    getPayrollById: getPayrollById,
    getPaySlipDetails: getPaySlipDetails,
    getPayroll: getPayroll,
    updatePayroll: updatePayroll,
    deletePayroll: deletePayroll,
    getPaySlipByEmpMonthYear: getPaySlipByEmpMonthYear
}