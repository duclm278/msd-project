const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.post("/create", orderController.createOrder);

router
    .route("/:orderId")
    .delete(orderController.deleteOrder)
    .patch(orderController.updateOrder);

router.post("/cost/:orderId", orderController.updateCost);

module.exports = router;
