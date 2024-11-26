const express = require("express");
const {
  getUserLivesIn,
  loginDefaultUser,
  rmDashBoardUsers,
} = require("./../controllers/userLivesInController.js");

const router = express.Router();

router.get("/", getUserLivesIn);
router.post("/rmDashBoard", rmDashBoardUsers);
router.post("/loginDefault", loginDefaultUser);
router.post("/rmDashBoard", rmDashBoardUsers);

module.exports = router;
