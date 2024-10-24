// import React from 'react'
// import { Card, CardContent } from './ui/card'
// import { Button } from './ui/button'
// import { Home, Utensils, Plane, Film, ShoppingBag, Package } from 'lucide-react'

// const expenseCategories = [
//   { icon: Home, name: 'Housing', amount: 250 },
//   { icon: Utensils, name: 'Food', amount: 250 },
//   { icon: Plane, name: 'Travel', amount: 250 },
//   { icon: Film, name: 'Entertainment', amount: 250 },
//   { icon: ShoppingBag, name: 'Shopping', amount: 250 },
//   { icon: Package, name: 'Others', amount: 250 },
// ]

// export default function ExpenseGoals() {
//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4 text-gray-700">Expense Goals by Category</h2>
//       <div className="grid grid-cols-3 gap-6">
//         {expenseCategories.map((category, index) => (
//           <Card key={index}>
//             <CardContent className="p-6 flex justify-between items-center">
//               <div className="flex items-center">
//                 <category.icon className="mr-4 text-gray-500" size={24} />
//                 <div>
//                   <p className="font-semibold">{category.name}</p>
//                   <p className="text-2xl font-bold">${category.amount.toFixed(2)}</p>
//                 </div>
//               </div>
//               <Button variant="outline" className="text-teal-600 border-teal-600 hover:bg-teal-50">Adjust</Button>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }

// "use client"

// import React, { useState } from 'react'
// import { Card, CardContent } from './ui/card'
// import { Button } from './ui/button'
// import { Input } from './ui/input'
// import { Label } from './ui/label'
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
// import { Home, Utensils, Plane, Film, ShoppingBag, Package } from 'lucide-react'
// import { Progress } from './ui/progress'

// interface ExpenseCategory {
//   icon: React.ElementType
//   name: string
//   amount: number
//   goal: number
// }

// const initialExpenseCategories: ExpenseCategory[] = [
//   { icon: Home, name: 'Housing', amount: 500, goal: 1000 },
//   { icon: Utensils, name: 'Food', amount: 250, goal: 500 },
//   { icon: Plane, name: 'Travel', amount: 250, goal: 2000 },
//   { icon: Film, name: 'Entertainment', amount: 250, goal: 300 },
//   { icon: ShoppingBag, name: 'Shopping', amount: 250, goal: 400 },
//   { icon: Package, name: 'Others', amount: 250, goal: 500 },
// ]

// interface AddAmountModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onAddAmount: (amount: number) => void
//   categoryName: string
// }

// function AddAmountModal({ isOpen, onClose, onAddAmount, categoryName }: AddAmountModalProps) {
//   const [amount, setAmount] = useState('')

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     const numAmount = parseFloat(amount)
//     if (!isNaN(numAmount) && numAmount > 0) {
//       onAddAmount(numAmount)
//       setAmount('')
//       onClose()
//     }
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Add Amount to {categoryName}</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label htmlFor="amount">Amount ($)</Label>
//             <Input
//               id="amount"
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               placeholder="Enter amount"
//               min="0.01"
//               step="0.01"
//               required
//             />
//           </div>
//           <div className="flex justify-end space-x-2">
//             <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
//             <Button type="submit">Add Amount</Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default function ExpenseGoals() {
//   const [categories, setCategories] = useState(initialExpenseCategories)
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

//   const handleAddAmount = (categoryName: string) => {
//     setSelectedCategory(categoryName)
//     setIsModalOpen(true)
//   }

//   const handleAddAmountSubmit = (amount: number) => {
//     if (selectedCategory) {
//       setCategories(prevCategories =>
//         prevCategories.map(category =>
//           category.name === selectedCategory
//             ? { ...category, amount: Math.min(category.amount + amount, category.goal) }
//             : category
//         )
//       )
//     }
//   }

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4 text-gray-700">Expense Goals by Category</h2>
//       <div className="grid grid-cols-3 gap-6">
//         {categories.map((category, index) => (
//           <Card key={index}>
//             <CardContent className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <div className="flex items-center">
//                   <category.icon className="mr-4 text-gray-500" size={24} />
//                   <div>
//                     <p className="font-semibold">{category.name}</p>
//                     <p className="text-sm text-gray-500">${category.amount.toFixed(2)} / ${category.goal.toFixed(2)}</p>
//                   </div>
//                 </div>
//                 <Button 
//                   variant="outline" 
//                   className="text-teal-600 border-teal-600 hover:bg-teal-50"
//                   onClick={() => handleAddAmount(category.name)}
//                 >
//                   Add $
//                 </Button>
//               </div>
//               <Progress value={(category.amount / category.goal) * 100} className="h-2" />
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//       <AddAmountModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onAddAmount={handleAddAmountSubmit}
//         categoryName={selectedCategory || ''}
//       />
//     </div>
//   )
// }

// "use client";
// import React, { useState } from 'react';
// import { Card, CardContent } from './ui/card';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { Label } from './ui/label';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
// import { Home, Utensils, Plane, Film, ShoppingBag, Package } from 'lucide-react';
// import { Progress } from './ui/progress';

