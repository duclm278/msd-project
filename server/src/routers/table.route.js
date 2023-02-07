const express = require("express");
const router = express.Router();
const tableController = require("../controllers/table.controller");

router.post("/create", tableController.createTable);
router
    .route("/:id")
    .get(tableController.getTableDetail)
    .patch(tableController.updateTable)
    .delete(tableController.deleteTable);

router.get("/", tableController.getTableList);
module.exports = router;
