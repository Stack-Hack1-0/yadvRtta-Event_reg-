const express = require("express");
const router = express.Router();

const authenticationController = require("../controllers/authenticationController");
const eventController = require("../controllers/eventController");

router.post("/signin", authenticationController.loginUser);
router.get(
  "/submissions/:id",
  authenticationController.sendProtect,
  eventController.getSubmissions
);
router.get(
  "/submissionStats",
  authenticationController.sendProtect,
  eventController.getSubmissionStat
);
router.get(
  "/isLoggedin",
  authenticationController.sendProtect,
  (req, res, next) =>
    res.status(200).json({ status: "success", isLoggedin: true })
);

module.exports = router;
