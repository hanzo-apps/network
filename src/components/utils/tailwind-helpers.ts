
/**
 * Maps feature color strings to Tailwind CSS color classes
 * This is needed because Tailwind doesn't support dynamic class names via string interpolation
 */
export const getColorClasses = (color: string, type: 'gradient' | 'border' | 'text', isHovered: boolean) => {
  const colorMap = {
    purple: {
      gradient: isHovered ? 'from-neutral-800/30 to-neutral-800/30' : 'from-gray-900/30 to-gray-800/30',
      border: isHovered ? 'border-neutral-500/20' : 'border-gray-700/20',
      text: 'text-neutral-400'
    },
    blue: {
      gradient: isHovered ? 'from-neutral-800/30 to-neutral-800/30' : 'from-gray-900/30 to-gray-800/30',
      border: isHovered ? 'border-neutral-500/20' : 'border-gray-700/20',
      text: 'text-neutral-400'
    },
    indigo: {
      gradient: isHovered ? 'from-neutral-900/30 to-neutral-800/30' : 'from-gray-900/30 to-gray-800/30',
      border: isHovered ? 'border-neutral-500/20' : 'border-gray-700/20',
      text: 'text-neutral-400'
    },
    cyan: {
      gradient: isHovered ? 'from-neutral-900/30 to-neutral-800/30' : 'from-gray-900/30 to-gray-800/30',
      border: isHovered ? 'border-neutral-500/20' : 'border-gray-700/20',
      text: 'text-neutral-400'
    },
    emerald: {
      gradient: isHovered ? 'from-neutral-900/30 to-neutral-800/30' : 'from-gray-900/30 to-gray-800/30',
      border: isHovered ? 'border-neutral-500/20' : 'border-gray-700/20',
      text: 'text-neutral-400'
    },
    amber: {
      gradient: isHovered ? 'from-neutral-900/30 to-neutral-800/30' : 'from-gray-900/30 to-gray-800/30',
      border: isHovered ? 'border-neutral-500/20' : 'border-gray-700/20',
      text: 'text-neutral-400'
    },
    rose: {
      gradient: isHovered ? 'from-neutral-900/30 to-neutral-800/30' : 'from-gray-900/30 to-gray-800/30',
      border: isHovered ? 'border-neutral-500/20' : 'border-gray-700/20',
      text: 'text-neutral-400'
    }
  };

  return colorMap[color]?.[type] || colorMap.purple[type];
};
