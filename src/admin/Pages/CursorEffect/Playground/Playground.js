import { useEffect, useRef, useState } from 'react';

import { useWPAjax } from "../../../../../../bpl-tools/hooks";

import CursorEffects from '../../../../customCursor/cursor/Effects/CursorEffects';
import Cursor from '../../../../customCursor/cursor/Shape/Cursor';
import useCursorVisibility from "../../../../customCursor/hooks/useCursorVisibility";
import Card from './Card';
import { cardOptions } from './options';
import { isSet } from '../../../../customCursor/utils/common';
const Playground = ({ nonce }) => {
  const { data, isLoading } = useWPAjax('casb_get_adv_scrollbar_cursor_data_settings', { nonce }); //authorize
  const [cursorData, setCursorData] = useState(null);
  const isCursorVisible = useCursorVisibility();
  const dashboardRef = useRef(null);
  const { enableCursor = true} = cursorData || {};

  useEffect(() => {
    const dataFetched = (e) => {
      const { data } = e.detail || {};
      setCursorData(data);
    };


    window.addEventListener('casbAdvScrollbarCursorSettings', dataFetched);

    return () => {
      window.removeEventListener('casbAdvScrollbarCursorSettings', dataFetched);
    };

  }, []);

  useEffect(() => {
    if (!isLoading && data) {
      setCursorData(data);
    }
    
  }, [data, isLoading]);
  const baseLink = 'https://bplugins.com/products/advanced-scrollbar';

  const cursorCssVar = {
    ...((isSet(cursorData?.shape?.customImg?.img) && cursorData?.source == "predefined") && { cursor: `url(${cursorData?.shape?.customImg?.img}), pointer` }),
    ...(cursorData?.source == "shape" && { cursor: enableCursor? "auto" :"none" }),
    ...(cursorData?.source == "customUrl" && { cursor: `url(${cursorData?.shape?.customImg?.url}), pointer` }),
  }

  return <div className='custom-cursor-playground-container' >
    <h3 className='custom-cursor-title'>Playground</h3>
    <div className='custom-cursor-playground' ref={dashboardRef} style={cursorCssVar} >
      <div className='custom-cursor-playground-contents-wrapper'>
        <div>
          <h2 className='custom-cursor-playground-contents-title'>Advanced Scrollbar</h2>
          <p className='custom-cursor-playground-contents-description'>Customize your site scrollbar with the<a href={baseLink} target='_blank' rel="noreferrer" className='cursorPlaygroundLink'> Advanced Scrollbar plugin</a>. Change color, width, Background, Scroll Speed, align the Rail of the scrollbar, and more. Design the scrollbar by following your brand identity.</p>

          <div className='custom-cursor-playground-contents-button-wrapper'>
            <a href={`https://scrollbar.bplugins.com/`} target='_blank' rel="noreferrer" className='bPlDashboardPrimaryBtn'>See Demo</a>
          </div>
        </div>

        <div className='custom-cursor-playground-contents-features'>
          {cardOptions.map((value, i) => <Card key={i} {...value} />)}
        </div>

      </div>
      {/* <button style={{height:"50px",width:"100px",marginInline:"auto"}}>Hover me</button> */}
      { 
        cursorData?.source == "shape" && <>
        {/* {(cursorData?.shape?.type === 'ribbon' && isCursorVisible) && <CursorRibbon {...cursorData?.shape?.ribbon} domEl={dashboardRef.current} eventEl={dashboardRef.current} rect={dashboardRef.current.getBoundingClientRect()} key={cursorData?.shape?.type} />} */}
  
        {(cursorData?.shape?.type && cursorData?.shape?.type !== 'ribbon' && isCursorVisible) ? <Cursor shape={cursorData?.shape} domEl={dashboardRef.current} eventEl={dashboardRef.current} rect={dashboardRef.current.getBoundingClientRect()} key={cursorData?.shape?.type} isDashboard={true} /> : null}
        </>
      }

      {cursorData?.effect?.type && <CursorEffects domEl={dashboardRef.current} effect={cursorData?.effect} key={cursorData?.effect?.type} />}
      {/* {cursorData?.effect?.type !== 'none' && <CursorEffects effect={cursorData?.effect} key={cursorData?.effect?.type} isDashboard={true} />} */}
    </div>
  </div>
};

export default Playground;