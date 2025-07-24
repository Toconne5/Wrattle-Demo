
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, MessageCircle } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ChatModal from '../chat/ChatModal';

interface GroupChat {
  id: string;
  name: string;
  avatar: string;
  members: number;
  unread: number;
  lastMessage: string;
  lastMessageTime: string;
  type: 'group';
}

const GroupChatBubbles = () => {
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const groupChats: GroupChat[] = [
    {
      id: '1',
      name: 'Tech Stock Squad',
      avatar: 'TS',
      members: 12,
      unread: 3,
      lastMessage: 'Sarah: NVDA earnings looking good!',
      lastMessageTime: '2m ago',
      type: 'group'
    },
    {
      id: '2',
      name: 'Investment Newbies',
      avatar: 'IN',
      members: 8,
      unread: 1,
      lastMessage: 'Mike: What should I buy first?',
      lastMessageTime: '15m ago',
      type: 'group'
    },
    {
      id: '3',
      name: 'Crypto Corner',
      avatar: 'CC',
      members: 24,
      unread: 0,
      lastMessage: 'Emma: BTC looking bullish 🚀',
      lastMessageTime: '1h ago',
      type: 'group'
    },
    {
      id: '4',
      name: 'Day Traders',
      avatar: 'DT',
      members: 6,
      unread: 5,
      lastMessage: 'Tom: Quick scalp on TSLA',
      lastMessageTime: '30m ago',
      type: 'group'
    }
  ];

  const filteredChats = groupChats.filter(chat =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChatClick = (chat: GroupChat) => {
    setSelectedChat({
      ...chat,
      online: chat.members
    });
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        {/* Group Chat Bubbles */}
        <div className="flex items-center space-x-2">
          {groupChats.slice(0, 4).map((chat) => (
            <div
              key={chat.id}
              className="flex flex-col items-center space-y-1 cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleChatClick(chat)}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                  {chat.avatar}
                </div>
                {chat.unread > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{chat.unread > 9 ? '9+' : chat.unread}</span>
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{chat.members > 99 ? '99+' : chat.members}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and New Chat */}
        <div className="flex items-center space-x-1">
          <Popover open={showSearch} onOpenChange={setShowSearch}>
            <PopoverTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="w-10 h-10 rounded-full p-0 hover:bg-blue-50 border-dashed border-2 border-blue-300"
                title="Search group chats"
              >
                <Search className="h-4 w-4 text-blue-600" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-3">
              <div className="space-y-3">
                <Input
                  placeholder="Search group chats..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-sm"
                />
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {filteredChats.map((chat) => (
                    <div
                      key={chat.id}
                      className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        handleChatClick(chat);
                        setShowSearch(false);
                        setSearchTerm('');
                      }}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                        {chat.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{chat.name}</p>
                        <p className="text-xs text-gray-500">{chat.members} members</p>
                      </div>
                      {chat.unread > 0 && (
                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{chat.unread}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button
            size="sm"
            variant="outline"
            className="w-10 h-10 rounded-full p-0 hover:bg-green-50 border-dashed border-2 border-green-300"
            title="Create new group chat"
          >
            <Plus className="h-4 w-4 text-green-600" />
          </Button>
        </div>
      </div>

      {/* Chat Modal */}
      {selectedChat && (
        <ChatModal
          chat={selectedChat}
          open={!!selectedChat}
          onOpenChange={(open) => !open && setSelectedChat(null)}
        />
      )}
    </>
  );
};

export default GroupChatBubbles;
