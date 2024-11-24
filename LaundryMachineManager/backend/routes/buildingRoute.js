const express = require("express");
const { getBuildings } = require("../controllers/buildingController");

const router = express.Router();
router.get("/", getBuildings);

module.exports = router;
