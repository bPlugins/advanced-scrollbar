import { useEffect, useState } from 'react';
export const useMovePosition = (floating) => {
  const [cursorPosition, setCursorPosition] = useState({});
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [dynamicHeight, setDynamicHeight] = useState(0);

  const html = document.documentElement;

  const handlePercentScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    setScrollPercentage(parseInt(scrollPercent))
    setDynamicHeight(scrollPercent * html.clientHeight)
  }
  
  useEffect(() => {

    if (!window.self === window.top && floating=="off" ) return;
    const moveCursor = (e) => {
      let x = e.clientX;
      let y = e.clientY;

      setCursorPosition({ x, y });
    };

    handlePercentScroll()

    // if (!eventEl) return;
    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('resize', handlePercentScroll);
    window.addEventListener('scroll', handlePercentScroll);
    window.addEventListener('wheel', handlePercentScroll);

    // domEl.style.cursor = 'none';

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('resize', handlePercentScroll);
      window.removeEventListener('scroll', handlePercentScroll);
      window.removeEventListener('wheel', handlePercentScroll);
      // domEl.style.cursor = 'auto';
    };
  }, [window, cursorPosition]);

  return {
    cursorPosition,
    scrollPercentage,
    dynamicHeight
  };
};