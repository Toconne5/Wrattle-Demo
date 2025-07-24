import React from 'react';
import { Button } from "@/components/ui/button";
import { User } from '@/types/user'; // Optional: define user type if you want

interface UserHeaderProps {
  name: string;
  avatar: string;
  username: string;
  onSendInvestClick: () => void;
}

const UserHeader = ({ name, avatar, username, onSendInvestClick }: UserHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4 border-b pb-4">
      <div className="flex items-center space-x-4">
        <div className="text-4xl">{avatar}</div>
        <div>
          <h2 className="text-xl font-bold text-[#002E5D]">{name}</h2>
          <p className="text-sm text-gray-500">{username}</p>
        </div>
      </div>
      <Button
        onClick={onSendInvestClick}
        className="bg-[#4DA8DA] hover:bg-[#3c94c4] text-white px-4 py-2 rounded-md text-sm"
      >
        Send & Invest
      </Button>
    </div>
  );
};

export default UserHeader;
