const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { createEvent } = require("../controllers/event");

// Add upload.single("banner") before the controller execution
router.post("/", upload.single("banner"), createEvent);

module.exports = router;