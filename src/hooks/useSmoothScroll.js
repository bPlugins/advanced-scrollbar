// import { useCallback, useEffect, useRef, useState } from "react";

// export const useScrollbar = (railRef = null, thumbRef = null, isShowScrollbar = false, mouseScrollStep = 40, scrollSpeed = 60) => {
//     const isClick = true, isDrag = true;
//     const [isActive, setIsActive] = useState(false);
//     const startY = useRef(0);
//     const startScrollTop = useRef(0);
//     const [isDragging, setIsDragging] = useState(false);
//     const [thumbHeight, setThumbHeight] = useState("");
//     const [thumbPosition, setThumbPosition] = useState(0);
//     const [isLoading, setIsLoading] = useState(true);
//     const [isWheel, setIsWheel] = useState(true);
//     const animationFrameId = useRef();
//     const targetScroll = useRef(0);
//     const currentScroll = useRef(0);
//     const isScrolling = useRef(false);

//     const html = document.documentElement;


//     const animate = useCallback(() => {
//         if (isScrolling.current) {
//             const difference = targetScroll.current - currentScroll.current;
//             currentScroll.current += difference / (scrollSpeed / 10);

//             window.scrollTo(0, currentScroll.current);

//             if (Math.abs(difference) < 0.5) {
//                 currentScroll.current = targetScroll.current;
//                 window.scrollTo(0, currentScroll.current);
//                 isScrolling.current = false;
//             }
//         }

//         animationFrameId.current = requestAnimationFrame(animate);
//     }, [scrollSpeed]);


//     let wheelId;

//     const handleWheel = useCallback((e) => {
//         e.preventDefault();
//         setIsWheel(false)
//         // Calculate scroll amount based on mouseScrollStep
//         const delta = Math.sign(e.deltaY) * mouseScrollStep;

//         // Update target position
//         targetScroll.current += delta;

//         // Keep within document bounds
//         // targetScroll.current = Math.max(
//         //   0,
//         //   Math.min(
//         //     targetScroll.current,
//         //     document.body.scrollHeight - window.innerHeight
//         //   )
//         // );
//         const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
//         targetScroll.current = Math.max(
//             0,
//             Math.min(targetScroll.current, maxScroll)
//         );

//         if (!isScrolling.current) {
//             isScrolling.current = true;
//         }



//         wheelId = setTimeout(() => {
//             setIsWheel(true);
//         }, 500);

//     }, [mouseScrollStep]);

//     const handleScroll = useCallback((e) => {
//         if (isScrolling.current) {
//             e.preventDefault();
//             window.scrollTo(0, currentScroll.current);
//         }
//     }, []);

//     // Function to handle thumb dragging and update position
//     const handleThumbDrag = (clientY) => {
//         // 1. Get current metrics
//         const totalScrollableHeight = html.scrollHeight - html.clientHeight;
//         if (totalScrollableHeight <= 0) return; // No scrolling needed

//         // 2. Calculate drag distance and scroll ratio
//         const dragDistanceY = clientY - startY.current;
//         const availableTrackHeight = html.clientHeight - thumbHeight;

//         // 3. Calculate new scroll position with boundaries
//         const scrollRatio = dragDistanceY / availableTrackHeight;
//         const unboundedScrollTop = startScrollTop.current + (scrollRatio * totalScrollableHeight);
//         const boundedScrollTop = Math.max(0, Math.min(unboundedScrollTop, totalScrollableHeight));

//         // 4. Update scroll position immediately
//         html.scrollTop = boundedScrollTop;

//         // 5. Calculate and set thumb position
//         const scrollProgress = boundedScrollTop / totalScrollableHeight;
//         const newThumbPosition = scrollProgress * availableTrackHeight;

//         // Use direct assignment if possible, or ensure setThumbPosition is synchronous
//         // thumbRef.current.style.top= `${newThumbPosition}px`;
//         // Alternatively:
//         setThumbPosition(newThumbPosition);
//     };

//     useEffect(() => {
//         setIsActive(isShowScrollbar);
//         if (!isShowScrollbar) return;
//         html.classList.add('csb-scrollbar-active');

//         const updateScrollbar = (e) => {
//             handleScroll(e)
//             if (!thumbRef.current) return;

//             const scrollableHeight = html.scrollHeight - html.clientHeight;
//             if (scrollableHeight <= 0) return;

