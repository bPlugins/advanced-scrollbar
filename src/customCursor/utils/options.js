import { __ } from '@wordpress/i18n';
export const cursorStyleTabs = [
  { name: 'shape', title: __('Cursor', 'advanced-scrollbar') },
  { name: 'effect', title: __('Click Effect', 'advanced-scrollbar') }
];

export const cursorShapeTabs = [
  { name: 'shape', title: __('Cursor', 'advanced-scrollbar') },
  { name: 'style', title: __('Shape Style', 'advanced-scrollbar') }
];

export const cursorEffectTabs = [
  { name: 'type', title: __('Effect', 'advanced-scrollbar') },
  { name: 'style', title: __('Effect Style', 'advanced-scrollbar') }
];

// export const 

export const cursorSourceOptions =[
  { label: __('Cursor Only', 'advanced-scrollbar'), value: 'cursor', default: true },
  { label: __('Customizable Shape', 'advanced-scrollbar'), value: 'shape' },
]

export const cursorOptions = [
  { label: __('Default', 'advanced-scrollbar'), value: '', default: true },
  { label: __('Unset', 'advanced-scrollbar'), value: 'unset' },
  { label: __('Follow', 'advanced-scrollbar'), value: 'follow' },
  { label: __('Blob', 'advanced-scrollbar'), value: 'blob' },
  { label: __('Dot', 'advanced-scrollbar'), value: 'dot' },
  { label: __('Elastic', 'advanced-scrollbar'), value: 'elastic' },
]

export const cursorEffectsOptions = [
  { label: __("None", 'advanced-scrollbar'), value: "", default: true },
  { label: __('Unset', 'advanced-scrollbar'), value: 'unset' },
  { label: __("Spark", 'advanced-scrollbar'), value: "spark" },
  { label: __("Spark Simple", 'advanced-scrollbar'), value: "sparkSimple" },
  { label: __("Starburst", 'advanced-scrollbar'), value: "starburst" }
]

export const glitchIntensityOptions = [
  { label: __('Low', 'advanced-scrollbar'), value: 'low' },
  { label: __('Medium', 'advanced-scrollbar'), value: 'medium', default: true },
  { label: __('High', 'advanced-scrollbar'), value: 'high' },
];

export const effectSparkEasingOptions = [
  { label: __('Ease Out', 'advanced-scrollbar'), value: 'ease-out', default: true },
  { label: __('Ease In', 'advanced-scrollbar'), value: 'ease-in' },
  { label: __('Ease In Out', 'advanced-scrollbar'), value: 'ease-in-out' },
  { label: __('Linear', 'advanced-scrollbar'), value: 'linear' }
]