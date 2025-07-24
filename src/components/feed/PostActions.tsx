
import React from 'react';
import { Heart, MessageCircle, Share } from 'lucide-react';

interface PostActionsProps {
  likes: number;
  liked: boolean;
  comments: number;
  showComments: boolean;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
}

const PostActions = ({ 
  likes, 
  liked, 
  comments, 
  showComments, 
  onLike, 
  onComment, 
  onShare 
}: PostActionsProps) => {
  return (
    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
      <div className="flex items-center space-x-6">
        <button
          onClick={onLike}
          className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
            liked 
              ? 'text-red-600 hover:text-red-700' 
              : 'text-gray-600 hover:text-red-600'
          }`}
        >
          <Heart 
            className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} 
          />
          <span>{likes}</span>
        </button>
        
        <button
          onClick={onComment}
          className={`flex items-center space-x-2 text-sm font-medium transition-colors ${
            showComments 
              ? 'text-blue-600 hover:text-blue-700' 
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          <MessageCircle className="w-4 h-4" />
          <span>{comments}</span>
        </button>
        
        <button
          onClick={onShare}
          className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
        >
          <Share className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default PostActions;
