// backend/modules/event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  category: { type: String, required: true },
  capacity: { type: Number }
}, { timestamps: true });

module.exports = mongoose.models.Event || mongoose.model('Event', eventSchema);