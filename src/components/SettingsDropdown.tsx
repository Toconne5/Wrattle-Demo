import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  User, 
  Settings, 
  CreditCard, 
  Shield, 
  FileText, 
  HelpCircle, 
  LogOut,
  ChevronDown
} from "lucide-react";
import SettingsModal from './settings/SettingsModal';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

interface SettingsDropdownProps {
  onLogout: () => void;
}

const SettingsDropdown = ({ onLogout }: SettingsDropdownProps) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleMenuItemClick = (action: string) => {
    switch (action) {
      case 'profile':
        setIsSettingsOpen(true);
        break;
      case 'banking':
        setIsSettingsOpen(true);
        break;
      case 'account':
        setIsSettingsOpen(true);
        break;
      case 'transactions':
        navigate('/transactions'); // Navigate to the Transactions page
        break;
      case 'privacy':
        setIsSettingsOpen(true);
        break;
      case 'help':
        window.open('https://help.example.com', '_blank');
        break;
      case 'logout':
        onLogout();
        break;
      default:
        console.log(`${action} clicked`);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#4DA8DA] rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-white border shadow-lg z-50">
          <div className="p-3 border-b">
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-xs text-gray-500">john@example.com</p>
          </div>
          
          <DropdownMenuItem 
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => handleMenuItemClick('profile')}
          >
            <User className="w-4 h-4 mr-2" />
            Profile Settings
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => handleMenuItemClick('banking')}
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Bank Account Info
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => handleMenuItemClick('account')}
          >
            <Settings className="w-4 h-4 mr-2" />
            Account Settings
          </DropdownMenuItem>
          
          {/* Remove the tab-based navigation here */}
          <DropdownMenuItem 
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => handleMenuItemClick('transactions')}
          >
            <FileText className="w-4 h-4 mr-2" />
            Transactions
          </DropdownMenuItem>

          <DropdownMenuItem 
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => handleMenuItemClick('privacy')}
          >
            <Shield className="w-4 h-4 mr-2" />
            Privacy & Security
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => handleMenuItemClick('documents')}
          >
            <FileText className="w-4 h-4 mr-2" />
            Tax Documents
          </DropdownMenuItem>
          
          <DropdownMenuItem 
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => handleMenuItemClick('help')}
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Help Center
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            className="cursor-pointer hover:bg-gray-50 text-red-600 focus:text-red-600"
            onClick={() => handleMenuItemClick('logout')}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
};

export default SettingsDropdown;
