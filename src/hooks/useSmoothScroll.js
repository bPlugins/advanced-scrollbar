import { useCallback, useEffect, useRef, useState } from "react";

export const useScrollbar = (
    railRef = null,
    thumbRef = null,
    isShowScrollbar = false,
    mouseScrollStep = 40,
    scrollSpeed = 60,
) => {
    const [isActive, setIsActive] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [thumbHeight, setThumbHeight] = useState(0);
    const [thumbPosition, setThumbPosition] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isWheel, setIsWheel] = useState(true);

    const html = document.documentElement;
    const startY = useRef(0);
    const startScrollTop = useRef(0);
    const animationFrameId = useRef();
    const targetScroll = useRef(0);
    const currentScroll = useRef(0);
    const isScrolling = useRef(false);
    const wheelTimeout = useRef();

    // Update thumb position based on current scroll
    const updateThumbPosition = useCallback(() => {
        if (!thumbRef?.current) return;

        const scrollableHeight = html.scrollHeight - html.clientHeight;
        if (scrollableHeight <= 0) return;

        // Calculate thumb height (minimum 20px)
        const newThumbHeight = Math.max(
            (html.clientHeight / html.scrollHeight) * html.clientHeight,
            20
        );
        setThumbHeight(newThumbHeight);

        // Update thumb position based on current scroll
        const scrollPercentage = currentScroll.current / scrollableHeight;
        const maxThumbPosition = html.clientHeight - newThumbHeight;
        const newPosition = scrollPercentage * maxThumbPosition;

        setThumbPosition(newPosition);
    }, [html, thumbRef]);

    // Smooth scroll animation
    const animate = useCallback(() => {
        if (isScrolling.current) {
            const difference = targetScroll.current - currentScroll.current;

            // Adjusted speed calculation:
            // - Higher scrollSpeed (>60) = slower, smoother (smaller steps)
            // - Lower scrollSpeed (<60) = faster, less smooth (larger steps)
            const speedFactor = scrollSpeed / 60; // Normalize to 1.0 at 60
            const step = difference * (0.1 / speedFactor); // Inverse relationship

            currentScroll.current += step;

            window.scrollTo(0, currentScroll.current);
            updateThumbPosition();

            if (Math.abs(difference) < 1) {
                currentScroll.current = targetScroll.current;
                window.scrollTo(0, currentScroll.current);
                isScrolling.current = false;
            }
        }

        animationFrameId.current = requestAnimationFrame(animate);
    }, [scrollSpeed, updateThumbPosition]);

    // Wheel event handler
    const handleWheel = useCallback((e) => {
        e.preventDefault();
        setIsWheel(false);

        // Calculate scroll amount based on mouseScrollStep
        const delta = Math.sign(e.deltaY) * mouseScrollStep;

        // Update target position
        targetScroll.current += delta;

        // Keep within document bounds
        const maxScroll = html.scrollHeight - window.innerHeight;
        targetScroll.current = Math.max(0, Math.min(targetScroll.current, maxScroll));

        if (!isScrolling.current) {
            isScrolling.current = true;
        }

        // Clear any existing timeout
        if (wheelTimeout.current) {
            clearTimeout(wheelTimeout.current);
        }

        // Set timeout to reset wheel state
        wheelTimeout.current = setTimeout(() => {
            setIsWheel(true);
        }, 500);

    }, [mouseScrollStep, html]);

    // Handle thumb dragging
    const handleThumbDrag = useCallback((clientY) => {
        const totalScrollableHeight = html.scrollHeight - html.clientHeight;
        if (totalScrollableHeight <= 0) return;

        const dragDistanceY = clientY - startY.current;
        const availableTrackHeight = html.clientHeight - thumbHeight;
        const scrollRatio = dragDistanceY / availableTrackHeight;

        const unboundedScrollTop = startScrollTop.current + (scrollRatio * totalScrollableHeight);
        const boundedScrollTop = Math.max(0, Math.min(unboundedScrollTop, totalScrollableHeight));

        // Update both scroll position and thumb position
        html.scrollTop = boundedScrollTop;
        currentScroll.current = boundedScrollTop;
        targetScroll.current = boundedScrollTop;

        const scrollProgress = boundedScrollTop / totalScrollableHeight;
        const newThumbPosition = scrollProgress * availableTrackHeight;
        setThumbPosition(newThumbPosition);
    }, [html, thumbHeight]);

    useEffect(() => {
        setIsActive(isShowScrollbar);
        if (!isShowScrollbar) return;
        html.classList.add('casb-scrollbar-active');

        const updateScrollbar = () => {
            if (!thumbRef?.current) return;

            const scrollableHeight = html.scrollHeight - html.clientHeight;
            if (scrollableHeight <= 0) return;

            // Update thumb dimensions and position
            const newThumbHeight = Math.max(
                (html.clientHeight / html.scrollHeight) * html.clientHeight,
                20
            );
            setThumbHeight(newThumbHeight);

            const scrollPercentage = html.scrollTop / scrollableHeight;
            const maxThumbPosition = html.clientHeight - newThumbHeight;
            setThumbPosition(scrollPercentage * maxThumbPosition);
        };

        const handleMouseMove = (e) => {
            if (!isDragging || !thumbRef?.current) return;
            handleThumbDrag(e.clientY);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.body.style.userSelect = '';
        };

        const handleRailClick = (e) => {
            e.preventDefault();
            if (!railRef.current || !thumbRef.current) return;

            const scrollableHeight = html.scrollHeight - html.clientHeight;
            if (scrollableHeight <= 0) return;

            const viewportHeight = html.clientHeight;
            const currentScrollTop = html.scrollTop;
            const thumbRect = thumbRef.current.getBoundingClientRect();

            let newScrollTop;
            if (e.clientY < thumbRect.top) {
                newScrollTop = currentScrollTop - viewportHeight;
            } else if (e.clientY > thumbRect.bottom) {
                newScrollTop = currentScrollTop + viewportHeight;
            } else {
                return;
            }

            const boundedScrollTop = Math.max(0, Math.min(newScrollTop, scrollableHeight));
            targetScroll.current = boundedScrollTop;
            isScrolling.current = true;
        };

        // Initial setup
        updateScrollbar();
        targetScroll.current = window.pageYOffset;
        currentScroll.current = window.pageYOffset;

        // Start animation loop immediately
        animationFrameId.current = requestAnimationFrame(animate);

        // Event listeners
        window.addEventListener('resize', updateScrollbar);
        window.addEventListener('scroll', updateScrollbar);
        window.addEventListener('wheel', handleWheel, { passive: false });
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        if (thumbRef.current) {
            thumbRef.current.addEventListener('mousedown', (e) => {
                e.stopPropagation();
                setIsDragging(true);
                startY.current = e.clientY;
                startScrollTop.current = html.scrollTop;
                document.body.style.userSelect = 'none';
            });

            thumbRef.current.addEventListener('click', (e) => {
                e.stopPropagation();
            });
        }

        if (railRef.current) {
            railRef.current.addEventListener('click', handleRailClick);
        }

        window.addEventListener('load', () => {
            updateScrollbar();
            setIsLoading(false);
        });



        // In the cleanup function of useEffect:
        return () => {
            html.classList.remove('casb-scrollbar-active');
            window.removeEventListener('resize', updateScrollbar);
            window.removeEventListener('scroll', updateScrollbar);
            window.removeEventListener('wheel', handleWheel);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('load', updateScrollbar);

            // Fix for thumbRef event listeners
            // if (thumbRef.current) {
                // const thumbElement = thumbRef.current;
                // thumbElement.removeEventListener('mousedown', handleThumbMouseDown);
                // thumbElement.removeEventListener('click', handleThumbClick);
            // }

            if (railRef.current) {
                railRef.current.removeEventListener('click', handleRailClick);
            }

            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }

            if (wheelTimeout.current) {
                clearTimeout(wheelTimeout.current);
            }

            isScrolling.current = false;
        };
    }, [ isShowScrollbar, html, thumbRef, railRef, isDragging, handleWheel, handleThumbDrag, animate ]);

    return { isLoading, isActive, thumbHeight, thumbPosition, isDragging, isWheel };
};