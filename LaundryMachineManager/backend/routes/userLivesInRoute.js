const express = require("express");
const {
  getUserLivesIn,
  loginDefaultUser,
} = require("./../controllers/userLivesInController.js");

const router = express.Router();

router.get("/", getUserLivesIn);
router.post("/loginDefault", loginDefaultUser);

module.exports = router;
