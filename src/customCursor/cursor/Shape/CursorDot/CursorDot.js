import { useEffect, useRef } from 'react';
import { useCursor } from '../../../hooks/useCursor';
import { isSet } from '../../../utils/common';
import "./style.scss";

const CursorDot = ({
  size = 12,
  color = '#3B82F6',
  duration = 0.1,
  domEl = null,
  eventEl = typeof window !== "undefined" ? window : null
}) => {
  const { cursorPosition, isClicking } = useCursor(domEl, eventEl);
  const dotRef = useRef(null);

  const animState = useRef({
    x: -100, y: -100,
    scale: 1, vScale: 0
  });

  const targets = useRef({
    x: -100, y: -100, scale: 1
  });

  useEffect(() => {
    if (cursorPosition?.x != null && cursorPosition?.y != null) {
      if (animState.current.x === -100) {
        animState.current.x = cursorPosition.x;
        animState.current.y = cursorPosition.y;
      }
      targets.current.x = cursorPosition.x;
      targets.current.y = cursorPosition.y;
    }
  }, [cursorPosition]);

  useEffect(() => {
    targets.current.scale = isClicking ? 0.7 : 1;
  }, [isClicking]);

  useEffect(() => {
    let animationId;

    const posLerp = duration > 0 ? Math.min(1, 0.016 / duration * 2.5) : 1;

    const scaleTension = 0.2;
    const scaleFriction = 0.7;

    const updatePhysics = () => {
      const state = animState.current;
      const t = targets.current;
      state.x += (t.x - state.x) * posLerp;
      state.y += (t.y - state.y) * posLerp;

      state.vScale = (state.vScale + (t.scale - state.scale) * scaleTension) * scaleFriction;
      state.scale += state.vScale;

      if (dotRef.current && !isNaN(state.x)) {
        dotRef.current.style.transform = `translate3d(${state.x}px, ${state.y}px, 0) translate3d(-50%, -50%, 0) scale(${state.scale})`;
      }

      animationId = requestAnimationFrame(updatePhysics);
    };

    animationId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationId);
  }, [duration]);

  const followCursorStyle = {
    ...(isSet(size) && { "--advScrollbar-cursor-dot-cursor-size": size + 'px' }),
    ...(isSet(color) && { "--advScrollbar-cursor-dot-cursor-bg": color }),
    willChange: "transform"
  };

  return (
    <div
      ref={dotRef}
      className={`advScrollbar-cursor-dotCursor`}
      style={followCursorStyle}
    />
  );
};

export default CursorDot;