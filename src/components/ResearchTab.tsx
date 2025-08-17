import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import NotificationDropdown from './NotificationDropdown';
import SettingsDropdown from './SettingsDropdown';
import GroupChatBubbles from './social/GroupChatBubbles';

interface ResearchTabProps {
  onLogout: () => void;
}

type Friend = {
  id: string;
  name: string;
  username: string;
  avatar: string;   // emoji for now
  online?: boolean;
};

const ALL_FRIENDS: Friend[] = [
  { id: '1', name: 'Sarah Mitchell', username: '@sarah_m', avatar: '👩‍💼', online: true },
  { id: '2', name: 'Mike Reynolds', username: '@mike_r', avatar: '👨‍💻' },
  { id: '3', name: 'Chris Chen', username: '@cchen', avatar: '🧑‍🔬' },
  { id: '4', name: 'Dana Torres', username: '@dana_t', avatar: '🧑‍🎨', online: true },
  { id: '5', name: 'Ivy Nguyen', username: '@ivy_n', avatar: '👩‍🎓' },
  { id: '6', name: 'Tom S.', username: '@tsmith', avatar: '🧑‍🚀' },
  { id: '7', name: 'Al Lopez', username: '@alopez', avatar: '🧑‍🏫' },
  { id: '8', name: 'Bea Park', username: '@beap', avatar: '🧑‍💼' },
];

const ResearchTab = ({ onLogout }: ResearchTabProps) => {
  const [searchAdd, setSearchAdd] = useState('');
  const [searchFriends, setSearchFriends] = useState('');

  const filteredAdd = useMemo(() => {
    const q = searchAdd.trim().toLowerCase();
    if (!q) return [];
    return ALL_FRIENDS.filter(f =>
      f.name.toLowerCase().includes(q) || f.username.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [searchAdd]);

  const filteredFriends = useMemo(() => {
    const q = searchFriends.trim().toLowerCase();
    if (!q) return ALL_FRIENDS;
    return ALL_FRIENDS.filter(f =>
      f.name.toLowerCase().includes(q) || f.username.toLowerCase().includes(q)
    );
  }, [searchFriends]);

  return (
    <div className="space-y-6 pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#002E5D]">Friends</h1>
          <p className="text-gray-600">Connect and chat with your investment community</p>
        </div>
        <div className="flex items-center space-x-2">
          <NotificationDropdown />
          <SettingsDropdown onLogout={onLogout} />
        </div>
      </div>

      {/* little bubbles row */}
      <div className="flex items-center justify-center">
        <GroupChatBubbles />
      </div>

      {/* Add Friends */}
      <Card className="shadow-lg border-[#4DA8DA]/20">
        <CardHeader>
          <CardTitle className="text-[#002E5D]">Add Friends</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={searchAdd}
              onChange={(e) => setSearchAdd(e.target.value)}
              placeholder="Search by @username, name, email"
              className="pl-10"
            />
          </div>

          {filteredAdd.length > 0 && (
            <div className="space-y-2">
              {filteredAdd.map(f => (
                <div key={f.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#A6E1FA] flex items-center justify-center text-lg">
                      {f.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-[#002E5D]">{f.name}</div>
                      <div className="text-xs text-gray-500">{f.username}</div>
                    </div>
                  </div>
                  <Button className="bg-[#4DA8DA] hover:bg-[#002E5D]">Add</Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Your friends */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={searchFriends}
            onChange={(e) => setSearchFriends(e.target.value)}
            placeholder="Search your friends..."
            className="pl-10"
          />
        </div>

        <Card className="shadow-lg border-[#4DA8DA]/20">
          <CardHeader>
            <CardTitle className="text-[#002E5D]">Your Friends ({filteredFriends.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {filteredFriends.map(f => (
              <div
                key={f.id}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-[#A6E1FA]/10"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-11 h-11 rounded-full bg-[#E6F4FB] flex items-center justify-center text-xl">
                      {f.avatar}
                    </div>
                    {f.online && (
                      <span className="absolute -right-1 -bottom-1 w-3 h-3 rounded-full bg-green-500 ring-2 ring-white" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-[#002E5D]">{f.name}</div>
                    <div className="text-xs text-gray-500">{f.username}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline">Chat</Button>
                  <Button className="bg-[#4DA8DA] hover:bg-[#002E5D]">View</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResearchTab;
