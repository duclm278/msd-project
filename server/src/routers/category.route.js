const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");

router.post("/create", categoryController.create);

router
    .route("/:id")
    .delete(categoryController.delete)
    .get(categoryController.getDetail);

router.get("/", categoryController.getCategoryList);

module.exports = router;
