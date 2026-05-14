/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useRef, useState } from "react";

export const useScrollbar = (
    railRef = null,
    thumbRef = null,
    isShowScrollbar = false,
    mouseScrollStep = 40,
    scrollSpeed = 60,
    touchBehavior = false
) => {
    const [isActive, setIsActive] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [thumbHeight, setThumbHeight] = useState(0);
    const [thumbPosition, setThumbPosition] = useState(0);
    const [dynamicHeight, setDynamicHeight] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isWheel, setIsWheel] = useState(true);
    const [isGrabbing, setIsGrabbing] = useState(false);
    const [scrollPercentage, setScrollPercentage] = useState(0);


    const html = document.documentElement;
    const startY = useRef(0);
    const startScrollTop = useRef(0);
    const animationFrameId = useRef();
    const targetScroll = useRef(0);
    const currentScroll = useRef(0);
    const isScrolling = useRef(false);
    const wheelTimeout = useRef();
    const grabStartY = useRef(0);
    const grabStartScrollTop = useRef(0);
    const isGrabDragging = useRef(false);

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
        setDynamicHeight(scrollPercentage * html.clientHeight)
        setThumbPosition(newPosition);
        handlePercentScroll()
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
        const delta = Math.sign(e.deltaY) * (mouseScrollStep * 1.5);

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
        handlePercentScroll()
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
        handlePercentScroll()
    }, [html, thumbHeight]);

    // Handle grab to scroll dragging
    const handleGrabDrag = useCallback((clientY) => {
        if (!isGrabDragging.current) return;

        const totalScrollableHeight = html.scrollHeight - html.clientHeight;
        if (totalScrollableHeight <= 0) return;

        const dragDistanceY = clientY - grabStartY.current;
        const newScrollTop = grabStartScrollTop.current - dragDistanceY;

        const boundedScrollTop = Math.max(0, Math.min(newScrollTop, totalScrollableHeight));

        // Update both scroll position and thumb position
        html.scrollTop = boundedScrollTop;
        currentScroll.current = boundedScrollTop;
        targetScroll.current = boundedScrollTop;
        updateThumbPosition();
        handlePercentScroll()
    }, [html, updateThumbPosition]);


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
    }

    useEffect(() => {
        setIsActive(isShowScrollbar);
        if (!isShowScrollbar) return;

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
            setDynamicHeight(scrollPercentage * html.clientHeight)
            setThumbPosition(scrollPercentage * maxThumbPosition);
        };

        const handleMouseMove = (e) => {
            if (isDragging && thumbRef?.current) {
                handleThumbDrag(e.clientY);
            } else if (isGrabDragging.current && touchBehavior) {
                handleGrabDrag(e.clientY);
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            isGrabDragging.current = false;
            setIsGrabbing(false);
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
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

        // Grab to scroll handlers
        const handleMouseDown = (e) => {
            // Only activate if not clicking on scrollbar elements
            if (railRef?.current?.contains(e.target) || thumbRef?.current?.contains(e.target)) {
                return;
            }

            // Only activate with left mouse button
            if (e.button !== 0) return;

            isGrabDragging.current = true;
            grabStartY.current = e.clientY;
            grabStartScrollTop.current = html.scrollTop;
            setIsGrabbing(true);
            document.body.style.userSelect = 'none';
            // document.body.style.cursor = 'grabbing';
        };

        // Initial setup
        updateScrollbar();
        targetScroll.current = window.pageYOffset;
        currentScroll.current = window.pageYOffset;

        // Start animation loop immediately
        animationFrameId.current = requestAnimationFrame(animate);
        const handleScroll = (e) => {
            updateScrollbar()
            handlePercentScroll()
            // If you have multiple elements with class 'scrollbar'
            // document.querySelectorAll('.scrollbar').forEach(function (element) {
            //     element.style.height = scrollPercent + '%';
            // });
        }

        // Event listeners
        window.addEventListener('resize', updateScrollbar);
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('wheel', handleWheel, { passive: false });
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousedown', handleMouseDown);

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
            handlePercentScroll()
        });

        // Cleanup function
        return () => {
            html.classList.remove('casb-scrollbar-active');
            window.removeEventListener('resize', updateScrollbar);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('wheel', handleWheel);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('load', updateScrollbar);

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
    }, [
        isLoading,
        isShowScrollbar,
        html,
        thumbRef,
        railRef,
        isDragging,
        handleWheel,
        handleThumbDrag,
        handleGrabDrag,
        animate
    ]);

    return { scrollPercentage, dynamicHeight, isLoading, isActive, thumbHeight, thumbPosition, isDragging, isWheel, isGrabbing };
};