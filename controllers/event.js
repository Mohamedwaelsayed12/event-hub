exports.createEvent = async (req, res) => {
  try {
    const eventData = req.body;

    // Check if a file was uploaded and save its relative path
    if (req.file) {
      eventData.banner = `/uploads/${req.file.filename}`;
    }

    const newEvent = await Event.create(eventData);
    res.status(201).json({ status: "success", data: newEvent });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};