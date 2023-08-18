const express = require("express");
const router = express.Router();
const passport = require("passport");

router.use("/user", require("./user"));
router.use("/vital", require("./vital"));
router.use("/medicine", require("./medicine"));

module.exports = router;
