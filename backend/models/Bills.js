// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// // Define the Bill schema
// const BillSchema = new Schema({
//   dueDate: {
//     month: { type: String, required: true },
//     day: { type: Number, required: true },
//   },
//   description: { type: String, required: true },
//   lastCharge: { type: String, required: true },
//   amount: { type: Number, required: true },
//   paid: { type: Boolean, default: false },
// });

// // Define the User schema with an array of bills
// const UserBillSchema = new Schema(
//   {
//     user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     bills: [BillSchema],  // Array of Bill items
//   },
//   {
//     timestamps: true,  // Adds createdAt and updatedAt fields
//   }
// );

// // Create the model
// const UserBill = mongoose.model('UserBill', UserBillSchema);
// module.exports = UserBill;
// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// // Define the Bill schema
// const BillSchema = new Schema({
//   dueDate: {
//     month: { type: String, required: true },
//     day: { type: Number, required: true },
//   },
//   description: { type: String, required: true },
//   lastCharge: { type: String, required: true },
//   amount: { type: Number, required: true },

// });

// // Define the User schema with an array of bills
// const UserBillSchema = new Schema(
//   {
//     user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     bills: [BillSchema],  // Array of Bill items
//   },
//   {
//     timestamps: true,  // Adds createdAt and updatedAt fields
//   }
// );

// // Create the model
// const UserBill = mongoose.model('UserBill', UserBillSchema);
// module.exports = UserBill;

// const mongoose = require('mongoose');
// const { Schema } = mongoose;

// // Define the Bill schema
// const BillSchema = new Schema({
//   dueDate: {
//     month: { type: String, required: true }, // Month is a required string
//     day: { type: Number, required: true },   // Day is a required number
//   },
//   description: { type: String, required: true }, // Description is a required string
//   lastCharge: { type: String, required: true },  // Last charge date is a required string
//   amount: { type: Number, required: true },      // Amount is a required number
// });

// // Define the User schema with an array of bills
// const UserBillSchema = new Schema(
//   {
//     user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
//     bills: [BillSchema],  // Array of Bill items
//   },
//   {
//     timestamps: true,  // Adds createdAt and updatedAt fields
//   }
// );

// // Create the model
// const UserBill = mongoose.model('UserBill', UserBillSchema);
// module.exports = UserBill;


const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Bill schema
const BillSchema = new Schema({
  dueDate: {
    month: { type: String, required: true }, // Month is a required string
    day: { type: Number, required: true },   // Day is a required number
  },
  description: { type: String, required: true }, // Description is a required string
  lastCharge: { type: String, required: true },  // Last charge date is a required string
  amount: { type: Number, required: true },      // Amount is a required number
});

// Define the User schema with an array of bills
const UserBillSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    bills: [BillSchema],  // Array of Bill items
  },
  {
    timestamps: true,  // Adds createdAt and updatedAt fields
  }
);

// Create the UserBill model
const UserBill = mongoose.model('UserBill', UserBillSchema);

// Function to initialize UserBill with an empty array if it doesn't already exist
async function initializeUserBill(userId) {
  try {
    // Check if the user's bill document already exists
    let userBill = await UserBill.findOne({ user: userId });
    
    if (!userBill) {
      // Create a new UserBill document with an empty bills array
      userBill = new UserBill({
        user: userId,
        bills: [],
      });
      
      await userBill.save();
      console.log('User bill initialized with empty array of bills.');
    } else {
      console.log('User bill document already exists.');
    }
  } catch (error) {
    console.error('Error initializing user bill:', error);
  }
}

module.exports = { UserBill, initializeUserBill };
