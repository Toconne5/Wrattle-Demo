
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Heart, Users } from "lucide-react";

interface StockDetailActionsProps {
  symbol: string;
  onNavigateToSendInvest?: () => void;
}

export const StockDetailActions = ({ symbol, onNavigateToSendInvest }: StockDetailActionsProps) => {
  const [showInvestModal, setShowInvestModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('');
  const [investAmount, setInvestAmount] = useState('100');
  const [showWatchlistSuccess, setShowWatchlistSuccess] = useState(false);

  const handleInvestNow = () => {
    setShowInvestModal(true);
  };

  const handleConfirmInvestment = () => {
    console.log(`Investing $${investAmount} in ${symbol} to ${selectedAccount} account`);
    setShowInvestModal(false);
    // Here you would implement the actual investment logic
  };

  const handleAddToWatchlist = () => {
    console.log(`Added ${symbol} to watchlist`);
    setShowWatchlistSuccess(true);
    setTimeout(() => setShowWatchlistSuccess(false), 2000);
    // Here you would implement watchlist storage logic
  };

  const handleSendToFriend = () => {
    console.log(`Navigating to Send & Invest tab with ${symbol}`);
    if (onNavigateToSendInvest) {
      onNavigateToSendInvest();
    } else {
      console.error('onNavigateToSendInvest callback not provided');
    }
  };

  return (
    <>
      <div className="p-6 border-t bg-gray-50">
        {/* Investment Amount Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Investment Amount
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              value={investAmount}
              onChange={(e) => setInvestAmount(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              placeholder="100"
            />
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <Button onClick={handleInvestNow} className="bg-green-600 hover:bg-green-700 text-white">
            <DollarSign className="w-4 h-4 mr-2" />
            Invest Now
          </Button>
          <Button 
            onClick={handleAddToWatchlist}
            variant="outline" 
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <Heart className="w-4 h-4 mr-2" />
            {showWatchlistSuccess ? 'Added to Watchlist!' : 'Add to Watchlist'}
          </Button>
        </div>
        
        {/* Send to Friend Button */}
        <Button 
          onClick={handleSendToFriend}
          variant="outline" 
          className="w-full border-purple-600 text-purple-600 hover:bg-purple-50"
        >
          <Users className="w-4 h-4 mr-2" />
          Send to Friend
        </Button>
      </div>

      {/* Investment Confirmation Modal */}
      <Dialog open={showInvestModal} onOpenChange={setShowInvestModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Investment</DialogTitle>
            <DialogDescription>
              Are you sure you wish to invest ${investAmount} into your account?
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Account Type
              </label>
              <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose account type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="personal">Personal Brokerage</SelectItem>
                  <SelectItem value="utma">UTMA Custodial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowInvestModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmInvestment}
                disabled={!selectedAccount}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Accept
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
