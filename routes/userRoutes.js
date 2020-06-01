const express = require("express");
const router = express.Router();

const authenticationController = require("../controllers/authenticationController");

router.post("/signup", authenticationController.signupUser);
router.post("/signin", authenticationController.loginUser);
router.get("/verifyemail/:token", authenticationController.verifyEmail);

module.exports = router;
