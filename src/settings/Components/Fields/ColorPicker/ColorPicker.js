import { ColorPicker as Color } from '@wordpress/components';
import React from 'react';
import bgImage from "./checkerboard.png";
import "./style.scss";
import BTextControl from '../BTextControl/BTextControl';
import Button from '../Button/Button';
const ColorPicker = ({ value, onChange = () => { }, defaultValue = "" }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const btnRef = React.useRef(null);
  const colorRef = React.useRef(null);
  const controlsRef = React.useRef(null);
  const def = value || defaultValue;
  React.useEffect(() => {
    const handle = (e) => {
      if (!btnRef?.current?.contains(e.target) && !colorRef?.current?.children[0].contains(e.target) && !controlsRef?.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
    };
  });
  const id = Math.floor(Math.random() * 99999);
  const isTransparent = def ? def.length === 5 || def.length === 9 || def === 'transparent' ? true : false : false
  return (
    <div className={`colorPickerWrapper-main-${id}`}>
      <style>{`
      .colorPickerWrapper-main-${id}{
        .colorPickerWrapper{
          .colorPickerBtn{
            ${!isTransparent ? `background-color:${def};` : ""}
            &.isTransparent{
              background-image:url(${bgImage});
              background-size: 135px;
              background-position: center left;
            }
          }
        }
      }
      `}</style>
      <div className='colorPickerWrapper' >
        <button ref={btnRef} className={`colorPickerBtn ${isTransparent ? "isTransparent" : ""}`} onClick={() => setIsOpen(!isOpen)}>
          <div style={{ margin: "-2px", borderRight: "1px solid #ccc" }}>Select Color</div>
        </button>
        {
          isOpen && <div ref={controlsRef} className="bPl-colorPicker-controls">
            <BTextControl style={{ width: "75px" }} value={def} onChange={val => onChange(val)} />
            {
              defaultValue ?
                <Button variant='secondary' onClick={() => onChange(defaultValue)} >Default</Button> :
                <Button variant='secondary' onClick={() => onChange("")} >Clear</Button>
            }
          </div>
        }
      </div>
      {isOpen && <div ref={colorRef} style={{ marginTop: "10px", width: "230px" }}>
        <Color color={value || defaultValue} onChange={val => onChange(val)} />
      </div>}
    </div>
  );
};

export default ColorPicker;