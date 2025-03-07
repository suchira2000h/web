const express = require('express');
const Availability = require('../../models/Availability');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const router = express.Router();

// @route   POST /api/availability
// @desc    Set availability for a counselor
// @access  Private (counselors only)
router.post('/', auth, async (req, res) => {
  const { date, startTime, endTime } = req.body;

  try {
    const counselor = await User.findById(req.user.id);

    // Ensure the user is a counselor
    if (counselor.role !== 'counselor') {
      return res.status(400).json({ error: 'Only counselors can set availability' });
    }

    const availability = new Availability({
      counselor: counselor.id,
      date,
      startTime,
      endTime,
    });

    await availability.save();
    res.status(201).json(availability);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /api/availability
// @desc    Get availability for all counselors
// @access  Private (clients only)
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Ensure the user is a client
    if (user.role !== 'client') {
      return res.status(400).json({ error: 'Only clients can view availability' });
    }

    const availability = await Availability.find().populate('counselor', 'name email');
    res.json(availability);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;