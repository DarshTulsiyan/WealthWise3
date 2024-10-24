// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import Link from 'next/link';

// export default function UpcomingBills() {
//   const bills = [
//     { description: "Jio sim - Yearly Plan", dueDate: "19th Nov",  },
//     { description: "Spotify family - Yearly Plan", dueDate: "12th Sep" },
//     { description: "Netflix UHD - Monthly Plan", dueDate: "31st Aug" },
//   ];

//   return (
//     <Link href='/bills'>
//     <Card className="cursor-pointer">
//       <CardContent className="p-6">
//         <h2 className="text-xl font-semibold mb-4">Upcoming Bills</h2>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Description</TableHead>
//               <TableHead>Due Date</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {bills.map((bill, index) => (
//               <TableRow key={index}>
//                 <TableCell>{bill.description}</TableCell>
//                 <TableCell>{bill.dueDate}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//     </Link>
//   );
// }
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from 'next/link';
import axios from 'axios'; // For API calls

interface Bill {
  dueDate: { month: string; day: number };
  description: string;
  lastCharge: string;
  amount: number;
  paid: boolean;
}

const initialBills: Bill[] = [];

// Function to fetch current bill data
async function fetchBillsData(userId: string) {
  try {
    const response = await axios.get(`http://localhost:8000/api/bills`, {
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

export default function UpcomingBills() {
  const [bills, setBills] = useState<Bill[]>(initialBills);
  const [loading, setLoading] = useState(true); // To handle loading state

  // Fetch Bills from the database when the component mounts
  useEffect(() => {
    const fetchBills = async () => {
      const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
      const data = await fetchBillsData(userId);
      if (data && data.bills) {
        setBills(data.bills); // Set the fetched bills
      }
      setLoading(false); // Stop loading
    };

    fetchBills(); // Call the fetch function
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show a loading message while fetching
  }

  return (
    <Link href='/bills'>
      <Card className="cursor-pointer">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Upcoming Bills</h2>
          {/* Scrollable table container */}
          <div className="max-h-60 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Description</TableHead>
                  <TableHead>Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bills.map((bill, index) => (
                  <TableRow key={index}>
                    <TableCell>{bill.description}</TableCell>
                    <TableCell>{bill.dueDate.month} {bill.dueDate.day}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
