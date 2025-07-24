
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Heart, MessageCircle } from "lucide-react";

const QuickTips = () => {
  const shortVideos = [
    {
      id: 1,
      title: "Quick Stock Tip #1",
      author: "InvestorPro",
      likes: "2.3K",
      comments: "156",
      thumbnail: "https://img.youtube.com/vi/p7HKvqRI_Bo/maxresdefault.jpg",
      duration: "15s"
    },
    {
      id: 2,
      title: "Market Trend Alert",
      author: "StockGuru",
      likes: "1.8K",
      comments: "92",
      thumbnail: "https://img.youtube.com/vi/uST4XhXMEP0/maxresdefault.jpg",
      duration: "22s"
    },
    {
      id: 3,
      title: "Portfolio Hack",
      author: "WealthBuilder",
      likes: "3.1K",
      comments: "203",
      thumbnail: "https://img.youtube.com/vi/gFQNPmLKj1k/maxresdefault.jpg",
      duration: "18s"
    }
  ];

  return (
    <Card className="shadow-lg border-[#4DA8DA]/20">
      <CardHeader>
        <CardTitle className="text-[#002E5D] flex items-center">
          <Play className="w-5 h-5 mr-2" />
          Quick Tips & Trends
        </CardTitle>
        <p className="text-sm text-gray-600">Short videos for quick learning</p>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          {shortVideos.map((video) => (
            <div key={video.id} className="relative bg-gray-100 rounded-lg overflow-hidden aspect-[9/16] md:aspect-video">
              <img 
                src={video.thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <Play className="w-8 h-8" />
                </Button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
                <h4 className="font-semibold text-sm">{video.title}</h4>
                <p className="text-xs opacity-90">@{video.author}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="flex items-center">
                      <Heart className="w-3 h-3 mr-1" />
                      {video.likes}
                    </span>
                    <span className="flex items-center">
                      <MessageCircle className="w-3 h-3 mr-1" />
                      {video.comments}
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {video.duration}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickTips;
