
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Users, DollarSign } from "lucide-react";

interface StockDetailCopyTradeProps {
  symbol: string;
  originalPost: {
    sender: string;
    amount: string;
    timestamp: string;
  };
}

export const StockDetailCopyTrade = ({ symbol, originalPost }: StockDetailCopyTradeProps) => {
  const [copyAmount, setCopyAmount] = useState('10');

  return (
    <div className="p-6 border-t">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Users className="w-5 h-5 mr-2 text-blue-600" />
        Copy Trade
      </h3>
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <p className="text-sm text-gray-600 mb-2">
          <strong>{originalPost.sender}</strong> invested <strong>{originalPost.amount}</strong> in {symbol}
        </p>
        <p className="text-xs text-gray-500">{originalPost.timestamp}</p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-end space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex-1 w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Investment Amount
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              value={copyAmount}
              onChange={(e) => setCopyAmount(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              placeholder="10"
            />
          </div>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 whitespace-nowrap">
          Send ${copyAmount} for {symbol}
        </Button>
      </div>
    </div>
  );
};
