// import React from 'react'
// import { Card, CardContent } from './ui/card'
// import { Button } from './ui/button'
// import { Trophy, Target } from 'lucide-react'

// export default function SavingsGoal() {
//   return (
//     <Card>
//       <CardContent className="p-6">
//         <h2 className="text-xl font-semibold mb-4">Savings Goal</h2>
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center">
//             <Trophy className="text-yellow-500 mr-2" size={24} />
//             <div>
//               <p className="text-sm text-gray-500">Target Achieved</p>
//               <p className="text-2xl font-bold">$12,500</p>
//             </div>
//           </div>
//           <div className="flex items-center">
//             <Target className="text-teal-500 mr-2" size={24} />
//             <div>
//               <p className="text-sm text-gray-500">This month Target</p>
//               <p className="text-2xl font-bold">$20,000</p>
//             </div>
//           </div>
//         </div>
//         <div className="relative pt-1">
//           <div className="flex mb-2 items-center justify-between">
//             <div>
//               <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
//                 $0
//               </span>
//             </div>
//             <div className="text-right">
//               <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
//                 $20k
//               </span>
//             </div>
//           </div>
//           <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
//             <div style={{ width: "62.5%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"></div>
//           </div>
//         </div>
//         <p className="text-center text-gray-600 mb-4">Target vs Achievement</p>
//         <Button variant="outline" className="w-full">Adjust Goal</Button>
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Trophy, Target } from 'lucide-react';
import axios from 'axios';

export default function SavingsGoal() {
  const [goals, setGoals] = useState([]);
  const [fetching, setFetching] = useState(true);

  // Fetch goals from the API
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

  useEffect(() => {
    fetchGoals();
  }, []);

  if (fetching) {
    return <p>Loading...</p>; // Loading state while fetching data
  }

  // Calculate the total goal and total amount achieved
  const totalGoal = goals.reduce((sum, category) => sum + parseInt(category.goal), 0);
  const totalAchieved = goals.reduce((sum, category) => sum + parseInt(category.amount), 0);

  // Calculate the percentage achieved towards the total goal
  const progressPercentage = totalGoal > 0 ? (totalAchieved / totalGoal) * 100 : 0;

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Savings Goal</h2>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <Trophy className="text-yellow-500 mr-2" size={24} />
            <div>
              <p className="text-sm text-gray-500">Total Achieved</p>
              <p className="text-2xl font-bold">${totalAchieved.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Target className="text-teal-500 mr-2" size={24} />
            <div>
              <p className="text-sm text-gray-500">Total Goal</p>
              <p className="text-2xl font-bold">${totalGoal.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                $0
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-teal-600 bg-teal-200">
                ${totalGoal.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-teal-200">
            <div style={{ width: `${progressPercentage}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-teal-500"></div>
          </div>
        </div>
        <p className="text-center text-gray-600 mb-4">Target vs Achievement</p>
      </CardContent>
    </Card>
  );
}
