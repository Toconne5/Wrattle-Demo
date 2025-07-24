import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../components/TransactionsContext';  // Correctly use the context hook
import { Transaction } from '../components/TransactionsContext';  // Import the Transaction type


// Only expect `onClose` as a prop (no `transactions`)
const TransactionsPage = ({ onClose }: { onClose: () => void }) => {
  const { transactions } = useTransactions();  // Fetch transactions from context
  const [displayedTransactions, setDisplayedTransactions] = useState<Transaction[]>(transactions);
  const navigate = useNavigate();

  // Update displayed transactions when the context value changes
  useEffect(() => {
    setDisplayedTransactions(transactions);
  }, [transactions]);  // When transactions change, update the state

  const handleExit = () => {
    navigate(-1);  // Navigate back to the previous page
  };

  return (
    <div>
      {/* Exit Button */}
      <button onClick={handleExit} style={{ padding: '10px', marginBottom: '20px', background: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}>
        Exit
      </button>

      <h2>Transactions</h2>
      <ul>
        {displayedTransactions.length > 0 ? (
          displayedTransactions.map((transaction) => (
            <li key={transaction.id}>
              {transaction.date} - {transaction.amount} {transaction.stock}
            </li>
          ))
        ) : (
          <li>No transactions available</li>
        )}
      </ul>

      <button onClick={onClose} style={{ padding: '10px', background: '#FF5733', color: 'white', border: 'none', borderRadius: '5px' }}>
        Close
      </button>
    </div>
  );
};

export default TransactionsPage;
