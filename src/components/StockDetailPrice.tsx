
import { Badge } from "@/components/ui/badge";

interface StockDetailPriceProps {
  price: number;
  change: number;
  changePercent: number;
}

export const StockDetailPrice = ({ price, change, changePercent }: StockDetailPriceProps) => {
  const isPositive = change >= 0;
  
  return (
    <div className="p-6 bg-gray-50">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold">
            ${price.toFixed(2)}
          </div>
          <div className={`flex items-center space-x-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <span className="text-lg font-medium">
              {isPositive ? '+' : ''}${change.toFixed(2)}
            </span>
            <span className="text-lg">
              ({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          Live Data
        </Badge>
      </div>
    </div>
  );
};
