const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
  location: { type: String },
  price: { type: Number, default: 0 },
  category: { type: String, default: 'General' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);