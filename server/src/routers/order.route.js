const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.get("/combo-and-disk/:orderId", orderController.getComboAndDisk);
router.post("/create", orderController.createOrder);
router.get("/search", orderController.searchOrder);

router
    .route("/:orderId")
    .delete(orderController.deleteOrder)
    .patch(orderController.updateOrder)
    .get(orderController.getOrderById);
router.patch("/cost/:orderId", orderController.updateCost);

module.exports = router;
