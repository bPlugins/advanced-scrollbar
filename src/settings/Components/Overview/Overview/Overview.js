import { CheckboxControl, __experimentalInputControl as InputControl, SelectControl, TextareaControl } from "@wordpress/components";
import React, { useState } from 'react';
import ColorPalette from "../../Panel/ColorPalette/ColorPalette";
import ToggleControl from "../../Panel/ToggleControl/ToggleControl";
import ImageSize from "../../Panel/ImageSize/ImageSize";

const Overview = () => {
  const [overViewState, setOverViewState] = useState({ image: {}, isToggle: false, checked: false, color: "#A4CCF7", selectControl: "a",imgSize:0 })
  const [radioBtn, setRadioBtn] = useState({ first: false, second: false })
  const items = [
    { title: "Text", Component: <InputControl style={{ width: "50%", borderRadius: "3px" }} /> },
    {
      title: "Textarea", Component: <TextareaControl style={{ borderRadius: "3px" }} rows={4} />
    },
    {
      title: "Upload", Component: <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
        <div style={{ width: "100%" }}>
          <InputControl style={{ borderRadius: "3px" }} value={overViewState.image?.url} />
        </div>
      </div>
    },
    { title: "Switcher", Component: <ToggleControl checked={overViewState.isToggle} onChange={val => setOverViewState({ ...overViewState, isToggle: val })} label="The label text of the switcher." labelPosition="right" /> },
    {
      title: "Color", Component: <ColorPalette value={overViewState.color} onChange={val => setOverViewState({ ...overViewState, color: val })} />
    },
    {
      title: "Checkbox", Component: <CheckboxControl label="The label text of the checkbox." name="checked" checked={overViewState.checked} onChange={val => setOverViewState({ ...overViewState, checked: val })} />
    }, {
      title: 'Radio',
      Component: <div style={{ display: "flex", flexDirection: "column" }}>
        <CheckboxControl label="Yes, Please." name="yes" type="radio" checked={radioBtn.first} onChange={val => setRadioBtn({ ...radioBtn, first: val, second: false })} />
        <CheckboxControl label="No, Thank you." name="no" type="radio" checked={radioBtn.second} onChange={val => setRadioBtn({ ...radioBtn, first: false, second: val })} />
      </div>
    },
    {
      title: "Select",
      Component: <div style={{ width: 'fit-content' }}>
        <SelectControl
          label=""
          value={overViewState.selectControl}
          onChange={(val) => { setOverViewState({ ...overViewState, selectControl: val }) }}
          options={[
            { value: "select", label: 'Select a option' },
            { value: 'one', label: 'Option 1 is long long text to display in the view' },
            { value: 'two', label: 'Option 2' },
            { value: 'three', label: 'Option 3' },
          ]}
          
        />
      </div>
    },
    {
      title: "Image Select",
      Component: <ImageSize value={overViewState.imgSize} onChange={val => setOverViewState({ ...overViewState, imgSize: val })} images={[{ value: "http://codestarframework.com/assets/images/placeholder/100x80-2ecc71.gif" }, { value: "	http://codestarframework.com/assets/images/placeholder/100x80-e74c3c.gif" }, { value: "	http://codestarframework.com/assets/images/placeholder/100x80-ffbc00.gif" }, { value: "http://codestarframework.com/assets/images/placeholder/100x80-3498db.gif" }, { value:"http://codestarframework.com/assets/images/placeholder/100x80-555555.gif"}]} />
    }
  ]
  return (
    <div>
      {
        items.map((item, key) => <div key={key} className='field'>
          <div className='label'>
            <p>{item.title}</p>
          </div>
          
          <div className='fieldComponent'>
            {item.Component}
          </div>
        </div>)
      }
    </div>
  );
};

export default Overview;