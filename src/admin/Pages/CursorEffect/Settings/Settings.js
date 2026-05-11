
import { Button, SelectControl, TabPanel } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "react";

import CursorEffect from "./ClickEffect/CursorEffect";
import CursorShape from "./General/CursorShape";

import { cursorSourceOptions } from "../../../../customCursor/utils/options";
import useWPAjax from "../../../utils/useWPAjax";
import { shapeAndEffectOptions } from "../utils/options";

const Settings = ({ nonce }) => {
  const [csbAvScrData, setCsbAvScrData] = useState(null);

  // fetch token from bplugins server using ajax
  const { data, isLoading, saveData } = useWPAjax('csb_adv_scrollbar_cursor_data_settings', { nonce }); //authorize

  useEffect(() => {
    if (!isLoading && data && !csbAvScrData) {
      setCsbAvScrData(data);
    }
  }, [isLoading])


  const saveInformation = () => {
    if (!csbAvScrData?.source === 'predefined' && !csbAvScrData?.source === 'customUrl') return;
    saveData({ csbAvScrData: JSON.stringify(csbAvScrData), save: true });
  }

  useEffect(() => {

    if (!csbAvScrData?.source === 'predefined' && !csbAvScrData?.source === 'customUrl') return;
    window.dispatchEvent(new CustomEvent("csbAdvScrollbarCursorSettings", {
      detail: {
        data: csbAvScrData
      }
    }));
  }, [JSON.stringify(csbAvScrData)]);

  return (
    <div className='custom-cursor-settings-container'>
      <h3 className='custom-cursor-title'>Settings</h3>
      <div className='custom-cursor-settings'>
        <TabPanel className="bPlTabPanel" activeClass='activeTab' tabs={shapeAndEffectOptions}>
          {tab => <>

            {tab.name == "shape" && <>
              <SelectControl className="mt10" label={__("Select Cursor Source", "advanced-scrollbar")} labelPosition="edge" options={cursorSourceOptions} value={csbAvScrData?.source} onChange={value => setCsbAvScrData({ ...csbAvScrData, source: value })} />
              
              {csbAvScrData?.source === "shape" && <CursorShape {...{ csbAvScrData, setCsbAvScrData }} />}

            </>}
            {tab.name == "effect" && <CursorEffect {...{ csbAvScrData, setCsbAvScrData }} />}
          </>}
        </TabPanel>
        <Button onClick={() => saveInformation()} className={`custom-cursor-dashboard-button ${isLoading ? "btnSaving" : ""}`} variant="primary">{isLoading ? "Saving..." : "Save" }</Button>
      </div>
    </div>
  );
};

export default Settings;