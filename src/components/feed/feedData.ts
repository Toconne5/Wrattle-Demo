// components/feed/feedData.ts

export interface Transaction {
  id: string;
  type: 'sent' | 'received';
  sender: string;
  recipient: string;
  amount: number;
  stock: string;
  stockName: string;
  brokerageAccount: string;
  date: string;
  shares: number;
}

// ✅ Initial mocked transaction data
export const transactionFeedData: Transaction[] = [
  {
    id: 'txn1',
    type: 'sent',
    sender: 'Tommy O.',
    recipient: 'Sarah M.',
    amount: 50,
    stock: 'AAPL',
    stockName: 'Apple Inc',
    brokerageAccount: 'Sarah’s Roth IRA',
    date: '2025-06-23T12:00:00Z',
    shares: 0.271,
  },
  {
    id: 'txn2',
    type: 'received',
    sender: 'Mike R.',
    recipient: 'Tommy O.',
    amount: 35,
    stock: 'TSLA',
    stockName: 'Tesla Inc',
    brokerageAccount: 'Personal Brokerage',
    date: '2025-06-22T16:45:00Z',
    shares: 0.083,
  }
];

// 🛠️ Utility function for adding transactions
export const addTransactionToFeed = (transaction: Transaction) => {
  transactionFeedData.unshift(transaction);
};
