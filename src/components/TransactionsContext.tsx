import React, { createContext, useContext, useState } from 'react';

export interface Holding {
  symbol: string;
  name: string;
  totalShares: number;
  price: number;
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

  const [holdings, setHoldings] = useState<Holding[]>([
    { symbol: 'AAPL', name: 'Apple Inc.', totalShares: 2, price: 180 },
    { symbol: 'TSLA', name: 'Tesla Inc.', totalShares: 1, price: 260 }
  ]); // Replace with real holdings logic if needed

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
