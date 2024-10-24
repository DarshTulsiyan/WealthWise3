// // const jwt = require('jsonwebtoken');
// // const User = require('../models/User'); // Ensure the path is correct

// // const authMiddleware = async (req, res, next) => {
// //   const token = req.header('Authorization')?.replace('Bearer ', '');

// //   if (!token) {
// //     return res.status(401).json({ msg: 'No token, authorization denied' });
// //   }

// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     req.user = await User.findById(decoded.id).select('-password');

// //     if (!req.user) {
// //       return res.status(404).json({ msg: 'User not found' });
// //     }

// //     next();
// //   } catch (err) {
// //     res.status(401).json({ msg: 'Token is not valid' });
// //   }
// // };

// // module.exports = authMiddleware;

// // middleware/authMiddleware.js
// const jwt = require('jsonwebtoken');

// exports.authMiddleware = async (req, res, next) => {
//   try {
//     // Get token from header
//     const token = req.header('Authorization')?.replace('Bearer ', '');

//     if (!token) {
//       return res.status(401).json({ message: 'No token, authorization denied' });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
//     // Add user from payload
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Token is not valid' });
//   }
// };

const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Get token from header
  const authHeader = req.header('Authorization');

  // Check if no authorization header
  if (!authHeader) {
    return res.status(401).json({ msg: 'No authorization header, access denied' });
  }

  // Check if header follows Bearer token format
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Invalid token format, must be Bearer token' });
  }

  try {
    // Extract token (removes 'Bearer ' prefix)
    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user from payload to request
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = auth;
