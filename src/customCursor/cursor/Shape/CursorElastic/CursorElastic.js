import { useEffect, useRef } from 'react';
import "./style.scss";
import { useCursor } from '../../../hooks/useCursor';
import { prefix } from '../../../utils/data';

const CursorElastic = ({
  size = 40,
  color = '#EF4444',
  elasticity = 0.6,
  duration = 0.5,
  innerDuration = 0.1,
  borderWidth = "2px",
  domEl = null,
  eventEl = typeof window !== "undefined" ? window : null
}) => {
  const { cursorPosition, isClicking } = useCursor(domEl, eventEl);

  const mainRef = useRef(null);
  const followerRef = useRef(null);
  const animState = useRef({
    mainX: -100, mainY: -100, mainScale: 1,
    folX: -100, folY: -100, folScale: 1,
    folVx: 0, folVy: 0, folVs: 0,
    width: size, height: size,
  });

  const targets = useRef({
    x: -100, y: -100,
    width: size, height: size,
    mainScale: 1, folScale: 1,
    isMovingFast: false
  });

  useEffect(() => {
    if (cursorPosition?.x != null && cursorPosition?.y != null) {

      if (animState.current.mainX === -100) {
        animState.current.mainX = cursorPosition.x;
        animState.current.mainY = cursorPosition.y;
        animState.current.folX = cursorPosition.x;
        animState.current.folY = cursorPosition.y;
      }

      targets.current.x = cursorPosition.x;
      targets.current.y = cursorPosition.y;

      const dx = cursorPosition.x - animState.current.mainX;
      const dy = cursorPosition.y - animState.current.mainY;
      const velocity = Math.sqrt(dx * dx + dy * dy);

      if (velocity > 5) {
        targets.current.width = size * 1.5;
        targets.current.height = size * 0.8;
        targets.current.isMovingFast = true;
      } else {
        targets.current.width = size;
        targets.current.height = size;
        targets.current.isMovingFast = false;
      }
    }
  }, [cursorPosition, size]);

  useEffect(() => {
    targets.current.mainScale = isClicking ? 0.8 : 1;
    targets.current.folScale = isClicking ? 1.2 : 1;
  }, [isClicking]);

  useEffect(() => {
    let animationId;

    const mainLerp = innerDuration > 0 ? Math.min(1, 0.016 / innerDuration * 2.5) : 1;

    const tension = duration > 0 ? Math.min(1, 0.06 / duration) : 1;

    const friction = Math.max(0.1, 1 - (elasticity * 0.5));

    const updatePhysics = () => {
      const state = animState.current;
      const t = targets.current;
      state.mainX += (t.x - state.mainX) * mainLerp;
      state.mainY += (t.y - state.mainY) * mainLerp;
      state.mainScale += (t.mainScale - state.mainScale) * (isClicking ? 0.2 : 0.1);

      state.folVx = (state.folVx + (t.x - state.folX) * tension) * friction;
      state.folVy = (state.folVy + (t.y - state.folY) * tension) * friction;
      state.folX += state.folVx;
      state.folY += state.folVy;

      const sizeLerp = t.isMovingFast ? 0.3 : 0.05;
      state.width += (t.width - state.width) * sizeLerp;
      state.height += (t.height - state.height) * sizeLerp;

      state.folVs = (state.folVs + (t.folScale - state.folScale) * tension) * friction;
      state.folScale += state.folVs;
      if (mainRef.current && !isNaN(state.mainX)) {
        mainRef.current.style.transform = `translate3d(${state.mainX}px, ${state.mainY}px, 0) translate3d(-50%, -50%, 0) scale(${state.mainScale})`;
      }

      if (followerRef.current && !isNaN(state.folX)) {
        followerRef.current.style.transform = `translate3d(${state.folX}px, ${state.folY}px, 0) translate3d(-50%, -50%, 0) scale(${state.folScale})`;
        followerRef.current.style.width = `${state.width}px`;
        followerRef.current.style.height = `${state.height}px`;
      }

      animationId = requestAnimationFrame(updatePhysics);
    };

    animationId = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(animationId);
  }, [duration, innerDuration, elasticity, isClicking]);

  return (
    <>
      <div
        ref={mainRef}
        className={`${prefix}-elastic-cursor`}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: size * 0.3,
          height: size * 0.3,
          backgroundColor: color,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform"
        }}
      />
      <div
        ref={followerRef}
        className={`${prefix}-elastic-cursor-follower`}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          border: `${borderWidth} solid ${color}`,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          // willChange: "transform, width, height"
        }}
      />
    </>
  );
};

export default CursorElastic;