"use client"
import React, {useEffect} from "react";
import Sidebar from "../../components/Sidebar";
import WeeklySumup from "../../components/WeeklySumup";
import RecentExpenses from "../../components/RecentExpenses";
import UpcomingBills from "../../components/UpcomingBills";



export default function Component() {
  useEffect(() => {
    // Parse the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const userId = urlParams.get('userId');
    const name = urlParams.get('name');

    // Save to local storage
    if (token && userId && name) {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('name', name);
    }

    // Optional: Redirect to a different part of the app if necessary
    // For example, if you want to stay on the dashboard, you can leave this out
    // window.location.href = '/dashboard';  // Uncomment if needed
  }, []);
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-6">Weekly Sumup</h1>
        <div className="grid gap-6">
          <div className="lg:col-span-2">
            <WeeklySumup />
            <div className="grid grid-cols-2 gap-6">
                <RecentExpenses />
                <UpcomingBills />
            </div>
            
          </div>
          <div>
            
          </div>
        </div>
      </main>
    </div>
  );
}
