'use client';

import React from 'react';
import { FaEnvelope } from 'react-icons/fa';
import Image from 'next/image';

type AccountPanelProps = {
  balance: number;
  leverage: string;
  credit: number;
  className?: string; // Add this line
};

const AccountPanel: React.FC<AccountPanelProps> = ({ balance, leverage, credit, className }) => {
  return (
    <div className={`bg-[#2c3035] rounded-lg shadow-lg overflow-hidden animate-pulse-shadow ${className}`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">Account</h2>
          <div className="flex space-x-2 items-center">
            <FaEnvelope className="text-gray-400 hover:text-white cursor-pointer" />
            <Image src="/us-flag.png" alt="US Flag" width={24} height={16} />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Balance</span>
            <span className="text-green-400 font-semibold">${balance.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Leverage</span>
            <span className="text-white font-semibold">{leverage}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Credit</span>
            <span className="text-green-400 font-semibold">${credit.toFixed(2)}</span>
          </div>
        </div>
        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 transition duration-300">
          Trade Now
        </button>
      </div>
    </div>
  );
};

export default AccountPanel;