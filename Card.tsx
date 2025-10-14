
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ children, className = '', glowColor = 'blue', onClick }) => {
  const glowClasses = {
    blue: 'hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] dark:border-blue-500/20',
    purple: 'hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] dark:border-purple-500/20',
    green: 'hover:shadow-[0_0_25px_rgba(34,197,94,0.3)] dark:border-green-500/20',
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white/70 dark:bg-gray-900/30 backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/10 transition-all duration-300 ${glowClasses[glowColor]} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
