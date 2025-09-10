import { SelectControl, TabPanel } from '@wordpress/components';
import { cursorSourceOptions, cursorStyleTabs } from '../utils/options';
import General from './options/General';
import CursorEffects from './options/CursorEffects';
import { __ } from '@wordpress/i18n';
import { InlineMediaUpload } from '../../components/InlineMediaUpload';
import CursorImgShape from './options/CursorImageShape';
import { useState } from 'react';
import ProModal from '../../components/ProModal';
import { BControlPro } from '../../../../bpl-tools/ProControls';

const OptionSettings = (props) => {
  const { csbAvScrData, setCsbAvScrData, isPremium} = props;
  const [isProModalOpen, setIsProModalOpen] = useState(false)

  return (
    <>
      <ProModal isProModalOpen={isProModalOpen} setIsProModalOpen={setIsProModalOpen} />
      <TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={cursorStyleTabs} >
        {
          (tab) => <>
            {tab.name == "shape" &&
              <>
              
              <SelectControl className="mt10" label={__("Select Cursor Source", "advanced-scrollbar")} labelPosition="edge" options={cursorSourceOptions(isPremium)} value={csbAvScrData?.source} onChange={value => setCsbAvScrData({ ...csbAvScrData, source: value })} />
              
              {csbAvScrData?.source === "shape" && <General {...{ csbAvScrData, setCsbAvScrData, isPremium, isProModalOpen, setIsProModalOpen }} />}

              {csbAvScrData?.source === "predefined" && <CursorImgShape {...{ csbAvScrData, setCsbAvScrData, isPremium, setIsProModalOpen }} />}

              {csbAvScrData?.source === "customUrl" && <BControlPro label={__("Choose Cursor Image", "advanced-scrollbar")} value={csbAvScrData?.image} onChange={value => setCsbAvScrData({ ...csbAvScrData, shape: { ...csbAvScrData?.shape?.customImg, url: value } })} Component={InlineMediaUpload} isPremium={isPremium} setIsProModalOpen={setIsProModalOpen}/>}
              </>
            }
            {tab.name == "effect" && <CursorEffects value={csbAvScrData?.effect || {}} onChange={(val) => setCsbAvScrData({ ...csbAvScrData, effect: val })} {...{ isPremium, setIsProModalOpen }} /> }
          </>
        }
      </TabPanel>
    </>
  );
};

export default OptionSettings;