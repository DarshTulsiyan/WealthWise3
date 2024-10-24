// import React, { useState } from 'react';
// import { Button } from '../components/ui/button';

// export default function AddGoalModal({ isOpen, onClose, onSave }) {
//   const [goal, setGoal] = useState('');
//   const [amount, setAmount] = useState('');

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-xl font-semibold mb-4">Add New Goal</h2>

//         <form>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Goal
//             </label>
//             <input
//               type="text"
//               value={goal}
//               onChange={(e) => setGoal(e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg text-gray-700"
//               placeholder="Enter your goal"
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Amount
//             </label>
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="w-full px-3 py-2 border rounded-lg text-gray-700"
//               placeholder="Enter the amount"
//             />
//           </div>

//           <div className="flex justify-end space-x-4">
//             <Button variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button
//               variant="primary"
//               onClick={() => {
//                 onSave(goal, amount);
//                 onClose();
//               }}
//             >
//               Save
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { Button } from './ui/button';
import { saveGoal } from '../../api'; // Import your API call

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (goal: string, amount: number) => Promise<void>;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ isOpen, onClose, onSave }) => {
  const [goal, setGoal] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (goal && amount) {
      const newGoal = {
        goal, // Name of the goal
        amount: parseFloat(amount), // Parse amount to a float
      };
      await onSave(newGoal); // Save the new goal
      setGoal(''); // Clear the form
      setAmount('');
      onClose(); // Close the modal
    }
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Goal</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Goal</label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700"
              placeholder="Enter your goal"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-gray-700"
              placeholder="Enter the amount"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;
