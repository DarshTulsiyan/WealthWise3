



// "use client";

// import React, { useState, useEffect } from 'react';
// import Sidebar from '../../components/Sidebar';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Checkbox } from '@/components/ui/checkbox';
// import  AddBillModal from '@/components/AddBillsModal';
// import { Button } from '../../components/ui/button';
// import axios from 'axios'; // For API calls
// import { CloudLightning } from 'lucide-react';

// interface Bill {
//   dueDate: { month: string; day: number };
//   description: string;
//   lastCharge: string;
//   amount: number;
//   paid: boolean;
// }

// const initialBills: Bill[] = [];

// // Function to fetch current bill data
// async function fetchBillsData(userId: string) {
//   try {
//     const response = await axios.get(`https://wealth-wise3-4o1t.vercel.app/api/bills`, {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//       },
//       params: {
//         userId: userId,
//       },
//     });

//     return await response.data;
//   } catch (error) {
//     console.error('Error fetching bill data:', error);
//     return null;
//   }
// }

// // Function to update bill data
// async function updateBillsData(updatedBillData: Bill[]) {
//   const userId = localStorage.getItem('userId');
//   console.log(userId);
//   try {
//     const response = await axios.post(`https://wealth-wise3-4o1t.vercel.app/api/bills`, updatedBillData, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//       },
//       params: {
//         userId: userId,
//       },
//     });

//     if (response.status === 200) {
//       console.log('Bills updated successfully');
//     }
//   } catch (error) {
//     console.error('Error updating bills:', error);
//   }
// }

// export default function WealthWise() {
//   const [bills, setBills] = useState<Bill[]>(initialBills);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Fetch Bills from the database when the component mounts
//   useEffect(() => {
//     const fetchBills = async () => {
//       const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
//       console.log(userId);
//       const data = await fetchBillsData(userId);
//       console.log(data);
//       if (data && data.bills) {
//         setBills(data.bills); // Set the fetched bills
//       }
//     };

//     fetchBills(); // Call the fetch function
//   }, []);

//   // Function to handle adding a new bill and updating the database
//   const addBill = async (newBill: Bill) => {
//     const updatedBills = [...bills, newBill];
//     // setBills(updatedBills); // Update UI locally
//     setIsModalOpen(false); // Close modal after saving

//     // Send new bill data to the backend
//     await updateBillsData(updatedBills);
//   };

//   const handleAddBill = () => {
//     setIsModalOpen(true);
//   };

//   const handleSaveBill = async (newBill) => {
//     const userId = localStorage.getItem('userId');

//     // Fetch the current bill data
//     const data = await fetchBillsData(userId);

//     if (data) {
//       // Add the new bill to the list of bills
//       data.bills.push({
//         description: newBill.description,
//         amount: newBill.amount,
//         lastCharge: newBill.lastCharge,
//         dueDate: newBill.dueDate,
//         paid: newBill.paid,
//       });

//       // Send updated data to the backend
//       await updateBillsData({ bills: data.bills });
//     }

//     setIsModalOpen(false); // Close modal after saving
//   };

