import React from 'react'
import Sidebar from '../../components/Sidebar'
import Insights from '../../components/Insights'

export default function WealthWise() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-8">
        <Insights />
      </main>
    </div>
  )
}