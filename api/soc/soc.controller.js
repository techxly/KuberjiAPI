const { createSoc, getAllSoc } = require("./soc.service");

module.exports = {
    createSoc: (req, res) => {
        const body = req.body;

        createSoc(body, (err, results) => {
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
    getAllSoc: (req, res) => {
        getAllSoc((err, results) => {
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
    }
}