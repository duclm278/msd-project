const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");

router.post("/create", customerController.createCustomer);
router.get("/search", customerController.searchCustomersByName);

module.exports = router;
