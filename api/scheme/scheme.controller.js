const { createScheme, getAllScheme } = require("./scheme.service");

module.exports = {
    createScheme: (req, res) => {
        const body = req.body;
        createScheme(body, (err, results) => {
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
                data: results.data
            });
        });
    },
    getAllScheme: (req, res) => {
        getAllScheme((err, results) => {
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
                results
            });
        });
    }
}