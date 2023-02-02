const express = require("express");
const router = express.Router();
const comboController = require("../controllers/combo.controller");

router.post("/create", comboController.createCombo);

router.route("/:comboId").delete(comboController.deleteCombo);

router.get("/", comboController.searchByName);
module.exports = router;
