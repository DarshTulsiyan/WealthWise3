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
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the Bill schema
const BillSchema = new Schema({
  dueDate: {
    month: { type: String, required: true },
    day: { type: Number, required: true },
  },
  description: { type: String, required: true },
  lastCharge: { type: String, required: true },
  amount: { type: Number, required: true },
  paid: { type: Boolean, default: false },
});

// Define the User schema with an array of bills
const UserBillSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bills: [BillSchema],  // Array of Bill items
  },
  {
    timestamps: true,  // Adds createdAt and updatedAt fields
  }
);

// Create the model
const UserBill = mongoose.model('UserBill', UserBillSchema);
module.exports = UserBill;