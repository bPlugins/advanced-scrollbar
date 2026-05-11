import { TabPanel } from '@wordpress/components';
import EffectStyleOptions from './EffectStyleOptions';
import ShapeStyleOptions from './ShapeStyleOptions';
import { tabController } from '../../../../../bpl-tools/utils/functions';
import { cursorEffectTabs } from '../../utils/options';

const Style = ({ crblData, setCrblData }) => {
  return <>
    
    <TabPanel className='bPlTabPanel mini mt10' activeClass='activeTab' tabs={cursorEffectTabs} onSelect={tabController}>

    </TabPanel>
    {(crblData?.shape?.type && crblData?.shape?.type !== 'none') && <ShapeStyleOptions initialOpen={crblData?.effect?.type === 'none' ? true : false} value={crblData?.shape || {}} onChange={(val) => setCrblData({ ...crblData, shape: val })} />}

    {crblData?.effect?.type &&crblData?.effect?.type !== 'none' && <EffectStyleOptions initialOpen={crblData?.shape?.type === 'none' ? true : false} value={crblData?.effect} onChange={val => setCrblData({ ...crblData, effect: val })} />}
    </>
};

export default Style;