import { Flex, RangeControl, SelectControl} from '@wordpress/components';

import { __ } from '@wordpress/i18n';
import { Label } from '../../../../../../../bpl-tools/Components';
import { updateData } from '../../../../../../../bpl-tools/utils/functions';
import { cursorOptions } from '../../utils/options';

const ShapeType = ({ value, onChange }) => {
  return (
    <>
      <Flex align='center'>
        <Label className=''>{__('Select Shape Type', 'advanced-scrollbar')}</Label>
        <SelectControl className='mt10' label="" labelPosition='edge' options={cursorOptions} value={value?.type} onChange={(val) => onChange(updateData(value, val, 'type'))}  />
      </Flex>

      {value?.type === "follow" && <>
        <RangeControl label={__('Cursor Duration', 'advanced-scrollbar')} value={value?.follow?.duration >= 0 ? value?.follow?.duration : 0.6} defaultValue={0.6} resetFallbackValue={0.6} min={0} max={5} step={0.1} onChange={(val) => onChange(updateData(value, val, 'follow', 'duration'))} />

        <RangeControl label={__('Inner Cursor Duration', 'advanced-scrollbar')} value={value?.follow?.innerDuration >= 0 ? value?.follow?.innerDuration : 0.1} defaultValue={0.1} resetFallbackValue={0.1} min={0} max={5} step={0.1} onChange={(val) => onChange(updateData(value, val, 'follow', 'innerDuration'))} />
      </>}

      {
        value?.type === "blob" && <>

          <SelectControl label={__('Blob Type', 'advanced-scrollbar')} labelPosition='edge' value={value?.blob?.blobType || 'circle'} onChange={(val) => onChange(updateData(value, val, 'blob', 'blobType'))} options={[{ label: __('Circle', 'advanced-scrollbar'), value: 'circle' }, { label: __('Square', 'advanced-scrollbar'), value: 'square' }]} />
        </>
      }

      {value?.type === "dot" && <>
        <RangeControl label={__('Cursor Duration', 'advanced-scrollbar')} value={value?.dot?.duration >= 0 ? value?.dot?.duration : 0.1} defaultValue={0.1} resetFallbackValue={0.1} min={0} max={5} step={0.1} onChange={(val) => onChange(updateData(value, val, 'dot', 'duration'))} />
      </>}

      {
        value?.type === "elastic" && <>
          <RangeControl label={__('Cursor Duration', 'advanced-scrollbar')} value={value?.elastic?.duration >= 0 ? value?.elastic?.duration : 0.5} defaultValue={0.5} resetFallbackValue={0.5} min={0} max={5} step={0.1} onChange={(val) => onChange(updateData(value, val, 'elastic', 'duration'))} />

          <RangeControl label={__('Inner Cursor Duration', 'advanced-scrollbar')} value={value?.elastic?.innerDuration >= 0 ? value?.elastic?.innerDuration : 0.1} defaultValue={0.1} resetFallbackValue={0.1} min={0} max={5} step={0.1} onChange={(val) => onChange(updateData(value, val, 'elastic', 'innerDuration'))} />
        </>
      }
    </>
  );
};

export default ShapeType;