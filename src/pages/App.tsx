import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import { useTransactionsModal } from '../contexts/TransactionsModalContext'; // Get modal controls
import HomeTab from '../components/HomeTab';
import EducationTab from '../components/EducationTab';
import ProfileTab from '../components/ProfileTab';  
import ResearchTab from '../components/ResearchTab';
import SendInvestTab from '../components/SendInvestTab';
import TransactionsPage from '../components/Profile/TransactionsPage';  // Import TransactionsPage
import BottomNavigation from '../components/BottomNavigation';
import { NotificationProvider } from '../contexts/NotificationContext';
import { TransactionsProvider, useTransactions } from '../components/TransactionsContext'; // Import TransactionsProvider and useTransactions
import { TransactionsModalProvider } from "../contexts/TransactionsModalContext";

const App = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { showTransactions, closeTransactions } = useTransactionsModal();  // Get modal visibility controls
  const { transactions } = useTransactions(); // Get transactions from context

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/');
    }
  };

  const handleNavigateToSendInvest = () => {
    console.log('Navigating to Send & Invest tab');
    setActiveTab('invest');
  };

  const handleCloseTransactions = () => {
    setActiveTab('profile');  // Set active tab back to Profile when closing Transactions
    closeTransactions(); // Close the transactions modal
  };

  return (
    <TransactionsProvider>
      <TransactionsModalProvider>
        <NotificationProvider>
          <div className="min-h-screen bg-gray-50">
            <div className="pb-20 p-4 md:p-6">
              {activeTab === 'feed' && <HomeTab onLogout={handleLogout} onNavigateToSendInvest={handleNavigateToSendInvest} />}
              {activeTab === 'learn' && <EducationTab onLogout={handleLogout} />}
              {activeTab === 'profile' && <ProfileTab onLogout={handleLogout} />}
              {activeTab === 'invest' && <SendInvestTab onLogout={handleLogout} />}
              {activeTab === 'friends' && <ResearchTab onLogout={handleLogout} />}
              {/* Render TransactionsPage when `showTransactions` is true */}
              {showTransactions && (
                <TransactionsPage transactions={transactions} onClose={handleCloseTransactions} />
              )}
              )
            </div>
            <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
          </div>
        </NotificationProvider>
      </TransactionsModalProvider>
    </TransactionsProvider>
  );
};

export default App;
