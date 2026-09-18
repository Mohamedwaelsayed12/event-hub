const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking');
const authenticateToken = require('../middleware/authenticate-middleware');

router.post('/', authenticateToken, bookingController.createBooking);
router.get('/my-bookings', authenticateToken, bookingController.getUserBookings);

module.exports = router;