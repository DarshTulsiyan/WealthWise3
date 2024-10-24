const mongoose = require('mongoose');

// Schema for individual expense items
const expenseItemSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
});

// Schema for expense categories
const categorySchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  amount: { 
    type: Number, 
    default: 0, // Initialize category total amount to 0
    required: true 
  },
  items: [expenseItemSchema], // Array of expense items within the category
});

// Main schema for the user's expenses
const expenseSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  categories: [categorySchema], // Array of categories
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
