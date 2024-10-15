"use client";

import { sessionCreated } from '@/app/api/events/session-created';
import useAdminPrepareShortGame from '@/hooks/router/useAdminPrepareShortGame';
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { X } from 'lucide-react';
import { useState } from 'react';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInviteSuccess: (response: any) => void; // Callback to pass the result
}

const InviteModal: React.FC<InviteModalProps> = ({ isOpen, onClose, onInviteSuccess }) => {
  const [addr2, setAddr2] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Use the useWallet hook at the top level of the component
  const { account } = useWallet();

  const prepareShortGame = useAdminPrepareShortGame(account?.address || '', addr2);

  const handleSubmit = async () => {
    if (!addr2 || !addr2.startsWith('0x')) {
      console.error('Invalid address');
      return;
    }

    setIsLoading(true);

    if (!account) {
      console.error('No connected account found');
      setIsLoading(false);
      return;
    }

    try {
      const result = await prepareShortGame();
      console.log('Game prepared:', result);

      const aptos = new Aptos(new AptosConfig({ network: Network.TESTNET }));
      const events = await sessionCreated(aptos);
      const event = events[events.length - 1].data;
      console.log('Event:', event);
      onInviteSuccess(event);
    } catch (error) {
      console.error('Error preparing short game:', error);
    } finally {
      setIsLoading(false);
      onClose();
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
          <label htmlFor="addr2" className="block text-sm font-medium">
            Opponent wallet address
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
