const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for each goal category
const GoalSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    default: 0
  },
  goal: {
    type: Number,
    required: true
  }
});

// Define the schema for the user document which includes an array of goal categories
const UserGoalsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  categories: [GoalSchema],
}, { timestamps: true });

// Create and export the model
const UserGoals = mongoose.model('UserGoals', UserGoalsSchema);
module.exports = UserGoals;
