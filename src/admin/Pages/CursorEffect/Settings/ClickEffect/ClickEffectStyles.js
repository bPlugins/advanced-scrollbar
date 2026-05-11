import { RangeControl, SelectControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { ColorControl } from "../../../../../../../bpl-tools/Components";
import { updateData } from '../../../../../../../bpl-tools/utils/functions';
import { effectSparkEasingOptions } from "../../../../../customCursor/utils/options";

const ClickEffectStyles = ({ value, onChange }) => {
  const { spark = {}, sparkSimple = {}, starburst = { } } = value || {}
  return (
    <>
      {
        value?.type === 'spark' && <>
          <RangeControl label="Spark Size" value={parseInt(spark?.size) >= 0 ? parseInt(spark?.size) : 12} onChange={val => onChange(updateData(value, val, 'spark', 'size'))} min={0} max={100} step={1} />

          <ColorControl label="Color" value={spark?.color ?? '#ff0000'} onChange={val => onChange(updateData(value, val, 'spark', 'color'))} />

          <RangeControl label="Lines Count" value={parseInt(spark?.sparkCount) >= 0 ? parseInt(spark?.sparkCount) : 8} onChange={val => onChange(updateData(value, val, 'spark', 'sparkCount'))} min={0} max={100} step={1} />

          <RangeControl label="Radius" value={parseInt(spark?.sparkRadius) >= 0 ? parseInt(spark?.sparkRadius) : 15} onChange={val => onChange(updateData(value, val, 'spark', 'sparkRadius'))} min={0} max={100} step={1} />

          <RangeControl label="Extra Scale" value={Number(spark?.extraScale)} onChange={val => onChange(updateData(value, val, 'spark', 'extraScale'))} min={0} max={5} step={0.1} />

          <RangeControl label="Duration (s)" value={Number(spark?.duration) >= 0 ? Number((Number(spark?.duration) / 1000).toFixed(2)) : 0.4} onChange={val => onChange(updateData(value, val * 1000, 'spark', 'duration'))} min={0} max={10} step={0.05} />

          <SelectControl label={__('Easing', 'advanced-scrollbar')} labelPosition="edge" value={spark?.easing} onChange={val => onChange(updateData(value, val, 'spark', 'easing'))} options={effectSparkEasingOptions} />
        </>
      }

      {
        value?.type === 'sparkSimple' && <>
          <RangeControl label="Spark Size" value={parseInt(sparkSimple?.size) >= 0 ? parseInt(sparkSimple?.size) : 40} onChange={val => onChange(updateData(value, val, 'sparkSimple', 'size'))} min={0} max={300} step={1} />

          <ColorControl label="Color" value={sparkSimple?.color ?? '#ff6b6b'} onChange={val => onChange(updateData(value, val, 'sparkSimple', 'color'))} />
          <RangeControl label="Duration (s)" value={Number(sparkSimple?.duration) >= 0 ? Number((Number(sparkSimple?.duration) / 1000).toFixed(2)) : 0.8} onChange={val => onChange(updateData(value, val * 1000, 'sparkSimple', 'duration'))} min={0} max={10} step={0.05} />

          <SelectControl label={__('Easing', 'advanced-scrollbar')} labelPosition="edge" value={sparkSimple?.easing} onChange={val => onChange(updateData(value, val, 'sparkSimple', 'easing'))} options={effectSparkEasingOptions} />
        </>
      }

      {
        value?.type === 'starburst' && <>
          <RangeControl label="Starburst Size" value={parseInt(starburst?.size) >= 0 ? parseInt(starburst?.size) : 60} onChange={val => onChange(updateData(value, val, 'starburst', 'size'))} min={0} max={300} step={1} />

          <ColorControl label="Color" value={starburst?.color ?? '#ff9a8b'} onChange={val => onChange(updateData(value, val, 'starburst', 'color'))} />

          <RangeControl label="Duration (s)" value={Number(starburst?.duration) >= 0 ? Number(starburst?.duration) : 1.0} onChange={val => onChange(updateData(value, val, 'starburst', 'duration'))} min={0} max={10} step={0.05} />
        </>
      }
    </>
  );
};

export default ClickEffectStyles;