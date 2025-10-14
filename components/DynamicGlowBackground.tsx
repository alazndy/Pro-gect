import React from 'react';

interface GlowProps {
  className: string;
}

const Glow: React.FC<GlowProps> = ({ className }) => (
  <div className={`absolute rounded-full filter blur-3xl animate-pulse ${className}`} />
);

// Pre-defined glow styles for different stages
const GLOW_CONFIGS = [
  { className: 'top-0 left-0 w-72 h-72 bg-blue-500/30' },
  { className: 'bottom-0 right-0 w-96 h-96 bg-purple-600/30 delay-1000' },
  { className: 'top-1/4 right-1/4 w-80 h-80 bg-pink-500/30 delay-500' },
  { className: 'bottom-1/4 left-1/4 w-64 h-64 bg-indigo-600/30 delay-1500' },
  // Special completion glow that is more prominent
  { className: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/40 delay-200' },
];


interface DynamicGlowBackgroundProps {
  completionPercentage: number;
}

const DynamicGlowBackground: React.FC<DynamicGlowBackgroundProps> = ({ completionPercentage }) => {
  const getGlowsCount = () => {
    if (completionPercentage === 100) return 5;
    if (completionPercentage >= 75) return 4;
    if (completionPercentage >= 50) return 3;
    if (completionPercentage >= 25) return 2;
    if (completionPercentage > 0) return 1;
    return 0;
  };

  const glowsToShow = getGlowsCount();
  const renderedGlows = GLOW_CONFIGS.slice(0, glowsToShow);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {renderedGlows.map((glow, index) => (
        <Glow key={index} className={glow.className} />
      ))}
    </div>
  );
};

export default DynamicGlowBackground;