//   return (
//     // <div className="flex min-h-screen bg-gray-100">
//     //   <Sidebar />
//     //   <main className="flex-1 p-8">
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-8">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-semibold">Bills Overview</h1>
//           <div className="space-x-4">
//             <Button onClick={handleAddBill}>+ ADD BILL</Button>
//           </div>
//         </div>
//         {/* Card to display upcoming bills */}
//         <Card className="shadow-lg">
//           <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
//             <CardTitle className="text-2xl font-semibold text-gray-700">Upcoming Bills</CardTitle>
//             {/* Modal to add a new bill */}
//             <AddBillModal onAddBill={addBill} isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
//           </CardHeader>
//           <CardContent className="p-0">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-gray-50">
//                   <TableHead className="w-[100px] text-gray-600">Due Date</TableHead>
//                   <TableHead className="text-gray-600">Description</TableHead>
//                   <TableHead className="text-gray-600">Last Charge</TableHead>
//                   <TableHead className="text-right text-gray-600">Amount</TableHead>
//                   <TableHead className="w-[50px]"></TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {bills.map((bill, index) => (
//                   <TableRow key={index} className="border-b last:border-b-0">
//                     <TableCell className="py-4">
//                       <div className="bg-gray-200 w-14 h-14 rounded-md flex flex-col items-center justify-center">
//                         <span className="text-xs font-semibold text-gray-600">{bill.dueDate.month}</span>
//                         <span className="text-lg font-bold text-gray-800">{bill.dueDate.day}</span>
//                       </div>
//                     </TableCell>
//                     <TableCell className="font-medium">{bill.description}</TableCell>
//                     <TableCell className="text-gray-600">{bill.lastCharge}</TableCell>
//                     <TableCell className="text-right font-semibold">${bill.amount.toFixed(2)}</TableCell>
//                     <TableCell>
//                       <Checkbox checked={bill.paid} className="border-2 border-teal-500 data-[state=checked]:bg-teal-500 data-[state=checked]:text-white" />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//         <AddBillModal
//           isOpen={isModalOpen} // This controls whether the modal is visible
//           onClose={() => setIsModalOpen(false)} // Close the modal when the user cancels
//           onSave={handleSaveBill} // Save bill data
//         />
//       </main>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useEffect } from 'react';
// import Sidebar from '../../components/Sidebar';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import  AddBillModal from '@/components/AddBillsModal';
// import { Button } from '../../components/ui/button';
// import axios from 'axios'; // For API calls

// interface Bill {
//   dueDate: { month: string; day: number };
//   description: string;
//   lastCharge: string;
//   amount: number;
// }

// const initialBills: Bill[] = [];

// // Function to fetch current bill data
// async function fetchBillsData(userId: string) {
//   try {
//     const response = await axios.get(`https://wealth-wise3-4o1t.vercel.app/api/bills`, {
//       headers: {
//         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//       },
//       params: {
//         userId: userId,
//       },
//     });

//     return await response.data;
//   } catch (error) {
//     console.error('Error fetching bill data:', error);
//     return null;
//   }
// }

// // Function to update bill data
// async function updateBillsData(updatedBillData: Bill[]) {
//   console.log("updatedBillData in function" + JSON.stringify(updatedBillData));
//   const userId = localStorage.getItem('userId');
//   console.log(userId);
//   try {
//     const response = await axios.post(`https://wealth-wise3-4o1t.vercel.app/api/bills`, updatedBillData, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('token')}`,
//       },
//       params: {
//         userId: userId,
//       },
//     });

//     console.log("response" + JSON.stringify(response));

//     if (response.status === 201) {
//       console.log('Bills updated successfully');
//     }
//   } catch (error) {
//     console.error('Error updating bills:', error);
//   }
// }

// export default function WealthWise() {
//   const [bills, setBills] = useState<Bill[]>(initialBills);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Fetch Bills from the database when the component mounts
//   useEffect(() => {
//     const fetchBills = async () => {
//       const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage

//       if (userId) {
//         const data = await fetchBillsData(userId);
//         if (data && data.bills) {
//         setBills(data.bills); // Set the fetched bills
//       }
//       }

      
//     };

//     fetchBills(); // Call the fetch function
//   }, []);

//   // Function to handle adding a new bill and updating the database
//   const addBill = async (newBill: Bill) => {
//     const updatedBills = [...bills, newBill];
//     // setBills(updatedBills); // Update UI locally
//     setIsModalOpen(false); // Close modal after saving

//     // Send new bill data to the backend
//     await updateBillsData(updatedBills);
//   };

//   const handleAddBill = () => {
//     setIsModalOpen(true);
//   };

//   const handleSaveBill = async (newBill: Bill) => {
//     console.log("newBill" + JSON.stringify(newBill));
//     const userId = localStorage.getItem('userId');

