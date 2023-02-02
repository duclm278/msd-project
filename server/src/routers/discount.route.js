const express = require("express");
const discountController = require("../controllers/discount.controller");
const router = express.Router();

router.post("/create", discountController.generateDiscount);
router.get("/:discountId", discountController.getDiscountById);

module.exports = router;
