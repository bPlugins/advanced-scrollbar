export const isSet = v => v !== undefined && v !== null && v !== '';

export const generateGradient = (colorObject) => {
  const validColors = Object.values(colorObject).filter(color => color && String(color).trim());

  if (validColors.length >= 2) {
    return `linear-gradient(to top, ${validColors.join(', ')})`;
  } else if (validColors.length === 1) {
    return validColors[0];
  } else {
    return 'transparent';
  }
}

export const getBorderCSS = (border = {}) => {
  // Default values
  const defaults = {
    top: '1',
    right: '1',
    bottom: '1',
    left: '1',
    style: 'solid',
    color: '#fff'
  };

  // Merge with defaults
  const finalBorder = { ...defaults, ...border };

  // Extract values
  const { top, right, bottom, left, style, color } = finalBorder;

  // Check if all sides have the same width
  if (top === right && right === bottom && bottom === left) {
    // Use shorthand if all sides are equal
    return `${top}px ${style} ${color}`;
  }
}