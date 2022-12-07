module.exports = app => {

    const router = require("express").Router();
    const payrollController = require('../controller/payroll.controller');


    router.post('/getPayroll', payrollController.getPayroll);
    router.post('/getPayrollById', payrollController.getPayrollById);
    router.post('/addPayroll', payrollController.addPayroll);
    router.post('/updatePayroll', payrollController.updatePayroll);
    router.post('/deletePayroll', payrollController.deletePayroll);
    //router.post('/getPaySlipByEmpMonthYear', payrollController.getPaySlipByEmpMonthYear);
    router.post('/downloadPayslip', payrollController.getPaySlipDetails);

    app.use('/api', router);
}