const express = require("express");
const router = express.Router();
const passport = require("passport");
const vital_api = require("../../../controllers/api/v1/vital");

// Creates a new vital record
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  vital_api.add
);
// Gets the latest vital record
router.get(
  "/latest/:type",
  passport.authenticate("jwt", { session: false }),
  vital_api.getLatestVital
);
module.exports = router;
