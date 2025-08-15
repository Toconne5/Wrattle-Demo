import React, { createContext, useContext, useState } from 'react';

export type Lot = {
  shares: number;        // shares in this lot
  date: string;          // ISO date (YYYY-MM-DD)
  amountUSD: number;     // exact dollars invested for this lot
  price: number;         // execution price used to compute shares
  costBasis: string;     // "$123.45" (display)
  currentValue: string;  // "$123.45" (display)
  return: string;        // "—" (placeholder for now)
  returnColor: string;   // "text-gray-500"
};

export interface Holding {
  symbol: string;
  name: string;
  totalShares: number;
  price: number;       // display/reference price (not used for total now)
  lots?: Lot[];        // 👈 NEW: per-accept tax lots
}

export interface Transaction {
  id: string;
  type: 'sent' | 'received';
  amount: number;
  stock: string;
  recipient?: string;
  sender?: string;
  date: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
  addTransaction: (txn: Transaction) => void;
  holdings: Holding[];
  setHoldings: React.Dispatch<React.SetStateAction<Holding[]>>;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export const TransactionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Seed demo holdings with a single lot each so UI/typing work immediately.
  const initialHoldings: Holding[] = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      totalShares: 2,
      price: 180,
      lots: [
        {
          shares: 2,
          date: '2024-01-01',
          amountUSD: 360,
          price: 180,
          costBasis: '$360.00',
          currentValue: '$360.00',
          return: '—',
          returnColor: 'text-gray-500'
        }
      ]
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      totalShares: 1,
      price: 260,
      lots: [
        {
          shares: 1,
          date: '2024-01-01',
          amountUSD: 260,
          price: 260,
          costBasis: '$260.00',
          currentValue: '$260.00',
          return: '—',
          returnColor: 'text-gray-500'
        }
      ]
    }
  ];

  const [holdings, setHoldings] = useState<Holding[]>(initialHoldings);

  const addTransaction = (txn: Transaction) => {
    setTransactions(prev => [txn, ...prev]);
  };

  return (
    <TransactionsContext.Provider value={{ transactions, addTransaction, holdings, setHoldings }}>
      {children}
    </TransactionsContext.Provider>
  );
};

export const useTransactions = (): TransactionsContextType => {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error("useTransactions must be used within a TransactionsProvider");
  }
  return context;
};
