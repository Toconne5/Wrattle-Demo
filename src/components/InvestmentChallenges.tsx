import React, { useState } from 'react';
import { Trophy, Users, Clock, Star } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  participants: number;
  prize: string;
  timeLeft: string;
  status: 'active' | 'upcoming' | 'completed';
  leaderboard: Array<{
    name: string;
    avatar: string;
    returns: string;
    position: number;
  }>;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  progress?: number;
  maxProgress?: number;
}

const InvestmentChallenges: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'challenges' | 'leaderboard' | 'achievements'>('challenges');

  const challenges: Challenge[] = [
    {
      id: '1',
      title: 'Weekly Tech Stock Challenge',
      description: 'Best tech stock pick this week wins!',
      participants: 24,
      prize: '$50 Amazon Gift Card',
      timeLeft: '3 days left',
      status: 'active',
      leaderboard: [
        { name: 'Sarah M.', avatar: '👩‍💼', returns: '+12.5%', position: 1 },
        { name: 'Mike R.', avatar: '👨‍💻', returns: '+8.2%', position: 2 },
        { name: 'Emma L.', avatar: '👩‍🎓', returns: '+6.1%', position: 3 }
      ]
    },
    {
      id: '2',
      title: 'Green Energy Group Pick',
      description: 'Collaborative investment in renewable energy',
      participants: 12,
      prize: 'Shared Returns',
      timeLeft: '5 days left',
      status: 'active',
      leaderboard: [
        { name: 'Tom W.', avatar: '🧑‍🔬', returns: '+15.3%', position: 1 },
        { name: 'Lisa K.', avatar: '👩‍🌾', returns: '+9.7%', position: 2 }
      ]
    },
    {
      id: '3',
      title: 'Beginner Stock Challenge',
      description: 'Perfect for new investors to learn together',
      participants: 8,
      prize: 'Learning Badge',
      timeLeft: 'Starting Monday',
      status: 'upcoming',
      leaderboard: []
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Investment',
      description: 'Made your first stock purchase',
      icon: '🎯',
      earned: true
    },
    {
      id: '2',
      title: 'Social Trader',
      description: 'Sent 5 investment recommendations to friends',
      icon: '🤝',
      earned: true,
      progress: 5,
      maxProgress: 5
    },
    {
      id: '3',
      title: 'Challenge Champion',
      description: 'Won your first investment challenge',
      icon: '🏆',
      earned: false,
      progress: 0,
      maxProgress: 1
    },
    {
      id: '4',
      title: 'Diversified Portfolio',
      description: 'Invest in 10 different stocks',
      icon: '📈',
      earned: false,
      progress: 3,
      maxProgress: 10
    }
  ];

  const weeklyLeaderboard = [
    { name: 'Sarah M.', avatar: '👩‍💼', returns: '+18.2%', badges: 3 },
    { name: 'Mike R.', avatar: '👨‍💻', returns: '+15.7%', badges: 2 },
    { name: 'Emma L.', avatar: '👩‍🎓', returns: '+12.4%', badges: 4 },
    { name: 'Tom W.', avatar: '🧑‍🔬', returns: '+11.1%', badges: 1 },
    { name: 'Lisa K.', avatar: '👩‍🌾', returns: '+9.8%', badges: 3 }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Trophy className="text-yellow-500" size={24} />
          Investment Challenges
        </h2>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'challenges'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Challenges
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'leaderboard'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Leaderboard
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'achievements'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Achievements
          </button>
        </div>
      </div>

      {activeTab === 'challenges' && (
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className={`border rounded-lg p-4 hover:shadow-md transition-shadow ${
                challenge.status === 'active'
                  ? 'border-green-200 bg-green-50'
                  : challenge.status === 'upcoming'
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-1">
                    {challenge.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">{challenge.description}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Users size={16} />
                      {challenge.participants} participants
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {challenge.timeLeft}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                    challenge.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : challenge.status === 'upcoming'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {challenge.status.toUpperCase()}
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    Prize: {challenge.prize}
                  </div>
                </div>
              </div>

              {challenge.leaderboard.length > 0 && (
                <div className="border-t pt-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Current Leaders:</h4>
                  <div className="space-y-1">
                    {challenge.leaderboard.slice(0, 3).map((leader) => (
                      <div key={leader.position} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{leader.avatar}</span>
                          <span className="text-sm font-medium">{leader.name}</span>
                        </div>
                        <span className={`text-sm font-bold ${
                          leader.returns.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {leader.returns}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  {challenge.status === 'active' ? 'Join Challenge' : 'Sign Up'}
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Weekly Leaderboard</h3>
            <span className="text-sm text-gray-500">Resets every Monday</span>
          </div>
          <div className="space-y-3">
            {weeklyLeaderboard.map((user, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg border ${
                  index === 0
                    ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200'
                    : index === 1
                    ? 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200'
                    : index === 2
                    ? 'bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                    index === 0
                      ? 'bg-yellow-500 text-white'
                      : index === 1
                      ? 'bg-gray-400 text-white'
                      : index === 2
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-2xl">{user.avatar}</span>
                  <div>
                    <div className="font-semibold text-gray-900">{user.name}</div>
                    <div className="text-sm text-gray-500">{user.badges} badges earned</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-bold text-lg ${
                    user.returns.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {user.returns}
                  </div>
                  <div className="text-sm text-gray-500">This week</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border ${
                  achievement.earned
                    ? 'bg-green-50 border-green-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`text-3xl ${achievement.earned ? 'grayscale-0' : 'grayscale'}`}>
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-semibold ${
                      achievement.earned ? 'text-green-900' : 'text-gray-700'
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className={`text-sm ${
                      achievement.earned ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {achievement.description}
                    </p>
                    {achievement.progress !== undefined && achievement.maxProgress && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress}/{achievement.maxProgress}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              achievement.earned ? 'bg-green-500' : 'bg-blue-500'
                            }`}
                            style={{
                              width: `${(achievement.progress / achievement.maxProgress) * 100}%`
                            }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                  {achievement.earned && (
                    <Star className="text-yellow-500" size={20} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentChallenges;