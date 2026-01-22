import React from 'react';

interface ProgressBarProps {
  loading: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ loading }) => {
  if (!loading) {
    return null;
  }

  return (
    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden relative mb-3">
      <div 
        className="h-full bg-purple-500 rounded-full"
        style={{
          animation: 'progress-slide 1.5s ease-in-out infinite',
        }}
      ></div>
    </div>
  );
};

export default ProgressBar;