//     // Fetch the current bill data

//     if (!userId) {
//       console.error('User ID is not available in local storage');
//       return; // Early return if userId is not found
//     }

//     const data = await fetchBillsData(userId);
//     console.log("Data" + JSON.stringify(data));

//     // if (data) {
//     //   // Add the new bill to the list of bills
//     //   data.bills.push({
//     //     description: newBill.description,
//     //     amount: newBill.amount,
//     //     lastCharge: newBill.lastCharge,
//     //     dueDate: newBill.dueDate,
//     //   });

//     //   // Send updated data to the backend
//     //   await updateBillsData({ bills: data.bills });
//     // }

//     if (data && data.bills) { // Check if data and data.bills are defined
//       // Add the new bill to the list of bills
//       const updatedBills = [
//           ...data.bills,
//           {
//               description: newBill.description,
//               amount: newBill.amount,
//               lastCharge: newBill.lastCharge,
//               dueDate: newBill.dueDate,
//               // Remove 'paid' if it's no longer needed
//               // paid: newBill.paid,
//           }
//       ];
//       console.log("Updated" + JSON.stringify(updatedBills));
//       // Send updated data to the backend
//       await updateBillsData(updatedBills as Bill[]);
//   }

//     setIsModalOpen(false); // Close modal after saving
//   };

//   return (
//     // <div className="flex min-h-screen bg-gray-100">
//     //   <Sidebar />
//     //   <main className="flex-1 p-8">
//     <div className="flex min-h-screen bg-gray-100">
//       <Sidebar />
//       <main className="flex-1 p-8">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-semibold">Bills Overview</h1>
//           <div className="space-x-4">
//             <Button onClick={handleAddBill}>+ ADD BILL</Button>
//           </div>
//         </div>
//         {/* Card to display upcoming bills */}
//         <Card className="shadow-lg">
//           <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
//             <CardTitle className="text-2xl font-semibold text-gray-700">Upcoming Bills</CardTitle>
//             {/* Modal to add a new bill */}
//             <AddBillModal onAddBill={addBill} isOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
//           </CardHeader>
//           <CardContent className="p-0">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-gray-50">
//                   <TableHead className="w-[100px] text-gray-600">Due Date</TableHead>
//                   <TableHead className="text-gray-600">Description</TableHead>
//                   <TableHead className="text-gray-600">Last Charge</TableHead>
//                   <TableHead className="text-right text-gray-600">Amount</TableHead>
//                   <TableHead className="w-[50px]"></TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {bills.map((bill, index) => (
//                   <TableRow key={index} className="border-b last:border-b-0">
//                     <TableCell className="py-4">
//                       <div className="bg-gray-200 w-14 h-14 rounded-md flex flex-col items-center justify-center">
//                         <span className="text-xs font-semibold text-gray-600">{bill.dueDate.month}</span>
//                         <span className="text-lg font-bold text-gray-800">{bill.dueDate.day}</span>
//                       </div>
//                     </TableCell>
//                     <TableCell className="font-medium">{bill.description}</TableCell>
//                     <TableCell className="text-gray-600">{bill.lastCharge}</TableCell>
//                     <TableCell className="text-right font-semibold">${bill.amount.toFixed(2)}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </CardContent>
//         </Card>
//         <AddBillModal
//           isOpen={isModalOpen} // This controls whether the modal is visible
//           onClose={() => setIsModalOpen(false)} // Close the modal when the user cancels
//           onSave={handleSaveBill} // Save bill data
//         />
//       </main>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AddBillModal from '@/components/AddBillsModal';
import { Button } from '../../components/ui/button';
import axios from 'axios'; // For API calls

interface Bill {
  dueDate: { month: string; day: number };
  description: string;
  lastCharge: string;
  amount: number;
}

const initialBills: Bill[] = [];

