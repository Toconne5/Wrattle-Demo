import React, { createContext, useContext, useState } from "react";

interface TransactionsModalContextType {
  showTransactions: boolean;
  openTransactions: () => void;
  closeTransactions: () => void;
}

const TransactionsModalContext = createContext<TransactionsModalContextType | undefined>(undefined);

export const TransactionsModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showTransactions, setShowTransactions] = useState(false);

  const openTransactions = () => setShowTransactions(true);
  const closeTransactions = () => setShowTransactions(false);

  return (
    <TransactionsModalContext.Provider value={{ showTransactions, openTransactions, closeTransactions }}>
      {children}
    </TransactionsModalContext.Provider>
  );
};

export const useTransactionsModal = (): TransactionsModalContextType => {
  const context = useContext(TransactionsModalContext);
  if (!context) {
    throw new Error("useTransactionsModal must be used within a TransactionsModalProvider");
  }
  return context;
};
