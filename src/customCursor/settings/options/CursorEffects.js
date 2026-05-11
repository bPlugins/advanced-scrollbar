import { SelectControl, TabPanel } from '@wordpress/components';
import { cursorEffectsOptions, cursorEffectTabs } from '../../utils/options';
import { tabController } from '../../../../../bpl-tools/utils/functions';
import EffectStyleOptions from '../style/EffectStyleOptions';

const CursorEffects = ({ value, onChange }) => {

  return (
    <>
      <TabPanel className='bPlTabPanel mini mt10' activeClass='activeTab' tabs={cursorEffectTabs} onSelect={tabController}>
      {
        (tab) => <>
          {tab.name == "type" && <SelectControl className='mt10' label="Effect Type" labelPosition='edge' value={value?.type} onChange={(val) => onChange({ ...value, type: val })} options={cursorEffectsOptions} />}
          {tab.name == "style" && <EffectStyleOptions value={value} onChange={onChange} />}
        </>
      }
      </TabPanel>
    </>
  );
};

export default CursorEffects;