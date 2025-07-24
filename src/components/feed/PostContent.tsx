
import React from 'react';
import StockHoverCard from './StockHoverCard';

interface PostContentProps {
  content: string;
  onStockClick: (symbol: string) => void;
}

const PostContent = ({ content, onStockClick }: PostContentProps) => {
  const renderContentWithStockLinks = (content: string) => {
    const stockRegex = /\$([A-Z]{1,5})/g;
    const parts = content.split(stockRegex);
    
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        // This is a stock symbol
        return (
          <StockHoverCard 
            key={index}
            symbol={part}
            onStockClick={onStockClick}
          >
            ${part}
          </StockHoverCard>
        );
      }
      return part;
    });
  };

  return (
    <div className="mb-4">
      <p className="text-gray-800 leading-relaxed">
        {renderContentWithStockLinks(content)}
      </p>
    </div>
  );
};

export default PostContent;