// Function to fetch current bill data
async function fetchBillsData(userId: string) {
  try {
    const response = await axios.get(`https://wealth-wise3-4o1t.vercel.app/api/bills`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      params: {
        userId: userId,
      },
    });

    return await response.data;
  } catch (error) {
    console.error('Error fetching bill data:', error);
    return null;
  }
}

// Function to update bill data
async function updateBillsData(updatedBillData: { bills: Bill[] }) {
  console.log("updatedBillData in function" + JSON.stringify(updatedBillData));
  const userId = localStorage.getItem('userId');
  console.log(userId);
  try {
    const response = await axios.post(`https://wealth-wise3-4o1t.vercel.app/api/bills`, updatedBillData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      params: {
        userId: userId,
      },
    });

    console.log("response" + JSON.stringify(response));

    if (response.status === 201) {
      console.log('Bills updated successfully');
    }
  } catch (error) {
    console.error('Error updating bills:', error);
  }
}

export default function WealthWise() {
  const [bills, setBills] = useState<Bill[]>(initialBills);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch Bills from the database when the component mounts
  useEffect(() => {
    const fetchBills = async () => {
      const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage

      if (userId) {
        const data = await fetchBillsData(userId);
        if (data && data.bills) {
          setBills(data.bills); // Set the fetched bills
        }
      }
    };

    fetchBills(); // Call the fetch function
  }, []);

  // Function to handle adding a new bill and updating the database
  // const addBill = async (newBill: Bill) => {
  //   // Fetch the current bills from the database
  //   const userId = localStorage.getItem('userId');

  //   if (!userId) {
  //     console.error('User ID is not available in local storage');
  //     return; // Early return if userId is not found
  //   }

  //   const data = await fetchBillsData(userId);
    
  //   if (data && data.bills) {
  //     // Add the new bill to the list of bills
  //     const updatedBills = [...data.bills, newBill];

  //     // Send updated data to the backend
  //     await updateBillsData({ bills: updatedBills });
      
  //     // Update the UI with the new list of bills
  //     setBills(updatedBills);
  //   }

  //   setIsModalOpen(false); // Close modal after saving
  // };

  // const addBill = async (newBill: Bill) => {
  //   // Use the current state (bills) instead of fetching the bills again
  //   const updatedBills = [...bills, newBill]; // Append new bill to the existing bills in state
  
  //   // Send updated data to the backend
  //   await updateBillsData({ bills: updatedBills }); // Use the updated bills list
  
  //   // Update the UI with the new list of bills
  //   setBills(updatedBills); // Update the UI with the new bill list
  
  //   setIsModalOpen(false); // Close modal after saving
  // };

  const addBill = async (newBill: Bill) => {
    const userId = localStorage.getItem('userId');

    // Fetch the current bill data
    // const data = await fetchBillsData(userId);

    if (bills) {
      // Add the new bill to the list of bills
      bills.push({
        description: newBill.description,
        amount: newBill.amount,
        lastCharge: newBill.lastCharge,
        dueDate: newBill.dueDate,
      });

      // Send updated data to the backend
      await updateBillsData({ bills: bills });
    }

    setIsModalOpen(false); // Close modal after saving
  };

  const handleAddBill = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Bills Overview</h1>
          <div className="space-x-4">
            <Button onClick={handleAddBill}>+ ADD BILL</Button>
          </div>
        </div>
        {/* Card to display upcoming bills */}
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
            <CardTitle className="text-2xl font-semibold text-gray-700">Upcoming Bills</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="w-[100px] text-gray-600">Due Date</TableHead>
                  <TableHead className="text-gray-600">Description</TableHead>
                  <TableHead className="w-[100px] text-gray-600">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bills.map((bill, index) => (
                  <TableRow key={index}>
                    <TableCell>{bill.dueDate.month} {bill.dueDate.day}</TableCell>
                    <TableCell>{bill.description}</TableCell>
                    <TableCell>${bill.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {/* Add Bill Modal */}
        <AddBillModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={addBill} />
      </main>
    </div>
  );
}
