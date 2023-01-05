const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");

router.post("/create", customerController.createCustomer);
router.get("/search", customerController.searchCustomersByName);
router
    .route("/:id")
    .get(customerController.getCustomerById)
    .patch(customerController.updateCustomer)
    .delete(customerController.deleteCustomer);

module.exports = router;
