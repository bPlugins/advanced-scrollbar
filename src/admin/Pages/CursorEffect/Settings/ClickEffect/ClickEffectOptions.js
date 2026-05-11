import { __ } from '@wordpress/i18n';
import { cursorEffectsOptions } from '../../utils/options';
import { SelectControl } from '@wordpress/components';

const ClickEffectOptions = ({ value, onChange }) => {
  return <>

    <SelectControl className='mt10' label={__('Effect Type', 'advanced-scrollbar')} labelPosition='edge' value={value?.type} onChange={(val) => onChange({ ...value, type: val })} options={cursorEffectsOptions} />
  </>
};

export default ClickEffectOptions;