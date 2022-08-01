const { createSoc, getAllSoc } = require("./soc.controller");
const router = require("express").Router();

router.get("/getAll", getAllSoc);
router.post("/create", createSoc);
module.exports = router;