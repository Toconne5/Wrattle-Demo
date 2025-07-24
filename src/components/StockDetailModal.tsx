import { useState, useEffect } from 'react';
import { fetchStockData, StockData } from '../services/stockApi';
import { StockChart } from './StockChart';
import { StockDetailHeader } from './StockDetailHeader';
import { StockDetailPrice } from './StockDetailPrice';
import { StockDetailMetrics } from './StockDetailMetrics';
import { StockDetailActions } from './StockDetailActions';
import CommentSection from './feed/CommentSection';
import { Heart, MessageCircle, Share } from 'lucide-react';

interface StockDetailModalProps {
  symbol: string;
  isOpen: boolean;
  onClose: () => void;
  originalPost?: {
    id: string;
    sender: string;
    amount: string;
    timestamp: string;
    likes: number;
    liked: boolean;
    comments: number;
  };
  onUpdatePost?: (postId: string, updates: { likes: number; liked: boolean; comments?: number }) => void;
  onNavigateToSendInvest?: () => void;
  onShare?: (stockSymbol: string, postId?: string) => void;
}

export const StockDetailModal = ({ symbol, isOpen, onClose, originalPost, onUpdatePost, onNavigateToSendInvest, onShare }: StockDetailModalProps) => {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Use originalPost data if available, otherwise use default values
  const [likes, setLikes] = useState(originalPost?.likes || 42);
  const [liked, setLiked] = useState(originalPost?.liked || false);
  const [comments, setComments] = useState(originalPost?.comments || 0);

  useEffect(() => {
    if (isOpen && symbol) {
      loadStockData();
    }
  }, [isOpen, symbol]);

  const loadStockData = async () => {
    setLoading(true);
    try {
      const data = await fetchStockData(symbol);
      setStockData(data);
    } catch (error) {
      console.error('Failed to load stock data:', error);
      // Fallback data for demo
      setStockData({
        symbol: symbol,
        name: `${symbol} Inc.`,
        price: 150.00,
        change: 2.50,
        changePercent: 1.69,
        description: `${symbol} stock information`,
        marketCap: '2.5T',
        peRatio: 25.4,
        high: 152.80,
        low: 148.20,
        volume: '45.2M'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLike = () => {
    const newLiked = !liked;
    const newLikes = newLiked ? likes + 1 : likes - 1;
    
    setLikes(newLikes);
    setLiked(newLiked);
    
    // Update main feed if we have originalPost and onUpdatePost callback
    if (originalPost && onUpdatePost) {
      onUpdatePost(originalPost.id, { likes: newLikes, liked: newLiked, comments });
    }
    
    console.log(`${newLiked ? 'Liked' : 'Unliked'} ${symbol} in detail view`);
  };

  const handleComment = () => {
    setShowComments(!showComments);
    console.log(`${showComments ? 'Hide' : 'Show'} comments for ${symbol} in detail view`);
  };

  const handleShare = () => {
    if (onShare) {
      onShare(symbol, originalPost?.id);
    } else {
      console.log(`Share ${symbol} from detail view`);
    }
  };

  const handleCommentAdded = () => {
    const newCommentCount = comments + 1;
    setComments(newCommentCount);
    
    // Update main feed with new comment count
    if (originalPost && onUpdatePost) {
      onUpdatePost(originalPost.id, { likes, liked, comments: newCommentCount });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <StockDetailHeader
          symbol={symbol}
          stockName={stockData?.name || `${symbol} Inc.`}
          onClose={onClose}
        />

        <StockDetailPrice
          price={stockData?.price || 150.00}
          change={stockData?.change || 2.50}
          changePercent={stockData?.changePercent || 1.69}
        />

        <div className="p-6">
          {loading ? (
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-sm text-gray-500">Loading chart data...</p>
              </div>
            </div>
          ) : (
            <StockChart
              symbol={symbol}
              currentPrice={stockData?.price || 150.00}
              priceChange={stockData?.change || 2.50}
              percentChange={stockData?.changePercent || 1.69}
            />
          )}
        </div>

        <StockDetailMetrics
          marketCap={stockData?.marketCap || '2.5T'}
          peRatio={stockData?.peRatio}
          volume={stockData?.volume || '45.2M'}
          low={stockData?.low || 148.20}
          high={stockData?.high || 152.80}
        />

        <div className="p-6 border-t">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-6">
              <button
                onClick={handleLike}
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
                onClick={handleComment}
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
                onClick={handleShare}
                className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
              >
                <Share className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>

          <CommentSection 
            postId={originalPost?.id || `${symbol}-detail`}
            isVisible={showComments}
            onToggle={() => setShowComments(!showComments)}
            onCommentAdded={handleCommentAdded}
          />
        </div>

        <StockDetailActions 
          symbol={symbol} 
          onNavigateToSendInvest={onNavigateToSendInvest}
        />
      </div>
    </div>
  );
};
