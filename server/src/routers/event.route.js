const express = require("express");
const eventController = require("../controllers/event.controller");
const { uploadSingleFile } = require("../utils/multer");
const router = express.Router();

router.post("/create", uploadSingleFile("image"), eventController.createEvent);
router
    .route("/:id")
    .get(eventController.getEventById)
    .patch(uploadSingleFile("image"), eventController.updateEvent)
    .delete(eventController.deleteEvent);

router.get("/", eventController.getEventList)

module.exports = router;
