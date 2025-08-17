import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { useTransactionsModal } from '../contexts/TransactionsModalContext';
import HomeTab from '../components/HomeTab';
import EducationTab from '../components/EducationTab';
import ProfileTab from '../components/ProfileTab';
import ResearchTab from '../components/ResearchTab';
import SendInvestTab from '../components/SendInvestTab';
import TransactionsPage from '../components/Profile/TransactionsPage';
import BottomNavigation from '../components/BottomNavigation';
import { NotificationProvider } from '../contexts/NotificationContext';
import { TransactionsProvider, useTransactions } from '../components/TransactionsContext';
import { TransactionsModalProvider } from "../contexts/TransactionsModalContext";

const App = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { showTransactions, closeTransactions } = useTransactionsModal();
  const { transactions } = useTransactions();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch {
      navigate('/');
    }
  };

  const handleNavigateToSendInvest = () => setActiveTab('invest');

  const handleCloseTransactions = () => {
    setActiveTab('profile');
    closeTransactions();
  };

  return (
    <TransactionsProvider>
      <TransactionsModalProvider>
        <NotificationProvider>
          <div className="min-h-screen bg-gray-50">
            {/* page container – keeps content comfy on phones */}
            <div className="container-mobile pb-safe pt-4 md:pt-6">
              {activeTab === 'feed' && (
                <HomeTab onLogout={handleLogout} onNavigateToSendInvest={handleNavigateToSendInvest} />
              )}
              {activeTab === 'learn' && <EducationTab onLogout={handleLogout} />}
              {activeTab === 'profile' && <ProfileTab onLogout={handleLogout} />}
              {activeTab === 'invest' && <SendInvestTab onLogout={handleLogout} />}
              {activeTab === 'friends' && <ResearchTab onLogout={handleLogout} />}
              {showTransactions && (
                <TransactionsPage transactions={transactions} onClose={handleCloseTransactions} />
              )}
            </div>

            <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </NotificationProvider>
      </TransactionsModalProvider>
    </TransactionsProvider>
  );
};

export default App;
