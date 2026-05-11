import React from 'react';
import "./style.scss";
const Footer = ({ onSaveData, isLoading, handleResetData, handleResetSection, setIsSaved }) => {
  return (
    <div className='bpl-codeStart-footer-wrapper'>
      <div className='bpl-footerBtn-wrapper'>
        <button onClick={() => {
          setIsSaved(true)
          onSaveData()
        }} className="nav-submitBtn" style={{ paddingRight: isLoading ? "38px" : "17px" }}>Save {isLoading && <span className="saveBtn-loader2"></span>}</button>
        <button className='reset-sectionBtn' onClick={handleResetSection}>Reset Section</button>
        <button className='resetAll-btn' onClick={handleResetData}>Reset All</button>
      </div>
    </div>
  );
};

export default Footer;