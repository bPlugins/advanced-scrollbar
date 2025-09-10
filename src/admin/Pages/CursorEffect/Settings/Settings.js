
import { Button, SelectControl, TabPanel } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useEffect, useState } from "react";

import CursorEffect from "./ClickEffect/CursorEffect";
import CursorShape from "./General/CursorShape";

// import { debounce } from "../../../../../../bpl-tools/utils/functions";

import { InlineMediaUpload } from "../../../../components/InlineMediaUpload";
import { cursorSourceOptions } from "../../../../customCursor/utils/options";
import useWPAjax from "../../../utils/useWPAjax";
import { shapeAndEffectOptions } from "../utils/options";
import CursorImgShape from "./General/CursorImgShape";
import { BControlPro } from "../../../../../../bpl-tools/ProControls";

const Settings = ({ isProModalOpen, setIsProModalOpen,isPremium ,dirUrl, nonce }) => {
  const [csbAvScrData, setCsbAvScrData] = useState(null);

  // fetch token from bplugins server using ajax
  const { data, isLoading, saveData } = useWPAjax('csb_adv_scrollbar_cursor_data_settings', { nonce }); //authorize

  useEffect(() => {
    if (!isLoading && data && !csbAvScrData) {
      setCsbAvScrData(data);
    }
    // console.log({ data });
  }, [isLoading])


  const saveInformation = () => {
    if (!csbAvScrData?.source === 'predefined' && !csbAvScrData?.source === 'customUrl' && !isPremium) return;
    saveData({ csbAvScrData: JSON.stringify(csbAvScrData), save: true });
  }

  useEffect(() => {
    // saveInformation();
    // console.log(csbAvScrData)
    if (!csbAvScrData?.source === 'predefined' && !csbAvScrData?.source === 'customUrl' && !isPremium) return;
    window.dispatchEvent(new CustomEvent("csbAdvScrollbarCursorSettings", {
      detail: {
        data: csbAvScrData
      }
    }));
    // debounce(saveInformation, 600)();
  }, [JSON.stringify(csbAvScrData)]);

  return (
    <div className='custom-cursor-settings-container'>
      <h3 className='custom-cursor-title'>Settings</h3>
      <div className='custom-cursor-settings'>
        <TabPanel className="bPlTabPanel" activeClass='activeTab' tabs={shapeAndEffectOptions}>
          {tab => <>

            {tab.name == "shape" && <>
              <SelectControl className="mt10" label={__("Select Cursor Source", "advanced-scrollbar")} labelPosition="edge" options={cursorSourceOptions(isPremium)} value={csbAvScrData?.source} onChange={value => setCsbAvScrData({ ...csbAvScrData, source: value })} />
              {csbAvScrData?.source === "shape" && <CursorShape {...{ csbAvScrData, setCsbAvScrData, isPremium, isProModalOpen, setIsProModalOpen }} />}
              {csbAvScrData?.source === "predefined" && <CursorImgShape {...{ csbAvScrData, setCsbAvScrData, dirUrl, isPremium, isProModalOpen, setIsProModalOpen }} />}
              {csbAvScrData?.source === "customUrl" && <BControlPro label={__("Choose Cursor Image", "advanced-scrollbar")} value={csbAvScrData?.shape?.customImg?.url} onChange={value => setCsbAvScrData({ ...csbAvScrData, shape: { ...csbAvScrData?.shape, customImg: { ...csbAvScrData?.shape?.customImg, url: value } } })} Component={InlineMediaUpload} isPremium={isPremium} setIsProModalOpen={setIsProModalOpen} />}

            </>}
            {tab.name == "effect" && <CursorEffect {...{ csbAvScrData, setCsbAvScrData, isPremium, isProModalOpen, setIsProModalOpen }} />}
          </>}
        </TabPanel>
        <Button onClick={() => saveInformation()} className={`custom-cursor-dashboard-button ${isLoading ? "btnSaving" : ""}`} variant="primary">{isLoading ? "Saving..." : "Save" }</Button>
      </div>
    </div>
  );
};

export default Settings;