const leavesService = require('../services/leaves.services');


const getLeaves = (req, res) => {

    return leavesService.getLeaves(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'leavesData': resData
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
    console.log('req.body', req.body)

    return leavesService.getPaySlipDetails(req.body)
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
const getLeavesById = (req, res) => {
    console.log('req.body', req.body)

    return leavesService.getLeavesById(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'leavesData': resData
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


const getLeaveTypes = (req, res) => {

    return leavesService.getLeaveTypes(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'leaveTypesData': resData
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

const getLeaveTypesById = (req, res) => {

    return leavesService.getLeaveTypesById(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'leaveTypesData': resData
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

const addLeaves = (req, res) => {

    return leavesService.addLeaves(req.body)
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

const addLeaveType = (req, res) => {

    return leavesService.addLeaveType(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'leaveTypesData': resData
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

const updateLeaveType = (req, res) => {

    return leavesService.updateLeaveType(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'leaveTypesData': resData
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
const updateLeaveTypeStatus = (req, res) => {

    return leavesService.updateLeaveTypeStatus(req.body)
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


const updateLeaves = (req, res) => {

    return leavesService.updateLeaves(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'leavesData': resData
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

const deleteLeaves = (req, res) => {

    return leavesService.deleteLeaves(req.body)
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'leavesData': resData
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

const getAllLeaves = (req, res) => {

    return leavesService.getAllLeaves()
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'leavesData': resData
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

const getLeaveBalance = (req, res) => {


    console.log("hello123")


    return leavesService.getLeaveBalance()
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'leaveBalance': resData
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
const getLeaveBalanceAction = (req, res) => {


    console.log("hello123")


    return leavesService.getLeaveBalanceAction()
        .then(resData => {
            res.status(200).json({
                'success': true,
                'code': 200,
                'leaveBalance': resData
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
    updateLeaveType: updateLeaveType,
    updateLeaveTypeStatus: updateLeaveTypeStatus,
    addLeaveType: addLeaveType,
    addLeaves: addLeaves,
    getLeavesById: getLeavesById,
    getPaySlipDetails: getPaySlipDetails,
    getLeaveTypes: getLeaveTypes,
    getLeaveTypesById: getLeaveTypesById,
    getLeaves: getLeaves,
    updateLeaves: updateLeaves,
    deleteLeaves: deleteLeaves,
    getAllLeaves: getAllLeaves,
    getLeaveBalance: getLeaveBalance,
    getLeaveBalanceAction: getLeaveBalanceAction,
}