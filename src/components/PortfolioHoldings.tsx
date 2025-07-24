import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, TrendingUp, TrendingDown } from "lucide-react";
import { StockDetailModal } from './StockDetailModal';

interface PortfolioHoldingsProps {
  currentHoldings: any[]; // Make sure currentHoldings is an array of holdings
  onStockClick: (symbol: string) => void;
  selectedStock: string | null;
  isStockModalOpen: boolean;
  onCloseStockModal: () => void;
  onSellStock: (symbol: string) => void;
}

const PortfolioHoldings = ({ 
  currentHoldings, 
  onStockClick, 
  selectedStock, 
  isStockModalOpen, 
  onCloseStockModal,
  onSellStock 
}: PortfolioHoldingsProps) => {
  const [isHoldingsOpen, setIsHoldingsOpen] = useState(true);
  const [openLots, setOpenLots] = useState<{ [key: string]: boolean }>({});

  // Debugging log to see currentHoldings content
  console.log("Current Holdings: ", currentHoldings);

  const toggleLots = (symbol: string) => {
    setOpenLots(prev => ({
      ...prev,
      [symbol]: !prev[symbol]
    }));
  };

  return (
    <>
      <Collapsible open={isHoldingsOpen} onOpenChange={setIsHoldingsOpen}>
        <Card className="shadow-lg border-[#4DA8DA]/20">
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#002E5D] flex items-center space-x-2">
                  <span>Portfolio Holdings - Returns</span>
                </CardTitle>
                {isHoldingsOpen ? (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>
              <div className="space-y-2">
                {currentHoldings.length > 0 ? (
                  currentHoldings.map((holding, index) => (
                    <div key={index} className="border rounded-lg overflow-hidden">
                      <div className="flex items-center justify-between p-4 bg-gray-50 hover:bg-[#A6E1FA]/10 transition-all duration-300">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-12 h-12 bg-[#4DA8DA] rounded-full flex items-center justify-center cursor-pointer"
                            onClick={() => onStockClick(holding.symbol)}
                          >
                            <span className="text-white font-bold text-sm">{holding.symbol.slice(0, 2)}</span>
                          </div>
                          <div>
                            <p 
                              className="font-semibold text-[#002E5D] cursor-pointer hover:underline"
                              onClick={() => onStockClick(holding.symbol)}
                            >
                              {holding.symbol}
                            </p>
                            <p className="text-sm text-gray-600">{holding.name}</p>
                            <p className="text-xs text-gray-500">{holding.totalShares} shares</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-semibold text-[#002E5D]">{holding.totalValue}</p>
                            <p className={`text-sm font-medium ${holding.totalReturnColor}`}>
                              {holding.totalReturnColor.includes('green') ? (
                                <TrendingUp className="w-3 h-3 inline mr-1" />
                              ) : (
                                <TrendingDown className="w-3 h-3 inline mr-1" />
                              )}
                              {holding.totalReturn}
                            </p>
                          </div>
                          <div className="flex flex-col space-y-1">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleLots(holding.symbol)}
                              className="text-xs"
                            >
                              {openLots[holding.symbol] ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => onSellStock(holding.symbol)}
                              className="text-xs"
                            >
                              Sell
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <Collapsible open={openLots[holding.symbol]} onOpenChange={() => toggleLots(holding.symbol)}>
                        <CollapsibleContent className="bg-white border-t">
                          <div className="p-4">
                            <h4 className="font-medium text-[#002E5D] mb-3">Cost Basis by Lot</h4>
                            <div className="space-y-2">
                              {holding.lots.map((lot: any, lotIndex: number) => (
                                <div key={lotIndex} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                                  <div>
                                    <p className="text-sm font-medium">{lot.shares} shares</p>
                                    <p className="text-xs text-gray-600">Purchased {lot.date}</p>
                                    <p className="text-xs text-gray-500">Cost Basis: {lot.costBasis}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm font-medium">{lot.currentValue}</p>
                                    <p className={`text-xs ${lot.returnColor}`}>{lot.return}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  ))
                ) : (
                  <p>No holdings available</p>
                )}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      <StockDetailModal
        symbol={selectedStock || ''}
        isOpen={isStockModalOpen}
        onClose={onCloseStockModal}
      />
    </>
  );
};

export default PortfolioHoldings;