// interface ExpenseCategory {
//   icon: React.ElementType;
//   name: string;
//   amount: number;
//   goal: number;
// }

// const initialExpenseCategories: ExpenseCategory[] = [
//   { icon: Home, name: 'Housing', amount: 500, goal: 1000 },
//   { icon: Utensils, name: 'Food', amount: 250, goal: 500 },
//   { icon: Plane, name: 'Travel', amount: 250, goal: 2000 },
//   { icon: Film, name: 'Entertainment', amount: 250, goal: 300 },
//   { icon: ShoppingBag, name: 'Shopping', amount: 250, goal: 400 },
//   { icon: Package, name: 'Others', amount: 250, goal: 500 },
// ];

// interface AddAmountModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddAmount: (amount: number) => void;
//   categoryName: string;
// }

// function AddAmountModal({ isOpen, onClose, onAddAmount, categoryName }: AddAmountModalProps) {
//   const [amount, setAmount] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const numAmount = parseFloat(amount);
//     if (!isNaN(numAmount) && numAmount > 0) {
//       onAddAmount(numAmount);
//       setAmount('');
//       onClose();
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Add Amount to {categoryName}</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label htmlFor="amount">Amount ($)</Label>
//             <Input
//               id="amount"
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               placeholder="Enter amount"
//               min="0.01"
//               step="0.01"
//               required
//             />
//           </div>
//           <div className="flex justify-end space-x-2">
//             <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
//             <Button type="submit">Add Amount</Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

// interface ExpenseGoalsProps {
//   expenses: { name: string; amount: number; goal: number }[];
//   onUpdateExpense: (categoryName: string, amount: number) => void;
// }

// export default function ExpenseGoals({ expenses, onUpdateExpense }: ExpenseGoalsProps) {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

//   const handleAddAmount = (categoryName: string) => {
//     setSelectedCategory(categoryName);
//     setIsModalOpen(true);
//   };

//   const handleAddAmountSubmit = (amount: number) => {
//     if (selectedCategory) {
//       const expense = expenses.find(exp => exp.name === selectedCategory);
//       if (expense) {
//         onUpdateExpense(selectedCategory, Math.min(expense.amount + amount, expense.goal));
//       }
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4 text-gray-700">Expense Goals by Category</h2>
//       <div className="grid grid-cols-3 gap-6">
//         {expenses.map((expense, index) => (
//           <Card key={index}>
//             <CardContent className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <div className="flex items-center">
//                   <div>
//                     <p className="font-semibold">{expense.name}</p>
//                     <p className="text-sm text-gray-500">${expense.amount.toFixed(2)} / ${expense.goal.toFixed(2)}</p>
//                   </div>
//                 </div>
//                 <Button
//                   variant="outline"
//                   className="text-teal-600 border-teal-600 hover:bg-teal-50"
//                   onClick={() => handleAddAmount(expense.name)}
//                 >
//                   Add $
//                 </Button>
//               </div>
//               <Progress value={(expense.amount / expense.goal) * 100} className="h-2" />
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//       <AddAmountModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onAddAmount={handleAddAmountSubmit}
//         categoryName={selectedCategory || ''}
//       />
//     </div>
//   );
// }

// "use client";
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Card, CardContent } from './ui/card';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { Label } from './ui/label';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
// import { Home, Utensils, Plane, Film, ShoppingBag, Package } from 'lucide-react';
// import { Progress } from './ui/progress';

// // Interface for goals fetched from the server
// interface ExpenseCategory {
//   icon: React.ElementType;
//   name: string;
//   amount: number;
//   goal: number;
// }

// interface AddAmountModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onAddAmount: (amount: number) => void;
//   categoryName: string;
// }

// function AddAmountModal({ isOpen, onClose, onAddAmount, categoryName }: AddAmountModalProps) {
//   const [amount, setAmount] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const numAmount = parseFloat(amount);
//     if (!isNaN(numAmount) && numAmount > 0) {
//       onAddAmount(numAmount);
//       setAmount('');
//       onClose();
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Add Amount to {categoryName}</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label htmlFor="amount">Amount ($)</Label>
//             <Input
//               id="amount"
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               placeholder="Enter amount"
//               min="0.01"
//               step="0.01"
//               required
//             />
//           </div>
//           <div className="flex justify-end space-x-2">
//             <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
//             <Button type="submit">Add Amount</Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

// interface ExpenseGoalsProps {
//   onUpdateExpense: (categoryName: string, amount: number) => void;
// }

// export default function ExpenseGoals({ onUpdateExpense }: ExpenseGoalsProps) {
//   const [goals, setGoals] = useState<ExpenseCategory[]>([]);
//   const [isFetching, setFetching] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

