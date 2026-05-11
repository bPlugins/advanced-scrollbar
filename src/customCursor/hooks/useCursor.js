import { useEffect, useState } from 'react';
export const useCursor = (eventEl = window) => {
    const [cursorPosition, setCursorPosition] = useState({});
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {

        if (!eventEl) return;
        const moveCursor = (e) => {
            let x = e.clientX;
            let y = e.clientY;

            setCursorPosition({ x, y });
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);
        // if (!eventEl) return;
        eventEl.addEventListener('mousemove', moveCursor);
        eventEl.addEventListener('mousedown', handleMouseDown);
        eventEl.addEventListener('mouseup', handleMouseUp);

        // domEl.style.cursor = 'none';

        return () => {
            eventEl.removeEventListener('mousemove', moveCursor);
            eventEl.removeEventListener('mousedown', handleMouseDown);
            eventEl.removeEventListener('mouseup', handleMouseUp);
            // domEl.style.cursor = 'auto';
        };
    }, [eventEl, cursorPosition]);

    return {
        cursorPosition,
        isClicking,
        setIsClicking
    };
};