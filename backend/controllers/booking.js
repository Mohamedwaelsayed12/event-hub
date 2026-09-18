const Booking = require('../models/Booking');
const Event = require('../models/Event');

exports.createBooking = async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (event.availableTickets <= 0) return res.status(400).json({ message: 'Sold out' });

    event.availableTickets -= 1;
    await event.save();

    const booking = await Booking.create({ user: req.user.id, event: eventId });
    res.status(201).json({ message: 'Ticket booked successfully', booking, availableTickets: event.availableTickets });
  } catch (err) {
    res.status(500).json({ message: 'Error processing booking' });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('event');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bookings' });
  }
};