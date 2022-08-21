const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.RegisterUser);
router.get("/auth", userController.checkAuth);
router.post("/login", userController.LoginUser);
router.get("/logout", userController.LogOutUser)

module.exports = router;
