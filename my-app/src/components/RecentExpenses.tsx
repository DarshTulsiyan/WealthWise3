
// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios"; // Import axios for API requests
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { ShoppingCart, Zap, Utensils, User } from "lucide-react";
// import Link from "next/link";


// interface Item {
//   receiver: string;
//   date: string;
//   amount: number;
// }

// interface Category {
//   name: string;
//   amount: number;
//   items: Item[];
// }

// interface ExpenseData {
//   categories: Category[];
// }

// // Function to fetch expense data from the backend
// async function fetchExpenseData(userId: string) {
//   console.log(userId); // Logs the userId for debugging purposes
//   try {
//     const response = await axios.get(`http://localhost:8000/api/expenses`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve the token from localStorage
//       },
//       params: {
//         userId: userId, // Pass the userId as a query parameter
//       },
//     });
//     return response.data; // Return the fetched data
//   } catch (error) {
//     console.error("Error fetching expense data:", error);
//     return null; // Return null in case of error
//   }
// }

// export default function RecentExpenses() {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     // Fetch data when the component is mounted
//     async function getData() {
//       const userId = localStorage.getItem('userId');
//       const data = await fetchExpenseData(userId); // Fetch data using the fetchExpenseData function
//       if (data && data.categories) {
//         setCategories(data.categories); // Set categories if data is available
//       } else {
//         setError("No categories found or failed to fetch");
//       }
//       setLoading(false); // Set loading to false after fetching
//     }
//     getData();
//   }, []);

//   const getIcon = (categoryName: string) => {
//     switch (categoryName) {
//       case "Shopping":
//         return ShoppingCart;
//       case "Food":
//         return Utensils;
//       case "Sport":
//         return User;
//       case "Utilities":
//         return Zap;
//       default:
//         return ShoppingCart; // Fallback icon
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>; // Show loading state
//   }

//   if (error) {
//     return <p>Error: {error}</p>; // Show error state
//   }

//   return (
//     <Link href='/expense'>
//       <Card className="cursor-pointer">
//         <CardContent className="p-6 h-80 overflow-y-auto"> {/* Set a fixed height and enable scrolling */}
//           <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Receiver</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead>Date</TableHead>
//                 <TableHead className="text-right">Amount</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {categories.length > 0 ? (
//                 categories.map((category, catIndex) =>
//                   category.items.map((item, itemIndex) => {
//                     const Icon = getIcon(category.name); // Get the icon component
//                     return (
//                       <TableRow key={`${catIndex}-${itemIndex}`}>
//                         <TableCell className="flex items-center">
//                           <Icon className="mr-2" size={16} /> {/* Use the Icon as a component */}
//                           {item.receiver}
//                         </TableCell>
//                         <TableCell>{category.name}</TableCell>
//                         <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
//                         <TableCell className="text-right">
//                           ${item.amount.toFixed(2)}
//                         </TableCell>
//                       </TableRow>
//                     );
//                   })
//                 )
//               ) : (
//                 <TableRow>
//                   <TableCell colSpan={4} className="text-center">
//                     No expenses available
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </Link>
//   );
// }


"use client";
import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios for API requests
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ShoppingCart, Zap, Utensils, User } from "lucide-react";
import Link from "next/link";

interface Item {
  receiver: string;
  date: string;
  amount: number;
}

interface Category {
  name: string;
  amount: number;
  items: Item[];
}

// interface ExpenseData {
//   categories: Category[];
// }

// Function to fetch expense data from the backend
async function fetchExpenseData(userId: string) {
  console.log(userId); // Logs the userId for debugging purposes
  try {
    const response = await axios.get(`http://localhost:8000/api/expenses`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Retrieve the token from localStorage
      },
      params: {
        userId: userId, // Pass the userId as a query parameter
      },
    });
    return response.data; // Return the fetched data
  } catch (error) {
    console.error("Error fetching expense data:", error);
    return null; // Return null in case of error
  }
}

export default function RecentExpenses() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data when the component is mounted
    async function getData() {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const data = await fetchExpenseData(userId); // Fetch data using the fetchExpenseData function
        if (data && data.categories) {
          setCategories(data.categories); // Set categories if data is available
        }
      } else {
        console.error("User ID is null");
      }
      // if (data && data.categories) {
      //   setCategories(data.categories); // Set categories if data is available
      // }
      setLoading(false); // Set loading to false after fetching
    }
    getData();
  }, []);

  const getIcon = (categoryName: string) => {
    switch (categoryName) {
      case "Shopping":
        return ShoppingCart;
      case "Food":
        return Utensils;
      case "Sport":
        return User;
      case "Utilities":
        return Zap;
      default:
        return ShoppingCart; // Fallback icon
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  return (
    <Link href="/expense">
      <Card className="cursor-pointer">
        <CardContent className="p-6 h-80 overflow-y-auto">
          {/* Section title always displayed */}
          <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Receiver</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length > 0 ? (
                categories.map((category, catIndex) =>
                  category.items.map((item, itemIndex) => {
                    const Icon = getIcon(category.name); // Get the icon component
                    return (
                      <TableRow key={`${catIndex}-${itemIndex}`}>
                        <TableCell className="flex items-center">
                          <Icon className="mr-2" size={16} /> {/* Use the Icon as a component */}
                          {item.receiver}
                        </TableCell>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>{new Date(item.date).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          ${item.amount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Link>
  );
}
