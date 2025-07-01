import React from 'react';

interface QuestionMarkProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

const QuestionMark: React.FC<QuestionMarkProps> = ({ 
  size = 24, 
  color = 'currentColor',
  strokeWidth = 1.5,
  className = '' 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Question mark curve */}
      <path d="M9 9a3 3 0 1 1 6 0c0 2-3 3-3 3" />
      {/* Dot at bottom */}
      <circle cx="12" cy="20" r="1" fill={color} stroke="none" />
    </svg>
  );
};

export default QuestionMark;