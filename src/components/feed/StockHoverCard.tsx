
import React from 'react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface StockHoverCardProps {
  symbol: string;
  onStockClick: (symbol: string) => void;
  children: React.ReactNode;
}

const StockHoverCard = ({ symbol, onStockClick, children }: StockHoverCardProps) => {
  const getStockSynopsis = (symbol: string) => {
    const stockData: { [key: string]: any } = {
      'AAPL': {
        name: 'Apple Inc.',
        price: '$189.50',
        change: '+2.35 (1.26%)',
        description: 'Technology company that designs and manufactures consumer electronics, software, and online services.'
      },
      'TSLA': {
        name: 'Tesla Inc.',
        price: '$248.50',
        change: '+8.90 (3.71%)',
        description: 'Electric vehicle and clean energy company founded by Elon Musk.'
      },
      'NVDA': {
        name: 'NVIDIA Corporation',
        price: '$456.78',
        change: '+12.34 (2.78%)',
        description: 'Multinational technology corporation that designs graphics processing units (GPUs).'
      },
      'MSFT': {
        name: 'Microsoft Corporation',
        price: '$342.56',
        change: '+5.67 (1.68%)',
        description: 'Multinational technology corporation producing computer software, consumer electronics, and personal computers.'
      }
    };
    
    return stockData[symbol] || {
      name: `${symbol} Inc.`,
      price: '$100.00',
      change: '+0.00 (0.00%)',
      description: 'Stock information not available'
    };
  };

  const synopsis = getStockSynopsis(symbol);

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span
          onClick={() => onStockClick(symbol)}
          className="text-blue-600 font-semibold cursor-pointer hover:text-blue-800 hover:underline transition-colors"
          title={`Click to view ${symbol} details`}
        >
          {children}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-sm font-semibold">{synopsis.name}</h4>
              <p className="text-xs text-muted-foreground">${symbol}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{synopsis.price}</p>
              <p className={`text-xs ${synopsis.change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                {synopsis.change}
              </p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {synopsis.description}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default StockHoverCard;
