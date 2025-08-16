import { Button } from "@/components/ui/button";
import WIcon from '../assets/W_icon_lightmode.png';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const investTabStyles = `
.invest-tab {
  background: linear-gradient(135deg, #002E5D, #4DA8DA) !important;
  border-radius: 9999px;
  transform: translateY(-8px) scale(1.05);
  box-shadow: 0 8px 18px rgba(0, 46, 93, 0.25);
}
`;

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const tabs = [
    { id: 'feed', name: 'Feed', icon: '📱' },
    { id: 'friends', name: 'Friends', icon: '👥' },
    { id: 'invest', name: 'Send & Invest', icon: '🎯' },
    { id: 'learn', name: 'Learn', icon: '🎓' },
    { id: 'profile', name: 'Profile', icon: '👤' },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#4DA8DA]/20 px-4 py-3 bottom-nav-safe"
      style={{ zIndex: 50 }}
      aria-label="Bottom navigation"
    >
      <style dangerouslySetInnerHTML={{ __html: investTabStyles }} />
      <div className="mx-auto flex max-w-screen-md justify-around items-end">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 mx-1 flex flex-col items-center transition-all duration-200
              ${activeTab === tab.id ? 'bg-[#002E5D] text-white hover:bg-[#4DA8DA]' : 'text-[#002E5D] hover:bg-[#A6E1FA]/20'}
              ${tab.id === 'invest' ? 'invest-tab' : ''}`}
          >
            {tab.id === 'invest' ? (
              <img src={WIcon} alt="W Icon" className="w-10 h-10 md:w-12 md:h-12" />
            ) : (
              <span className="text-lg leading-none">{tab.icon}</span>
            )}
            <span className="mt-1 text-[10px] md:text-xs leading-tight text-center">{tab.name}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
