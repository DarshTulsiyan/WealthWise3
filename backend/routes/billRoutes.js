// const express = require('express');
// const router = express.Router();
// const UserBill = require('../models/Bills'); // Import the UserBill model
// const auth = require('../middleware/authMiddleware'); // Middleware to authenticate users

// // POST: Add or update bills for a user
// router.post('/', auth, async (req, res) => {
//     try {
//       const { bills } = req.body;
//       const userId = req.query.userId || (req.user ? req.user._id : null);
//       console.log(userId+" post");
//       if (!userId) {
//         return res.status(400).json({ message: 'User ID is missing.' });
//       }
  
//       // Update the user's bill data or create a new document if it doesn't exist
//       const userBills = await UserBill.findOneAndUpdate(
//         { user: userId },
//         {
//           $set: {
//             bills: bills, // Update all bills with new data
//           },
//         },
//         {
//           new: true,
//           upsert: true,
//           runValidators: true,
//         }
//       );
//       console.log(userBills);
//       res.status(201).json(userBills);
//     } catch (error) {
//       console.error('Error saving bills:', error);
//       res.status(500).json({ message: 'Error saving bills', error: error.message });
//     }
//   });

// // GET: Fetch bills for a user
// router.get('/', auth, async (req, res) => {
//   try {
//     // Use userId from the request query or fall back to authenticated user's ID
//     const userId = req.query.userId || req.user._id;
//     console.log(userId+" get ");
//     // Fetch the bills for the user
//     const userBills = await UserBill.findOne({ user: userId });

//     if (!userBills) {
//       return res.status(404).json({ message: 'Bills not found for this user' });
//     }

//     // Send the bills data as the response
//     res.status(200).json(userBills);
//   } catch (error) {
//     console.error('Error fetching bills:', error);
//     res.status(500).json({ message: 'Error fetching bills', error: error.message });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const UserBill = require('../models/Bills'); // Import the UserBill model
const auth = require('../middleware/authMiddleware'); // Middleware to authenticate users

// POST: Add or update bills for a user
// router.post('/', auth, async (req, res) => {
//     try {
//       const { bills } = req.body;
//       const userId = req.query.userId || (req.user ? req.user._id : null);
//       console.log(userId+" post");
//       if (!userId) {
//         return res.status(400).json({ message: 'User ID is missing.' });
//       }
  
//       // Update the user's bill data or create a new document if it doesn't exist
//       const userBills = await UserBill.findOneAndUpdate(
//         { user: userId },
//         {
//           $set: {
//             bills: bills, // Update all bills with new data
//           },
//         },
//         {
//           new: true,
//           upsert: true,
//           runValidators: true,
//         }
//       );
//       console.log(userBills);
//       res.status(201).json(userBills);
//     } catch (error) {
//       console.error('Error saving bills:', error);
//       res.status(500).json({ message: 'Error saving bills', error: error.message });
//     }
//   });

router.post('/', auth, async (req, res) => {
  try {
    const { bills } = req.body; // This should be the new bills to add
    const userId = req.query.userId || (req.user ? req.user._id : null);
    console.log(userId + " post");

    if (!userId) {
      return res.status(400).json({ message: 'User ID is missing.' });
    }

    // Update the user's bill data or create a new document if it doesn't exist
    const userBills = await UserBill.findOneAndUpdate(
      { user: userId },
      {
        $push: {
          bills: { $each: bills }, // Use $push with $each to add multiple bills
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    console.log(userBills);
    res.status(201).json(userBills);
  } catch (error) {
    console.error('Error saving bills:', error);
    res.status(500).json({ message: 'Error saving bills', error: error.message });
  }
});


// GET: Fetch bills for a user
// router.get('/', auth, async (req, res) => {
//   try {
//     // Use userId from the request query or fall back to authenticated user's ID
//     const userId = req.query.userId || req.user._id;
//     console.log(userId+" get ");
//     // Fetch the bills for the user
//     const userBills = await UserBill.findOne({ user: userId });

//     if (!userBills) {
//       return res.status(404).json({ message: 'Bills not found for this user' });
//     }

//     // Send the bills data as the response
//     res.status(200).json(userBills);
//   } catch (error) {
//     console.error('Error fetching bills:', error);
//     res.status(500).json({ message: 'Error fetching bills', error: error.message });
//   }
// });

router.get('/', auth, async (req, res) => {
  try {
    // Use userId from the request query or fallback to authenticated user's ID
    const userId = req.query.userId || req.user._id;
    console.log(userId + " get ");

    // Fetch the bills for the user
    let userBills = await UserBill.findOne({ user: userId });

    // If no bills exist, create an empty document for the user
    if (!userBills) {
      // Initialize a new bills document with an empty array for bills
      userBills = new UserBill({
        user: userId,
        bills: [],  // Initialize with empty array
        createdAt: new Date(),
      });
      await userBills.save();

      console.log('New bills document initialized for user:', userId);
    }

    // Send the bills data as the response (empty or with data)
    res.status(200).json(userBills);
  } catch (error) {
    console.error('Error fetching or initializing bills:', error);
    res.status(500).json({ message: 'Error fetching or initializing bills', error: error.message });
  }
});



module.exports = router;