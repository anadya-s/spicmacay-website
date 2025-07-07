const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/google', async (req, res) => {
  const { googleId, name, email } = req.body;

  try {
    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({ googleId, name, email });
      await user.save();
    }

    res.status(200).json({ message: 'User login successful', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
