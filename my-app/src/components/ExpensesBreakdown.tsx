// import React from 'react'
// import { Card, CardContent } from './ui/card'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
// import { Home, ShoppingBag, Car, Film, ShoppingCart, Package } from 'lucide-react'

// const categories = [
//   { 
//     icon: Home, 
//     name: 'Housing', 
//     amount: 250.00, 
//     items: [
//       { name: 'House Rent', amount: 230.00, date: '17 May 2023' },
//       { name: 'Parking', amount: 20.00, date: '17 May 2023' },
//     ]
//   },
//   { 
//     icon: ShoppingBag, 
//     name: 'Food', 
//     amount: 350.00, 
//     items: [
//       { name: 'Grocery', amount: 230.00, date: '17 May 2023' },
//       { name: 'Restaurant bill', amount: 120.00, date: '17 May 2023' },
//     ]
//   },
//   { 
//     icon: Car, 
//     name: 'Transportation', 
//     amount: 50.00, 
//     items: [
//       { name: 'Taxi Fare', amount: 30.00, date: '17 May 2023' },
//       { name: 'Metro Card bill', amount: 20.00, date: '17 May 2023' },
//     ]
//   },
//   { 
//     icon: Film, 
//     name: 'Entertainment', 
//     amount: 80.00, 
//     items: [
//       { name: 'Movie ticket', amount: 30.00, date: '17 May 2023' },
//       { name: 'iTunes', amount: 50.00, date: '17 May 2023' },
//     ]
//   },
//   { 
//     icon: ShoppingCart, 
//     name: 'Shopping', 
//     amount: 420.00, 
//     items: [
//       { name: 'Shirt', amount: 230.00, date: '17 May 2023' },
//       { name: 'Jeans', amount: 190.00, date: '17 May 2023' },
//     ]
//   },
//   { 
//     icon: Package, 
//     name: 'Others', 
//     amount: 50.00, 
//     items: [
//       { name: 'Donation', amount: 30.00, date: '17 May 2023' },
//       { name: 'Gift', amount: 20.00, date: '17 May 2023' },
//     ]
//   },
// ]

// export default function ExpensesBreakdown() {
//   return (
//     <Card>
//       <CardContent className="p-6">
//         <h2 className="text-xl font-semibold mb-4">Expenses Breakdown</h2>
//         <Tabs defaultValue="categorically">
//           <TabsList>
//             <TabsTrigger value="categorically">Categorically</TabsTrigger>
//             <TabsTrigger value="monthly">Monthly</TabsTrigger>
//           </TabsList>
//           <TabsContent value="categorically">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//               {categories.map((category, index) => (
//                 <Card key={index}>
//                   <CardContent className="p-4">
//                     <div className="flex items-center justify-between mb-2">
//                       <div className="flex items-center">
//                         <category.icon className="mr-2" size={20} />
//                         <span className="font-semibold">{category.name}</span>
//                       </div>
//                       <span className="text-lg font-bold">${category.amount.toFixed(2)}</span>
//                     </div>
//                     {category.items.map((item, itemIndex) => (
//                       <div key={itemIndex} className="flex justify-between items-center mb-2">
//                         <span>{item.name}</span>
//                         <div className="text-right">
//                           <div>${item.amount.toFixed(2)}</div>
//                           <div className="text-xs text-gray-500">{item.date}</div>
//                         </div>
//                       </div>
//                     ))}
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>
//           <TabsContent value="monthly">
//             {/* Add monthly breakdown content here */}
//           </TabsContent>
//         </Tabs>
//       </CardContent>
//     </Card>
//   )
// }
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed with `npm install axios`
import { Card, CardContent } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Home, ShoppingBag, Car, Film, ShoppingCart, Package } from 'lucide-react';
import { fetchExpenseData } from '@/app/expense/page';

// Define the category icons
const icons = {
  Housing: Home,
  Food: ShoppingBag,
  Transportation: Car,
  Entertainment: Film,
  Shopping: ShoppingCart,
  Others: Package,
};

export default function ExpensesBreakdown() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Assuming you're storing userId in localStorage

    const fetchData = async () => {
      try {
        const data = await fetchExpenseData(userId); // Fetch data using the provided function
        if (data && data.categories) {
          setCategories(data.categories);
        } else {
          setError('No expenses found for this user');
        }
      } catch (error) {
        setError('Error fetching expenses');
      }
    };

    fetchData(); // Call fetchData when the component mounts
  }, []);

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Expenses Breakdown</h2>
        <Tabs defaultValue="categorically">
          <TabsList>
            <TabsTrigger value="categorically">Categorically</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="categorically">
            {error ? (
              <p>{error}</p> // Display error if there is one
            ) : categories.length > 0 ? ( // Check if categories exist
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {categories.map((category, index) => {
                  const Icon = icons[category.name] || Package; // Fallback to Package if no icon is found
                  return (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Icon className="mr-2" size={20} />
                            <span className="font-semibold">{category.name}</span>
                          </div>
                          <span className="text-lg font-bold">${category.amount.toFixed(2)}</span>
                        </div>
                        {category.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex justify-between items-center mb-2">
                            <span>{item.name}</span>
                            <div className="text-right">
                              <div>${item.amount.toFixed(2)}</div>
                              <div className="text-xs text-gray-500">
                                {new Date(item.date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <p>Loading expenses...</p> // Display loading message until data is fetched
            )}
          </TabsContent>
          <TabsContent value="monthly">
            {/* Add monthly breakdown content here */}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
