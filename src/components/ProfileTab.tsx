import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NotificationDropdown from './NotificationDropdown';
import SettingsDropdown from './SettingsDropdown';
import PortfolioHoldings from './PortfolioHoldings';
import AssetAllocation from './AssetAllocation';
import { StockDetailModal } from './StockDetailModal';
import UserHeader from './Profile/UserHeader';
import TransactionHistory from './Profile/TransactionHistory';
import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../components/TransactionsContext';

const ProfileTab = ({ onLogout }: { onLogout: () => void }) => {
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState('personal');
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const { transactions, holdings } = useTransactions(); // 🔄 includes holdings

  const currentUser = {
    name: "Tommy O.",
    avatar: "🧑‍💻",
    username: "tommy_o"
  };

  // Portfolio accounts logic (we keep this for dropdown UI and balance structure)
  const portfolioAccounts = [
    { value: 'personal', label: 'Personal Brokerage', balance: '$1,247.83', change: '+$23.47 (1.92%)' },
    { value: 'child1-utma', label: "Emma's UTMA", balance: '$2,840.15', change: '+$15.23 (0.54%)' },
    { value: 'child2-utma', label: "Alex's UTMA", balance: '$1,956.42', change: '+$31.85 (1.65%)' },
    { value: '529-college', label: 'College 529 Plan', balance: '$8,234.67', change: '+$124.33 (1.53%)' }
  ];

  const currentAccount = portfolioAccounts.find(acc => acc.value === selectedAccount) || portfolioAccounts[0];

  // Hardcoded holding structure (used for PortfolioHoldings display)
  const holdingsData = {
    personal: [
      {
        symbol: "AAPL",
        name: "Apple Inc.",
        totalShares: 100,
        totalValue: "$15,000",
        totalReturnColor: "text-green-500",
        totalReturn: "+5%",
        lots: [
          { shares: 50, date: "2022-01-01", costBasis: "$7,000", currentValue: "$8,000", return: "+10%", returnColor: "text-green-500" },
          { shares: 50, date: "2023-01-01", costBasis: "$8,000", currentValue: "$8,000", return: "0%", returnColor: "text-gray-500" }
        ]
      }
    ],
    'child1-utma': [],
    'child2-utma': [],
    '529-college': []
  };

  const currentHoldings = holdingsData[selectedAccount as keyof typeof holdingsData] || [];

  const calculatePortfolioValue = () => {
    if (!holdings || holdings.length === 0) return 0;
    return holdings.reduce((total, h) => total + h.totalShares * h.price, 0);
  };

  const handleStockClick = (symbol: string) => {
    setSelectedStock(symbol);
    setIsStockModalOpen(true);
  };

  const handleCloseStockModal = () => {
    setIsStockModalOpen(false);
    setSelectedStock(null);
  };

  const handleSendInvestClick = () => {
    navigate('/send-invest', { state: { prefillRecipient: currentUser.username } });
  };

  const handleSellStock = (symbol: string) => {
    console.log(`Sell ${symbol}`);
    // placeholder for selling logic
  };

  return (
    <div className="space-y-6 pb-32 md:pb-8">
      <div className="flex justify-end space-x-2">
        <NotificationDropdown />
        <SettingsDropdown onLogout={onLogout} />
      </div>

      <UserHeader 
        name={currentUser.name} 
        username={currentUser.username} 
        avatar={currentUser.avatar} 
        onSendInvestClick={handleSendInvestClick} 
      />

      <div className="bg-gradient-to-r from-[#002E5D] to-[#4DA8DA] rounded-xl p-6 text-white">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold">Portfolio Value</h3>
              <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {portfolioAccounts.map((account) => (
                    <SelectItem key={account.value} value={account.value}>
                      {account.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="text-3xl font-bold">${calculatePortfolioValue().toFixed(2)}</p>
          </div>
          <div className="text-right">
            <p className="text-green-300 font-semibold">{currentAccount.change}</p>
            <p className="text-sm opacity-80">Today</p>
          </div>
        </div>
      </div>

      <PortfolioHoldings
        currentHoldings={currentHoldings}
        onStockClick={handleStockClick}
        selectedStock={selectedStock}
        isStockModalOpen={isStockModalOpen}
        onCloseStockModal={handleCloseStockModal}
        onSellStock={handleSellStock}
      />

      <AssetAllocation selectedAccount={selectedAccount} />
    </div>
  );
};

export default ProfileTab;
