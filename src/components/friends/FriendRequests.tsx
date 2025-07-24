import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { friendsService } from '../../services/friendsService';
import { FriendRequest } from '../../types/friends';
import { Users, Check, X } from 'lucide-react';

const FriendRequests = () => {
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadFriendRequests();
  }, [user]);

  const loadFriendRequests = async () => {
    if (!user?.email) return;
    
    try {
      const pendingRequests = await friendsService.getPendingFriendRequests(user.email);
      setRequests(pendingRequests);
    } catch (error) {
      console.error('Error loading friend requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    // We'll implement this in the next step
    console.log('Accept request:', requestId);
  };

  const handleDeclineRequest = async (requestId: string) => {
    // We'll implement this in the next step
    console.log('Decline request:', requestId);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center gap-3 mb-4">
        <Users className="text-primary" size={24} />
        <h2 className="text-xl font-semibold">Friend Requests</h2>
        {requests.length > 0 && (
          <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
            {requests.length}
          </span>
        )}
      </div>

      {requests.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No pending friend requests
        </p>
      ) : (
        <div className="space-y-3">
          {requests.map((request) => (
            <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{request.fromUserName}</p>
                <p className="text-sm text-gray-600">{request.fromUserEmail}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleAcceptRequest(request.id)}
                  className="p-2 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => handleDeclineRequest(request.id)}
                  className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendRequests;