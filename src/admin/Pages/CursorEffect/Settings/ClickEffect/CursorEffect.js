import { TabPanel} from "@wordpress/components";
import ClickEffectStyles from "./ClickEffectStyles";
import ClickEffectOptions from "./ClickEffectOptions";

const CursorEffect = ({ casbAvScrData, setCasbAvScrData}) => {

  return (
    <>
      <TabPanel className='bPlTabPanel mini mt10' activeClass='activeTab' tabs={[
        { name: 'effect', title: 'Effect Type' },
        { name: 'style', title: 'Effect Style' },
      ]}
      >
        {tab => <>
          {tab.name == 'effect' && <ClickEffectOptions value={casbAvScrData?.effect || {}} onChange={value => setCasbAvScrData({ ...casbAvScrData, effect: value })} />}
          {tab.name == 'style' && <ClickEffectStyles value={casbAvScrData?.effect || {}} onChange={value => setCasbAvScrData({ ...casbAvScrData, effect: value })} />}
        </>}
      </TabPanel>
    </>
  );
};

export default CursorEffect;