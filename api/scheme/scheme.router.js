const { createScheme, getAllScheme } = require("./scheme.controller");
const router = require("express").Router();

router.get("/getAll", getAllScheme);
router.post("/add", createScheme);
module.exports = router;