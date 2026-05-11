import { TabPanel, ToggleControl } from '@wordpress/components';

import ShapeStyle from '../Style/ShapeStyle';
import ShapeType from './ShapeType';

import { shapeStyleTabs } from '../../utils/options';
import { __ } from '@wordpress/i18n';

const CursorShape = ({ csbAvScrData, setCsbAvScrData}) => {
  const { enableCursor =true } = csbAvScrData || {};
  return (
    <>
      <TabPanel className="bPlTabPanel small mt10" activeClass='activeTab' tabs={shapeStyleTabs}>
        {
          tab => <>
            {tab.name == 'type' && <>
            <ToggleControl className="mt10" defaultValue={true} label={__("Enable Default Cursor", "advanced-scrollbar")} checked={enableCursor} onChange={value => setCsbAvScrData({ ...csbAvScrData, enableCursor: value })} />
              <ShapeType value={csbAvScrData?.shape || {}} onChange={value => setCsbAvScrData({ ...csbAvScrData, shape: value })} />
            </>}
            {tab.name == 'style' && <ShapeStyle value={csbAvScrData?.shape || {}} onChange={value => setCsbAvScrData({ ...csbAvScrData, shape: value })} />}
          </>
        }
      </TabPanel>


    </>
  );
};

export default CursorShape;