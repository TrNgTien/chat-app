const express = require("express");
const router = express.Router();
const userHandler = require("../controllers/UserHandler");
const tokenHandler = require("../controllers/TokenHandler");
const { Authentication, adminVerify } = require("../middleware/Authentication");

router.get("/token", tokenHandler.refreshToken);
router.post("/register", userHandler.register);
router.post("/login", userHandler.login);
router.get("/getAllUser", Authentication, adminVerify, userHandler.getAllUser);
router.get("/getAUser/:id", userHandler.getUserInformation);
router.delete("/deleteUser/:userID", Authentication, userHandler.deleteUser);
router.put("/updateInfo/:userID", Authentication, userHandler.updateInformation);


module.exports = router;
