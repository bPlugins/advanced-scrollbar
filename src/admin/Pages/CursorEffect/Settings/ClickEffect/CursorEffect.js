import { TabPanel} from "@wordpress/components";
import ClickEffectStyles from "./ClickEffectStyles";
import ClickEffectOptions from "./ClickEffectOptions";

const CursorEffect = ({ csbAvScrData, setCsbAvScrData, isPremium, setIsProModalOpen }) => {

  return (
    <>
      <TabPanel className='bPlTabPanel mini mt10' activeClass='activeTab' tabs={[
        { name: 'effect', title: 'Effect Type' },
        { name: 'style', title: 'Effect Style' },
      ]}
      >
        {tab => <>
          {tab.name == 'effect' && <ClickEffectOptions {...{ isPremium, setIsProModalOpen }} value={csbAvScrData?.effect || {}} onChange={value => setCsbAvScrData({ ...csbAvScrData, effect: value })} />}
          {tab.name == 'style' && <ClickEffectStyles value={csbAvScrData?.effect || {}} onChange={value => setCsbAvScrData({ ...csbAvScrData, effect: value })} />}
        </>}
      </TabPanel>
    </>
  );
};

export default CursorEffect;