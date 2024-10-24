"use client";

import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import ExpensesComparison from '../../components/ExpensesComparison';
import ExpensesBreakdown from '../../components/ExpensesBreakdown';
import AddExpenseModal from '../../components/AddExpenseModal';
import { Button } from '../../components/ui/button';
import axios from 'axios';

// Function to fetch current expense data
export async function fetchExpenseData(userId) {
  console.log(userId)
  try {
    const response = await axios.get(`http://localhost:8000/api/expenses`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      params: {
        userId: userId,
      },
    });

    return await response.data;
  } catch (error) {
    console.error('Error fetching expense data:', error);
    return null;
  }
}

// Function to update expense data
async function updateExpenseData(updatedExpenseData) {
  const userId = localStorage.getItem('userId');
  console.log(JSON.stringify(updatedExpenseData));

  try {
    const response = await axios.post(`http://localhost:8000/api/expenses`, updatedExpenseData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      params: {
        userId: userId, // Pass userId as a query parameter
      },
    });

    if (response.status === 200) {
      console.log('Expense updated successfully');
    }
  } catch (error) {
    console.error('Error updating expense:', error);
  }
}

export default function WealthWise() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddExpense = () => {
    setIsModalOpen(true);
  };

  const handleSaveExpense = async (newExpense) => {
    const userId = localStorage.getItem('userId');

    // Fetch the current expense data
    const data = await fetchExpenseData(userId);

    if (data) {
      // Find the category and update its total
      let category = data.categories.find(cat => cat.name === newExpense.categoryName);
      if (!category) {
        // If category doesn't exist, create it
        category = { name: newExpense.categoryName, amount: 0, items: [] };
        data.categories.push(category);
      }

      // Add new expense amount to category total
      category.amount += newExpense.amount;

      // Add the new expense to the items array for that category
      category.items.push({
        name: newExpense.name,
        amount: newExpense.amount,
        date: newExpense.date,
      });

      // Send updated data to the backend
      await updateExpenseData({ categories: data.categories });
    }

    setIsModalOpen(false); // Close modal after saving
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Expenses Comparison</h1>
          <div className="space-x-4">
            <Button onClick={handleAddExpense}>+ ADD EXPENSE</Button>
          </div>
        </div>
        <ExpensesComparison />
        <ExpensesBreakdown />

        {/* Modal Component */}
        <AddExpenseModal
          isOpen={isModalOpen} // This controls whether the modal is visible
          onClose={() => setIsModalOpen(false)} // Close the modal when the user cancels
          onSave={handleSaveExpense} // Save expense data
        />
      </main>
    </div>
  );
}
