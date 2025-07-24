import React from 'react';

interface Transaction {
  id: string;
  type: 'sent' | 'received';
  amount: number;
  stock: string;
  recipient?: string;
  sender?: string;
  date: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory = ({ transactions }: TransactionHistoryProps) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-[#002E5D] mb-2">Transaction History</h3>
      <ul className="space-y-3">
        {transactions.map((txn) => (
          <li key={txn.id} className="bg-white rounded-md border p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                {txn.type === 'sent' ? (
                  <p>
                    Sent <span className="font-medium">${txn.amount}</span> of <span className="font-medium">${txn.stock}</span> to <span className="text-blue-700">{txn.recipient}</span>
                  </p>
                ) : (
                  <p>
                    Received <span className="font-medium">${txn.amount}</span> of <span className="font-medium">${txn.stock}</span> from <span className="text-green-700">{txn.sender}</span>
                  </p>
                )}
              </div>
              <span className="text-sm text-gray-500">{new Date(txn.date).toLocaleDateString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
