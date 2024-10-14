"use client"; // Ensures this component runs on the client side

import { X } from 'lucide-react';
import { useState } from 'react';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInviteSuccess: () => void;
}

const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose, onInviteSuccess }) => {
  const [addr1, setAddr1] = useState('');
  const [addr2, setAddr2] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!addr1) {
      console.error('First wallet address is required');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/start-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ addr1, addr2 }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Script executed successfully:', data);
        onInviteSuccess(); // Trigger the success callback
      } else {
        console.error('Error executing script');
      }
    } catch (error) {
      console.error('Error submitting wallet addresses:', error);
    }

    setIsLoading(false);
    onClose(); // Close the modal after submission
  };

  if (!isOpen) return null; // Return nothing if the modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white text-black p-6 rounded-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Invite Friend</h2>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="addr1" className="block text-sm font-medium">
            First Wallet Address
          </label>
          <input
            type="text"
            id="addr1"
            className="border border-gray-300 p-2 rounded w-full mt-1"
            value={addr1}
            onChange={(e) => setAddr1(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="addr2" className="block text-sm font-medium">
            Wallet address (Optional)
          </label>
          <input
            type="text"
            id="addr2"
            className="border border-gray-300 p-2 rounded w-full mt-1"
            value={addr2}
            onChange={(e) => setAddr2(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded hover:bg-black"
            disabled={isLoading}
          >
            {isLoading ? 'Inviting...' : 'Invite'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteModal;
