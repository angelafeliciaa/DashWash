const express = require("express");
const { getWashingCardBalance, updateWashingCardBalance, getWashingCardID } = require("../controllers/washingCardController");

const router = express.Router();

router.get("/:uid", getWashingCardBalance);
router.put("/:uid/addFunds", updateWashingCardBalance);
router.get("/:uid/cardID", getWashingCardID);


module.exports = router;
