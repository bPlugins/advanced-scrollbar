import { SelectControl, TabPanel } from '@wordpress/components';
import { cursorSourceOptions, cursorStyleTabs } from '../utils/options';
import General from './options/General';
import CursorEffects from './options/CursorEffects';
import { __ } from '@wordpress/i18n';

const OptionSettings = (props) => {
  const { csbAvScrData, setCsbAvScrData} = props;

  return (
    <>
      <TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={cursorStyleTabs} >
        {
          (tab) => <>
            {tab.name == "shape" &&
              <>
              
              <SelectControl className="mt10" label={__("Select Cursor Source", "advanced-scrollbar")} labelPosition="edge" options={cursorSourceOptions} value={csbAvScrData?.source} onChange={value => setCsbAvScrData({ ...csbAvScrData, source: value })} />
              
              {csbAvScrData?.source === "shape" && <General {...{ csbAvScrData, setCsbAvScrData }} />}
              </>
            }
            {tab.name == "effect" && <CursorEffects value={csbAvScrData?.effect || {}} onChange={(val) => setCsbAvScrData({ ...csbAvScrData, effect: val })} /> }
          </>
        }
      </TabPanel>
    </>
  );
};

export default OptionSettings;