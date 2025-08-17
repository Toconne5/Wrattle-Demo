import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import NotificationDropdown from './NotificationDropdown';
import SettingsDropdown from './SettingsDropdown';
import PortfolioHoldings from './PortfolioHoldings';
import AssetAllocation from './AssetAllocation';
import UserHeader from './Profile/UserHeader';
import { useNavigate } from 'react-router-dom';
import { useTransactions } from '../components/TransactionsContext';

const ProfileTab = ({ onLogout }: { onLogout: () => void }) => {
  const navigate = useNavigate();
  const [selectedAccount, setSelectedAccount] = useState('personal');
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const { holdings } = useTransactions();

  const currentUser = { name: "Tommy O.", avatar: "🧑‍💻", username: "tommy_o" };

  const portfolioAccounts = [
    { value: 'personal', label: 'Personal Brokerage' },
    { value: 'child1-utma', label: "Emma's UTMA" },
    { value: 'child2-utma', label: "Alex's UTMA" },
    { value: '529-college', label: 'College 529 Plan' }
  ];

  const calculatePortfolioValue = () => {
    if (!holdings || holdings.length === 0) return 0;
    return holdings.reduce((sum: number, h: any) => {
      if (Array.isArray(h.lots) && h.lots.length) {
        const lotsTotal = h.lots.reduce((s: number, lot: any) => {
          if (typeof lot.amountUSD === 'number') return s + lot.amountUSD;
          const n = parseFloat(String(lot.currentValue || lot.costBasis || '0').replace(/[$,]/g, ''));
          return s + (isNaN(n) ? 0 : n);
        }, 0);
        return sum + lotsTotal;
      }
      return sum + (h.totalShares * (h.price || 0));
    }, 0);
  };

  const convertHoldingsForUI = (arr: any[]) => {
    return (arr || []).map((h: any) => {
      const lots = (h.lots && h.lots.length)
        ? h.lots.map((lot: any) => ({
            shares: lot.shares,
            date: lot.date,
            costBasis: lot.costBasis || (typeof lot.amountUSD === 'number' ? `$${lot.amountUSD.toFixed(2)}` : '$0.00'),
            currentValue: lot.currentValue || (typeof lot.amountUSD === 'number' ? `$${lot.amountUSD.toFixed(2)}` : '$0.00'),
            return: lot.return ?? '—',
            returnColor: lot.returnColor ?? 'text-gray-500'
          }))
        : [{
            shares: h.totalShares,
            date: new Date().toISOString().slice(0,10),
            costBasis: `$${(h.totalShares * (h.price || 0)).toFixed(2)}`,
            currentValue: `$${(h.totalShares * (h.price || 0)).toFixed(2)}`,
            return: '—',
            returnColor: 'text-gray-500'
          }];

      const totalValue = lots.reduce((s: number, lot: any) => s + parseFloat(String(lot.currentValue).replace(/[$,]/g,'')), 0);

      return {
        symbol: h.symbol,
        name: h.name,
        totalShares: h.totalShares,
        totalValue: `$${totalValue.toFixed(2)}`,
        totalReturnColor: "text-gray-500",
        totalReturn: "—",
        lots
      };
    });
  };

  const currentHoldings = selectedAccount === 'personal' ? convertHoldingsForUI(holdings) : [];

  const handleStockClick = (symbol: string) => { setSelectedStock(symbol); setIsStockModalOpen(true); };
  const handleCloseStockModal = () => { setIsStockModalOpen(false); setSelectedStock(null); };
  const handleSendInvestClick = () => { navigate('/send-invest', { state: { prefillRecipient: currentUser.username } }); };
  const handleSellStock = (symbol: string) => { console.log(`Sell ${symbol}`); };

  const total = calculatePortfolioValue();
  const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 });

  return (
    <div className="space-y-6 pb-24">
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

      {/* banner – same structure as Feed to avoid overlap */}
      <div className="bg-gradient-to-r from-[#002E5D] to-[#4DA8DA] rounded-2xl p-5 md:p-6 text-white">
        <div className="space-y-3">
          <h3 className="text-lg font-semibold">Portfolio Value</h3>
          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger className="w-full sm:w-64 bg-white/10 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {portfolioAccounts.map((a) => (
                <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            {currency.format(Math.round(total * 100) / 100)}
          </div>
          <div className="text-green-300 font-semibold">+$23.47 (1.92%)</div>
          <div className="text-sm opacity-90">Today</div>

          <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="opacity-90">Buying Power</div>
              <div className="font-semibold">$156.32</div>
            </div>
            <div>
              <div className="opacity-90">Day&apos;s Change</div>
              <div className="font-semibold text-green-300">+1.92%</div>
            </div>
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
