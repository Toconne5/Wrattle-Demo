import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, DollarSign, Send } from "lucide-react";
import NotificationDropdown from './NotificationDropdown';
import SettingsDropdown from './SettingsDropdown';
import { fetchStockData, StockData } from '../services/stockApi';
import ReceiveMoneyModal from './ReceiveMoneyModal';
import { addTransactionToFeed } from './feed/feedData';
import { useTransactions } from '../components/TransactionsContext';

interface SendInvestTabProps { onLogout: () => void; }

const SendInvestTab = ({ onLogout }: SendInvestTabProps) => {
  const [recipientSearchTerm, setRecipientSearchTerm] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [selectedBrokerageAccount, setSelectedBrokerageAccount] = useState('');
  const [selectedStock, setSelectedStock] = useState('');
  const [selectedBankAccount, setSelectedBankAccount] = useState('checking-001');
  const [searchTerm, setSearchTerm] = useState('');
  const [stockData, setStockData] = useState<StockData | null>(null);
  const { addTransaction } = useTransactions();
  const [loading, setLoading] = useState(false);
  const [showStockSearch, setShowStockSearch] = useState(false);
  const [showReceiveModal, setShowReceiveModal] = useState(false);
  const [pendingTransaction, setPendingTransaction] = useState<{
    sender: string; amount: number; stock: string; recipient: string; isKids: boolean;
    stockPrice?: number; stockSymbol?: string; stockName?: string;
  } | null>(null);

  const stockDatabase = [
    'AAPL - Apple Inc', 'GOOGL - Alphabet Inc', 'MSFT - Microsoft Corp', 'AMZN - Amazon.com Inc',
    'TSLA - Tesla Inc', 'META - Meta Platforms Inc', 'NVDA - NVIDIA Corporation', 'NFLX - Netflix Inc',
    'CRM - Salesforce Inc', 'ORCL - Oracle Corporation', 'ADBE - Adobe Inc', 'INTC - Intel Corporation'
  ];

  const friends = [
    { id: '1', name: 'Sarah M.', avatar: '👩‍💼', username: '@sarah_m', type: 'friend' },
    { id: '2', name: 'Mike R.', avatar: '👨‍💻', username: '@mike_r', type: 'friend' }
  ];
  const personalAccounts = [{ id: 'personal', name: 'Your Personal Account', avatar: '🏦', username: '@you', type: 'personal' }];
  const allRecipients = [...personalAccounts, ...friends];

  const bankAccounts = [
    { value: 'checking-001', label: 'Wells Fargo Checking (...4821)', balance: '$2,847.92', type: 'Checking' },
    { value: 'savings-001', label: 'Wells Fargo Savings (...7334)', balance: '$8,234.15', type: 'Savings' }
  ];

  const personalBrokerageAccounts = [
    { value: 'personal-brokerage', label: 'Personal Brokerage', balance: '$1,247.83' },
    { value: '529-college', label: 'College 529 Plan', balance: '$8,234.67' }
  ];
  const friendBrokerageAccounts = {
    '1': [
      { value: 'sarah-personal', label: 'Personal Brokerage', balance: '$1,247.83' },
      { value: 'sarah-utma', label: "Emma's UTMA", balance: '$2,840.15' }
    ],
    '2': [
      { value: 'mike-personal', label: 'Personal Brokerage', balance: '$3,456.78' },
      { value: 'mike-401k', label: '401k Rollover', balance: '$15,230.45' }
    ]
  };

  const handleStockSelect = (stockOption: string) => {
    const symbol = stockOption.split(' - ')[0];
    setSelectedStock(symbol);
    setSearchTerm(symbol);
    setShowStockSearch(false);
    handleStockSearch(symbol);
  };

  const handleStockSearch = async (symbol: string) => {
    if (!symbol.trim()) { setStockData(null); return; }
    setLoading(true);
    try { setStockData(await fetchStockData(symbol)); }
    catch { setStockData(null); }
    finally { setLoading(false); }
  };

  const getAvailableBrokerageAccounts = () => {
    const recipient = allRecipients.find(r => r.id === selectedRecipient);
    if (recipient?.type === 'personal') return personalBrokerageAccounts;
    return friendBrokerageAccounts[selectedRecipient as keyof typeof friendBrokerageAccounts] || [];
  };

  const handleSendMoney = () => {
    if (!amount || !selectedRecipient || !selectedStock || !selectedBrokerageAccount) {
      alert('Please fill in all fields'); return;
    }

    const recipient = allRecipients.find(r => r.id === selectedRecipient);
    const isKids = selectedBrokerageAccount.includes('utma') || selectedBrokerageAccount.includes('529');
    const amountFloat = parseFloat(amount);
    const fullStockEntry = stockDatabase.find(s => s.startsWith(selectedStock)) || `${selectedStock} - Unknown Company`;
    const [stockSymbol, stockName] = fullStockEntry.split(' - ');

    setPendingTransaction({
      sender: "Tommy O.",
      amount: amountFloat,
      stock: fullStockEntry,
      recipient: recipient?.name || "Friend",
      isKids,
      stockPrice: stockData?.price,
      stockSymbol,
      stockName
    });

    setShowReceiveModal(true);
  };

  return (
    <div className="space-y-6 pb-safe pt-safe">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#002E5D]">Send & Invest</h2>
        <div className="flex items-center space-x-2">
          <NotificationDropdown />
          <SettingsDropdown onLogout={onLogout} />
        </div>
      </div>

      <Card className="shadow-lg border-[#4DA8DA]/20">
        <CardHeader>
          <CardTitle className="text-[#002E5D] flex items-center space-x-2">
            <Send className="w-5 h-5" />
            <span>Send Money for Stock Investment</span>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Amount */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Amount to Send</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="number"
                placeholder="0.00"
                min="0"
                step="0.01"
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10 text-lg font-semibold"
              />
            </div>
          </div>

          {/* Select Stock */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Select Stock</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search stocks (e.g., AAPL)"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setShowStockSearch(true); }}
                onBlur={() => {
                  setTimeout(() => {
                    setShowStockSearch(false);
                    if (!selectedStock && searchTerm.trim()) setSelectedStock(searchTerm.trim().toUpperCase());
                  }, 150);
                }}
                className="pl-10"
              />
              {showStockSearch && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                  {stockDatabase
                    .filter(stock => stock.toLowerCase().includes(searchTerm.toLowerCase()))
                    .slice(0, 8)
                    .map((stock, index) => {
                      const [symbol, name] = stock.split(' - ');
                      return (
                        <div
                          key={index}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                          onClick={() => handleStockSelect(stock)}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-[#002E5D]">{symbol}</span>
                            <span className="text-sm text-gray-600 truncate ml-2">{name}</span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </div>

          {/* To (Recipient) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">To</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users"
                className="pl-10"
                value={recipientSearchTerm || (selectedRecipient && allRecipients.find(r => r.id === selectedRecipient)?.name) || ''}
                onChange={(e) => setRecipientSearchTerm(e.target.value)}
              />
              {recipientSearchTerm && (
                <div className="absolute z-20 bg-white border border-gray-200 rounded-lg mt-1 w-full max-h-48 overflow-y-auto shadow-lg">
                  {allRecipients
                    .filter(r => r.name.toLowerCase().includes(recipientSearchTerm.toLowerCase()) || r.username?.toLowerCase().includes(recipientSearchTerm.toLowerCase()))
                    .map(recipient => (
                      <div
                        key={recipient.id}
                        onClick={() => {
                          setSelectedRecipient(recipient.id);
                          setRecipientSearchTerm(recipient.name);
                          setTimeout(() => setRecipientSearchTerm(''), 100);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center space-x-3"
                      >
                        <span className="text-xl">{recipient.avatar}</span>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-800">{recipient.name}</span>
                          <span className="text-xs text-gray-500">{recipient.username}</span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>

          {/* Recipient's Brokerage Account */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Select Recipient's Brokerage Account</label>
            <Select value={selectedBrokerageAccount} onValueChange={setSelectedBrokerageAccount}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {(allRecipients.find(r => r.id === selectedRecipient)?.type === 'personal'
                  ? personalBrokerageAccounts
                  : friendBrokerageAccounts[selectedRecipient as '1' | '2'] || []
                ).map(account => (
                  <SelectItem key={account.value} value={account.value}>{account.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sender's Bank Account */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">From (Bank Account)</label>
            <Select value={selectedBankAccount} onValueChange={setSelectedBankAccount}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {bankAccounts.map(account => (
                  <SelectItem key={account.value} value={account.value}>{account.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSendMoney}
            className="w-full bg-gradient-to-r from-[#4DA8DA] to-[#002E5D] hover:from-[#002E5D] hover:to-[#4DA8DA] text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
            disabled={!amount || !selectedRecipient || !selectedStock || !selectedBrokerageAccount || !selectedBankAccount || loading}
          >
            {loading ? 'Processing...' : `Send $${amount || '0.00'} for Investment`}
          </Button>
        </CardContent>
      </Card>

      {pendingTransaction && (
        <ReceiveMoneyModal
          isOpen={showReceiveModal}
          onClose={() => { setShowReceiveModal(false); setPendingTransaction(null); }}
          senderName={pendingTransaction.sender}
          amount={pendingTransaction.amount}
          originalStock={pendingTransaction.stock}
          recipientName={pendingTransaction.recipient}
          isKidsAccount={pendingTransaction.isKids}
          stockPrice={pendingTransaction.stockPrice}
          stockSymbol={pendingTransaction.stockSymbol}
          stockName={pendingTransaction.stockName}
          onAccepted={({ symbol, name, price, amount }) => {
            const recipient = [...[{ id: 'personal', type: 'personal' }], ...friends].find(r => r.id === selectedRecipient);
            const type = recipient?.type === 'personal' ? 'received' : 'sent';
            const shares = price ? parseFloat((amount / price).toFixed(4)) : 0;

            addTransactionToFeed({
              id: crypto.randomUUID(),
              type,
              sender: "Tommy O.",
              recipient: pendingTransaction.recipient,
              amount,
              stock: symbol,
              stockName: name || "Unknown",
              brokerageAccount: selectedBrokerageAccount,
              date: new Date().toISOString(),
              shares
            });

            addTransaction({
              id: crypto.randomUUID(),
              sender: "Tommy O.",
              recipient: pendingTransaction.recipient,
              amount,
              stock: symbol,
              date: new Date().toISOString(),
              type
            });
          }}
        />
      )}
    </div>
  );
};

export default SendInvestTab;
