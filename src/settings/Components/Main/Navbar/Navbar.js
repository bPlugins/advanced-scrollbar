import React, { useEffect, useState } from 'react';
import { outdentIcon } from '../../../utils/icons';
import "./style.scss";

const Navbar = ({ isHidden, setIsHidden, options, onSaveData, isLoading, setSearch, isEqual, isSaved, setIsSaved, handleResetData, handleResetSection }) => {
  const [scrollNav, setScrollNav] = useState(false);
  useEffect(() => {
    const stickyNav = () => {
      if (window.scrollY >= 1) {
        setScrollNav(true)
      } else {
        setScrollNav(false)
      }
    }
    window.addEventListener("scroll", stickyNav);
    return () => window.removeEventListener("scroll", stickyNav);
  }, [scrollNav])


  return (
    <div className={`navBar-wrapper ${scrollNav ? "stickyNav" : ""}`}>

      <div className='navbar-logo'>
        <h1>{options.title || 'bPlugins'}</h1>
      </div>
      <div className='navBar-rightItems-wrapper'>
        {isEqual && <div className="bPl-form-result form-warning">
          <small>You have unsaved changes, save your changes!</small>
        </div>}
        {isSaved && <div className="bPl-form-result form-success">
          <small>Settings saved.</small>
        </div>}
        <div onClick={() => setIsHidden(!isHidden)} className='navbar-icon'>
          {outdentIcon}
        </div>
        <div className="nav-form">
          <input type="text" name="search" id="search" placeholder="Search" onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{display:"flex",gap:"3px"}}>
          <button className="nav-submitBtn" style={{ paddingRight: isLoading ? "38px" : "17px" }} onClick={() => {
            setIsSaved(true)
            onSaveData();
          }}>Save {isLoading && <span className="saveBtn-loader2"></span>}</button>
          <button className='reset-sectionBtn' onClick={handleResetSection}>Reset Section</button>
        <button className='resetAll-btn' onClick={handleResetData}>Reset All</button>
        </div>
      </div>
    </div>
  );
};
export default Navbar;