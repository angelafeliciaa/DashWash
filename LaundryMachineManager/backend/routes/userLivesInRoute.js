const express = require("express");
const { getUserLivesIn } = require("./../controllers/userLivesInController.js");

const router = express.Router();

router.get("/", getUserLivesIn);

module.exports = router;
