// // import React from "react";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Switch } from "@/components/ui/switch";

// // export default function WeeklySumup() {
// //   const goals = [
// //     { icon: "🏠", label: "Housing", amount: 250 },
// //     { icon: "🍽️", label: "Food", amount: 250 },
// //     { icon: "✈️", label: "Travel", amount: 250 },
// //     { icon: "🛍️", label: "Shopping", amount: 250 },
// //   ];

// //   return (
// //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
// //       <Card>
// //         <CardContent className="p-6">
// //           <h2 className="text-xl font-semibold mb-4">Cards</h2>
// //           <div className="bg-blue-500 text-white p-4 rounded-lg mb-4">
// //             <div className="flex justify-between items-center mb-4">
// //               <span className="text-sm">cloudcash</span>
// //               <span className="text-2xl font-bold">$ 2850.75</span>
// //             </div>
// //             <div className="mb-4">5789 **** **** 2847</div>
// //             <div className="flex justify-between text-sm">
// //               <span>Mike Smith</span>
// //               <span>06/21</span>
// //             </div>
// //           </div>
// //           <div className="flex justify-between items-center">
// //             <span className="text-sm text-gray-600">Weekly payment limit</span>
// //             <span className="text-sm font-semibold">$350.60 / $4000</span>
// //           </div>
// //           <div className="flex justify-between items-center mt-2">
// //             <span className="text-sm text-gray-600">Deactivate card</span>
// //             <Switch />
// //           </div>
// //         </CardContent>
// //       </Card>
      
// //       <Card>
// //         <CardContent className="p-6">
// //           <h2 className="text-xl font-semibold mb-4">Goals</h2>
// //           <div className="grid grid-cols-2 gap-4">
// //             {goals.map((goal, index) => (
// //               <div
// //                 key={index}
// //                 className="bg-gray-100 p-4 rounded-lg text-center"
// //               >
// //                 <span className="text-2xl mb-2 block">{goal.icon}</span>
// //                 <span className="text-sm font-semibold">{goal.label}</span>
// //                 <span className="block text-lg font-bold">${goal.amount}</span>
// //               </div>
// //             ))}
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }


// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Switch } from "@/components/ui/switch";
// import Link from "next/link"; // Import the Link component from Next.js

// export default function WeeklySumup() {
//   const goals = [
//     { icon: "🏠", label: "Housing", amount: 250 },
//     { icon: "🍽️", label: "Food", amount: 250 },
//     { icon: "✈️", label: "Travel", amount: 250 },
//     { icon: "🛍️", label: "Shopping", amount: 250 },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//       <Card>
//         <CardContent className="p-6">
//           <h2 className="text-xl font-semibold mb-4">Cards</h2>
//           <div className="bg-blue-500 text-white p-4 rounded-lg mb-4">
//             <div className="flex justify-between items-center mb-4">
//               <span className="text-sm">cloudcash</span>
//               <span className="text-2xl font-bold">$ 2850.75</span>
//             </div>
//             <div className="mb-4">5789 **** **** 2847</div>
//             <div className="flex justify-between text-sm">
//               <span>Mike Smith</span>
//               <span>06/21</span>
//             </div>
//           </div>
//           <div className="flex justify-between items-center">
//             <span className="text-sm text-gray-600">Weekly payment limit</span>
//             <span className="text-sm font-semibold">$350.60 / $4000</span>
//           </div>
//           <div className="flex justify-between items-center mt-2">
//             <span className="text-sm text-gray-600">Deactivate card</span>
//             <Switch />
//           </div>
//         </CardContent>
//       </Card>
      
//       <Card>
//         <CardContent className="p-6">
//           <h2 className="text-xl font-semibold mb-4">Goals</h2>
//           <div className="grid grid-cols-2 gap-4">
//             {goals.map((goal, index) => (
//               <Link href="/goals" key={index}> {/* Wrap each goal in a Link */}
//                 <div className="bg-gray-100 p-4 rounded-lg text-center cursor-pointer">
//                   <span className="text-2xl mb-2 block">{goal.icon}</span>
//                   <span className="text-sm font-semibold">{goal.label}</span>
//                   <span className="block text-lg font-bold">${goal.amount}</span>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
"use client"
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import axios from "axios";

export default function WeeklySumup() {
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
    return <p>Loading...</p>; // Display loading message while fetching data
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Cards Section */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Cards</h2>
          <div className="bg-blue-500 text-white p-4 rounded-lg mb-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm">cloudcash</span>
              <span className="text-2xl font-bold">$ 2850.75</span>
            </div>
            <div className="mb-4">5789 **** **** 2847</div>
            <div className="flex justify-between text-sm">
              <span>Mike Smith</span>
              <span>06/21</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Weekly payment limit</span>
            <span className="text-sm font-semibold">$350.60 / $4000</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-600">Deactivate card</span>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Goals Section */}
      <Card className="overflow-y-auto max-h-96"> {/* Scrollable container */}
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Goals</h2>
          <div className="grid grid-cols-2 gap-4">
            {goals.map((goal, index) => (
              <Link href="/goals" key={index}> {/* Wrap each goal in a Link */}
                <div className="bg-gray-100 p-4 rounded-lg text-center cursor-pointer">
                  <span className="text-2xl mb-2 block">🏁</span> {/* Placeholder icon */}
                  <span className="text-sm font-semibold">{goal.name}</span>
                  {/* Display both achieved and goal amounts */}
                  <span className="block text-lg font-bold">${goal.amount} / ${goal.goal}</span>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
