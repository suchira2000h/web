const express = require('express');
const Session = require('../../models/Session');
const User = require('../../models/User');
const router = express.Router();
const auth = require('../../middleware/auth');

// Book a session
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

// Get all sessions for a counselor
router.get('/', auth, async (req, res) => {
  try {
    const sessions = await Session.find({ counselor: req.user.id }).populate('client', 'name');
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;