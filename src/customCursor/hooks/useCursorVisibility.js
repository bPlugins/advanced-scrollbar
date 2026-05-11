import { useEffect, useRef, useState } from 'react';

const useCursorVisibility = (delay = 2000) => {
  const [isVisible, setIsVisible] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    // Set visible if window has focus on mount
    if (document.hasFocus()) {
      setIsVisible(true);
    }

    const handleMouseEnter = () => {
      clearTimeout(timer.current);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      timer.current = setTimeout(() => setIsVisible(false), delay);
    };

    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer.current);
    };
  }, [delay]);

  return isVisible;
};

export default useCursorVisibility;