import { RangeControl, TabPanel } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { ColorControl, SolidBackground } from "../../../../../bpl-tools/Components";
import { tabController, updateData } from "../../../../../bpl-tools/utils/functions";

const ShapeStyleOptions = ({ value, onChange }) => {

  return (
    <>
      {
        value?.type === 'follow' && <>
          <RangeControl label="Cursor Size" labelPosition="edge" value={parseInt(value?.follow?.size) >= 0 ? parseInt(value?.follow?.size) : 40} onChange={val => onChange(updateData(value, val + "px", 'follow', 'size'))} />
          
          <TabPanel className='bPlTabPanel mini' activeClass='activeTab' tabs={[{ title: __("Follow Cursor", 'advanced-scrollbar'), name: "follow" }, { title: __("Inner Cursor", 'advanced-scrollbar'), name: "inner" }]} onSelect={tabController}>
            {
              (tab) => <>
                {tab.name === "follow" && <>

                  <SolidBackground label="Cursor Color" value={value?.follow?.followBg ?? "#f59f0b94"} onChange={val => onChange(updateData(value, val, 'follow', 'followBg'))} />

                  <ColorControl label="Border Color" value={value?.follow?.followBorderColor ?? "#f59f0b94"} onChange={val => onChange(updateData(value, val, 'follow', 'followBorderColor'))} />

                  <RangeControl label="Border Width" value={parseInt(value?.follow?.followBorderWidth) >= 0 ? parseInt(value?.follow?.followBorderWidth) : 1} defaultValue={1} resetFallbackValue={1} min={0} max={10} step={1} onChange={(val) => onChange(updateData(value, val + "px", 'follow', 'followBorderWidth'))} />

                </>}
                {
                  tab.name === "inner" && <>
                    <SolidBackground label="Cursor Color" value={value?.follow?.innerBg ?? "#f974167c"} onChange={val => onChange(updateData(value, val, 'follow', 'innerBg'))} />

                    <ColorControl label="Border Color" value={value?.follow?.innerBorderColor ?? "#f974167c"} onChange={val => onChange(updateData(value, val, 'follow', 'innerBorderColor'))} />

                    <RangeControl label="Border Width" value={parseInt(value?.follow?.innerBorderWidth) >= 0 ? parseInt(value?.follow?.innerBorderWidth) : 1} defaultValue={1} resetFallbackValue={1} min={0} max={10} step={1} onChange={(val) => onChange(updateData(value, val + "px", 'follow', 'innerBorderWidth'))} />

                  </>
                }
              </>
            }

          </TabPanel>

        </>
      }

      {
        value?.type === 'blob' && <>
          <RangeControl label={__('Blob Size', 'advanced-scrollbar')} value={parseInt(value?.blob?.blobSize) >= 0 ? parseInt(value?.blob?.blobSize) : 125} onChange={val => onChange(updateData(value, val, 'blob', 'blobSize'))} min={0} max={600} step={1} />

          <ColorControl label={__('Blob Color', 'advanced-scrollbar')} value={value?.blob?.fillColor ?? '#00f0ff'} onChange={val => onChange(updateData(value, val, 'blob', 'fillColor'))} />

        </>
      }

      {
        value?.type === 'dot' && <>
          <RangeControl label="Cursor Size" value={Number(value?.dot?.size) >= 0 ? Number(value?.dot?.size) : 12} onChange={val => onChange(updateData(value, val, 'dot', 'size'))} min={0} max={30} step={1} />

          <SolidBackground label="Cursor Color" value={value?.dot?.color ?? '#3B82F6'} onChange={val => onChange(updateData(value, val, 'dot', 'color'))} />
        </>
      }

      {
        value?.type === 'elastic' && <>
          <RangeControl label="Cursor Size" value={parseInt(value?.elastic?.size) >= 0 ? parseInt(value?.elastic?.size) : 40} onChange={val => onChange(updateData(value, val, 'elastic', 'size'))} min={0} max={150} step={1} />

          <ColorControl label="Cursor Color" value={value?.elastic?.color ?? '#EF4444'} onChange={val => onChange(updateData(value, val, 'elastic', 'color'))} />

          <RangeControl label="Border Width" value={parseInt(value?.elastic?.borderWidth) >= 0 ? parseInt(value?.elastic?.borderWidth) : 2} onChange={val => onChange(updateData(value, val + "px", 'elastic', 'borderWidth'))} min={1} max={10} step={1} />

        </>
      }

    </>
  );
};

export default ShapeStyleOptions;