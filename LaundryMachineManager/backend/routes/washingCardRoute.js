const express = require("express");
const { getWashingCardBalance, updateWashingCardBalance } = require("../controllers/washingCardController");

const router = express.Router();

router.get("/:uid", getWashingCardBalance);
router.put("/:uid/addFunds", updateWashingCardBalance);

module.exports = router;
