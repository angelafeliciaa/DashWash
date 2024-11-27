const express = require("express");
const {
  getLaundryMachines,
  getRmLaundryMachines,
  getDryersByBid,
  getWashersByBid,
} = require("./../controllers/laundryMachineController.js");

const router = express.Router();

router.get("/:bid", getLaundryMachines);
router.post("/rm-machines", getRmLaundryMachines);
router.post("/washer-by-bid", getWashersByBid);
router.post("/dryer-by-bid", getDryersByBid);

module.exports = router;
