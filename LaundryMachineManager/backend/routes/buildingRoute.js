const express = require("express");
const {
  getBuildings,
  getBuildingsWithAvailMachines,
} = require("../controllers/buildingController");

const router = express.Router();
router.get("/", getBuildings);
router.get("/building-with-avail-machines", getBuildingsWithAvailMachines);

module.exports = router;
