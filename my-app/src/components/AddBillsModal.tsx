// import React, { useState } from 'react'
// import { Button } from './ui/button'
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
// import { Input } from './ui/input'
// import { Label } from './ui/label'
// import { Checkbox } from './ui/checkbox'

// interface Bill {
//   dueDate: { month: string; day: number }
//   description: string
//   lastCharge: string
//   amount: number
//   paid: boolean
// }

// interface AddBillModalProps {
//   onAddBill: (bill: Bill) => void
// }

// export function AddBillModal({ onAddBill }: AddBillModalProps) {
//   const [isOpen, setIsOpen] = useState(false)
//   const [newBill, setNewBill] = useState<Partial<Bill>>({
//     dueDate: { month: '', day: 1 },
//     description: '',
//     lastCharge: '',
//     amount: 0,
//     paid: false,
//   })

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     onAddBill(newBill as Bill)
//     setIsOpen(false)
//     setNewBill({
//       dueDate: { month: '', day: 1 },
//       description: '',
//       lastCharge: '',
//       amount: 0,
//       paid: false,
//     })
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//         <Button variant="outline" className="text-teal-600 border-teal-600 hover:bg-teal-50">+ ADD BILLS</Button>
//       </DialogTrigger>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Add New Bill</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <Label htmlFor="month">Month</Label>
//               <Input
//                 id="month"
//                 value={newBill.dueDate?.month}
//                 onChange={(e) => setNewBill({ ...newBill, dueDate: { ...newBill.dueDate, month: e.target.value.toUpperCase() } })}
//                 maxLength={3}
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="day">Day</Label>
//               <Input
//                 id="day"
//                 type="number"
//                 value={newBill.dueDate?.day}
//                 onChange={(e) => setNewBill({ ...newBill, dueDate: { ...newBill.dueDate, day: parseInt(e.target.value) } })}
//                 min={1}
//                 max={31}
//                 required
//               />
//             </div>
//           </div>
//           <div>
//             <Label htmlFor="description">Description</Label>
//             <Input
//               id="description"
//               value={newBill.description}
//               onChange={(e) => setNewBill({ ...newBill, description: e.target.value })}
//               required
//             />
//           </div>
//           <div>
//             <Label htmlFor="lastCharge">Last Charge</Label>
//             <Input
//               id="lastCharge"
//               value={newBill.lastCharge}
//               onChange={(e) => setNewBill({ ...newBill, lastCharge: e.target.value })}
//               required
//             />
//           </div>
//           <div>
//             <Label htmlFor="amount">Amount</Label>
//             <Input
//               id="amount"
//               type="number"
//               step="0.01"
//               value={newBill.amount}
//               onChange={(e) => setNewBill({ ...newBill, amount: parseFloat(e.target.value) })}
//               required
//             />
//           </div>
//           <div className="flex items-center space-x-2">
//             <Checkbox
//               id="paid"
//               checked={newBill.paid}
//               onCheckedChange={(checked) => setNewBill({ ...newBill, paid: checked as boolean })}
//             />
//             <Label htmlFor="paid">Paid</Label>
//           </div>
//           <div className="flex justify-end space-x-2">
//             <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
//             <Button type="submit">Add Bill</Button>
//           </div>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

"use client"
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']; // Predefined months

export default function AddBillModal({ isOpen, onClose, onSave }) {
  const [description, setDescription] = useState('');
  const [lastCharge, setLastCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [dueMonth, setDueMonth] = useState(months[0]); // Default to first month
  const [dueDay, setDueDay] = useState(1);
  const [paid, setPaid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBill = {
      dueDate: { month: dueMonth, day: dueDay },
      description,
      lastCharge,
      amount: parseFloat(amount),
      paid,
    };
    onSave(newBill);
    onClose(); // Close the modal after saving
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Bill</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="lastCharge">Last Charge</Label>
            <Input
              id="lastCharge"
              value={lastCharge}
              onChange={(e) => setLastCharge(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <Label htmlFor="dueMonth">Due Month</Label>
            <select
              id="dueMonth"
              className="w-full border border-gray-300 rounded p-2"
              value={dueMonth}
              onChange={(e) => setDueMonth(e.target.value)}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <Label htmlFor="dueDay">Due Day</Label>
            <Input
              id="dueDay"
              type="number"
              value={dueDay}
              onChange={(e) => setDueDay(parseInt(e.target.value))}
              min={1}
              max={31}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Bill</Button>
          </div>
        </form>
      </div>
    </div>
  );
}