//             // Calculate thumb height (minimum 20px)
//             const newThumbHeight = Math.max(
//                 (html.clientHeight / html.scrollHeight) * html.clientHeight,
//                 20
//             );
//             setThumbHeight(newThumbHeight);

//             // Update thumb position
//             const scrollPercentage = html.scrollTop / scrollableHeight;
//             const maxThumbPosition = html.clientHeight - newThumbHeight;
//             setThumbPosition(scrollPercentage * maxThumbPosition);
//         };

//         const handleMouseMove = (e) => {
//             // e.preventDefault();
//             if (!isDragging || !thumbRef?.current || !isDrag) return;
//             handleThumbDrag(e.clientY);
//         };

//         const handleMouseUp = () => {
//             setIsDragging(false);
//             document.body.style.cursor = '';
//             document.body.style.userSelect = '';

//         };

//         const handleMouseClick = (e) => {

//             e.preventDefault();
//             if (!railRef.current || !thumbRef.current || !isClick) return;

//             const scrollableHeight = html.scrollHeight - html.clientHeight;
//             if (scrollableHeight <= 0) return;

//             const viewportHeight = html.clientHeight;
//             const currentScrollTop = html.scrollTop;
//             const thumbRect = thumbRef.current.getBoundingClientRect();

//             let newScrollTop;

//             if (e.clientY < thumbRect.top) {
//                 // Clicked above the thumb, scroll up by one page (100dvh)
//                 newScrollTop = currentScrollTop - viewportHeight;
//             } else if (e.clientY > thumbRect.bottom) {
//                 // Clicked below the thumb, scroll down by one page (100dvh)
//                 newScrollTop = currentScrollTop + viewportHeight;
//             } else {
//                 // Clicked on the thumb itself, do nothing.
//                 return;
//             }

//             // Clamp the new scroll position to stay within the valid range.
//             const boundedScrollTop = Math.max(0, Math.min(newScrollTop, scrollableHeight));
//             window.scrollTo({
//                 top: boundedScrollTop,
//                 behavior: 'smooth',
//             });
//         };

//         // Initial setup
//         updateScrollbar();
//         window.addEventListener('resize', updateScrollbar);
//         window.addEventListener('scroll', updateScrollbar,{ passive: false });

//         // Drag events
//         thumbRef.current?.addEventListener('mousedown', (e) => {
//             e.stopPropagation();
//             setIsDragging(true);
//             startY.current = e.clientY;
//             startScrollTop.current = html.scrollTop;
//             // document.body.style.cursor = 'grabbing';
//             document.body.style.userSelect = 'none';
//         });


//         const handleThumbClick = (e) => {
//             e.stopPropagation();
//         }
//         // click event on the rail
//         railRef?.current?.addEventListener('click', handleMouseClick);
//         thumbRef.current?.addEventListener('click', handleThumbClick);

//         // Initialize scroll positions
//         targetScroll.current = window.pageYOffset;
//         currentScroll.current = window.pageYOffset;

//         // Start animation loop
//         animationFrameId.current = requestAnimationFrame(animate);

//         // Add event listeners
//         window.addEventListener('wheel', handleWheel, { passive: false });

//         document.addEventListener('mousemove', handleMouseMove);
//         document.addEventListener('mouseup', handleMouseUp);
//         window.addEventListener('load', () => {
//             updateScrollbar();
//             setIsLoading(false);
//         });

//         return () => {
//             html.classList.remove('csb-scrollbar-active');
//             window.removeEventListener('resize', updateScrollbar);
//             window.removeEventListener('scroll', updateScrollbar);
//             document.removeEventListener('mousemove', handleMouseMove);
//             document.removeEventListener('mouseup', handleMouseUp);
//             window.removeEventListener('load', updateScrollbar);
//             railRef?.current?.removeEventListener('click', handleMouseClick)
//             thumbRef.current?.removeEventListener('click', handleThumbClick);
//             // if (wheelStep) {
//             // document.removeEventListener('wheel', handleWheel);
//             // }
//             if (animationFrameId.current) {
//                 cancelAnimationFrame(animationFrameId.current);
//             }
//             window.removeEventListener('wheel', handleWheel);
//             isScrolling.current = false;
//             clearTimeout(wheelId);
//         };
//     }, [isLoading, isShowScrollbar, railRef.current, thumbRef.current, thumbHeight, isDragging]);
//     return { isLoading, isActive, thumbHeight, thumbPosition, isDragging, isWheel };
// };


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
        html.classList.add('csb-scrollbar-active');

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
            html.classList.remove('csb-scrollbar-active');
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