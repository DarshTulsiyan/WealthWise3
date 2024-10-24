"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Checkbox } from './ui/checkbox'
import { AddBillModal } from './AddBillsModal'

interface Bill {
  dueDate: { month: string; day: number }
  description: string
  lastCharge: string
  amount: number
  paid: boolean
}

const initialBills: Bill[] = [
  { dueDate: { month: 'NOV', day: 19 }, description: 'Jio sim - Yearly Plan', lastCharge: '20th Nov 2023', amount: 19.99, paid: true },
  { dueDate: { month: 'SEP', day: 12 }, description: 'Spotify family - Yearly Plan', lastCharge: '13th Sep 2023', amount: 14.99, paid: false },
  { dueDate: { month: 'AUG', day: 31 }, description: 'Netflix UHD - Monthly Plan', lastCharge: '1st Sep 2024', amount: 5.99, paid: false },
]

export default function UpcomingBills() {
  const [bills, setBills] = useState<Bill[]>(initialBills)

  const addBill = (newBill: Bill) => {
    setBills([...bills, newBill])
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
        <CardTitle className="text-2xl font-semibold text-gray-700">Upcoming Bills</CardTitle>
        <AddBillModal onAddBill={addBill} />
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[100px] text-gray-600">Due Date</TableHead>
              <TableHead className="text-gray-600">Description</TableHead>
              <TableHead className="text-gray-600">Last Charge</TableHead>
              <TableHead className="text-right text-gray-600">Amount</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bills.map((bill, index) => (
              <TableRow key={index} className="border-b last:border-b-0">
                <TableCell className="py-4">
                  <div className="bg-gray-200 w-14 h-14 rounded-md flex flex-col items-center justify-center">
                    <span className="text-xs font-semibold text-gray-600">{bill.dueDate.month}</span>
                    <span className="text-lg font-bold text-gray-800">{bill.dueDate.day}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">{bill.description}</TableCell>
                <TableCell className="text-gray-600">{bill.lastCharge}</TableCell>
                <TableCell className="text-right font-semibold">${bill.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Checkbox checked={bill.paid} className="border-2 border-teal-500 data-[state=checked]:bg-teal-500 data-[state=checked]:text-white" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}