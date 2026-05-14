import { TabPanel, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { tabController } from '../../../../../bpl-tools/utils/functions';
import { cursorShapeTabs } from '../../utils/options';
import ShapeStyleOptions from '../style/ShapeStyleOptions';
import CursorShape from './CursorShape';

const General = (props) => {
  const { casbAvScrData, setCasbAvScrData } = props;
  const { enableCursor = true } = casbAvScrData || {};
  return (
    <TabPanel className='bPlTabPanel mini mt10' activeClass='activeTab' tabs={cursorShapeTabs} onSelect={tabController}
    // initialTabName='effect'
    >
      {
        (tab) => <>
          {tab.name == "shape" && <>
            <ToggleControl className="mt10" defaultValue={true} label={__("Enable Default Cursor", "advanced-scrollbar")} checked={enableCursor} onChange={value => setCasbAvScrData({ ...casbAvScrData, enableCursor: value })} />
            <CursorShape value={casbAvScrData?.shape || {}} onChange={(val) => setCasbAvScrData({ ...casbAvScrData, shape: val })}/>
          </>}
          {tab.name == "style" && <ShapeStyleOptions value={casbAvScrData?.shape || {}} onChange={(val) => setCasbAvScrData({ ...casbAvScrData, shape: val })} />}
        </>
      }
    </TabPanel>
  );
};

export default General;