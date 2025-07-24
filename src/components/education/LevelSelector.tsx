
import React from 'react';

interface LevelSelectorProps {
  selectedLevel: string;
  onLevelChange: (level: string) => void;
}

const LevelSelector = ({ selectedLevel, onLevelChange }: LevelSelectorProps) => {
  return (
    <div className="flex justify-center">
      <div className="flex bg-gray-100 rounded-lg p-1">
        {['beginner', 'intermediate', 'advanced'].map((level) => (
          <button
            key={level}
            onClick={() => onLevelChange(level)}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              selectedLevel === level
                ? 'bg-[#4DA8DA] text-white shadow-md'
                : 'text-gray-600 hover:text-[#002E5D]'
            }`}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LevelSelector;
