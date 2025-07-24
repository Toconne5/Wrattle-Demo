import { Button } from "@/components/ui/button";
import { Home, BarChart, BookOpen, User, ArrowUp, FileText } from "lucide-react"; // Import icons from lucide-react if needed
import WIcon from '../assets/W_icon_lightmode.png'; // Import your new "W" icon

const investTabStyles = `
.invest-tab {
  background: linear-gradient(135deg, #002E5D, #4DA8DA) !important;
  border-radius: 50%;
  transform: scale(1.2);
  box-shadow: 0 4px 12px rgba(0, 46, 93, 0.3);
}
`;

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  // Updated tabs with icons, including Transactions
  const tabs = [
    { id: 'feed', name: 'Feed', icon: '📱' },
    { id: 'friends', name: 'Friends', icon: '👥' },
    { id: 'invest', name: 'Send & Invest', icon: '🎯' },
    { id: 'learn', name: 'Learn', icon: '🎓' },
    { id: 'profile', name: 'Profile', icon: '👤' },
    // Added Transactions tab
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#4DA8DA]/20 px-4 py-3">
      <style dangerouslySetInnerHTML={{ __html: investTabStyles }} />
      <div className="flex justify-around items-center relative">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            onClick={() => {
              if (tab.id === 'transactions') {
                window.location.href = '/transactions'; // Navigating to Transactions page
              } else {
                onTabChange(tab.id); // Switch tabs normally for other tabs
              }
            }}
            className={`flex-1 mx-1 flex flex-col items-center ${activeTab === tab.id ? 'bg-[#002E5D] text-white hover:bg-[#4DA8DA]' : 'text-[#002E5D] hover:bg-[#A6E1FA]/20'} transition-all duration-300 ${tab.id === 'invest' ? 'invest-tab relative' : ''}`}
          >
            {tab.id === 'invest' ? (
              // For the "Send & Invest" tab, use your new W icon
              <img src={WIcon} alt="W Icon" className="w-12 h-12" />
            ) : (
              // Use other tab icons as usual
              tab.icon
            )}
            <span className="text-xs">{tab.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
