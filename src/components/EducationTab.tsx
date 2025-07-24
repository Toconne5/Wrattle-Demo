import React, { useState } from 'react';
import LearningProgress from './education/LearningProgress';
import LevelSelector from './education/LevelSelector';
import QuickTips from './education/QuickTips';
import CourseGrid from './education/CourseGrid';
import LearningCommunity from './education/LearningCommunity';
import NotificationDropdown from './NotificationDropdown';
import SettingsDropdown from './SettingsDropdown';

const EducationTab = ({ onLogout }: { onLogout: () => void }) => {
  const [selectedLevel, setSelectedLevel] = useState('beginner');

  const courses = {
    beginner: [
      {
        id: 1,
        title: "Stock Market Basics",
        description: "Learn the fundamentals of investing",
        duration: "15 min",
        progress: 0,
        videoId: "p7HKvqRI_Bo",
        thumbnail: "https://img.youtube.com/vi/p7HKvqRI_Bo/maxresdefault.jpg"
      },
      {
        id: 2,
        title: "Understanding Risk and Return",
        description: "Balance risk with potential rewards",
        duration: "12 min",
        progress: 0,
        videoId: "uST4XhXMEP0",
        thumbnail: "https://img.youtube.com/vi/uST4XhXMEP0/maxresdefault.jpg"
      },
      {
        id: 3,
        title: "Building Your First Portfolio",
        description: "Steps to create a diversified portfolio",
        duration: "18 min",
        progress: 0,
        videoId: "gFQNPmLKj1k",
        thumbnail: "https://img.youtube.com/vi/gFQNPmLKj1k/maxresdefault.jpg"
      }
    ],
    intermediate: [
      {
        id: 4,
        title: "Technical Analysis Fundamentals",
        description: "Read charts and identify patterns",
        duration: "25 min",
        progress: 0,
        videoId: "08c4YcDnKBM",
        thumbnail: "https://img.youtube.com/vi/08c4YcDnKBM/maxresdefault.jpg"
      },
      {
        id: 5,
        title: "Value Investing Strategies",
        description: "Find undervalued opportunities",
        duration: "30 min",
        progress: 0,
        videoId: "7RtaGnvyRTM",
        thumbnail: "https://img.youtube.com/vi/7RtaGnvyRTM/maxresdefault.jpg"
      },
      {
        id: 6,
        title: "Options Trading Basics",
        description: "Introduction to options strategies",
        duration: "35 min",
        progress: 0,
        videoId: "SD7sw0bf1ms",
        thumbnail: "https://img.youtube.com/vi/SD7sw0bf1ms/maxresdefault.jpg"
      }
    ],
    advanced: [
      {
        id: 7,
        title: "Advanced Portfolio Management",
        description: "Optimize your investment strategy",
        duration: "40 min",
        progress: 0,
        videoId: "QwCimAWJ3-0",
        thumbnail: "https://img.youtube.com/vi/QwCimAWJ3-0/maxresdefault.jpg"
      },
      {
        id: 8,
        title: "Algorithmic Trading Concepts",
        description: "Understand automated trading systems",
        duration: "45 min",
        progress: 0,
        videoId: "TEWy9vZcxW4",
        thumbnail: "https://img.youtube.com/vi/TEWy9vZcxW4/maxresdefault.jpg"
      },
      {
        id: 9,
        title: "Risk Management Techniques",
        description: "Advanced risk assessment and mitigation",
        duration: "35 min",
        progress: 0,
        videoId: "xf04FoUbJiw",
        thumbnail: "https://img.youtube.com/vi/xf04FoUbJiw/maxresdefault.jpg"
      }
    ]
  };

  const watchVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  const currentCourses = courses[selectedLevel as keyof typeof courses];

  return (
    <div className="relative space-y-6 pb-32 md:pb-8 min-h-screen">
      {/* Top-right corner dropdowns */}
      <div className="flex justify-end space-x-2 pt-4 pr-4 absolute top-0 right-0 z-50">
        <NotificationDropdown />
        <SettingsDropdown onLogout={onLogout} />
      </div>

      {/* Spacer to push content down below dropdowns */}
      <div className="pt-16" />

      <LearningProgress />
      <LevelSelector selectedLevel={selectedLevel} onLevelChange={setSelectedLevel} />
      <QuickTips />
      <CourseGrid courses={currentCourses} onWatchVideo={watchVideo} />
      <LearningCommunity />
    </div>
  );
};

export default EducationTab;
