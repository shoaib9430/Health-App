const express = require("express");
const router = express.Router();
const passport = require("passport");
const medicine_api = require("../../../controllers/api/v1/medicine");

// Adds a new medicine
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  medicine_api.add
);
// get medicines
router.get(
  "/getMedicines",
  passport.authenticate("jwt", { session: false }),
  medicine_api.getMedicines
);
// get medicine list for a date
router.get(
  "/getMedicineForDate/:date",
  passport.authenticate("jwt", { session: false }),
  medicine_api.getMedicineForDate
);
// toggles medicine intake staus
router.post(
  "/toggleIntakeStatus",
  passport.authenticate("jwt", { session: false }),
  medicine_api.toggleIntakeStatus
);
// toggles medicine intake staus
router.get(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  medicine_api.delete
);

module.exports = router;
