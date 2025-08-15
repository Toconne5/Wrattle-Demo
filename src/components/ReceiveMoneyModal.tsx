import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Check, X } from "lucide-react";
import { useTransactions } from '../components/TransactionsContext';

interface ReceiveMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  senderName: string;
  amount: number;
  originalStock: string;   // e.g. "AAPL - Apple Inc"
  recipientName: string;
  isKidsAccount?: boolean;

  // optional hints from SendInvestTab
  stockPrice?: number;
  stockSymbol?: string;
  stockName?: string;

  // tell parent what the final choice was so feed/transactions use it
  onAccepted?: (final: { symbol: string; name: string; price: number; amount: number }) => void;
}

const ReceiveMoneyModal = ({
  isOpen,
  onClose,
  senderName,
  amount,
  originalStock,
  recipientName,
  isKidsAccount = false,
  stockPrice,
  stockSymbol,
  stockName,
  onAccepted,
}: ReceiveMoneyModalProps) => {
  const [selectedStock, setSelectedStock] = useState(() => {
    const [symFromLabel] = (originalStock || '').split(' - ');
    return symFromLabel || originalStock || '';
  });
  const [step, setStep] = useState(1);

  const { setHoldings } = useTransactions();

  const alternativeOptions = [
    { symbol: 'AAPL', name: 'Apple Inc.' },
    { symbol: 'MSFT', name: 'Microsoft Corp.' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    { symbol: 'TSLA', name: 'Tesla Inc.' },
    { symbol: 'VTI', name: 'Vanguard Total Stock Market ETF' },
    { symbol: 'SPY', name: 'SPDR S&P 500 ETF' }
  ];

  const nameForSymbol = (sym: string) => {
    if (stockName && stockSymbol && stockSymbol === sym) return stockName;
    const match = alternativeOptions.find(o => o.symbol === sym);
    if (match) return match.name;
    const [, origName] = (originalStock || '').split(' - ');
    if (sym === (originalStock.split(' - ')[0] || '')) return origName || sym;
    return sym;
  };

  const handleAccept = () => {
    setStep(2);

    try {
      // ✅ user’s choice first, then props, then original label
      const symbol = (selectedStock || '').trim()
        || (stockSymbol?.trim())
        || ((originalStock.split(' - ')[0] || 'TBD'));

      const name = nameForSymbol(symbol);

      // Demo fallback: $1 if no live price so dollars == portfolio increase
      const price = (typeof stockPrice === 'number' && stockPrice > 0) ? stockPrice : 1;

      const sharesToAdd = parseFloat((amount / price).toFixed(4));
      const today = new Date().toISOString().slice(0,10);

      // Append NEW lot and update totals
      setHoldings(prev => {
        const idx = prev.findIndex((h: any) => h.symbol === symbol);
        const newLot = {
          shares: sharesToAdd,
          date: today,
          amountUSD: amount,
          price,
          costBasis: `$${amount.toFixed(2)}`,
          currentValue: `$${amount.toFixed(2)}`,
          return: "—",
          returnColor: "text-gray-500"
        };

        if (idx === -1) {
          return [...prev, { symbol, name, totalShares: sharesToAdd, price, lots: [newLot] }];
        } else {
          const existing = prev[idx];
          const updated = {
            ...existing,
            totalShares: parseFloat((existing.totalShares + sharesToAdd).toFixed(4)),
            price,
            lots: [...(existing.lots || []), newLot]
          };
          const clone = [...prev];
          clone[idx] = updated;
          return clone;
        }
      });

      // Tell parent the FINAL ticker to post to feed/transactions
      onAccepted?.({ symbol, name, price, amount });
    } catch (e) {
      console.error('Failed to update holdings on accept:', e);
    }

    setTimeout(() => {
      setStep(3);
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  const handleDecline = () => onClose();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#002E5D] text-center">
            {step === 1 && "Money Received!"}
            {step === 2 && "Processing Investment..."}
            {step === 3 && "Investment Complete!"}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-[#002E5D] to-[#4DA8DA] text-white">
              <CardContent className="p-6 text-center">
                <DollarSign className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">${amount}</h3>
                <p className="text-white/80">
                  {isKidsAccount ? `${senderName} sent money for ${recipientName}'s future`
                                   : `From ${senderName}`}
                </p>
                <p className="text-sm text-white/60 mt-2">
                  Originally intended for {originalStock}
                </p>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose your investment:
                </label>
                <Select value={selectedStock} onValueChange={setSelectedStock}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(() => {
                      const [sym, name] = (originalStock || '').split(' - ');
                      return sym ? (
                        <SelectItem key={sym} value={sym}>
                          {sym} - {name || sym}
                        </SelectItem>
                      ) : null;
                    })()}
                    {alternativeOptions.map(({ symbol, name }) => (
                      <SelectItem key={symbol} value={symbol}>
                        {symbol} - {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedStock !== (originalStock.split(' - ')[0] || originalStock) && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    You've changed the investment from {originalStock} to {selectedStock}
                  </p>
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleDecline} className="flex-1" disabled={step !== 1}>
                <X className="w-4 h-4 mr-2" /> Decline
              </Button>
              <Button onClick={handleAccept} className="flex-1 bg-[#4DA8DA] hover:bg-[#002E5D]" disabled={step !== 1}>
                <Check className="w-4 h-4 mr-2" /> Accept & Invest
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="text-center space-y-4 py-8">
            <div className="animate-spin w-12 h-12 border-4 border-[#4DA8DA] border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-600">Investing ${amount} in {selectedStock}...</p>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-4 py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-600">Investment Successful!</h3>
              <p className="text-gray-600">${amount} invested in {selectedStock}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReceiveMoneyModal;
