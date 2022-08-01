const { getAllUsers, createUser, addNewUser, test, generateToken, validateToken, login, getUser } = require("./user.controller");
const router = require("express").Router();

router.post("/login", login);
router.post("/getUser", getUser);
router.get("/getAll", getAllUsers);
router.post("/create", createUser);
router.post("/addNewUser", addNewUser);
router.post("/generateToken", generateToken);
router.post("/validateToken", validateToken);
module.exports = router;