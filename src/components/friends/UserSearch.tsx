
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Search, AtSign, Mail, Phone } from 'lucide-react';
import { UserSearchResult } from '../../types/user';

interface UserSearchProps {
  onUserSelect: (user: UserSearchResult) => void;
  placeholder?: string;
}

const UserSearch = ({ onUserSelect, placeholder = "Search by username, name, email, or phone..." }: UserSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<UserSearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock user database for search suggestions
  const mockUsers: UserSearchResult[] = [
    { id: '1', displayName: 'Sarah Mitchell', username: 'sarah_m', email: 'sarah@example.com', phoneNumber: '+1234567890', avatar: '👩‍💼' },
    { id: '2', displayName: 'Mike Rodriguez', username: 'mike_r', email: 'mike@example.com', phoneNumber: '+1234567891', avatar: '👨‍💻' },
    { id: '3', displayName: 'Emma Johnson', username: 'emma_j', email: 'emma@example.com', phoneNumber: '+1234567892', avatar: '👩‍🎓' },
    { id: '4', displayName: 'Tom Wilson', username: 'tom_w', email: 'tom@example.com', phoneNumber: '+1234567893', avatar: '🧑‍🔬' },
    { id: '5', displayName: 'Lisa Kim', username: 'lisa_k', email: 'lisa@example.com', phoneNumber: '+1234567894', avatar: '👩‍🌾' },
    { id: '6', displayName: 'Alex Chen', username: 'alex_c', email: 'alex@example.com', phoneNumber: '+1234567895', avatar: '👨‍🎨' },
    { id: '7', displayName: 'Maya Patel', username: 'maya_p', email: 'maya@example.com', phoneNumber: '+1234567896', avatar: '👩‍⚕️' },
    { id: '8', displayName: 'David Brown', username: 'david_b', email: 'david@example.com', phoneNumber: '+1234567897', avatar: '👨‍🏫' }
  ];

  useEffect(() => {
    if (searchTerm.length >= 2) {
      const filtered = mockUsers.filter(user =>
        user.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.phoneNumber && user.phoneNumber.includes(searchTerm))
      ).slice(0, 6);
      
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm]);

  const handleUserSelect = (user: UserSearchResult) => {
    onUserSelect(user);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  const getSearchIcon = (searchTerm: string) => {
    if (searchTerm.includes('@') && searchTerm.includes('.')) return Mail;
    if (searchTerm.startsWith('@')) return AtSign;
    if (searchTerm.match(/^\+?[\d\s-()]+$/)) return Phone;
    return Search;
  };

  const SearchIcon = getSearchIcon(searchTerm);

  return (
    <div className="relative">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => searchTerm.length >= 2 && setShowSuggestions(true)}
          onBlur={() => {
            // Delay hiding to allow click on suggestions
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          className="pl-10 pr-4"
        />
      </div>

      {/* Search Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {suggestions.map((user) => (
            <div
              key={user.id}
              className="flex items-center space-x-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
              onClick={() => handleUserSelect(user)}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                {user.avatar || user.displayName.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900">{user.displayName}</p>
                <p className="text-sm text-blue-600">@{user.username}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
              <div className="text-xs text-gray-400">
                {searchTerm.includes('@') && searchTerm.includes('.') && <Mail className="w-4 h-4" />}
                {searchTerm.startsWith('@') && <AtSign className="w-4 h-4" />}
                {searchTerm.match(/^\+?[\d\s-()]+$/) && <Phone className="w-4 h-4" />}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSearch;
