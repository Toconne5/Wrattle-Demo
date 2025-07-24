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

interface TransactionsPageProps {
  transactions: Transaction[];
  onClose: () => void; // ✅ this is the correct prop (used for the back button)
}

const TransactionsPage = ({ transactions, onClose }: TransactionsPageProps) => {
  const groupedByYear = transactions.reduce((acc: Record<string, Transaction[]>, txn) => {
    const year = new Date(txn.date).getFullYear().toString();
    if (!acc[year]) acc[year] = [];
    acc[year].push(txn);
    return acc;
  }, {});

  const years = Object.keys(groupedByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white z-50 overflow-y-auto p-6">
      {/* 🔙 Back Button */}
      <button
        onClick={onClose}
        className="mb-4 text-blue-600 underline hover:text-blue-800 text-sm"
      >
        ← Back to Profile
      </button>

      <h2 className="text-2xl font-bold mb-6 text-[#002E5D]">Transactions Summary</h2>

      {years.map((year) => {
        const yearTxns = groupedByYear[year];
        const totalAmount = yearTxns.reduce((sum, txn) => sum + txn.amount, 0);
        return (
          <div key={year} className="mb-6">
            <h3 className="text-xl font-semibold text-[#002E5D] mb-2">{year}</h3>
            <p className="mb-2 text-sm text-gray-600">
              Total: ${totalAmount.toFixed(2)} across {yearTxns.length} transactions
            </p>
            <ul className="space-y-2">
              {yearTxns.map((txn) => (
                <li
                  key={txn.id}
                  className="border rounded-md p-3 shadow-sm bg-white"
                >
                  {txn.type === 'sent' ? (
                    <p>
                      Sent ${txn.amount} of <strong>{txn.stock}</strong> to{" "}
                      <span className="text-blue-700">{txn.recipient}</span>
                    </p>
                  ) : (
                    <p>
                      Received ${txn.amount} of <strong>{txn.stock}</strong> from{" "}
                      <span className="text-green-700">{txn.sender}</span>
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    {new Date(txn.date).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionsPage;
