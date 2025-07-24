import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserPlus, MessageCircle, Users, Clock } from 'lucide-react';
import NotificationDropdown from './notifications/NotificationDropdown';
import SettingsDropdown from './SettingsDropdown';
import GroupChatBubbles from './social/GroupChatBubbles';
import UserSearch from './friends/UserSearch';
import { useAuth } from '../contexts/AuthContext';
import { friendsService } from '../services/friendsService';
import { Friend, FriendRequest } from '../types/friends';
import { UserSearchResult } from '../types/user';
import ChatModal from './chat/ChatModal';
import NewChatModal from './chat/NewChatModal';

interface ResearchTabProps {
  onLogout: () => void;
}

const ResearchTab = ({ onLogout }: ResearchTabProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [showNewChat, setShowNewChat] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    loadFriendsData();
  }, [user]);

  const loadFriendsData = async () => {
    if (!user?.email) return;
    
    try {
      const [friendsList, pendingRequests] = await Promise.all([
        friendsService.getFriends(user.uid),
        friendsService.getPendingFriendRequests(user.email)
      ]);
      
      setFriends(friendsList);
      setFriendRequests(pendingRequests);
    } catch (error) {
      console.error('Error loading friends data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelect = async (selectedUser: UserSearchResult) => {
    if (!user) return;

    try {
      await friendsService.sendFriendRequest(
        user.uid,
        selectedUser.email,
        user.displayName || user.email || 'Unknown User',
        user.email || ''
      );
      setMessage(`Friend request sent to ${selectedUser.displayName}! 🎉`);
    } catch (error) {
      setMessage('Error sending friend request. Please try again.');
      console.error(error);
    }
  };

  const handleAcceptRequest = async (requestId: string, fromUserId: string) => {
    try {
      await friendsService.acceptFriendRequest(requestId, user?.uid || '', fromUserId);
      setMessage('Friend request accepted! 🎉');
      loadFriendsData();
    } catch (error) {
      setMessage('Error accepting friend request.');
      console.error(error);
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await friendsService.rejectFriendRequest(requestId);
      setMessage('Friend request rejected.');
      loadFriendsData();
    } catch (error) {
      setMessage('Error rejecting friend request.');
      console.error(error);
    }
  };

  const mockFriends = [
    { id: '1', name: 'Sarah Mitchell', username: 'sarah_m', avatar: '👩‍💼', online: true },
    { id: '2', name: 'Mike Rodriguez', username: 'mike_r', avatar: '👨‍💻', online: true },
    { id: '3', name: 'Emma Johnson', username: 'emma_j', avatar: '👩‍🎓', online: false },
    { id: '4', name: 'Tom Wilson', username: 'tom_w', avatar: '🧑‍🔬', online: true },
    { id: '5', name: 'Lisa Kim', username: 'lisa_k', avatar: '👩‍🌾', online: false },
    { id: '6', name: 'Alex Chen', username: 'alex_c', avatar: '👨‍🎨', online: true },
    { id: '7', name: 'Maya Patel', username: 'maya_p', avatar: '👩‍⚕️', online: true },
    { id: '8', name: 'David Brown', username: 'david_b', avatar: '👨‍🏫', online: false }
  ];

  const filteredFriends = mockFriends.filter(friend => 
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartChat = (friend: any) => {
    setSelectedChat({
      id: friend.id,
      name: friend.name,
      avatar: friend.avatar,
      type: 'direct',
      online: friend.online
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Group Chat Bubbles */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-[#002E5D]">Friends</h2>
          <p className="text-gray-600">Connect and chat with your investment community</p>
        </div>
        
        {/* Group Chat Bubbles */}
        <div className="flex-1 mx-8 flex justify-center">
          <GroupChatBubbles />
        </div>

        <div className="flex items-center space-x-2">
          <NotificationDropdown />
          <SettingsDropdown onLogout={onLogout} />
        </div>
      </div>

      {/* Enhanced User Search */}
      <Card className="shadow-lg border-[#4DA8DA]/20">
        <CardHeader>
          <CardTitle className="text-[#002E5D] flex items-center space-x-2">
            <UserPlus className="w-5 h-5" />
            <span>Add Friends</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <UserSearch 
            onUserSelect={handleUserSelect}
            placeholder="Search by @username, name, email, or phone..."
          />
          {message && (
            <p className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
              {message}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Friend Requests */}
      {friendRequests.length > 0 && (
        <Card className="shadow-lg border-[#4DA8DA]/20">
          <CardHeader>
            <CardTitle className="text-[#002E5D] flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Friend Requests</span>
              <span className="bg-[#4DA8DA] text-white text-xs px-2 py-1 rounded-full">
                {friendRequests.length}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {friendRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-[#002E5D]">{request.fromUserName}</p>
                    <p className="text-sm text-gray-600">{request.fromUserEmail}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleAcceptRequest(request.id, request.fromUserId)}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRejectRequest(request.id)}
                      className="border-red-300 text-red-600 hover:bg-red-50"
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Friend Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Search your friends..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Clean Friends List */}
      <Card className="shadow-lg border-[#4DA8DA]/20">
        <CardHeader>
          <CardTitle className="text-[#002E5D] flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>Your Friends ({filteredFriends.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredFriends.map((friend) => (
              <div key={friend.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-[#A6E1FA]/10 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {friend.avatar}
                    </div>
                    {friend.online && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-[#002E5D] text-lg">{friend.name}</p>
                    <p className="text-sm text-blue-600">@{friend.username}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleStartChat(friend)}
                  className="bg-[#4DA8DA] hover:bg-[#002E5D]"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Chat
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* New Chat Button */}
      <div className="text-center">
        <Button
          onClick={() => setShowNewChat(true)}
          className="bg-gradient-to-r from-[#002E5D] to-[#4DA8DA] hover:from-[#4DA8DA] hover:to-[#002E5D]"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Start Group Chat
        </Button>
      </div>

      {/* Chat Modals */}
      {selectedChat && (
        <ChatModal
          chat={selectedChat}
          open={!!selectedChat}
          onOpenChange={(open) => !open && setSelectedChat(null)}
        />
      )}

      <NewChatModal
        open={showNewChat}
        onOpenChange={setShowNewChat}
      />
    </div>
  );
};

export default ResearchTab;
