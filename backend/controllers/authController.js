const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Expense = require('../models/Expense'); // Assuming Expense model is imported
const UserBills = require('../models/UserBills'); // Assuming UserBills model is imported
const UserGoals = require('../models/UserGoals'); // Assuming UserGoals model is imported

// Register User
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user instance
    user = new User({
      name,
      email,
      password,
    });

    // Hash the password before saving to the database
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    

    await user.save();

    const emptyGoals = new UserGoals({
      user: user._id, 
      categories: []
    });

    const emptyBills = new UserBills({
      user: user._id, 
      bills: []
    });

    const emptyExpenses = new Expense({
      user: user._id, 
      categories: []
    });

    // Save the empty instances to the database
    await emptyGoals.save();
    await emptyBills.save();
    await emptyExpenses.save();


    // Create JWT token
    const payload = {
      user: {
        id: user.id,
        email: user.email,
      },
    };

    // jwt.sign(
    //   payload,
    //   process.env.JWT_SECRET, // You should store this in an environment variable
    //   { expiresIn: '6h' },
    //   (err, token) => {
    //     if (err) throw err; 
    //     res.json({ token });
    //   }
    // );
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: '6h' }, // Token expiration time
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Assuming you are using bcrypt to compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '6h' });

    // Respond with token and user ID
    return res.json({ token, userId: user._id, name: user.name }); // Include userId in the response
  } catch (err) {
    console.error(err);
    return res.status(500).send('Server Error');
  }
};
