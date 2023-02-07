const express = require("express");
const router = express.Router();
const comboController = require("../controllers/combo.controller");
const { uploadSingleFile } = require("../utils/multer");

router.post("/create", uploadSingleFile("image"), comboController.createCombo);

router.get("/search", comboController.searchByName);

router
    .route("/:comboId")
    .delete(comboController.deleteCombo)
    .get(comboController.getComboDetail)
    .patch(uploadSingleFile("image"), comboController.updateCombo);

router.get("/", comboController.getComboList);
module.exports = router;
