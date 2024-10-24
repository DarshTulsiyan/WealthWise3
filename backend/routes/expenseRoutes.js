const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const auth = require('../middleware/authMiddleware');

  router.post('/', auth, async (req, res) => {
    try {
      const { categories } = req.body;
      const userId = req.query.userId || req.user._id;
      // const userId = req.params.userId;
      // console.log(userId)

      // Calculate the total for each category based on its items
      categories.forEach(category => {
        category.amount = category.items.reduce((total, item) => total + item.amount, 0);
      });
  
      // Update the user's expense data
      const expense = await Expense.findOneAndUpdate(
        { user: userId },
        {
          $set: {
            categories: categories, // Update all categories
          },
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
        }
      );
      
      res.status(201).json(expense);
    } catch (error) {
      console.error('Error saving expenses:', error);
      res.status(500).json({ message: 'Error saving expenses', error: error.message });
    }
  });

  router.get('/', auth, async (req, res) => {
    try {
      // Use userId from the request query or fall back to authenticated user's ID
      const userId = req.query.userId || req.user._id;
      console.log(userId, "user Id")
  
      // Fetch the expense data for the user
      const expense = await Expense.findOne({ user: userId });
  
      if (!expense) {
        return res.status(404).json({ message: 'Expenses not found for this user' });
      }
      console.log(expense)
      // Send the expense data as the response
      res.status(200).json(expense);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      res.status(500).json({ message: 'Error fetching expenses', error: error.message });
    }
  });  
  


module.exports = router;