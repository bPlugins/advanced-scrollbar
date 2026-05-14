
import { Button, SelectControl, TabPanel } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "react";

import CursorEffect from "./ClickEffect/CursorEffect";
import CursorShape from "./General/CursorShape";

import { cursorSourceOptions } from "../../../../customCursor/utils/options";
import useWPAjax from "../../../utils/useWPAjax";
import { shapeAndEffectOptions } from "../utils/options";

const Settings = ({ nonce }) => {
  const [casbAvScrData, setCasbAvScrData] = useState(null);

  // fetch token from bplugins server using ajax
  const { data, isLoading, saveData } = useWPAjax('casb_adv_scrollbar_cursor_data_settings', { nonce }); //authorize

  useEffect(() => {
    if (!isLoading && data && !casbAvScrData) {
      setCasbAvScrData(data);
    }
  }, [isLoading])


  const saveInformation = () => {
    if (!casbAvScrData?.source === 'predefined' && !casbAvScrData?.source === 'customUrl') return;
    saveData({ csbAvScrData: JSON.stringify(casbAvScrData), save: true });
  }

  useEffect(() => {

    if (!casbAvScrData?.source === 'predefined' && !casbAvScrData?.source === 'customUrl') return;
    window.dispatchEvent(new CustomEvent("casbAdvScrollbarCursorSettings", {
      detail: {
        data: casbAvScrData
      }
    }));
  }, [JSON.stringify(casbAvScrData)]);

  return (
    <div className='custom-cursor-settings-container'>
      <h3 className='custom-cursor-title'>Settings</h3>
      <div className='custom-cursor-settings'>
        <TabPanel className="bPlTabPanel" activeClass='activeTab' tabs={shapeAndEffectOptions}>
          {tab => <>

            {tab.name == "shape" && <>
              <SelectControl className="mt10" label={__("Select Cursor Source", "advanced-scrollbar")} labelPosition="edge" options={cursorSourceOptions} value={casbAvScrData?.source} onChange={value => setCasbAvScrData({ ...casbAvScrData, source: value })} />
              
              {casbAvScrData?.source === "shape" && <CursorShape {...{ casbAvScrData, setCasbAvScrData }} />}

            </>}
            {tab.name == "effect" && <CursorEffect {...{ casbAvScrData, setCasbAvScrData }} />}
          </>}
        </TabPanel>
        <Button onClick={() => saveInformation()} className={`custom-cursor-dashboard-button ${isLoading ? "btnSaving" : ""}`} variant="primary">{isLoading ? "Saving..." : "Save" }</Button>
      </div>
    </div>
  );
};

export default Settings;