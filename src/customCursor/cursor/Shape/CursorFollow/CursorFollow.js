import { useEffect, useRef } from 'react';
import { useCursor } from '../../../hooks/useCursor';
import { isSet } from '../../../utils/common';
import "./style.scss";

const CursorFollow = ({
    duration = 0.6,
    innerDuration = 0.4,
    size,
    followBg,
    followBorderColor,
    followBorderWidth,
    innerBg,
    innerBorderColor,
    innerBorderWidth,
    domEl = null
}) => {

    const cursorRef = useRef(null);
    const innerCursorRef = useRef(null);
    const { cursorPosition } = useCursor(domEl);

    const animState = useRef({
        outerX: -100, outerY: -100,
        innerX: -100, innerY: -100
    });

    const target = useRef({ x: -100, y: -100 });

    useEffect(() => {
        if (cursorPosition?.x != null && cursorPosition?.y != null) {
            if (animState.current.outerX === -100) {
                animState.current.outerX = cursorPosition.x;
                animState.current.outerY = cursorPosition.y;
                animState.current.innerX = cursorPosition.x;
                animState.current.innerY = cursorPosition.y;
            }
            target.current.x = cursorPosition.x;
            target.current.y = cursorPosition.y;
        }
    }, [cursorPosition]);

    useEffect(() => {
        let animationId;

        const outerLerp = duration > 0 ? Math.min(1, 0.016 / duration * 3.5) : 1;
        const innerLerp = innerDuration > 0 ? Math.min(1, 0.016 / innerDuration * 3.5) : 1;

        const updatePhysics = () => {
            const state = animState.current;
            const t = target.current;

            state.outerX += (t.x - state.outerX) * outerLerp;
            state.outerY += (t.y - state.outerY) * outerLerp;

            state.innerX += (t.x - state.innerX) * innerLerp;
            state.innerY += (t.y - state.innerY) * innerLerp;

            if (cursorRef.current && !isNaN(state.outerX)) {
                cursorRef.current.style.transform = `translate3d(${state.outerX}px, ${state.outerY}px, 0) translate3d(-50%, -50%, 0)`;
            }
            if (innerCursorRef.current && !isNaN(state.innerX)) {
                innerCursorRef.current.style.transform = `translate3d(${state.innerX}px, ${state.innerY}px, 0) translate3d(-50%, -50%, 0)`;
            }

            animationId = requestAnimationFrame(updatePhysics);
        };

        animationId = requestAnimationFrame(updatePhysics);
        return () => cancelAnimationFrame(animationId);
    }, [duration, innerDuration]);

    const followCursorStyle = {
        ...(isSet(size) && { "--advScrollbar-follow-cursor-size": size }),
        ...(isSet(followBg) && { "--advScrollbar-follow-cursor-bg": followBg }),
        ...(isSet(followBorderColor) && { "--advScrollbar-follow-cursor-border-color": followBorderColor }),
        ...(isSet(followBorderWidth) && { "--advScrollbar-follow-cursor-border-width": followBorderWidth }),
        willChange: "transform",
        position: "fixed",
        pointerEvents: "none",
        zIndex: 9998,
        left: 0,
        top: 0
    };

    const innerCursorStyle = {
        ...(isSet(size) && { "--advScrollbar-follow-cursor-size": size }),
        ...(isSet(innerBg) && { "--advScrollbar-follow-inner-cursor-bg": innerBg }),
        ...(isSet(innerBorderColor) && { "--advScrollbar-follow-inner-cursor-border": innerBorderColor }),
        ...(isSet(innerBorderWidth) && { "--advScrollbar-follow-inner-cursor-border-width": innerBorderWidth }),
        willChange: "transform",
        position: "fixed",
        pointerEvents: "none",
        zIndex: 9999,
        left: 0,
        top: 0
    };

    return <>
        <div style={followCursorStyle} className="advScrollbar-follow-cursor" ref={cursorRef}></div>
        <div style={innerCursorStyle} className="advScrollbar-follow-inner-cursor" ref={innerCursorRef}></div>
    </>;
};

export default CursorFollow;