const express = require("express");
const { getTransactionHistory } = require("../controllers/transactionHistoryController");

const router = express.Router();

router.get("/:cid", getTransactionHistory);

module.exports = router;
