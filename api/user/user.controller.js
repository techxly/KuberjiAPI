
const { createUser, getAllUsers, addNewUser, test, generateToken, login, validateToken, getUser } = require("./user.service");

module.exports = {
    addNewUser: (req, res) => {
        const body = req.body;
        addNewUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return
            }
            if (!results) {
                return res.json({
                    code: 0,
                    message: "Data not inserted"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    createUser: (req, res) => {
        const body = { name: "Hello123" };

        createUser(body, (err, results) => {
            if (err) {
                console.log(err);
                return
            }
            if (!results) {
                return res.json({
                    code: 0,
                    message: "Data not inserted"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getAllUsers: (req, res) => {
        getAllUsers((err, results) => {
            if (err) {
                console.log(err);
                return
            }
            if (!results) {
                return res.json({
                    code: 0,
                    message: "No records found"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    login: (req, res) => {
        const body = req.body;
        login(body, (err, results) => {
            if (err) {
                console.log(err);
                return
            }
            if (!results) {
                return res.json({
                    code: 0,
                    message: "No records found"
                });
            }
            return res.json({
                code: 1,
                message: "Login success !",
                accessToken: results
            });
        });
    },
    getUser: (req, res) => {
        const body = req.body;
        getUser(body, (err, userData) => {
            if (err) {
                console.log(err);
                return
            }
            if (!userData) {
                return res.json({
                    code: 0,
                    message: "No records found"
                });
            }
            return res.json({
                code: 1,
                userData
            });
        });
    },
    generateToken: (req, res) => {
        const body = req.body;
        generateToken(body, (err, results) => {
            if (err) {
                console.log(err);
                return
            }
            if (!results) {
                return res.json({
                    code: 0,
                    message: "No records found"
                });
            }
            return res.json({
                success: 1,
                accessToken: results
            });

        });
    },
    validateToken: (req, res) => {
        const body = req.body;

        console.log('req.body', req.body)


        validateToken(body, (err, results) => {
            if (err) {
                console.log(err);
                return
            }
            if (!results) {
                return res.json({
                    code: 0,
                    message: "Not Matched."
                });
            }
            return res.json({
                code: 1,
                message: "Token Matched."
            });

        });
    }
}