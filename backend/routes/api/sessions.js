const express = require('express');
const Session = require('../../models/Session');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const router = express.Router();

// @route   POST /api/sessions
// @desc    Book a session
// @access  Private
router.post('/', auth, async (req, res) => {
  const { counselorId, date } = req.body;

  try {
    const client = await User.findById(req.user.id);
    const counselor = await User.findById(counselorId);

    if (!counselor || counselor.role !== 'counselor') {
      return res.status(400).json({ error: 'Invalid counselor' });
    }

    const session = new Session({
      client: client.id,
      counselor: counselor.id,
      date,
    });

    await session.save();
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// @route   GET /api/sessions
// @desc    Get all sessions for the logged-in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    let sessions;

    if (user.role === 'client') {
      sessions = await Session.find({ client: user.id }).populate('counselor', 'name email');
    } else if (user.role === 'counselor') {
      sessions = await Session.find({ counselor: user.id }).populate('client', 'name email');
    }

    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;