
import { X, TrendingUp } from "lucide-react";

interface StockDetailHeaderProps {
  symbol: string;
  stockName: string;
  onClose: () => void;
}

export const StockDetailHeader = ({ symbol, stockName, onClose }: StockDetailHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-6 border-b">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{stockName}</h2>
          <p className="text-gray-600">{symbol}</p>
        </div>
      </div>
      <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};
