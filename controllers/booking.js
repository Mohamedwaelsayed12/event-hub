const Event = require("../modules/event");

const createBooking = async (req, res) => {
  try {
    const { eventId } = req.body;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ status: "fail", message: "Event not found" });
    }

    res.status(201).json({
      status: "success",
      message: "Ticket booked successfully",
      data: {
        booking: {
          user: req.user._id,
          event: event._id,
          bookedAt: new Date(),
        },
      },
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const getUserBookings = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      message: "Bookings fetched for current user",
      data: { userId: req.user._id },
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = { createBooking, getUserBookings };