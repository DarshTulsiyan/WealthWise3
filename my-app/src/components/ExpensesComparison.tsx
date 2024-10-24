"use client"
import React, { useEffect, useRef } from 'react'
import { Card, CardContent } from './ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import Chart from 'chart.js/auto'

const data = [
  { month: 'Jan', thisYear: 230, lastYear: 210 },
  { month: 'Feb', thisYear: 180, lastYear: 170 },
  { month: 'Mar', thisYear: 100, lastYear: 160 },
  { month: 'Apr', thisYear: 220, lastYear: 180 },
  { month: 'May', thisYear: 200, lastYear: 190 },
  { month: 'Jun', thisYear: 110, lastYear: 170 },
  { month: 'Jul', thisYear: 190, lastYear: 160 },
  { month: 'Aug', thisYear: 230, lastYear: 180 },
  { month: 'Sep', thisYear: 200, lastYear: 160 },
  { month: 'Oct', thisYear: 210, lastYear: 170 },
  { month: 'Nov', thisYear: 100, lastYear: 160 },
  { month: 'Dec', thisYear: 190, lastYear: 180 },
]

export default function ExpensesComparison() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d')
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy()
        }
        chartInstance.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.map(d => d.month),
            datasets: [
              {
                label: 'This Year',
                data: data.map(d => d.thisYear),
                backgroundColor: '#14B8A6',
                barPercentage: 0.5,
                categoryPercentage: 0.8,
              },
              {
                label: 'Last Year',
                data: data.map(d => d.lastYear),
                backgroundColor: '#D1D5DB',
                barPercentage: 0.5,
                categoryPercentage: 0.8,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  callback: function(value) {
                    return '$' + value + 'k'
                  },
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          },
        })
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <Select defaultValue="monthly">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select comparison" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly Comparison</SelectItem>
              <SelectItem value="yearly">Yearly Comparison</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-teal-500 rounded-full mr-2"></div>
              <span className="text-sm">This Year</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
              <span className="text-sm">Last Year</span>
            </div>
          </div>
        </div>
        <div className="h-[300px]">
          <canvas ref={chartRef}></canvas>
        </div>
      </CardContent>
    </Card>
  )
}