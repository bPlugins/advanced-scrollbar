import { SelectControl, TabPanel } from '@wordpress/components';
import { cursorSourceOptions, cursorStyleTabs } from '../utils/options';
import General from './options/General';
import CursorEffects from './options/CursorEffects';
import { __ } from '@wordpress/i18n';

const OptionSettings = (props) => {
  const { casbAvScrData, setCasbAvScrData} = props;

  return (
    <>
      <TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={cursorStyleTabs} >
        {
          (tab) => <>
            {tab.name == "shape" &&
              <>
              
              <SelectControl className="mt10" label={__("Select Cursor Source", "advanced-scrollbar")} labelPosition="edge" options={cursorSourceOptions} value={casbAvScrData?.source} onChange={value => setCasbAvScrData({ ...casbAvScrData, source: value })} />
              
              {casbAvScrData?.source === "shape" && <General {...{ casbAvScrData, setCasbAvScrData }} />}
              </>
            }
            {tab.name == "effect" && <CursorEffects value={casbAvScrData?.effect || {}} onChange={(val) => setCasbAvScrData({ ...casbAvScrData, effect: val })} /> }
          </>
        }
      </TabPanel>
    </>
  );
};

export default OptionSettings;