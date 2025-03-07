const mongoose = require('mongoose');

const AvailabilitySchema = new mongoose.Schema({
  counselor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true }, // Date of availability
  startTime: { type: String, required: true }, // Start time (e.g., "09:00")
  endTime: { type: String, required: true }, // End time (e.g., "17:00")
});

module.exports = mongoose.model('Availability', AvailabilitySchema);