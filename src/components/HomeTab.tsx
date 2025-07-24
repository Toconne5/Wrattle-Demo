import { useState, useEffect, useContext } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, MessageCircle } from 'lucide-react';
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
import { useTransactions } from './TransactionsContext'; // ✅ added for real holdings

interface HomeTabProps {
  onLogout: () => void;
  onNavigateToSendInvest?: () => void;
}

const HomeTab = ({ onLogout, onNavigateToSendInvest }: HomeTabProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedAccount, setSelectedAccount] = useState('personal');
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const { holdings } = useTransactions(); // ✅ get real holdings from context

  // Static posts for demo purposes
  const staticPosts: Post[] = [
    {
      id: '1',
      sender: 'Sarah M.',
      recipient: 'Mike R.',
      avatar: '👩‍💼',
      content: '',
      timestamp: '2 hours ago',
      likes: 32,
      comments: 8,
      liked: true,
      stock: 'AAPL',
      amount: '$25'
    },
    {
      id: '2',
      sender: 'Mike R.',
      recipient: 'Emma L.',
      avatar: '👨‍💻',
      content: '',
      timestamp: '4 hours ago',
      likes: 15,
      comments: 5,
      liked: false,
      stock: 'TSLA',
      amount: '$50'
    }
  ];

  useEffect(() => {
    const formattedTransactions = transactionFeedData.map((txn, i) => ({
      id: `txn-${i}`,
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
      {
        id: 'mock-1',
        sender: 'DemoUser123',
        recipient: 'Friend456',
        avatar: '🧑‍🚀',
        content: '',
        timestamp: 'Just now',
        likes: 12,
        comments: 3,
        liked: false,
        stock: 'NVDA',
        amount: '$100'
      },
      {
        id: 'mock-2',
        sender: 'InvestorJane',
        recipient: 'NewGradAlex',
        avatar: '👩‍🎓',
        content: '',
        timestamp: '1 hour ago',
        likes: 7,
        comments: 2,
        liked: true,
        stock: 'MSFT',
        amount: '$75'
      }
    ];

    const hasRealTransactions = formattedTransactions.length > 0;
    const initialPosts = hasRealTransactions
      ? [...formattedTransactions, ...staticPosts]
      : [...mockTransactions, ...staticPosts];

    setPosts(initialPosts);
  }, [transactionFeedData]);

  const portfolioAccounts = [
    { value: 'personal', label: 'Personal Brokerage', balance: '$1,247.83', change: '+$23.47 (1.92%)' },
    { value: 'child1-utma', label: "Emma's UTMA", balance: '$2,840.15', change: '+$15.23 (0.54%)' },
    { value: 'child2-utma', label: "Alex's UTMA", balance: '$1,956.42', change: '+$31.85 (1.65%)' },
    { value: '529-college', label: 'College 529 Plan', balance: '$8,234.67', change: '+$124.33 (1.53%)' }
  ];

  const currentAccount = portfolioAccounts.find(acc => acc.value === selectedAccount) || portfolioAccounts[0];

  // ✅ Calculate real total portfolio value from holdings
  const calculatePortfolioValue = () => {
    if (!holdings || holdings.length === 0) return 0;
    return holdings.reduce((total, h) => total + h.totalShares * h.price, 0);
  };

  const handleUpdatePost = (postId: string, updates: { likes: number; liked: boolean; comments?: number }) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === postId
          ? {
              ...post,
              likes: updates.likes,
              liked: updates.liked,
              ...(updates.comments !== undefined && { comments: updates.comments })
            }
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
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[#002E5D]">Your Feed</h1>
          <p className="text-gray-600">See what your friends are investing in</p>
        </div>
        <div className="flex-1 mx-8">
          <div className="flex items-center justify-center">
            <GroupChatBubbles />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <NotificationDropdown />
          <SettingsDropdown onLogout={onLogout} />
        </div>
      </div>

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
                  {portfolioAccounts.map(account => (
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
        <div className="flex space-x-4 text-sm">
          <div>
            <p className="opacity-80">Buying Power</p>
            <p className="font-semibold">$156.32</p>
          </div>
          <div>
            <p className="opacity-80">Day's Change</p>
            <p className="font-semibold text-green-300">+1.92%</p>
          </div>
        </div>
      </div>

      <CollapsibleChallenges />

      <div className="bg-white rounded-xl shadow-sm border p-6">
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

      {selectedChat && (
        <ChatModal chat={selectedChat} open={!!selectedChat} onOpenChange={() => setSelectedChat(null)} />
      )}

      <AIAssistant />
    </div>
  );
};

export default HomeTab;
