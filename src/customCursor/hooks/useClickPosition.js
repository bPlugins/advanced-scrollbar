import { useEffect, useState } from 'react';

export const useClickPosition = (domEl=document) => {
    const [clickPosition, setClickPosition] = useState({ x: -400, y: -400, isTop: false, isBottom: false, isLeft: false, isRight: false });

    useEffect(() => {
        if (!domEl) return;
        const handleClick = (e) => {
            const body = document.body;
            const { clientX, clientY, screenX, screenY } = e;
            const { width, height } = body.getBoundingClientRect();
            setClickPosition({
                x: clientX,
                y: clientY,
                screenX,
                screenY,
                isTop: clientY < height / 2,
                isBottom: clientY > height / 2,
                isLeft: clientX < width / 2,
                isRight: clientX > width / 2
            });
        };

        domEl.addEventListener('click', handleClick);

        return () => {
            domEl.removeEventListener('click', handleClick);
        };
    }, [domEl]);

    return clickPosition;
};