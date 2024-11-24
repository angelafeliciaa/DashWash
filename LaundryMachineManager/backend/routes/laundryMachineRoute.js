const express = require("express");
const { getLaundryMachines } = require("./../controllers/laundryMachineController.js");

const router = express.Router();

router.get("/:bid", getLaundryMachines);

module.exports = router;
