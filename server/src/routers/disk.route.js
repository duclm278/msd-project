const express = require("express");
const router = express.Router();
const diskController = require("../controllers/disk.controller");
const { uploadSingleFile } = require("../utils/multer");

router.post("/create", uploadSingleFile("image"), diskController.createDisk);
router.get("/", diskController.getListOfDisk);

module.exports = router;
