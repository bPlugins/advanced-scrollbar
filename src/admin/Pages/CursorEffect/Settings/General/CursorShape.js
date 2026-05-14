import { TabPanel, ToggleControl } from '@wordpress/components';

import ShapeStyle from '../Style/ShapeStyle';
import ShapeType from './ShapeType';

import { shapeStyleTabs } from '../../utils/options';
import { __ } from '@wordpress/i18n';

const CursorShape = ({ casbAvScrData, setCasbAvScrData}) => {
  const { enableCursor =true } = casbAvScrData || {};
  return (
    <>
      <TabPanel className="bPlTabPanel small mt10" activeClass='activeTab' tabs={shapeStyleTabs}>
        {
          tab => <>
            {tab.name == 'type' && <>
            <ToggleControl className="mt10" defaultValue={true} label={__("Enable Default Cursor", "advanced-scrollbar")} checked={enableCursor} onChange={value => setCasbAvScrData({ ...casbAvScrData, enableCursor: value })} />
              <ShapeType value={casbAvScrData?.shape || {}} onChange={value => setCasbAvScrData({ ...casbAvScrData, shape: value })} />
            </>}
            {tab.name == 'style' && <ShapeStyle value={casbAvScrData?.shape || {}} onChange={value => setCasbAvScrData({ ...casbAvScrData, shape: value })} />}
          </>
        }
      </TabPanel>


    </>
  );
};

export default CursorShape;