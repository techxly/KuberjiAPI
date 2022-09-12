module.exports = app => {

    const router = require("express").Router();
    const leavesController = require('../controller/leaves.controller');


    router.post('/getLeaves', leavesController.getLeaves);
    router.post('/getLeaveTypes', leavesController.getLeaveTypes);
    router.post('/getLeaveTypesById', leavesController.getLeaveTypesById);
    router.post('/getPaySlipDetails', leavesController.getPaySlipDetails);
    router.post('/getLeavesById', leavesController.getLeavesById);
    router.post('/updateLeaveTypeStatus', leavesController.updateLeaveTypeStatus);
    router.post('/updateLeaveType', leavesController.updateLeaveType);
    router.post('/addLeaveType', leavesController.addLeaveType);
    router.post('/addLeaves', leavesController.addLeaves);
    router.post('/updateLeaves', leavesController.updateLeaves);
    router.post('/deleteLeaves', leavesController.deleteLeaves);
    router.get('/getAllLeaves', leavesController.getAllLeaves);
    router.get('/leaveBalance', leavesController.getLeaveBalance);
    router.get('/leaveBalanceAction', leavesController.getLeaveBalanceAction);

    app.use('/api', router);
}