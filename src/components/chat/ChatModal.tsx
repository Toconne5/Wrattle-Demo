
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Smile, AtSign } from 'lucide-react';

interface ChatModalProps {
  chat: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChatModal = ({ chat, open, onOpenChange }: ChatModalProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'Sarah M.',
      avatar: '👩‍💼',
      content: 'Check out $NVDA earnings! 📈',
      timestamp: '2:30 PM',
      isOwn: false
    },
    {
      id: '2',
      sender: 'You',
      avatar: '👤',
      content: 'Thanks for the tip! 🚀',
      timestamp: '2:32 PM',
      isOwn: true
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      sender: 'You',
      avatar: '👤',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };
    
    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg h-[600px] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold ${
              chat.type === 'group' 
                ? 'bg-gradient-to-r from-green-400 to-blue-500' 
                : 'bg-gradient-to-r from-blue-400 to-purple-500'
            }`}>
              {chat.avatar}
            </div>
            <div>
              <p className="font-semibold">{chat.name}</p>
              {chat.type === 'group' && (
                <p className="text-sm text-gray-500">{chat.online} members online</p>
              )}
              {chat.type === 'direct' && chat.online && (
                <p className="text-sm text-green-600">Online</p>
              )}
            </div>
          </DialogTitle>
          <DialogDescription>
            {chat.type === 'group' 
              ? `Group chat with ${chat.online} members` 
              : `Direct conversation with ${chat.name}`
            }
          </DialogDescription>
        </DialogHeader>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[70%] ${
                msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''
              }`}>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                  {msg.avatar}
                </div>
                <div className={`rounded-lg p-3 ${
                  msg.isOwn 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {!msg.isOwn && (
                    <p className="text-xs font-semibold mb-1 opacity-70">{msg.sender}</p>
                  )}
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs mt-1 ${
                    msg.isOwn ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Message Input */}
        <div className="flex-shrink-0 border-t pt-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pr-20"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                  <AtSign className="h-4 w-4 text-gray-400" />
                </Button>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                  <Smile className="h-4 w-4 text-gray-400" />
                </Button>
              </div>
            </div>
            <Button 
              onClick={handleSendMessage}
              disabled={!message.trim()}
              size="sm"
              className="px-3"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatModal;
