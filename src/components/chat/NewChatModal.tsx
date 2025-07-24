
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, User, Search } from 'lucide-react';

interface NewChatModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewChatModal = ({ open, onOpenChange }: NewChatModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [groupName, setGroupName] = useState('');

  const friends = [
    { id: '1', name: 'Sarah M.', avatar: '👩‍💼', status: 'online' },
    { id: '2', name: 'Mike R.', avatar: '👨‍💻', status: 'online' },
    { id: '3', name: 'Emma L.', avatar: '👩‍🎓', status: 'offline' },
    { id: '4', name: 'Tom W.', avatar: '🧑‍🔬', status: 'online' },
    { id: '5', name: 'Lisa K.', avatar: '👩‍⚕️', status: 'offline' }
  ];

  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleStartChat = () => {
    // Handle starting new chat
    console.log('Starting new chat with users:', selectedUsers);
    onOpenChange(false);
  };

  const handleCreateGroup = () => {
    // Handle creating new group
    console.log('Creating group:', groupName, 'with users:', selectedUsers);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Start New Chat</DialogTitle>
          <DialogDescription>
            Start a new conversation with friends or create a group chat
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="individual" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="individual" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Individual</span>
            </TabsTrigger>
            <TabsTrigger value="group" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Group</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="individual" className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search friends..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="max-h-60 overflow-y-auto space-y-2">
              {filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setSelectedUsers([friend.id]);
                    handleStartChat();
                  }}
                >
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {friend.avatar}
                    </div>
                    {friend.status === 'online' && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{friend.name}</p>
                    <p className="text-sm text-gray-500 capitalize">{friend.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="group" className="space-y-4">
            <Input
              placeholder="Group name..."
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search friends to add..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="max-h-40 overflow-y-auto space-y-2">
              {filteredFriends.map((friend) => (
                <div
                  key={friend.id}
                  className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer ${
                    selectedUsers.includes(friend.id) 
                      ? 'bg-blue-50 border border-blue-200' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => toggleUserSelection(friend.id)}
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {friend.avatar}
                    </div>
                    {friend.status === 'online' && (
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-500 rounded-full border border-white"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{friend.name}</p>
                  </div>
                  {selectedUsers.includes(friend.id) && (
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {selectedUsers.length > 0 && (
              <Button 
                onClick={handleCreateGroup}
                className="w-full"
                disabled={!groupName.trim()}
              >
                Create Group ({selectedUsers.length} members)
              </Button>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default NewChatModal;
