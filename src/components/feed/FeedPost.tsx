// components/feed/FeedPost.tsx

import React, { useState } from 'react';
import { StockDetailModal } from '../StockDetailModal';
import CommentSection from './CommentSection';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import PostActions from './PostActions';
import { Post } from '../../types/feed';

interface FeedPostProps {
  post: Post;
  onUpdatePost?: (postId: string, updates: { likes: number; liked: boolean; comments?: number }) => void;
  onNavigateToSendInvest?: () => void;
  onShare?: (stockSymbol: string, postId?: string) => void;
}

const currentUser = 'Tommy O.'; // Simulated logged-in user

const formatTransactionText = (
  currentUser: string,
  sender: string,
  recipient: string,
  amount: string,
  stock: string
) => {
  const cleanAmount = amount.replace(/\$/g, ''); // Remove any $ signs

  if (sender === currentUser) {
    return `You sent ${recipient} $${cleanAmount} of $${stock}`;
  } else if (recipient === currentUser) {
    return `${sender} sent you $${cleanAmount} of $${stock}`;
  } else {
    return `${sender} sent ${recipient} $${cleanAmount} of $${stock}`;
  }
};

const FeedPost = ({ post, onUpdatePost, onNavigateToSendInvest, onShare }: FeedPostProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSymbol, setModalSymbol] = useState('');
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);
  const [showComments, setShowComments] = useState(false);

  const handleStockClick = (symbol: string) => {
    setModalSymbol(symbol.replace('$', ''));
    setIsModalOpen(true);
  };

  const handleLike = () => {
    const newLiked = !liked;
    const newLikes = newLiked ? likes + 1 : likes - 1;

    setLiked(newLiked);
    setLikes(newLikes);

    if (onUpdatePost) {
      onUpdatePost(post.id, { likes: newLikes, liked: newLiked, comments });
    }
  };

  const handleComment = () => {
    setShowComments(!showComments);
  };

  const handleShare = () => {
    if (onShare) {
      onShare(post.stock, post.id);
    }
  };

  const handleUpdatePostFromModal = (postId: string, updates: { likes: number; liked: boolean; comments?: number }) => {
    setLikes(updates.likes);
    setLiked(updates.liked);
    if (updates.comments !== undefined) {
      setComments(updates.comments);
    }

    if (onUpdatePost) {
      onUpdatePost(postId, updates);
    }
  };

  const handleCommentAdded = () => {
    const newCommentCount = comments + 1;
    setComments(newCommentCount);

    if (onUpdatePost) {
      onUpdatePost(post.id, { likes, liked, comments: newCommentCount });
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <PostHeader post={post} onStockClick={handleStockClick} />
        <PostContent content={formatTransactionText(currentUser, post.sender, post.recipient, post.amount, post.stock)} onStockClick={handleStockClick} />
        <PostActions
          likes={likes}
          liked={liked}
          comments={comments}
          showComments={showComments}
          onLike={handleLike}
          onComment={handleComment}
          onShare={handleShare}
        />
        <CommentSection
          postId={post.id}
          isVisible={showComments}
          onToggle={() => setShowComments(!showComments)}
          onCommentAdded={handleCommentAdded}
        />
      </div>

      {isModalOpen && modalSymbol && (
        <StockDetailModal
          symbol={modalSymbol}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          originalPost={{
            id: post.id,
            sender: post.sender,
            amount: post.amount,
            timestamp: post.timestamp,
            likes: likes,
            liked: liked,
            comments: comments
          }}
          onUpdatePost={handleUpdatePostFromModal}
          onNavigateToSendInvest={onNavigateToSendInvest}
          onShare={onShare}
        />
      )}
    </>
  );
};

export default FeedPost;
