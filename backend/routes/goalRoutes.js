const express = require('express');
const router = express.Router();
const UserGoals = require('../models/Goal');
const auth = require('../middleware/authMiddleware');

// POST route to add or update goals
// router.post('/', auth, async (req, res) => {
//   try {
//     const { categories } = req.body;
//     const userId = req.query.userId || (req.user ? req.user._id : null);
//     console.log(userId, "user Id");
//     if(!userId) {
//         return res.status(400).json({ message: 'User not found' });
//     }
    
//     // Fetch the existing goals document for the user
//     const existingGoals = await UserGoals.findOne({ user: userId });

//     // If goals already exist, sum the new and old amounts for each category
//     if (existingGoals) {
//       categories.forEach(category => {
//         const existingCategory = existingGoals.categories.find(c => c.name === category.name);
//         if (existingCategory) {
//           // Add the new amount to the existing amount
//           category.amount += existingCategory.amount;
//         }
//       });
//     }

//     // Update the user's goals data
//     const userGoals = await UserGoals.findOneAndUpdate(
//       { user: userId },
//       {
//         $set: {
//           categories: categories, // Update all categories with new calculated amounts
//         },
//       },
//       {
//         new: true,
//         upsert: true,
//         runValidators: true,
//       }
//     );

//     res.status(201).json(userGoals);
//   } catch (error) {
//     console.error('Error saving goals:', error);
//     res.status(500).json({ message: 'Error saving goals', error: error.message });
//   }
// });

// POST route to add/update goals
router.post('/', auth, async (req, res) => {
    try {
      const { category } = req.body; // Adjust to match the frontend data
    //   console.log("category", category, "goal", goal);
      const userId = req.query.userId || req.user?._id;
  
      if (!userId) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // Fetch the existing goals document for the user
      let existingGoals = await UserGoals.findOne({ user: userId });
  
      if (existingGoals) {
        // Check if the category already exists
        const existingCategory = existingGoals.categories.find(c => c.name === category);
        if (existingCategory) {
          // Update the goal amount for the existing category
          existingCategory.goal = goal;
        } else {
          // If the category is new, add it
          existingGoals.categories.push({ name: category.goal, amount: 0, goal: category.amount });
        }
      } else {
        // If no goal document exists for the user, create a new document with the categories
        existingGoals = new UserGoals({
          user: userId,
          categories: [{ name: category, amount: 0, goal: goal }] // Initialize with goal and 0 amount
        });
      }
  
      // Save or update the user's goals data
      const savedGoals = await existingGoals.save();
      res.status(201).json(savedGoals);
    } catch (error) {
      console.error('Error saving goals:', error);
      res.status(500).json({ message: 'Error saving goals', error: error.message });
    }
  });


  router.post('/:category', auth, async (req, res) => {
    try {
      const { amount } = req.body; // Amount to be added
      const category = req.params.category; // Get the category from the URL parameter
      const userId = req.query.userId || req.user?._id;
  
      if (!userId) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      // Fetch the existing goals document for the user
      let existingGoals = await UserGoals.findOne({ user: userId });
  
      if (!existingGoals) {
        return res.status(404).json({ message: 'No goals found for this user' });
      }
  
      // Find the category in the user's goals
      const existingCategory = existingGoals.categories.find(c => c.name === category);
  
      if (existingCategory) {
        // Add the amount to the existing category's amount
        existingCategory.amount += amount; // You might want to add validation here to prevent negative amounts
        await existingGoals.save(); // Save the updated goals document
        res.status(200).json(existingGoals);
      } else {
        res.status(404).json({ message: 'Category not found' });
      }
    } catch (error) {
      console.error('Error adding amount to goals:', error);
      res.status(500).json({ message: 'Error adding amount to goals', error: error.message });
    }
  });
  
  // GET route to fetch user's goals
  router.get('/', auth, async (req, res) => {
    try {
      const userId = req.query.userId || req.user._id;
  
      // Fetch the goals data for the user
      const userGoals = await UserGoals.findOne({ user: userId });
  
      if (!userGoals) {
        return res.status(404).json({ message: 'Goals not found for this user' });
      }
  
      res.status(200).json(userGoals);
    } catch (error) {
      console.error('Error fetching goals:', error);
      res.status(500).json({ message: 'Error fetching goals', error: error.message });
    }
  });
  
module.exports = router;
