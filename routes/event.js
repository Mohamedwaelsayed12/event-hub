const express = require("express");
const {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event");
const { protect, restrictTo } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

router
  .route("/")
  .get(getAllEvents)
  .post(protect, restrictTo("organizer", "admin"), upload.single("image"), createEvent);

router
  .route("/:id")
  .get(getEventById)
  .patch(protect, restrictTo("organizer", "admin"), upload.single("image"), updateEvent)
  .delete(protect, restrictTo("organizer", "admin"), deleteEvent);

module.exports = router;