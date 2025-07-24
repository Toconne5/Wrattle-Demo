import React, { useState } from 'react';
import { MessageCircle, Heart, AtSign } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  liked: boolean;
}

interface CommentSectionProps {
  postId: string;
  isVisible: boolean;
  onToggle: () => void;
  initialComments?: Comment[];
  onCommentAdded?: () => void;
}

const CommentSection = ({ postId, isVisible, onToggle, initialComments = [], onCommentAdded }: CommentSectionProps) => {
  // Mock existing comments for each post
  const mockExistingComments: { [key: string]: Comment[] } = {
    '1': [
      { id: 'c1', author: 'Mike R.', content: 'Great pick! AAPL is solid for long-term.', timestamp: '1h ago', likes: 3, liked: false },
      { id: 'c2', author: 'Emma L.', content: 'Thanks for the tip! 📈', timestamp: '45m ago', likes: 1, liked: true }
    ],
    '2': [
      { id: 'c3', author: 'Sarah M.', content: 'TSLA is so volatile but exciting!', timestamp: '2h ago', likes: 5, liked: false }
    ],
    '3': [
      { id: 'c4', author: 'Tom W.', content: 'NVDA has been crushing it this year', timestamp: '3h ago', likes: 2, liked: true }
    ],
    '4': [
      { id: 'c5', author: 'Lisa K.', content: 'Microsoft is always a safe bet', timestamp: '4h ago', likes: 4, liked: false }
    ]
  };

  const existingComments = mockExistingComments[postId] || [];
  const [comments, setComments] = useState<Comment[]>([...existingComments, ...initialComments]);
  const [newComment, setNewComment] = useState('');
  const [showFriendSuggestions, setShowFriendSuggestions] = useState(false);
  const [mentionPosition, setMentionPosition] = useState(0);

  // Mock friends for tagging
  const friends = [
    { name: 'Sarah M.', avatar: '👩‍💼' },
    { name: 'Mike R.', avatar: '👨‍💻' },
    { name: 'Emma L.', avatar: '👩‍🎓' },
    { name: 'Tom W.', avatar: '🧑‍🔬' },
    { name: 'Lisa K.', avatar: '👩‍🌾' },
  ];

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewComment(value);
    
    // Check for @ mentions
    const lastAtIndex = value.lastIndexOf('@');
    if (lastAtIndex !== -1 && lastAtIndex === value.length - 1) {
      setShowFriendSuggestions(true);
      setMentionPosition(lastAtIndex);
    } else {
      setShowFriendSuggestions(false);
    }
  };

  const handleFriendSelect = (friendName: string) => {
    const beforeMention = newComment.substring(0, mentionPosition);
    const afterMention = newComment.substring(mentionPosition + 1);
    setNewComment(beforeMention + '@' + friendName + ' ' + afterMention);
    setShowFriendSuggestions(false);
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      content: newComment,
      timestamp: 'now',
      likes: 0,
      liked: false
    };
    
    setComments([...comments, comment]);
    setNewComment('');
    
    // Notify parent component that a comment was added
    if (onCommentAdded) {
      onCommentAdded();
    }
    
    console.log(`Added comment to post ${postId}:`, comment);
  };

  const handleCommentLike = (commentId: string) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, liked: !comment.liked, likes: comment.liked ? comment.likes - 1 : comment.likes + 1 }
        : comment
    ));
  };

  if (!isVisible) return null;

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      {/* Comments List - Now shows existing comments */}
      <div className="space-y-3 mb-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">
                {comment.author.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="bg-gray-50 rounded-lg px-3 py-2">
                <p className="text-sm font-medium text-gray-900">{comment.author}</p>
                <p className="text-sm text-gray-700">{comment.content}</p>
              </div>
              <div className="flex items-center space-x-4 mt-1">
                <button
                  onClick={() => handleCommentLike(comment.id)}
                  className={`flex items-center space-x-1 text-xs ${
                    comment.liked ? 'text-red-600' : 'text-gray-500'
                  } hover:text-red-600 transition-colors`}
                >
                  <Heart className={`w-3 h-3 ${comment.liked ? 'fill-current' : ''}`} />
                  <span>{comment.likes}</span>
                </button>
                <span className="text-xs text-gray-500">{comment.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comment Input */}
      <div className="relative">
        <div className="flex space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-semibold">Y</span>
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              value={newComment}
              onChange={handleCommentChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmitComment()}
              placeholder="Add a comment... (type @ to tag friends)"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button
              onClick={handleSubmitComment}
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-xs"
              disabled={!newComment.trim()}
            >
              Post
            </Button>
          </div>
        </div>

        {/* Friend Suggestions Dropdown */}
        {showFriendSuggestions && (
          <div className="absolute top-full left-11 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
            <div className="p-2">
              <p className="text-xs text-gray-500 mb-2">Tag a friend:</p>
              {friends.map((friend, index) => (
                <button
                  key={index}
                  onClick={() => handleFriendSelect(friend.name)}
                  className="w-full flex items-center space-x-2 px-2 py-1 rounded hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm">{friend.avatar}</span>
                  <span className="text-sm text-gray-700">{friend.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
