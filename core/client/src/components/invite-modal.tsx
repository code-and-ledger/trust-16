"use client";

import { sessionCreated } from '@/app/api/events/session-created';
import useAdminPrepareShortGame from '@/hooks/router/useAdminPrepareShortGame';
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { X } from 'lucide-react';
import { use, useState } from 'react';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInviteSuccess: (response: any) => void; // Callback to pass the result
}

const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose, onInviteSuccess }) => {
  const [addr1, setAddr1] = useState('');
  const [addr2, setAddr2] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  
  const handleSubmit = async () => {
    if (!addr1 || addr1.length < 3 || !addr1.startsWith('0x')) {
      console.error('First wallet address is required and must be valid');
      return;
    }
    
    if (addr2 && (addr2.length < 3 || !addr2.startsWith('0x'))) {
      console.error('Second wallet address is optional but must be valid if provided');
      return;
    }
    
    setIsLoading(true);

    try {
      // Call the retrieved function with the provided addresses
      const PrepareShortGame = useAdminPrepareShortGame(addr1, addr2);
      const response = await PrepareShortGame();
      // console.log('Response from useAdminPrepareShortGame:', response); // Debugging log

      
      const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }));
      const events = await sessionCreated(aptos);
      const event = events[events.length - 1].data; // Get the last event
      console.log('Event:', event);
      onInviteSuccess(event); // Pass the response to the parent component
    } catch (error) {
      console.error('Error submitting wallet addresses:', error);
    } finally {
      setIsLoading(false);
      onClose(); // Close the modal after submission
    }
  };

  if (!isOpen) return null;

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