import React from 'react'
import FeatureSection from '../../components/FeatureSection'
import SignUpSection from '../../components/SignUpSection'

export default function WealthWise() {
  return (
    <div className="flex min-h-screen">
      <div className="flex-1 bg-white p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">WealthWise</h1>
          <p className="text-xl">Your path to financial freedom starts here!</p>
        </header>
        <FeatureSection />
      </div>
      <div className="w-1/3 bg-gray-800 p-8">
        <SignUpSection />
      </div>
    </div>
  )
}