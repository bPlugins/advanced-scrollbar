import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { useScrollbar } from '../hooks/useScrollbar';
// import { useSmoothScroll } from '../hooks/useSmoothScroll';
import { generateGradient, isSet,getBorderCSS } from '../utils/function';
import "./style.scss";
import { useMovePosition } from '../hooks/useMovePosition';
const Scrollbar = ({ scrollbarData }) => {
    const { asb_showscrollbar, asb_color = '', asb_background = '', asb_mousescrollstep = 40, asb_autohidemode = false, asb_railalign = "right", asb_scrollspeed = 60, asb_touchbehavior, asb_dynamic_height_scrollbar = 'off', asb_floating_scrollbar="off", asb_gradient_color = {
        "color-1": "#ffce4b",
        "color-2": "#ff395e",
        "color-3": "#833ab4"
    }, asb_floating_scrollbar_bg_color = "#9837bf", asb_floating_scrollbar_text_color = "#ffffff", asb_width = { spinner: 10, unit: "px" }, asb_border = {}, asb_border_radius = {spinner:12} } = scrollbarData;
    const touchBehavior = JSON.parse(asb_touchbehavior) == 1 ? true : false;
    
    const thumbRef = useRef(null);
    const railRef = useRef(null);
    const floatingRef = useRef(null);
    const showScrollbar = JSON.parse(asb_showscrollbar);

    const autoHideMode = asb_autohidemode === "coursor" ? "coursor" : JSON.parse(asb_autohidemode);
    const { dynamicHeight, isWheel, isLoading, thumbHeight, thumbPosition } = useScrollbar(railRef, thumbRef,showScrollbar, Number(asb_mousescrollstep), Number(asb_scrollspeed), touchBehavior);
    const { cursorPosition, scrollPercentage } = useMovePosition(asb_floating_scrollbar)
    useEffect(() => {
        // if (window.self === window.top && showScrollbar) {
        //     document.documentElement.classList.add('csb-scrollbar-active');
        // } else {
        //     document.documentElement.classList.remove('csb-scrollbar-active');
        // }

        // // Cleanup function to remove the class when the component unmounts
        // return () => {
        //     document.documentElement.classList.remove('csb-scrollbar-active');
        // };
    }, [showScrollbar]);

    const styles = {
        ...(showScrollbar && { "--csb-scrollbar-rail-display-property": 'block' }),
        ...(isSet(asb_width?.spinner) && { "--csb-scrollbar-rail-width": asb_width.spinner + "px" }),
        ...(isSet(asb_background) && { "--csb-scrollbar-rail-background-color": asb_background }),
    };
    const thumbStyles = {
        ...(isSet(thumbHeight) && { "--csb-scrollbar-thumb-height": thumbHeight + "px" }),
        ...(isSet(thumbPosition) && { "--csb-scrollbar-thumb-position": thumbPosition + "px" }),
        ...(isSet(asb_color) && { "--csb-scrollbar-thumb-color": asb_color }),
        ...(isSet(asb_border_radius?.spinner) && { "--csb-scrollbar-thumb-border-radius": asb_border_radius.spinner+"px" }),
    }

    const dynamicHeightStyle = {
        ...(isSet(dynamicHeight) && { "--csb-scrollbar-rail-dynamic-height": dynamicHeight + "px" }),
    }
    const floatingStyle = {
        ...(isSet(asb_floating_scrollbar_bg_color) && { "--csb-scrollbar-floating-bg-color": asb_floating_scrollbar_bg_color }),
        ...(isSet(asb_floating_scrollbar_text_color) && { "--csb-scrollbar-floating-text-color": asb_floating_scrollbar_text_color }),
    }

    // const dynamicClassRail = autoHideMode === "cursor" ? "csb-scrollbar-rail-cursor" : autoHideMode ? isWheel ?"csb-scrollbar-auto-hide":"":""

    let dynamicClassRail = '';
    if (autoHideMode == 'coursor') {
        // This class shows the scrollbar on hover
        dynamicClassRail = 'csb-scrollbar-rail-cursor-hover';
    } else if (autoHideMode) {

        // This class hides the scrollbar when not actively wheel-scrolling
        dynamicClassRail = 'csb-scrollbar-auto-hide';
    }


    // if (isLoading ) return;

    return <>
        {
            (asb_dynamic_height_scrollbar == "off" && asb_floating_scrollbar == "off") && <div ref={railRef} className={`csb-scrollbar-rail railAlign${asb_railalign} ${isWheel ? dynamicClassRail : ""}`} style={{ ...styles }}>
                <div className='csb-scrollbar-rail-thumb' ref={thumbRef} style={{ ...getBorderCSS(asb_border),...thumbStyles }} />
            </div>
        }
        {
            asb_dynamic_height_scrollbar == "on" && <div ref={thumbRef} className={`csb-scrollbar-dynamic-height`} style={{ background: generateGradient(asb_gradient_color), ...dynamicHeightStyle }} ></div>
        }

        {
            asb_floating_scrollbar == "on" && <div ref={floatingRef} className={`csb-scrollbar-floating`} style={{top: cursorPosition.y + 20, left: (cursorPosition.x + 20), ...floatingStyle }} >Page Scrolled {scrollPercentage} %</div>
        }
        
    </>
};

export default Scrollbar;

document.addEventListener('DOMContentLoaded', () => {
    const scrollbarEl = document.getElementById("csbScrollbar");
    const scrollbarData = JSON.parse(scrollbarEl.dataset.scrollbar);
    const root = createRoot(scrollbarEl);
    root.render(<Scrollbar scrollbarData={scrollbarData} />);
    scrollbarEl.removeAttribute('data-scrollbar')
});



