const express = require("express");
const { getUserLivesIn } = require("../controllers/userLivesInController");

const router = express.Router();
router.get("/", getUserLivesIn);

module.exports = router;
