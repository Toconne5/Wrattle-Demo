import { Button } from "@/components/ui/button";
import WIcon from '../assets/W_icon_lightmode.png';

const investTabStyles = `
.invest-tab {
  background: linear-gradient(135deg, #002E5D, #4DA8DA) !important;
  border-radius: 9999px;
  transform: scale(1.08);
  box-shadow: 0 6px 18px rgba(0, 46, 93, 0.25);
}
`;

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const tabs = [
    { id: 'feed', name: 'Feed', icon: '📱' },
    { id: 'friends', name: 'Friends', icon: '👥' },
    { id: 'invest', name: 'Send & Invest', icon: '🎯' },
    { id: 'learn', name: 'Learn', icon: '🎓' },
    { id: 'profile', name: 'Profile', icon: '👤' },
  ];

  return (
    <nav aria-label="Tab bar"
      className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-[#4DA8DA]/20 z-50 bottom-nav-safe">
      <style dangerouslySetInnerHTML={{ __html: investTabStyles }} />
      <div className="container-mobile flex items-center gap-1 py-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "ghost"}
            onClick={() => onTabChange(tab.id)}
            className={`min-w-0 flex-1 flex flex-col items-center gap-1
              ${activeTab === tab.id ? 'bg-[#002E5D] text-white hover:bg-[#4DA8DA]' : 'text-[#002E5D] hover:bg-[#A6E1FA]/20'}
              ${tab.id === 'invest' ? 'invest-tab' : ''}`}
          >
            {tab.id === 'invest' ? <img src={WIcon} alt="" className="w-10 h-10" /> : <span>{tab.icon}</span>}
            <span className="text-[11px] leading-3">{tab.name}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
