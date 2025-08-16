import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FeedPost from './feed/FeedPost';
import NotificationDropdown from './notifications/NotificationDropdown';
import SettingsDropdown from './SettingsDropdown';
import CollapsibleChallenges from './CollapsibleChallenges';
import NewChatModal from './chat/NewChatModal';
import ChatModal from './chat/ChatModal';
import AIAssistant from './AIAssistant';
import GroupChatBubbles from './social/GroupChatBubbles';
import { Post } from '../types/feed';
import { transactionFeedData } from './feed/feedData';
import { useTransactions } from './TransactionsContext';

interface HomeTabProps {
  onLogout: () => void;
  onNavigateToSendInvest?: () => void;
}

const HomeTab = ({ onLogout, onNavigateToSendInvest }: HomeTabProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedAccount, setSelectedAccount] = useState('personal');
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const { holdings } = useTransactions();

  // Static posts for demo purposes
  const staticPosts: Post[] = [
    { id: '1', sender: 'Sarah M.', recipient: 'Mike R.', avatar: '👩‍💼', content: '', timestamp: '2 hours ago', likes: 32, comments: 8, liked: true, stock: 'AAPL', amount: '$25' },
    { id: '2', sender: 'Mike R.', recipient: 'Emma L.', avatar: '👨‍💻', content: '', timestamp: '4 hours ago', likes: 15, comments: 5, liked: false, stock: 'TSLA', amount: '$50' }
  ];

  // Build posts from current feed data
  const buildPosts = () => {
    const formattedTransactions = transactionFeedData.map((txn, i) => ({
      id: `txn-${i}-${txn.id}`,
      sender: txn.sender,
      recipient: txn.recipient,
      avatar: '💸',
      content: '',
      timestamp: new Date(txn.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      likes: 0,
      comments: 0,
      liked: false,
      stock: txn.stock,
      amount: `$${txn.amount}`
    }));

    const mockTransactions: Post[] = [
      { id: 'mock-1', sender: 'DemoUser123', recipient: 'Friend456', avatar: '🧑‍🚀', content: '', timestamp: 'Just now', likes: 12, comments: 3, liked: false, stock: 'NVDA', amount: '$100' },
      { id: 'mock-2', sender: 'InvestorJane', recipient: 'NewGradAlex', avatar: '👩‍🎓', content: '', timestamp: '1 hour ago', likes: 7, comments: 2, liked: true, stock: 'MSFT', amount: '$75' }
    ];

    const hasRealTransactions = formattedTransactions.length > 0;
    setPosts(hasRealTransactions ? [...formattedTransactions, ...staticPosts] : [...mockTransactions, ...staticPosts]);
  };

  useEffect(() => {
    buildPosts(); // initial render
    const handler = () => buildPosts();
    window.addEventListener('transactionFeedDataUpdated', handler);
    return () => window.removeEventListener('transactionFeedDataUpdated', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const portfolioAccounts = [
    { value: 'personal', label: 'Personal Brokerage', balance: '$1,247.83', change: '+$23.47 (1.92%)' },
    { value: 'child1-utma', label: "Emma's UTMA", balance: '$2,840.15', change: '+$15.23 (0.54%)' },
    { value: 'child2-utma', label: "Alex's UTMA", balance: '$1,956.42', change: '+$31.85 (1.65%)' },
    { value: '529-college', label: 'College 529 Plan', balance: '$8,234.67', change: '+$124.33 (1.53%)' }
  ];

  const currentAccount = portfolioAccounts.find(acc => acc.value === selectedAccount) || portfolioAccounts[0];

  // Sum portfolio by lots (fallback to shares*price)
  const calculatePortfolioValue = () => {
    if (!holdings || holdings.length === 0) return 0;
    const total = holdings.reduce((sum: number, h: any) => {
      if (Array.isArray(h.lots) && h.lots.length) {
        return sum + h.lots.reduce((s: number, lot: any) => {
          if (typeof lot.amountUSD === 'number') return s + lot.amountUSD;
          const n = parseFloat(String(lot.currentValue || lot.costBasis || '0').replace(/[$,]/g, ''));
          return s + (isNaN(n) ? 0 : n);
        }, 0);
      }
      return sum + (h.totalShares * (h.price || 0));
    }, 0);
    return Math.round(total * 100) / 100;
  };

  const handleUpdatePost = (postId: string, updates: { likes: number; liked: boolean; comments?: number }) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? { ...post, likes: updates.likes, liked: updates.liked, ...(updates.comments !== undefined && { comments: updates.comments }) }
          : post
      )
    );
  };

  const handleShare = (stockSymbol: string, postId?: string) => {
    const shareMessage = `Check out $${stockSymbol}! 📈`;
    alert(`Share message created: "${shareMessage}"\n\nThis would open your chat to send this ticker to friends!`);
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Header: stack on mobile, row on md+ */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Left: title & subtitle – full width on mobile */}
        <div className="md:flex-1">
          <h1 className="text-2xl font-bold text-[#002E5D]">Your Feed</h1>
          <p className="text-gray-600">See what your friends are investing in</p>
        </div>

        {/* Middle: bubbles – hide on small screens to avoid squeezing text */}
        <div className="hidden md:flex md:flex-1 md:justify-center">
          <GroupChatBubbles />
        </div>

        {/* Right: notifications/settings */}
        <div className="flex items-center space-x-2 md:justify-end">
          <NotificationDropdown />
          <SettingsDropdown onLogout={onLogout} />
        </div>
      </div>

      {/* Portfolio banner – stack on mobile */}
      <div className="bg-gradient-to-r from-[#002E5D] to-[#4DA8DA] rounded-xl p-4 sm:p-6 text-white">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="md:flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 mb-2">
              <h3 className="text-lg font-semibold mb-2 sm:mb-0">Portfolio Value</h3>
              <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                <SelectTrigger className="w-full sm:w-56 bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {portfolioAccounts.map(account => (
                    <SelectItem key={account.value} value={account.value}>
                      {account.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <p className="text-3xl sm:text-4xl font-bold">${calculatePortfolioValue().toFixed(2)}</p>
          </div>

          {/* Right block shows below on mobile, right on md+ */}
          <div className="text-left md:text-right">
            <p className="text-green-200 font-semibold">{currentAccount.change}</p>
            <p className="text-sm opacity-80">Today</p>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-6 text-sm">
          <div>
            <p className="opacity-80">Buying Power</p>
            <p className="font-semibold">$156.32</p>
          </div>
          <div>
            <p className="opacity-80">Day&apos;s Change</p>
            <p className="font-semibold text-green-200">+1.92%</p>
          </div>
        </div>
      </div>

      <CollapsibleChallenges />

      <div className="bg-white rounded-xl shadow-sm border p-4 sm:p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-4">
          {posts.map(post => (
            <FeedPost
              key={post.id}
              post={post}
              onUpdatePost={handleUpdatePost}
              onNavigateToSendInvest={onNavigateToSendInvest}
              onShare={handleShare}
            />
          ))}
        </div>
      </div>

      <NewChatModal open={showNewChatModal} onOpenChange={setShowNewChatModal} />
      {selectedChat && <ChatModal chat={selectedChat} open={!!selectedChat} onOpenChange={() => setSelectedChat(null)} />}

      <AIAssistant />
    </div>
  );
};

export default HomeTab;
