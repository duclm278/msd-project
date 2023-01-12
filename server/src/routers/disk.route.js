const express = require("express");
const router = express.Router();
const diskController = require("../controllers/disk.controller");
const { uploadSingleFile } = require("../utils/multer");

router.post("/create", uploadSingleFile("image"), diskController.createDisk);
router.get("/", diskController.getListOfDisk);
router.get("/search", diskController.searchDisk);
router
    .route("/:id")
    .delete(diskController.deleteDisk)
    .patch(uploadSingleFile("image"), diskController.updateDisk);

module.exports = router;
