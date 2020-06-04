const express = require("express");
const router = express.Router();

const authenticationController = require("../controllers/authenticationController");
const eventController = require("../controllers/eventController");

router.post("/signin", authenticationController.loginUser);
router.get(
  "/submissions",
  authenticationController.sendProtect,
  eventController.getSubmissions
);

module.exports = router;
