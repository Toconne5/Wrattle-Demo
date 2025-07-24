
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Bot, Smile, HelpCircle } from 'lucide-react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'AI Assistant',
      avatar: '🤖',
      content: 'Hi! I\'m your investment assistant. Ask me about financial concepts, market insights, or how to use this app! 📊',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: false
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const userMessage = {
      id: Date.now().toString(),
      sender: 'You',
      avatar: '👤',
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        sender: 'AI Assistant',
        avatar: '🤖',
        content: getAIResponse(message),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: false
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
    
    setMessage('');
  };

  const getAIResponse = (userMessage: string) => {
    const responses = [
      "Great question! Let me help you understand that concept better. 📚",
      "That's an interesting market observation! Here's what you should know... 💡",
      "I can help you with that investment strategy. Consider these factors... 📈",
      "Good thinking! Here are some insights about that stock or market trend... 🔍",
      "Let me break down that financial concept for you in simple terms... 🎯"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating AI Assistant Button */}
      <div className="fixed bottom-24 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-200"
          title="AI Assistant - Get help with investing"
        >
          <Bot className="h-6 w-6 text-white" />
        </Button>
      </div>

      {/* AI Chat Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg h-[600px] flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white text-sm font-bold">
                🤖
              </div>
              <div>
                <p className="font-semibold">AI Investment Assistant</p>
                <p className="text-sm text-green-600">Always available</p>
              </div>
            </DialogTitle>
            <DialogDescription>
              Your personal AI assistant for investment advice, market insights, and app help
            </DialogDescription>
          </DialogHeader>
          
          {/* Quick Help Buttons */}
          <div className="flex-shrink-0 flex flex-wrap gap-2 pb-2 border-b">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setMessage("What is dollar-cost averaging?")}
              className="text-xs"
            >
              💰 DCA Strategy
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setMessage("How do I read stock charts?")}
              className="text-xs"
            >
              📊 Chart Reading
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setMessage("What's the difference between stocks and ETFs?")}
              className="text-xs"
            >
              📈 Stocks vs ETFs
            </Button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 py-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${
                  msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''
                }`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-semibold flex-shrink-0 ${
                    msg.isOwn 
                      ? 'bg-gradient-to-r from-blue-400 to-purple-500'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600'
                  }`}>
                    {msg.avatar}
                  </div>
                  <div className={`rounded-lg p-3 ${
                    msg.isOwn 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gradient-to-r from-purple-50 to-blue-50 text-gray-900 border'
                  }`}>
                    {!msg.isOwn && (
                      <p className="text-xs font-semibold mb-1 text-purple-600">{msg.sender}</p>
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
                  placeholder="Ask about investing, markets, or app features..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pr-12"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                    <Smile className="h-4 w-4 text-gray-400" />
                  </Button>
                </div>
              </div>
              <Button 
                onClick={handleSendMessage}
                disabled={!message.trim()}
                size="sm"
                className="px-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIAssistant;
