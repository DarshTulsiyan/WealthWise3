const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/authMiddleware');


// @route   GET /api/user
// @desc    Get logged-in user's info
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    // Check if the user is attached by the auth middleware
    if (!req.user || !req.user.id) {
      return res.status(400).json({ msg: 'User information not available' });
    }

    // Fetch user by id from the database
    const user = await User.findById(req.user.id).select('-password'); // Exclude password
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Send user data as a response
    res.json(user);
  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).send('Server Error');
  }
});



module.exports = router;
