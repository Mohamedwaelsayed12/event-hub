const Event = require("../modules/event");

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ status: "success", count: events.length, data: { events } });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ status: "fail", message: "Event not found" });
    }
    res.status(200).json({ status: "success", data: { event } });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const imageUrl = req.file ? req.file.path : undefined;

    const newEvent = await Event.create({
      ...req.body,
      imageUrl,
      organizer: req.user?._id,
    });

    res.status(201).json({ status: "success", message: "Event created", data: { event: newEvent } });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    if (req.file) {
      req.body.imageUrl = req.file.path;
    }

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ status: "fail", message: "Event not found" });
    }

    res.status(200).json({ status: "success", message: "Event updated", data: { event: updatedEvent } });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ status: "fail", message: "Event not found" });
    }
    res.status(200).json({ status: "success", message: "Event deleted", data: { event: deletedEvent } });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};