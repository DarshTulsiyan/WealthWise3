// const express = require('express');
// const { check } = require('express-validator');
// const { registerUser, loginUser } = require('../controllers/authController');
// const router = express.Router();
// const passport = require('passport');

// require('../passport')
// // @route POST /api/auth/register
// // @desc Register user
// // @access Public
// router.post(
//   '/register',
//   [
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
//   ],
//   registerUser
// );

// // @route POST /api/auth/login
// // @desc Authenticate user and get token
// // @access Public
// router.post(
//   '/login',
//   [
//     check('email', 'Please include a valid email').isEmail(),
//     check('password', 'Password is required').exists(),
//   ],
//   loginUser
// );

// router.get('/google', passport.authenticate('google', {
//   scope: ['profile', 'email'],
// }));

// router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     const user = req.user;
//     // Create JWT token
//     const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

//     // Redirect to frontend with token and userId in URL
//     res.redirect(`http://localhost:3000/login?token=${token}&userId=${user._id}&email=${user.email}`);
//   }
// );

// module.exports = router;


const express = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// @route POST /api/auth/register
// @desc Register user
// @access Public
router.post(
  '/register',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  registerUser
);

// @route POST /api/auth/login
// @desc Authenticate user and get token
// @access Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  loginUser
);

// @route GET /api/auth/google
// @desc Initiate Google OAuth login
// @access Public
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// @route GET /api/auth/google/callback
// @desc Handle callback after Google OAuth login
// @access Public
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: 'https://wealth-wise3.vercel.app/' }),
  async (req, res) => {
    const user = req.user;

    // Save user data in the database (if not already done)
    if (!user) {
      return res.redirect('https://wealth-wise3.vercel.app/login');
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id, name: user.name }, 'your_jwt_secret', { expiresIn: '6h' });

    // Redirect to frontend with token and userId in URL
    res.redirect(`https://wealth-wise3.vercel.app/dashboard?token=${token}&userId=${user._id}&name=${user.name}`);

  }
);




module.exports = router;
