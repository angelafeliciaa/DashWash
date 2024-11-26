const express = require("express");
const {
  getLaundryMachines,
  getRmLaundryMachines,
} = require("./../controllers/laundryMachineController.js");

const router = express.Router();

router.get("/:bid", getLaundryMachines);
router.post("/rm-machines", getRmLaundryMachines);

module.exports = router;
