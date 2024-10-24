"use client"

import React, { useEffect, useState } from 'react';
import { BarChart2, PieChart, Target, FileText, TrendingUp, Calendar, User, LogOut } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';

const menuItems = [
  { icon: BarChart2, label: 'Overview', path: '/dashboard' },
  { icon: PieChart, label: 'Expense', path: '/expense' },
  { icon: Target, label: 'Goals', path: '/goals' },
  { icon: FileText, label: 'Bills', path: '/bills' },
  { icon: TrendingUp, label: 'Insights', path: '/news' },
];

export default function Sidebar() {
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const name = localStorage.getItem('name'); 
  
        // const response = await axios.get('http://localhost:8000/api/user', {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // });
  
        setUser(name);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []);
  

  
  return (
    <div className="min-h-screen w-64 bg-gray-900 text-white p-4 flex flex-col">
      {/* Logo/Brand */}
      <div className="mb-8">
        <h1 className="text-xl font-bold">WealthWise</h1>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <a 
                  href={item.path}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile & Logout Section */}
      <div className="border-t border-gray-800 pt-4 mt-4">
        <div className="flex items-center gap-3 px-4 py-2 mb-2">
          <User size={20} />
          <div>
            {user ? (
              <p className="text-sm">{user}</p>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
        <button className="flex items-center gap-3 px-4 py-2 w-full rounded-lg hover:bg-gray-800 transition-colors text-red-400">
          <LogOut size={20} />
          <Link href="/"><span>Logout</span></Link>
        </button>
      </div>
    </div>
  );
}