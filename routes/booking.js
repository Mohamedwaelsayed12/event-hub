const express = require("express");
const { createBooking, getUserBookings } = require("../controllers/booking");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.route("/").get(getUserBookings).post(createBooking);

module.exports = router;