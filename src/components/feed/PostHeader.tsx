
import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Post } from '../../types/feed';

interface PostHeaderProps {
  post: Post;
  onStockClick: (symbol: string) => void;
}

const PostHeader = ({ post, onStockClick }: PostHeaderProps) => {
  return (
    <div className="flex items-center space-x-3 mb-3">
      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
        <span className="text-white font-semibold text-sm">
          {post.avatar || post.sender.charAt(0)}
        </span>
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-500">{post.timestamp}</p>
      </div>
      {post.stock && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => onStockClick(post.stock)}
          className="text-blue-600 border-blue-200 hover:bg-blue-50"
        >
          <TrendingUp className="w-4 h-4 mr-1" />
          View
        </Button>
      )}
    </div>
  );
};

export default PostHeader;
