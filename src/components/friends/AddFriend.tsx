import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { friendsService } from '../../services/friendsService';
import { UserPlus, Mail } from 'lucide-react';

const AddFriend = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  const handleSendRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !email) return;

    setLoading(true);
    setMessage('');

    try {
      await friendsService.sendFriendRequest(
        user.uid,
        email,
        user.displayName || user.email || 'Unknown User',
        user.email || ''
      );
      setMessage('Friend request sent! 🎉');
      setEmail('');
    } catch (error) {
      setMessage('Error sending friend request. Please try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center gap-3 mb-4">
        <UserPlus className="text-primary" size={24} />
        <h2 className="text-xl font-semibold">Add Friends</h2>
      </div>
      
      <form onSubmit={handleSendRequest} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Friend's Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={loading || !email}
          className="w-full bg-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Sending...' : 'Send Friend Request'}
        </button>
        
        {message && (
          <p className={`text-sm ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default AddFriend;