import React from 'react'
import { DollarSign, PiggyBank, FileText, TrendingUp } from 'lucide-react'

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center h-[300px]">
    <div className="text-7xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
)

interface FeatureSectionProps {
  className?: string
}

export default function FeatureSection({ className = '' }: FeatureSectionProps) {
  const features = [
    {
      icon: <DollarSign size={120} />,
      title: "Expense tracking and Budgeting",
      description: "Keep track of your expenses and create budgets"
    },
    {
      icon: <PiggyBank size={120} />,
      title: "Saving Goals Management",
      description: "Set and track your saving goals"
    },
    {
      icon: <FileText size={120} />,
      title: "Bill Tracking",
      description: "Never miss a bill payment again"
    },
    {
      icon: <TrendingUp size={120} />,
      title: "Financial Insights and Reports",
      description: "Get insights into your financial health"
    }
  ]

  return (
    <div className={`grid grid-cols-2 gap-6 ${className}`}>
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  )
}