import React from 'react'
import { Card, CardContent } from './ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const data = {
  labels: ['May 01', 'May 05', 'May 10', 'May 15', 'May 20', 'May 25', 'May 30'],
  datasets: [
    {
      label: 'This month',
      data: [1000, 2000, 1500, 3000, 2000, 3000, 2500],
      borderColor: 'rgb(20, 184, 166)',
      backgroundColor: 'rgba(20, 184, 166, 0.5)',
      fill: true,
    },
    {
      label: 'Same period last month',
      data: [500, 1500, 1000, 2000, 1500, 2500, 2000],
      borderColor: 'rgb(209, 213, 219)',
      backgroundColor: 'rgba(209, 213, 219, 0.5)',
      fill: true,
    },
  ],
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value: any) {
          return '$' + value
        }
      }
    }
  }
}

export default function SavingSummary() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Saving Summary</h2>
          <Select defaultValue="mar2022">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mar2022">Mar 2022</SelectItem>
              <SelectItem value="apr2022">Apr 2022</SelectItem>
              <SelectItem value="may2022">May 2022</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Line options={options} data={data} />
      </CardContent>
    </Card>
  )
}