

// "use client"
// import React, { useState } from 'react';
// import Sidebar from '../../components/Sidebar';
// import SavingsGoal from '../../components/SavingsGoal';
// import SavingSummary from '../../components/SavingSummary';
// import ExpenseGoals from '../../components/ExpenseGoals';
// import { Button } from '../../components/ui/button';
// import AddGoalModal from '../../components/AddGoalModal';

// export default function WealthWise() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [goals, setGoals] = useState([]); // To store the list of goals

//   const handleSaveGoal = (goal, amount) => {
//     const newGoal = { goal, amount };
//     setGoals([...goals, newGoal]);
//     console.log("Saved Goal: ", newGoal); // You can replace this with your logic to save the goal
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-8">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-semibold text-gray-700">Goals</h1>
//           <Button
//             variant="outline"
//             className="text-teal-600 border-teal-600 hover:bg-teal-50"
//             onClick={() => setIsModalOpen(true)}
//           >
//             + ADD GOAL
//           </Button>
//         </div>

//         <div className="grid grid-cols-2 gap-6 mb-6">
//           <SavingsGoal />
//           <SavingSummary />
//         </div>

//         <ExpenseGoals />

//         {/* AddGoalModal Component */}
//         <AddGoalModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onSave={handleSaveGoal}
//         />
//       </main>
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import SavingsGoal from '../../components/SavingsGoal';
import SavingSummary from '../../components/SavingSummary';
import ExpenseGoals from '../../components/ExpenseGoals';
import { Button } from '../../components/ui/button';
import AddGoalModal from '../../components/AddGoalModal';
import axios from 'axios';

export default function WealthWise() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [goals, setGoals] = useState([]);
  const [expenses, setExpenses] = useState([]); // To store the expenses
  const [fetching, setFetching] = useState(true); // To manage loading state

  // Fetch user's goals
const fetchGoals = async () => {
  const userId = localStorage.getItem('userId');
  try {
    const response = await axios.get(`http://localhost:8000/api/goals`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      params: {
        userId: userId,
      },
    });
    setGoals(response.data.categories); // Set the categories array
  } catch (error) {
    console.error('Error fetching goals:', error);
  } finally {
    setFetching(false);
  }
};

// Save a new goal
const saveGoalToDatabase = async (goal, amount) => {
  const userId = localStorage.getItem('userId');
  try {
    await axios.post(`http://localhost:8000/api/goals`, {
      category: goal,  // Send the category name
      goal: amount     // Send the target goal amount
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      params: {
        userId: userId,
      },
    });
    fetchGoals(); // Refresh goals after saving
  } catch (error) {
    console.error('Error saving goal:', error);
  }
};


  useEffect(() => {
    fetchGoals();
  }, []);

  const handleSaveGoal = (goal, amount) => {
    saveGoalToDatabase(goal, amount);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-700">Goals</h1>
          <Button
            variant="outline"
            className="text-teal-600 border-teal-600 hover:bg-teal-50"
            onClick={() => setIsModalOpen(true)}
          >
            + ADD GOAL
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <SavingsGoal goals={goals} />
          <SavingSummary />
        </div>


        <AddGoalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveGoal}

        />
        <ExpenseGoals />

      </main>
    </div>
  );
}