//   // Fetch goals from the server
//   useEffect(() => {
//     const fetchGoals = async () => {
//       const userId = localStorage.getItem('userId');
//       try {
//         const response = await axios.get('http://localhost:8000/api/goals', {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`,
//           },
//           params: { userId: userId },
//         });
//         setGoals(response.data.categories); // Assuming the API returns a "categories" array
//       } catch (error) {
//         console.error('Error fetching goals:', error);
//       } finally {
//         setFetching(false);
//       }
//     };

//     fetchGoals();
//   }, []);

//   const handleAddAmount = (categoryName: string) => {
//     setSelectedCategory(categoryName);
//     setIsModalOpen(true);
//   };

//   const handleAddAmountSubmit = (amount: number) => {
//     if (selectedCategory) {
//       const expense = goals.find(exp => exp.name === selectedCategory);
//       if (expense) {
//         onUpdateExpense(selectedCategory, Math.min(expense.amount + amount, expense.goal));
//       }
//     }
//   };

//   if (isFetching) {
//     return <p>Loading...</p>; // Show a loading state while fetching
//   }

//   if (goals.length === 0) {
//     return <p>No goals to display.</p>; // Display a message when there are no goals
//   }

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-4 text-gray-700">Expense Goals by Category</h2>
//       <div className="grid grid-cols-3 gap-6">
//         {goals.map((expense, index) => (
//           <Card key={index}>
//             <CardContent className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <div className="flex items-center">
//                   <div>
//                     <p className="font-semibold">{expense.name}</p>
//                     <p className="text-sm text-gray-500">${expense.amount.toFixed(2)} / ${expense.goal.toFixed(2)}</p>
//                   </div>
//                 </div>
//                 <Button
//                   variant="outline"
//                   className="text-teal-600 border-teal-600 hover:bg-teal-50"
//                   onClick={() => handleAddAmount(expense.name)}
//                 >
//                   Add $
//                 </Button>
//               </div>
//               <Progress value={(expense.amount / expense.goal) * 100} className="h-2" />
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//       <AddAmountModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onAddAmount={handleAddAmountSubmit}
//         categoryName={selectedCategory || ''}
//       />
//     </div>
//   );
// }

"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Home, Utensils, Plane, Film, ShoppingBag, Package } from "lucide-react";
import { Progress } from "./ui/progress";

// Interface for expense categories
interface ExpenseCategory {
  icon: React.ElementType;
  name: string;
  amount: number;
  goal: number;
}

interface AddAmountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAmount: (amount: number) => void;
  categoryName: string;
}

function AddAmountModal({
  isOpen,
  onClose,
  onAddAmount,
  categoryName,
}: AddAmountModalProps) {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      onAddAmount(numAmount);
      setAmount("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Amount to {categoryName}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              min="0.01"
              step="0.01"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Amount</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

interface ExpenseGoalsProps {
  expenses: ExpenseCategory[];
  onUpdateExpense: (categoryName: string, amount: number) => void;
}

export default function ExpenseGoals() {
  const [goals, setGoals] = useState<ExpenseCategory[]>([]);
  const [isFetching, setFetching] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Function to fetch goals from the backend
  const fetchGoals = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.get(`http://localhost:8000/api/goals`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          userId: userId,
        },
      });
      setGoals(response.data.categories); // Set the categories array
    } catch (error) {
      console.error("Error fetching goals:", error);
    } finally {
      setFetching(false);
    }
  };

  // Fetch goals when the component mounts
  useEffect(() => {
    fetchGoals();
  }, []);

  // Function to handle adding amount to a category
  const handleAddAmountSubmit = async (amount: number) => {
    if (selectedCategory) {
      try {
        const userId = localStorage.getItem("userId");
        await axios.post(
          `http://localhost:8000/api/goals/${selectedCategory}`,
          { amount },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            params: {
              userId: userId,
            },
          }
        );
        // Fetch updated goals after the amount is added
        fetchGoals();
      } catch (error) {
        console.error("Error updating goal amount:", error);
      } finally {
        setIsModalOpen(false); // Close the modal
      }
    }
  };

  // If data is still fetching, show a loading message
  if (isFetching) {
    return <p>Loading...</p>;
  }

  // If no goals are available, show a message
  if (goals.length === 0) {
    return <p>No goals to display.</p>;
  }

  // Function to open the modal for adding amount
  const handleAddAmount = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        Expense Goals by Category
      </h2>
      <div className="grid grid-cols-3 gap-6">
        {goals.map((expense, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div>
                    <p className="font-semibold">{expense.name}</p>
                    <p className="text-sm text-gray-500">
                      ${expense.amount.toFixed(2)} / ${expense.goal.toFixed(2)}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="text-teal-600 border-teal-600 hover:bg-teal-50"
                  onClick={() => handleAddAmount(expense.name)}
                >
                  Add $
                </Button>
              </div>
              <Progress
                value={(expense.amount / expense.goal) * 100}
                className="h-2"
              />
            </CardContent>
          </Card>
        ))}
      </div>
      <AddAmountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddAmount={handleAddAmountSubmit}
        categoryName={selectedCategory || ""}
      />
    </div>
  );
}
